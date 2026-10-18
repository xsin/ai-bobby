import { homedir } from 'node:os'
import { join } from 'node:path'
import type { ModelDescriptor, ProviderId } from '@ai-bobby/core'
import {
  atomicWrite,
  backup,
  exists,
  latestBackup,
  normalizeEndpoint,
  planFor,
  readText,
  safeJsonParse,
  withLock,
} from './common'
import type { ImportContext, ImportPlan, ImportSelection, ImportTarget, Importer } from './types'

const OWNER = 'ai-bobby-v1'

export class WorkBuddyImporter implements Importer {
  readonly target: ImportTarget
  private readonly path: string
  private readonly excluded: ProviderId

  constructor(target: 'workbuddy' | 'workbuddy-ai', root = homedir()) {
    this.target = target
    this.excluded = target === 'workbuddy' ? 'workbuddy' : 'workbuddy-ai'
    this.path = join(root, target === 'workbuddy' ? '.workbuddy' : '.workbuddy-ai', 'models.json')
  }

  async detect(): Promise<{ path: string; detected: boolean }> {
    return { path: this.path, detected: await exists(this.path) }
  }

  async installedModelIds(): Promise<string[]> {
    const before = await readText(this.path)
    const parsed = safeJsonParse(before, [])
    const source = Array.isArray(parsed)
      ? parsed
      : isObject(parsed) && Array.isArray(parsed['models'])
        ? parsed['models']
        : []
    return source.flatMap(entry =>
      isObject(entry) && entry['aiBobbyOwner'] === OWNER && typeof entry['id'] === 'string' ? [entry['id']] : [],
    )
  }

  async plan(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    const before = await readText(this.path)
    const { array, warnings } = render(before, selection, context, this.excluded)
    const after = `${JSON.stringify(array, null, 2)}\n`
    return planFor(this.target, this.path, before !== undefined, before, after, warnings, true)
  }

  async apply(selection: ImportSelection, context: ImportContext): Promise<ImportPlan> {
    return withLock(this.path, async () => {
      const before = await readText(this.path)
      const { array, warnings } = render(before, selection, context, this.excluded)
      const after = `${JSON.stringify(array, null, 2)}\n`
      if (before === after) {
        return planFor(this.target, this.path, before !== undefined, before, after, warnings, true)
      }
      const backupPath = await backup(this.path)
      await atomicWrite(this.path, after, 0o600)
      return planFor(this.target, this.path, true, before, after, warnings, true, backupPath)
    })
  }

  async rollback(): Promise<ImportPlan> {
    return withLock(this.path, async () => {
      const backupPath = await latestBackup(this.path)
      if (backupPath === undefined) {
        return {
          target: this.target,
          path: this.path,
          detected: await exists(this.path),
          changed: false,
          diff: '',
          warnings: ['没有可用的备份'],
          requiresRestart: false,
        }
      }
      const content = (await readText(backupPath)) ?? ''
      await atomicWrite(this.path, content, 0o600)
      return {
        target: this.target,
        path: this.path,
        detected: true,
        changed: true,
        diff: `已从 ${backupPath} 恢复`,
        warnings: [],
        requiresRestart: true,
        backupPath,
      }
    })
  }
}

function render(
  before: string | undefined,
  selection: ImportSelection,
  context: ImportContext,
  excluded: ProviderId,
): { array: unknown[]; warnings: string[] } {
  const warnings: string[] = []
  const parsed = safeJsonParse(before, [])
  const source = Array.isArray(parsed)
    ? parsed
    : isObject(parsed) && Array.isArray(parsed['models'])
      ? parsed['models']
      : []
  const userEntries = source.filter(entry => !isOwned(entry))
  const userIds = new Set(
    userEntries
      .map(entry => (isObject(entry) && typeof entry['id'] === 'string' ? entry['id'] : undefined))
      .filter((id): id is string => id !== undefined),
  )

  const selected = context.models.filter(model => {
    if (model.provider === excluded) return false
    if (!selection.groups.includes(model.provider)) return false
    if (selection.modelIds.length > 0) return selection.modelIds.includes(model.id)
    return model.status === 'available' || model.status === 'chat_only'
  })

  const entries: unknown[] = []
  for (const model of selected) {
    if (userIds.has(model.id)) {
      warnings.push(`跳过 ${model.id}：用户已有同名条目`)
      continue
    }
    entries.push(toEntry(model, context))
  }
  if (entries.length === 0) warnings.push('没有可导入的模型（分组被排除或全部冲突）')
  return { array: [...userEntries, ...entries], warnings }
}

function toEntry(model: ModelDescriptor, context: ImportContext): Record<string, unknown> {
  const tools = model.capabilities.tools && model.status !== 'chat_only'
  return {
    id: model.id,
    name: model.displayName,
    vendor: 'Custom',
    url: `${normalizeEndpoint(context.endpoint)}/v1/chat/completions`,
    apiKey: context.apiKey,
    supportsToolCall: tools,
    supportsImages: model.capabilities.images,
    supportsReasoning: model.capabilities.reasoning,
    ...(model.capabilities.reasoning
      ? { reasoning: { supportedEfforts: ['low', 'medium', 'high'], defaultEffort: 'medium', canDisableThinking: false } }
      : {}),
    ...(model.contextWindow === undefined ? {} : { maxInputTokens: model.contextWindow }),
    ...(model.maxOutputTokens === undefined ? {} : { maxOutputTokens: model.maxOutputTokens }),
    aiBobbyOwner: OWNER,
  }
}

function isOwned(value: unknown): boolean {
  return isObject(value) && value['aiBobbyOwner'] === OWNER
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
