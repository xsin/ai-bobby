import { homedir } from 'node:os'
import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'
import { atomicWrite, backup, exists, latestBackup, normalizeEndpoint, planFor, readText, withLock } from './common'
import type { ImportContext, ImportPlan, ImportSelection, ImportTarget, Importer } from './types'

export class DshImporter implements Importer {
  readonly target: ImportTarget = 'dsh'
  private path: string | undefined
  private readonly providerId: string
  private readonly apiKeyEnv: string

  constructor(private readonly root = homedir(), namespace: 'prod' | 'dev' = 'prod') {
    this.providerId = namespace === 'dev' ? 'ai-bobby-dev' : 'ai-bobby'
    this.apiKeyEnv = namespace === 'dev' ? 'AI_BOBBY_DEV_API_KEY' : 'AI_BOBBY_API_KEY'
  }

  async detect(): Promise<{ path: string; detected: boolean }> {
    const path = await this.findProfile()
    this.path = path
    return { path: path ?? join(this.root, '.dsh', 'profiles', 'desktop', 'cordis.patch.yml'), detected: path !== undefined }
  }

  async installedModelIds(): Promise<string[]> {
    const path = await this.findProfile()
    if (path === undefined) return []
    const before = await readText(path)
    if (before === undefined) return []
    let parsed: unknown
    try {
      parsed = parseYaml(before)
    } catch {
      return []
    }
    if (!Array.isArray(parsed)) return []
    const entry = parsed.find(item => isObject(item) && item['id'] === 'llm-pi-ai')
    if (!isObject(entry) || !isObject(entry['config'])) return []
    const providers = entry['config']['providers']
    if (!isObject(providers)) return []
    const provider = providers[this.providerId]
    if (!isObject(provider)) return []
    const models = provider['models']
    return Array.isArray(models)
      ? models.flatMap(model => (isObject(model) && typeof model['id'] === 'string' ? [model['id']] : []))
      : []
  }

  async plan(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const path = await this.ensurePath()
    const before = await readText(path)
    const { text, warnings } = render(before, selection, context, this.providerId, this.apiKeyEnv)
    return planFor(this.target, path, before !== undefined, before, text, warnings, true)
  }

  async apply(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const path = await this.ensurePath()
    return withLock(path, async () => {
      const before = await readText(path)
      const { text, warnings, blocked } = render(before, selection, context, this.providerId, this.apiKeyEnv)
      if (blocked) return planFor(this.target, path, before !== undefined, before, before ?? '', warnings, true)
      if (before === text) {
        await this.syncCredentialRef(context.apiKey, warnings)
        return planFor(this.target, path, before !== undefined, before, text, warnings, true)
      }
      const backupPath = await backup(path)
      await atomicWrite(path, text, 0o600)
      await this.syncCredentialRef(context.apiKey, warnings)
      return planFor(this.target, path, true, before, text, warnings, true, backupPath)
    })
  }

  async rollback(): Promise<ImportPlan> {
    const path = await this.ensurePath()
    return withLock(path, async () => {
      const backupPath = await latestBackup(path)
      if (backupPath === undefined) {
        return { target: this.target, path, detected: await exists(path), changed: false, diff: '', warnings: ['没有可用的备份'], requiresRestart: false }
      }
      await atomicWrite(path, (await readText(backupPath)) ?? '', 0o600)
      return { target: this.target, path, detected: true, changed: true, diff: `已从 ${backupPath} 恢复`, warnings: [], requiresRestart: true, backupPath }
    })
  }

  /**
   * DSH resolves `apiKeyEnv` through its credential store before the process
   * environment, so writing the gateway key under `refs` makes the imported
   * provider work without asking the user to export a variable.
   */
  private async syncCredentialRef(apiKey: string, warnings: string[]): Promise<void> {
    const path = join(this.root, '.dsh', '.credentials.yaml')
    try {
      await withLock(path, async () => {
        const before = await readText(path)
        let doc: Record<string, unknown> = { version: 1 }
        if (before !== undefined && before.trim() !== '') {
          let parsed: unknown
          try {
            parsed = parseYaml(before)
          } catch {
            warnings.push('无法解析 ~/.dsh/.credentials.yaml；请在 DSH 设置中手动填入 API Key')
            return
          }
          if (!isObject(parsed)) {
            warnings.push('~/.dsh/.credentials.yaml 结构异常；请在 DSH 设置中手动填入 API Key')
            return
          }
          doc = parsed
        }
        const refs = isObject(doc['refs']) ? { ...(doc['refs'] as Record<string, unknown>) } : {}
        if (refs[this.apiKeyEnv] === apiKey) {
          warnings.push(`DSH 凭据存储已包含网关 Key；无需设置 ${this.apiKeyEnv} 环境变量`)
          return
        }
        refs[this.apiKeyEnv] = apiKey
        doc['refs'] = refs
        if (before !== undefined) await backup(path)
        await atomicWrite(path, stringifyYaml(doc, { lineWidth: 0 }), 0o600)
        warnings.push(`已把网关 Key 写入 DSH 凭据存储（${this.apiKeyEnv}）；无需设置环境变量`)
      })
    } catch (error) {
      warnings.push(`写入 DSH 凭据存储失败：${error instanceof Error ? error.message : String(error)}；请在 DSH 设置中手动填入 API Key`)
    }
  }

  private async ensurePath(): Promise<string> {
    if (this.path !== undefined) return this.path
    const path = await this.findProfile()
    if (path === undefined) throw new Error('没有找到 DSH profile 的 cordis.patch.yml')
    this.path = path
    return path
  }

  private async findProfile(): Promise<string | undefined> {
    const profiles = join(this.root, '.dsh', 'profiles')
    try {
      const entries = await readdir(profiles, { withFileTypes: true })
      const names = entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
      const ordered = ['desktop', ...names.filter(name => name !== 'desktop')]
      for (const name of ordered) {
        const candidate = join(profiles, name, 'cordis.patch.yml')
        if (await exists(candidate)) return candidate
      }
    } catch {
      // no profiles
    }
    return undefined
  }
}

function render(
  before: string | undefined,
  selection: ImportSelection,
  context: ImportContext,
  providerId: string,
  apiKeyEnv: string,
): { text: string; warnings: string[]; blocked?: boolean } {
  const warnings: string[] = ['DSH 补丁会重新序列化 YAML，原有注释可能丢失；写前会备份']
  let parsed: unknown
  try {
    parsed = before === undefined || before.trim() === '' ? [] : parseYaml(before)
  } catch (error) {
    warnings.push(`cordis.patch.yml 解析失败：${error instanceof Error ? error.message : String(error)}`)
    return { text: before ?? '', warnings, blocked: true }
  }
  if (!Array.isArray(parsed)) {
    warnings.push('cordis.patch.yml 顶层不是数组；已跳过')
    return { text: before ?? '', warnings, blocked: true }
  }
  const entry = parsed.find(item => isObject(item) && item['id'] === 'llm-pi-ai')
  if (!isObject(entry)) {
    warnings.push('没有找到 id: llm-pi-ai 的条目；请先在 DSH profile 中启用 llm-pi-ai')
    return { text: before ?? '', warnings, blocked: true }
  }
  const config = isObject(entry['config']) ? entry['config'] : {}
  entry['config'] = config
  const providers = isObject(config['providers']) ? config['providers'] : {}
  config['providers'] = providers

  const selected = context.models.filter(model => {
    if (!selection.groups.includes(model.provider)) return false
    if (selection.modelIds.length > 0) return selection.modelIds.includes(model.id)
    return model.status === 'available' || model.status === 'chat_only'
  })
  if (selected.length === 0) warnings.push('没有可导入的模型（分组未选或全部不可用）')

  providers[providerId] = {
    apiKeyEnv,
    api: 'openai-completions',
    baseURL: `${normalizeEndpoint(context.endpoint)}/v1`,
    models: selected.map(model => ({
      id: model.id,
      name: model.displayName,
      ...(model.contextWindow === undefined ? {} : { contextWindow: model.contextWindow }),
      ...(model.maxOutputTokens === undefined ? {} : { maxTokens: model.maxOutputTokens }),
      input: model.capabilities.images ? ['text', 'image'] : ['text'],
    })),
  }
  if (selection.setAsDefault) {
    warnings.push('DSH 默认模型请在 agent-default-model 中切换；此处只写 provider')
  }
  warnings.push(`写入时会同步把网关 Key 写入 DSH 凭据存储（~/.dsh/.credentials.yaml），无需设置 ${apiKeyEnv} 环境变量`)
  return { text: stringifyYaml(parsed, { lineWidth: 0 }), warnings }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
