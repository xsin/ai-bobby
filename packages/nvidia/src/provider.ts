import { randomUUID } from 'node:crypto'
import { TextDecoder } from 'node:util'
import {
  GatewayError,
  type CanonicalEvent,
  type CanonicalContent,
  type CanonicalMessage,
  type CanonicalRequest,
  type CanonicalTool,
  type CanonicalUsage,
  type ModelBilling,
  type ModelDescriptor,
  type ProviderAdapter,
  type ProviderId,
} from '@ai-bobby/core'

const DEFAULT_BASE_URL = 'https://integrate.api.nvidia.com/v1'
const PROBE_TIMEOUT_MS = 20_000

export interface NvidiaProviderOptions {
  apiKey: string
  baseUrl?: string
  fetchImpl?: typeof fetch
}

export interface NvidiaProbeResult {
  modelId: string
  upstreamId: string
  ok: boolean
  latencyMs: number
  status: ModelDescriptor['status']
  error?: string
}

function authHeaders(apiKey: string): Record<string, string> {
  return { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' }
}

function mapStatus(status: number): 'auth' | 'credit' | 'rate_limit' | 'not_found' | 'upstream' | 'invalid_request' {
  if (status === 401 || status === 403) return 'auth'
  if (status === 402) return 'credit'
  if (status === 404) return 'not_found'
  if (status === 429) return 'rate_limit'
  if (status >= 400 && status < 500) return 'invalid_request'
  return 'upstream'
}

export class NvidiaProvider implements ProviderAdapter {
  readonly id: ProviderId = 'nvidia'
  readonly displayName = 'NVIDIA NIM'
  private readonly baseUrl: string
  private readonly fetchImpl: typeof fetch
  private apiKey: string
  private descriptors: ModelDescriptor[] = []

  constructor(options: NvidiaProviderOptions) {
    this.apiKey = options.apiKey.trim()
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '')
    this.fetchImpl = options.fetchImpl ?? fetch
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey.trim()
    if (this.apiKey === '') this.descriptors = []
  }

  listModels(): readonly ModelDescriptor[] {
    return this.descriptors
  }

  async refreshModels(signal?: AbortSignal): Promise<readonly ModelDescriptor[]> {
    if (this.apiKey === '') {
      this.descriptors = []
      return this.descriptors
    }
    const response = await this.fetchImpl(`${this.baseUrl}/models`, {
      headers: authHeaders(this.apiKey),
      signal: signal ?? AbortSignal.timeout(15_000),
    })
    if (!response.ok) throw new GatewayError(mapStatus(response.status), response.status, `NVIDIA 模型目录请求失败（HTTP ${response.status}）`)
    const payload = (await response.json()) as { data?: Array<{ id?: unknown }> }
    const models = (payload.data ?? [])
      .map(item => item.id)
      .filter((id): id is string => typeof id === 'string' && id !== '')
      .sort()
    const previous = new Map(this.descriptors.map(model => [model.upstreamId, model]))
    this.descriptors = models.map(upstreamId => {
      const old = previous.get(upstreamId)
      return {
        provider: this.id,
        upstreamId,
        id: `nv/${upstreamId}`,
        displayName: `NV. ${upstreamId}`,
        groupName: 'NVIDIA NIM',
        capabilities: old?.capabilities ?? { text: true, images: false, tools: false, reasoning: false },
        status: old?.status ?? 'pending',
        billing: { free: true, badges: ['免费试用'] } satisfies ModelBilling,
        ...(old?.latencyMs === undefined ? {} : { latencyMs: old.latencyMs }),
        ...(old?.checkedAtMs === undefined ? {} : { checkedAtMs: old.checkedAtMs }),
        ...(old?.error === undefined ? {} : { error: old.error }),
      }
    })
    return this.descriptors
  }

  /** Real one-token chat request per model; returns latency and updates status. */
  async probeAll(concurrency = 4, signal?: AbortSignal): Promise<NvidiaProbeResult[]> {
    const queue = [...this.descriptors]
    const results: NvidiaProbeResult[] = []
    const workers = Array.from({ length: Math.max(1, concurrency) }, async () => {
      for (;;) {
        const model = queue.shift()
        if (model === undefined) return
        results.push(await this.probeOne(model, signal))
      }
    })
    await Promise.all(workers)
    return results
  }

  async probeOne(model: ModelDescriptor, signal?: AbortSignal): Promise<NvidiaProbeResult> {
    const started = Date.now()
    try {
      const response = await this.fetchImpl(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: authHeaders(this.apiKey),
        body: JSON.stringify({
          model: model.upstreamId,
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 1,
          stream: false,
        }),
        signal: signal ?? AbortSignal.timeout(PROBE_TIMEOUT_MS),
      })
      const latencyMs = Date.now() - started
      if (!response.ok) {
        const detail = await response.text().catch(() => '')
        const status = response.status === 401 || response.status === 403 ? 'unavailable' : 'unavailable'
        model.status = status
        model.error = detail.slice(0, 160) || `HTTP ${response.status}`
        model.checkedAtMs = Date.now()
        return { modelId: model.id, upstreamId: model.upstreamId, ok: false, latencyMs, status, error: model.error }
      }
      await response.body?.cancel()
      model.status = 'available'
      model.latencyMs = latencyMs
      model.checkedAtMs = Date.now()
      delete model.error
      return { modelId: model.id, upstreamId: model.upstreamId, ok: true, latencyMs, status: 'available' }
    } catch (error) {
      const latencyMs = Date.now() - started
      model.status = 'unavailable'
      model.error = error instanceof Error ? error.message : String(error)
      model.checkedAtMs = Date.now()
      return { modelId: model.id, upstreamId: model.upstreamId, ok: false, latencyMs, status: 'unavailable', error: model.error }
    }
  }

  async *chat(request: CanonicalRequest, signal: AbortSignal): AsyncGenerator<CanonicalEvent> {
    if (this.apiKey === '') throw new GatewayError('auth', 401, '请先填写 NVIDIA API Key')
    const response = await this.fetchImpl(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: authHeaders(this.apiKey),
      body: JSON.stringify({
        model: request.model.upstreamId,
        messages: request.messages.map((message: CanonicalMessage) => ({
          role: message.role,
          content: message.content.map((part: CanonicalContent) => (part.type === 'text' ? part.text : '')).join(''),
        })),
        ...(request.maxOutputTokens === undefined ? {} : { max_tokens: request.maxOutputTokens }),
        ...(request.temperature === undefined ? {} : { temperature: request.temperature }),
        ...(request.tools.length === 0
          ? {}
          : {
              tools: request.tools.map((tool: CanonicalTool) => ({
                type: 'function',
                function: { name: tool.name, description: tool.description, parameters: tool.parameters },
              })),
            }),
        stream: true,
        stream_options: { include_usage: true },
      }),
      signal,
    })
    if (!response.ok) {
      const message = await response.text().catch(() => '')
      throw new GatewayError(mapStatus(response.status), response.status, `NVIDIA 上游错误：${message.slice(0, 200) || response.statusText}`)
    }
    const responseId = `chatcmpl_${randomUUID().replaceAll('-', '')}`
    yield { type: 'start', responseId, model: request.model.id }
    if (response.body === null) {
      yield { type: 'finish', reason: 'stop' }
      return
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let finishReason: 'stop' | 'length' | 'tool_calls' | 'content_filter' = 'stop'
    let usage: CanonicalUsage | undefined
    const toolIndexes = new Map<number, string>()
    try {
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        for (;;) {
          const newline = buffer.indexOf('\n')
          if (newline === -1) break
          const line = buffer.slice(0, newline).trim()
          buffer = buffer.slice(newline + 1)
          if (!line.startsWith('data:')) continue
          const data = line.slice(5).trim()
          if (data === '[DONE]') continue
          let chunk: {
            choices?: Array<{
              delta?: { content?: string | null; reasoning_content?: string | null; tool_calls?: Array<{ index?: number; id?: string; function?: { name?: string; arguments?: string } }> }
              finish_reason?: string | null
            }>
            usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number }
          }
          try {
            chunk = JSON.parse(data) as typeof chunk
          } catch {
            continue
          }
          if (chunk.usage !== undefined) {
            usage = {
              inputTokens: chunk.usage.prompt_tokens ?? 0,
              outputTokens: chunk.usage.completion_tokens ?? 0,
            }
          }
          const choice = chunk.choices?.[0]
          if (choice === undefined) continue
          if (choice.delta?.reasoning_content) yield { type: 'reasoning', delta: choice.delta.reasoning_content }
          if (choice.delta?.content) yield { type: 'text', delta: choice.delta.content }
          for (const call of choice.delta?.tool_calls ?? []) {
            const index = call.index ?? 0
            const id = call.id ?? toolIndexes.get(index) ?? `call_${index}`
            if (!toolIndexes.has(index) || call.id !== undefined) {
              toolIndexes.set(index, id)
              yield { type: 'tool_call_start', index, id, name: call.function?.name ?? '' }
            }
            if (call.function?.arguments) yield { type: 'tool_call_delta', index, argumentsDelta: call.function.arguments }
          }
          if (choice.finish_reason === 'length') finishReason = 'length'
          else if (choice.finish_reason === 'tool_calls') finishReason = 'tool_calls'
          else if (choice.finish_reason === 'content_filter') finishReason = 'content_filter'
        }
      }
    } finally {
      reader.releaseLock()
    }
    for (const index of toolIndexes.keys()) yield { type: 'tool_call_end', index }
    if (usage !== undefined) yield { type: 'usage', usage }
    yield { type: 'finish', reason: finishReason }
  }
}
