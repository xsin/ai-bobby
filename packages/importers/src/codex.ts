import { homedir } from 'node:os'
import { join } from 'node:path'
import { parse as parseToml } from 'smol-toml'
import { atomicWrite, backup, exists, latestBackup, normalizeEndpoint, planFor, readText, withLock } from './common'
import type { ImportContext, ImportPlan, ImportSelection, ImportTarget, Importer } from './types'

const START = '# >>> ai-bobby:start'
const END = '# <<< ai-bobby:end'

export class CodexImporter implements Importer {
  readonly target: ImportTarget = 'codex'
  private readonly path: string

  constructor(root = homedir()) {
    this.path = join(root, '.codex', 'config.toml')
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
    if (!isObject(providers) || !isObject(providers['ai-bobby'])) return []
    // Codex stores no model list; the provider only participates when the
    // top-level default points at it.
    if (doc['model_provider'] !== 'ai-bobby') return []
    return typeof doc['model'] === 'string' ? [doc['model']] : []
  }

  async plan(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const before = await readText(this.path)
    const { text, warnings } = render(before, selection, context)
    return planFor(this.target, this.path, before !== undefined, before, text, warnings, true)
  }

  async apply(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    return withLock(this.path, async () => {
      const before = await readText(this.path)
      const { text, warnings, blocked } = render(before, selection, context)
      if (blocked) return planFor(this.target, this.path, before !== undefined, before, before ?? '', warnings, true)
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

function render(
  before: string | undefined,
  selection: ImportSelection,
  context: ImportContext,
): { text: string; warnings: string[]; blocked?: boolean } {
  const warnings: string[] = []
  const source = before ?? ''
  const withoutBlock = source.replace(new RegExp(`\\n?${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}\\n?`, 'g'), '\n')
  if (/^\[model_providers\.ai-bobby\]/m.test(withoutBlock)) {
    warnings.push('config.toml 已存在 ai-bobby provider（不在 AI Bobby 标记块内），已跳过写入')
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
  if (currentProvider === 'ai-bobby' && typeof currentModel === 'string' && !prefixed && model !== undefined) {
    // A previous hub used raw upstream ids; AI Bobby needs the provider prefix.
    textBase = setDefaultModel(textBase, model)
    warnings.push(`已把 model 从 ${currentModel} 改为 ${model}（AI Bobby 需要带来源前缀）`)
  } else if (selection.setAsDefault && model !== undefined) {
    textBase = setDefaultModel(textBase, model)
  }
  const block = [
    START,
    '[model_providers.ai-bobby]',
    'name = "AI Bobby"',
    `base_url = ${JSON.stringify(`${normalizeEndpoint(context.endpoint)}/v1`)}`,
    'wire_api = "responses"',
    `experimental_bearer_token = ${JSON.stringify(context.apiKey)}`,
    END,
  ].join('\n')
  const text = `${textBase.replace(/\n+$/, '')}\n\n${block}\n`
  try {
    parseToml(text)
  } catch (error) {
    warnings.push(`生成的 TOML 校验失败：${error instanceof Error ? error.message : String(error)}`)
    return { text: source, warnings, blocked: true }
  }
  if (model === undefined) warnings.push('没有默认模型；provider 已写入，但需要手动选择 model')
  return { text, warnings }
}

function setDefaultModel(source: string, model: string): string {
  const lines = source.split('\n')
  const filtered = lines.filter(line => !/^\s*(model|model_provider)\s*=/.test(line))
  // Top-level keys must appear before the first table header.
  const firstTable = filtered.findIndex(line => /^\s*\[/.test(line))
  const head = firstTable === -1 ? filtered : filtered.slice(0, firstTable)
  const tail = firstTable === -1 ? [] : filtered.slice(firstTable)
  return [`model = ${JSON.stringify(model)}`, 'model_provider = "ai-bobby"', '', ...head, ...tail].join('\n')
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
