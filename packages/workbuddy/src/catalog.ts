import type { ModelBilling, ModelDescriptor, ModelStatus } from '@ai-bobby/core'
import { groupName, makeModelRef } from '@ai-bobby/core'
import type { WorkBuddyVariant } from './variants'

export interface WorkBuddyModelReasoning {
  supports: boolean
  onlyReasoning: boolean
  supportedEfforts?: readonly string[]
  defaultEffort?: string
  canDisableThinking: boolean
}

export interface WorkBuddyCatalogModel {
  id: string
  name: string
  contextWindow: number
  maxTokens: number
  supportsImages: boolean
  reasoning?: WorkBuddyModelReasoning
  billing?: ModelBilling
  raw?: Record<string, unknown>
}

export const FALLBACK_CN_MODELS: readonly WorkBuddyCatalogModel[] = [
  { id: 'hy3', name: 'Hy3', contextWindow: 192_000, maxTokens: 64_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, defaultEffort: 'high', canDisableThinking: false }, billing: { credits: 'x0.00', free: true } },
  { id: 'deepseek-v4.1-flash', name: 'Deepseek-V4.1-Flash', contextWindow: 1_000_000, maxTokens: 128_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'high', 'max'], defaultEffort: 'high', canDisableThinking: true }, billing: { credits: 'x0.11', free: false } },
  { id: 'glm-5.3', name: 'GLM-5.3', contextWindow: 1_000_000, maxTokens: 64_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'high', 'max'], defaultEffort: 'max', canDisableThinking: false }, billing: { credits: 'x0.79', free: false } },
  { id: 'glm-5.3-flash', name: 'GLM-5.3-Flash', contextWindow: 1_000_000, maxTokens: 131_072, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'high', 'max'], defaultEffort: 'high', canDisableThinking: false }, billing: { credits: 'x0.06', free: false } },
  { id: 'minimax-m3-pay', name: 'MiniMax-M3', contextWindow: 512_000, maxTokens: 128_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, defaultEffort: 'medium', canDisableThinking: false }, billing: { credits: 'x0.25', free: false } },
  { id: 'kimi-k3-2', name: 'Kimi-K3', contextWindow: 1_000_000, maxTokens: 32_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, defaultEffort: 'medium', canDisableThinking: false }, billing: { credits: 'x1.62', free: false } },
  { id: 'step-5-preview', name: 'Step-5-Preview', contextWindow: 1_000_000, maxTokens: 64_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'medium', 'high'], defaultEffort: 'high', canDisableThinking: false }, billing: { credits: 'x0.00', free: true } },
  { id: 'space-bunny', name: 'Space-Bunny', contextWindow: 1_000_000, maxTokens: 128_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'medium', 'high', 'xhigh', 'max'], defaultEffort: 'max', canDisableThinking: false }, billing: { credits: 'x0.08', free: false } },
]

export const FALLBACK_INTL_MODELS: readonly WorkBuddyCatalogModel[] = [
  { id: 'default-model', name: 'Auto', contextWindow: 176_000, maxTokens: 24_000, supportsImages: true, reasoning: { supports: false, onlyReasoning: false, canDisableThinking: true }, billing: { free: false } },
  { id: 'hy3', name: 'Hy3', contextWindow: 192_000, maxTokens: 64_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'high'], defaultEffort: 'high', canDisableThinking: false }, billing: { free: false, rateUnknown: true } },
  { id: 'deepseek-v4.1-flash', name: 'Deepseek-V4.1-Flash', contextWindow: 300_000, maxTokens: 128_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, defaultEffort: 'high', canDisableThinking: false }, billing: { free: false, rateUnknown: true } },
  { id: 'gpt-6-astra', name: 'GPT-6-Astra', contextWindow: 400_000, maxTokens: 128_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'medium', 'high', 'xhigh', 'max'], defaultEffort: 'medium', canDisableThinking: true }, billing: { credits: 'x6.67', free: false } },
  { id: 'glm-5.3', name: 'GLM-5.3', contextWindow: 1_000_000, maxTokens: 48_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, supportedEfforts: ['low', 'high', 'max'], defaultEffort: 'high', canDisableThinking: true }, billing: { credits: 'x0.79', free: false } },
  { id: 'kimi-k3', name: 'Kimi-K3', contextWindow: 1_000_000, maxTokens: 32_000, supportsImages: true, reasoning: { supports: true, onlyReasoning: true, defaultEffort: 'medium', canDisableThinking: false }, billing: { credits: 'x1.62', free: false } },
]

export function parseModelCatalog(
  data: Record<string, unknown>,
  variant: WorkBuddyVariant,
): WorkBuddyCatalogModel[] {
  const rawModels = Array.isArray(data['models']) ? data['models'] : []
  const agents = Array.isArray(data['agents']) ? data['agents'] : []
  let cliIds: string[] | undefined
  for (const agent of agents) {
    if (!isObject(agent)) continue
    if (agent['name'] === 'cli' && Array.isArray(agent['models'])) {
      cliIds = agent['models'].filter((id): id is string => typeof id === 'string')
      break
    }
  }
  if (cliIds === undefined) {
    // Lenient fallback: some deployments omit the cli agent wrapper.
    cliIds = rawModels
      .map(model => (isObject(model) && typeof model['id'] === 'string' ? model['id'] : undefined))
      .filter((id): id is string => id !== undefined)
  }
  const byId = new Map<string, WorkBuddyCatalogModel>()
  for (const raw of rawModels) {
    if (!isObject(raw)) continue
    const id = typeof raw['id'] === 'string' ? raw['id'] : ''
    if (id === '' || raw['disabled'] === true) continue
    const maxInput = numberValue(raw['maxInputTokens'])
    const maxOutput = numberValue(raw['maxOutputTokens'])
    if (maxInput <= 0 || maxOutput <= 0) continue
    const context = variant.international && isObject(raw['contextWindow'])
      ? numberValue(raw['contextWindow']['defaultLength']) || maxInput
      : maxInput
    byId.set(id, {
      id,
      name: typeof raw['name'] === 'string' && raw['name'] !== '' ? raw['name'] : id,
      contextWindow: context,
      maxTokens: maxOutput,
      supportsImages: raw['supportsImages'] === true && raw['disabledMultimodal'] !== true,
      ...parseReasoning(raw),
      ...parseBilling(raw),
      raw,
    })
  }
  const models = cliIds
    .map(id => byId.get(id))
    .filter((model): model is WorkBuddyCatalogModel => model !== undefined)
  if (models.length === 0) {
    throw new Error('WorkBuddy 模型目录为空（cli agent 没有可用模型）')
  }
  return disambiguateDisplayNames(models)
}

export function fallbackModels(variant: WorkBuddyVariant): WorkBuddyCatalogModel[] {
  return [...(variant.international ? FALLBACK_INTL_MODELS : FALLBACK_CN_MODELS)]
}

export function toDescriptor(
  variant: WorkBuddyVariant,
  model: WorkBuddyCatalogModel,
  accounts = 1,
): ModelDescriptor {
  const ref = makeModelRef(variant.id, model.id, model.name)
  return {
    ...ref,
    groupName: groupName(variant.id),
    capabilities: {
      text: true,
      images: model.supportsImages,
      tools: true,
      reasoning: model.reasoning?.supports === true,
    },
    contextWindow: model.contextWindow,
    maxOutputTokens: model.maxTokens,
    status: 'available' satisfies ModelStatus,
    accounts,
    ...(model.billing === undefined ? {} : { billing: model.billing }),
    ...(model.raw === undefined ? {} : { upstream: model.raw }),
  }
}

export function mergeCatalog(
  variant: WorkBuddyVariant,
  perAccount: ReadonlyArray<readonly WorkBuddyCatalogModel[]>,
): ModelDescriptor[] {
  const merged = new Map<string, WorkBuddyCatalogModel>()
  const counts = new Map<string, number>()
  for (const models of perAccount) {
    for (const model of models) {
      const existing = merged.get(model.id)
      counts.set(model.id, (counts.get(model.id) ?? 0) + 1)
      if (existing === undefined) {
        merged.set(model.id, model)
        continue
      }
      merged.set(model.id, {
        ...existing,
        contextWindow: Math.max(existing.contextWindow, model.contextWindow),
        maxTokens: Math.max(existing.maxTokens, model.maxTokens),
        supportsImages: existing.supportsImages || model.supportsImages,
        reasoning: existing.reasoning ?? model.reasoning,
        billing: existing.billing ?? model.billing,
      })
    }
  }
  return [...merged.values()].map(model => toDescriptor(variant, model, counts.get(model.id) ?? 0))
}

function parseReasoning(raw: Record<string, unknown>): { reasoning?: WorkBuddyModelReasoning } {
  const supports = raw['supportsReasoning'] === true
  const onlyReasoning = raw['onlyReasoning'] === true
  const reasoning = isObject(raw['reasoning']) ? raw['reasoning'] : {}
  const rawEfforts = Array.isArray(reasoning['supportedEfforts'])
    ? reasoning['supportedEfforts'].filter((value): value is string => typeof value === 'string')
    : undefined
  const defaultEffort =
    typeof reasoning['defaultEffort'] === 'string'
      ? reasoning['defaultEffort']
      : typeof reasoning['effort'] === 'string'
        ? reasoning['effort']
        : undefined
  return {
    reasoning: {
      supports,
      onlyReasoning,
      ...(rawEfforts === undefined || rawEfforts.length === 0 ? {} : { supportedEfforts: rawEfforts }),
      ...(defaultEffort === undefined ? {} : { defaultEffort }),
      canDisableThinking: reasoning['canDisableThinking'] === true,
    },
  }
}

function parseBilling(raw: Record<string, unknown>): { billing?: ModelBilling } {
  const credits = typeof raw['credits'] === 'string' && raw['credits'].trim() !== '' ? raw['credits'].trim() : undefined
  const badges: string[] = []
  if (Array.isArray(raw['tags'])) {
    for (const tag of raw['tags']) {
      if (typeof tag !== 'string') continue
      if (!tag.toLowerCase().startsWith('badge:')) continue
      const label = tag.slice(6).split(':')[0]
      if (label && !badges.includes(label)) badges.push(label)
    }
  }
  if (credits === undefined && badges.length === 0) return {}
  const normalized = normalizeCredits(credits)
  return {
    billing: {
      ...(credits === undefined ? {} : { credits }),
      ...(badges.length === 0 ? {} : { badges }),
      free: normalized !== undefined && /^x?0\.0+$/.test(normalized),
    },
  }
}

export function normalizeCredits(value: string | undefined): string | undefined {
  if (value === undefined) return undefined
  const match = /x?\s*(\d+(?:\.\d+)?)/i.exec(value.trim())
  return match === null ? undefined : `x${match[1]}`
}

function disambiguateDisplayNames(models: WorkBuddyCatalogModel[]): WorkBuddyCatalogModel[] {
  const seen = new Set<string>()
  return models.map(model => {
    const key = model.name.trim().toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      return model
    }
    const tail = model.id.toLowerCase().startsWith(key) ? model.id.slice(key.length) : ''
    if (tail === '') return model
    const name = `${model.name}${tail.toUpperCase()}`
    seen.add(name.toLowerCase())
    return { ...model, name }
  })
}

function numberValue(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
