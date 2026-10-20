import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { parse as parseToml } from 'smol-toml'
import { atomicWrite, backup, exists, latestBackup, normalizeEndpoint, planFor, readText, withLock } from './common'
import type { ImportContext, ImportPlan, ImportSelection, ImportTarget, Importer } from './types'
import { codexCatalogEntry, isCodexCovered } from './codex-metadata'

const PROD_PROVIDER = 'ai-bobby'
const DEV_PROVIDER = 'ai-bobby-dev'

export class CodexImporter implements Importer {
  readonly target: ImportTarget = 'codex'
  private readonly path: string
  private readonly providerId: string
  private readonly start: string
  private readonly end: string
  private readonly catalogName: string

  constructor(root = homedir(), namespace: 'prod' | 'dev' = 'prod') {
    this.path = join(root, '.codex', 'config.toml')
    this.providerId = namespace === 'dev' ? DEV_PROVIDER : PROD_PROVIDER
    this.start = `# >>> ${this.providerId}:start`
    this.end = `# <<< ${this.providerId}:end`
    this.catalogName = namespace === 'dev' ? 'models.ai-bobby-dev.json' : 'models.ai-bobby.json'
  }

  async detect(): Promise<{ path: string; detected: boolean }> {
    return { path: this.path, detected: await exists(this.path) }
  }

  async installedModelIds(): Promise<string[]> {
    const before = await readText(this.path)
    if (before === undefined) return []
    let doc: Record<string, unknown>
    try {
      doc = parseToml(before)
    } catch {
      return []
    }
    const providers = doc['model_providers']
    if (!isObject(providers) || !isObject(providers[this.providerId])) return []
    // Codex stores no model list; the provider only participates when the
    // top-level default points at it.
    if (doc['model_provider'] !== this.providerId) return []
    return typeof doc['model'] === 'string' ? [doc['model']] : []
  }

  async plan(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const before = await readText(this.path)
    const { text, warnings } = await render(this.path, before, selection, context, this.providerId, this.start, this.end, this.catalogName)
    return planFor(this.target, this.path, before !== undefined, before, text, warnings, true)
  }

  async apply(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    return withLock(this.path, async () => {
      const before = await readText(this.path)
      const { text, warnings, blocked, catalog } = await render(this.path, before, selection, context, this.providerId, this.start, this.end, this.catalogName)
      if (blocked) return planFor(this.target, this.path, before !== undefined, before, before ?? '', warnings, true)
      if (catalog !== undefined) await atomicWrite(catalog.path, catalog.content, 0o600)
      if (before === text) return planFor(this.target, this.path, before !== undefined, before, text, warnings, true)
      const backupPath = await backup(this.path)
      await atomicWrite(this.path, text, 0o600)
      return planFor(this.target, this.path, true, before, text, warnings, true, backupPath)
    })
  }

  async rollback(): Promise<ImportPlan> {
    return withLock(this.path, async () => {
      const backupPath = await latestBackup(this.path)
      if (backupPath === undefined) {
        return { target: this.target, path: this.path, detected: await exists(this.path), changed: false, diff: '', warnings: ['没有可用的备份'], requiresRestart: false }
      }
      await atomicWrite(this.path, (await readText(backupPath)) ?? '', 0o600)
      return { target: this.target, path: this.path, detected: true, changed: true, diff: `已从 ${backupPath} 恢复`, warnings: [], requiresRestart: true, backupPath }
    })
  }
}

async function render(
  configPath: string,
  before: string | undefined,
  selection: ImportSelection,
  context: ImportContext,
  providerId: string,
  start: string,
  end: string,
  catalogName: string,
): Promise<{ text: string; warnings: string[]; blocked?: boolean; catalog?: { path: string; content: string } }> {
  const warnings: string[] = []
  const source = before ?? ''
  const withoutBlock = source.replace(new RegExp(`\\n?${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}\\n?`, 'g'), '\n')
  if (new RegExp(`^\\[model_providers\\.${escapeRegExp(providerId)}\\]`, 'm').test(withoutBlock)) {
    warnings.push(`config.toml 已存在 ${providerId} provider（不在 AI Bobby 标记块内），已跳过写入`)
    return { text: source, warnings, blocked: true }
  }
  const model = selection.defaultModelId ?? selection.modelIds[0]
  let textBase = withoutBlock
  const parsedBefore = (() => {
    try {
      return parseToml(source) as Record<string, unknown>
    } catch {
      return undefined
    }
  })()
  const currentModel = parsedBefore?.['model']
  const currentProvider = parsedBefore?.['model_provider']
  const prefixed = typeof currentModel === 'string' && /^(oc|wb|wbi|nv)\//.test(currentModel)
  if (currentProvider === providerId && typeof currentModel === 'string' && !prefixed && model !== undefined) {
    // A previous hub used raw upstream ids; AI Bobby needs the provider prefix.
    textBase = setDefaultModel(textBase, model, providerId)
    warnings.push(`已把 model 从 ${currentModel} 改为 ${model}（AI Bobby 需要带来源前缀）`)
  } else if (selection.setAsDefault && model !== undefined) {
    textBase = setDefaultModel(textBase, model, providerId)
  }
  const block = [
    start,
    `[model_providers.${providerId}]`,
    `name = ${JSON.stringify(providerId === DEV_PROVIDER ? 'AI Bobby Dev' : 'AI Bobby')}`,
    `base_url = ${JSON.stringify(`${normalizeEndpoint(context.endpoint)}/v1`)}`,
    'wire_api = "responses"',
    `experimental_bearer_token = ${JSON.stringify(context.apiKey)}`,
    end,
  ].join('\n')
  let text = `${textBase.replace(/\n+$/, '')}\n\n${block}\n`
  const catalog = await buildCatalog(configPath, selection, context, catalogName)
  if (catalog !== undefined) {
    text = setCatalogPath(text, catalog.path)
    warnings.push('已生成 AI Bobby 模型目录；Codex 模型选择器会显示带前缀的 ID')
    if (catalog.fallback.length > 0) {
      warnings.push(`${catalog.fallback.length} 个模型没有现成 Codex 元数据，使用通用模板参数，建议复核 models.ai-bobby.json：${catalog.fallback.slice(0, 4).join('、')}${catalog.fallback.length > 4 ? '…' : ''}`)
    }
  }
  try {
    parseToml(text)
  } catch (error) {
    warnings.push(`生成的 TOML 校验失败：${error instanceof Error ? error.message : String(error)}`)
    return { text: source, warnings, blocked: true }
  }
  if (model === undefined) warnings.push('没有默认模型；provider 已写入，但需要手动选择 model')
  return { text, warnings, ...(catalog === undefined ? {} : { catalog }) }
}

/**
 * A restore is byte-exact, but old Codex backups can contain the hub-era raw
 * model id while pointing at ai-bobby. If exactly one current model matches,
 * rewrite it to the prefixed id; otherwise leave the file alone and warn.
 */
export function normalizeRestoredCodexModel(
  text: string,
  modelIds: readonly string[],
  providerId = PROD_PROVIDER,
): { text: string; warnings: string[] } {
  let doc: Record<string, unknown>
  try {
    doc = parseToml(text) as Record<string, unknown>
  } catch {
    return { text, warnings: [] }
  }
  if (doc['model_provider'] !== providerId) return { text, warnings: [] }
  const model = doc['model']
  if (typeof model !== 'string' || /^(oc|wb|wbi|nv)\//.test(model)) return { text, warnings: [] }
  const matches = modelIds.filter(id => id === model || id.endsWith(`/${model}`))
  if (matches.length === 1 && matches[0] !== undefined) {
    return {
      text: setDefaultModel(text, matches[0], providerId),
      warnings: [`恢复的配置包含裸模型 ${model}，已改为 ${matches[0]}（AI Bobby 需要来源前缀）`],
    }
  }
  return {
    text,
    warnings: [`恢复的配置包含裸模型 ${model}，无法唯一确定来源前缀，Codex 可能报错`],
  }
}

function setCatalogPath(source: string, catalogPath: string): string {
  const lines = source.split('\n').filter(line => !/^\s*model_catalog_json\s*=/.test(line))
  const firstTable = lines.findIndex(line => /^\s*\[/.test(line))
  const head = firstTable === -1 ? lines : lines.slice(0, firstTable)
  const tail = firstTable === -1 ? [] : lines.slice(firstTable)
  return [...head, `model_catalog_json = ${JSON.stringify(catalogPath)}`, '', ...tail].join('\n')
}

async function buildCatalog(
  configPath: string,
  selection: ImportSelection,
  context: ImportContext,
  catalogName: string,
): Promise<{ path: string; content: string; fallback: string[] } | undefined> {
  const selected = new Set(selection.modelIds)
  const available = context.models.filter(model => selected.has(model.id))
  const models: Array<Record<string, unknown>> = []
  const fallback: string[] = []
  for (const model of available) {
    if (!isCodexCovered(model)) {
      fallback.push(model.displayName)
      continue
    }
    models.push(codexCatalogEntry(model))
  }
  if (models.length === 0) return undefined
  return {
    path: join(dirname(configPath), catalogName),
    content: `${JSON.stringify({ models }, null, 2)}\n`,
    fallback,
  }
}

function setDefaultModel(source: string, model: string, providerId = PROD_PROVIDER): string {
  const lines = source.split('\n')
  const filtered = lines.filter(line => !/^\s*(model|model_provider)\s*=/.test(line))
  // Top-level keys must appear before the first table header.
  const firstTable = filtered.findIndex(line => /^\s*\[/.test(line))
  const head = firstTable === -1 ? filtered : filtered.slice(0, firstTable)
  const tail = firstTable === -1 ? [] : filtered.slice(firstTable)
  return [`model = ${JSON.stringify(model)}`, `model_provider = ${JSON.stringify(providerId)}`, '', ...head, ...tail].join('\n')
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
