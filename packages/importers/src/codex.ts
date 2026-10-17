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
  if (selection.setAsDefault) warnings.push('Codex 默认模型请在配置中手动设置；此处只写 provider')
  const block = [
    START,
    '[model_providers.ai-bobby]',
    'name = "AI Bobby"',
    `base_url = ${JSON.stringify(`${normalizeEndpoint(context.endpoint)}/v1`)}`,
    'wire_api = "responses"',
    `experimental_bearer_token = ${JSON.stringify(context.apiKey)}`,
    END,
  ].join('\n')
  const text = `${withoutBlock.replace(/\n+$/, '')}\n\n${block}\n`
  try {
    parseToml(text)
  } catch (error) {
    warnings.push(`生成的 TOML 校验失败：${error instanceof Error ? error.message : String(error)}`)
    return { text: source, warnings, blocked: true }
  }
  if (model === undefined) warnings.push('没有默认模型；provider 已写入，但需要手动选择 model')
  return { text, warnings }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
