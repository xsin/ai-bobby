import type { ModelDescriptor } from '@ai-bobby/core'
import { groupName, makeModelRef } from '@ai-bobby/core'

export interface OpenCodeProviderModel {
  id: string
  name: string
  context?: number
  input?: number
  output?: number
  images?: boolean
  toolcall?: boolean
  reasoning?: boolean
}

export interface OpenCodeProvidersResponse {
  all?: Array<{ id: string; models: Record<string, Record<string, unknown>> }>
}

export function freeModels(providers: OpenCodeProvidersResponse): OpenCodeProviderModel[] {
  const provider = providers.all?.find(item => item.id === 'opencode')
  if (!provider) throw new Error('OpenCode provider 未出现在 /provider 响应中')
  return Object.entries(provider.models)
    .flatMap(([id, raw]) => {
      const cost = isObject(raw['cost']) ? raw['cost'] : {}
      const cache = isObject(cost['cache']) ? cost['cache'] : {}
      const capabilities = isObject(raw['capabilities']) ? raw['capabilities'] : {}
      const input = isObject(capabilities['input']) ? capabilities['input'] : {}
      const output = isObject(capabilities['output']) ? capabilities['output'] : {}
      const limit = isObject(raw['limit']) ? raw['limit'] : {}
      const free =
        cost['input'] === 0 &&
        cost['output'] === 0 &&
        (cache['read'] ?? 0) === 0 &&
        (cache['write'] ?? 0) === 0 &&
        output['text'] !== false &&
        raw['status'] !== 'deprecated'
      if (!free) return []
      return [{
        id,
        name: typeof raw['name'] === 'string' && raw['name'] !== '' ? raw['name'] : id,
        context: number(limit['context']),
        input: number(limit['input']),
        output: number(limit['output']),
        images: input['image'] === true,
        toolcall: capabilities['toolcall'] === true,
        reasoning: capabilities['reasoning'] === true,
      }]
    })
    .sort((a, b) => a.id.localeCompare(b.id))
}

export function toDescriptor(model: OpenCodeProviderModel, status: ModelDescriptor['status'] = 'available'): ModelDescriptor {
  const ref = makeModelRef('opencode', model.id, model.name)
  return {
    ...ref,
    groupName: groupName('opencode'),
    capabilities: {
      text: true,
      // The envelope adapter does not forward images yet; never claim support.
      images: false,
      tools: model.toolcall !== false,
      reasoning: model.reasoning === true,
    },
    ...(model.context === undefined ? {} : { contextWindow: model.context }),
    ...(model.output === undefined ? {} : { maxOutputTokens: model.output }),
    status,
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function number(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}
