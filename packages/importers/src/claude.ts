import { homedir } from 'node:os'
import { join } from 'node:path'
import { atomicWrite, backup, exists, latestBackup, normalizeEndpoint, planFor, readText, withLock } from './common'
import type { ImportContext, ImportPlan, ImportSelection, ImportTarget, Importer } from './types'

export class ClaudeImporter implements Importer {
  readonly target: ImportTarget = 'claude'
  private readonly path: string

  constructor(root = homedir()) {
    this.path = join(root, '.claude', 'settings.json')
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
  let parsed: Record<string, unknown> = {}
  if (before !== undefined && before.trim() !== '') {
    try {
      const value: unknown = JSON.parse(before)
      if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('not an object')
      parsed = value as Record<string, unknown>
    } catch {
      warnings.push('settings.json 不是合法对象；已跳过写入')
      return { text: before, warnings, blocked: true }
    }
  }
  const env = isObject(parsed['env']) ? { ...parsed['env'] } : {}
  env['ANTHROPIC_BASE_URL'] = normalizeEndpoint(context.endpoint)
  env['ANTHROPIC_AUTH_TOKEN'] = context.apiKey
  const model = selection.defaultModelId ?? selection.modelIds[0]
  if (model !== undefined) env['ANTHROPIC_MODEL'] = model
  parsed['env'] = env
  if (selection.setAsDefault) warnings.push('Claude Code 的 ANTHROPIC_MODEL 已按默认模型写入')
  return { text: `${JSON.stringify(parsed, null, 2)}\n`, warnings }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
