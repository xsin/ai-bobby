import { randomUUID } from 'node:crypto'
import {
  GatewayError,
  type CanonicalEvent,
  type CanonicalMessage,
  type CanonicalRequest,
  type CanonicalToolChoice,
  type CanonicalUsage,
  type ModelDescriptor,
  type ProviderAdapter,
  type ProviderId,
} from '@ai-bobby/core'
import { AccountStore, type WorkBuddyAccount } from './accounts'
import {
  fallbackModels,
  mergeCatalog,
  type WorkBuddyCatalogModel,
} from './catalog'
import { UpstreamError, WorkBuddyClient, classifyUpstreamError } from './upstream'
import type { WorkBuddyVariant } from './variants'

interface AccountRuntime {
  account: WorkBuddyAccount
  models: Set<string>
  catalog: WorkBuddyCatalogModel[]
  refreshPromise?: Promise<WorkBuddyAccount>
}

interface Cooldown {
  until: number
  reason: 'rate_limit' | 'credit' | 'auth'
}

export interface WorkBuddyProviderOptions {
  variant: WorkBuddyVariant
  store: AccountStore
  client?: WorkBuddyClient
  refreshMarginMs?: number
}

export class WorkBuddyProvider implements ProviderAdapter {
  readonly id: ProviderId
  readonly displayName: string
  private readonly client: WorkBuddyClient
  private readonly runtimes = new Map<string, AccountRuntime>()
  private readonly cooldowns = new Map<string, Cooldown>()
  private descriptors: ModelDescriptor[] = []
  private roundRobin = 0
  private readonly refreshMarginMs: number

  constructor(private readonly options: WorkBuddyProviderOptions) {
    this.id = options.variant.id
    this.displayName = options.variant.displayName
    this.client = options.client ?? new WorkBuddyClient(options.variant)
    this.refreshMarginMs = options.refreshMarginMs ?? 5 * 60_000
  }

  listModels(): readonly ModelDescriptor[] {
    return this.descriptors
  }

  /** Fetch the catalog for every enabled account and merge the result. */
  async refreshModels(): Promise<readonly ModelDescriptor[]> {
    const accounts = (await this.options.store.list(this.options.variant.realm)).filter(account => account.enabled)
    if (accounts.length === 0) {
      this.descriptors = []
      this.runtimes.clear()
      return this.descriptors
    }
    this.roundRobin = 0
    const activeUids = new Set(accounts.map(account => account.uid))
    for (const uid of [...this.runtimes.keys()]) {
      if (!activeUids.has(uid)) this.runtimes.delete(uid)
    }

    const perAccount: WorkBuddyCatalogModel[][] = []
    for (const account of accounts) {
      const runtime = this.runtimeFor(account)
      try {
        const models = await this.client.fetchCatalog(account)
        runtime.catalog = models
        runtime.models = new Set(models.map(model => model.id))
        perAccount.push(models)
      } catch {
        // Keep a usable catalog when an individual account fails; the fallback
        // is explicitly marked so callers can surface it.
        if (runtime.catalog.length === 0) {
          runtime.catalog = fallbackModels(this.options.variant)
          runtime.models = new Set(runtime.catalog.map(model => model.id))
        }
        perAccount.push(runtime.catalog)
      }
    }
    this.descriptors = mergeCatalog(this.options.variant, perAccount)
    return this.descriptors
  }

  /** Refresh credits for all accounts; failures are isolated. */
  async refreshCredits(): Promise<void> {
    const accounts = await this.options.store.list(this.options.variant.realm)
    await Promise.all(
      accounts.map(async account => {
        try {
          const credits = await this.client.billing(account)
          const updated = { ...account, credits }
          await this.options.store.upsert(updated)
          this.runtimeFor(updated).account = updated
        } catch {
          // Best-effort only.
        }
      }),
    )
  }

  async *chat(request: CanonicalRequest, signal: AbortSignal): AsyncGenerator<CanonicalEvent> {
    const candidates = this.pickAccounts(request.model.upstreamId)
    if (candidates.length === 0) {
      const eligible = [...this.runtimes.values()].filter(
        runtime => runtime.account.enabled && runtime.models.has(request.model.upstreamId),
      )
      if (eligible.length > 0 && eligible.every(runtime => isKnownExhausted(runtime.account))) {
        throw new GatewayError('credit', 402, `模型 ${request.model.id} 的所有账号额度都不足`)
      }
      throw new GatewayError('not_found', 404, `模型 ${request.model.id} 当前没有可用账号`)
    }

    let emitted = false
    let lastError: unknown
    for (const candidate of candidates) {
      try {
        const account = await this.ensureToken(candidate.account)
        const body = toWorkBuddyBody(request)
        const response = await this.client.chatStream(account, body, signal)
        const responseId = `chatcmpl_${randomUUID().replaceAll('-', '')}`
        yield { type: 'start', responseId, model: request.model.id }
        for await (const event of parseUpstreamSse(response, responseId)) {
          if (event.type !== 'start') emitted = true
          yield event
        }
        await this.options.store.touch(this.options.variant.realm, account.uid)
        return
      } catch (error) {
        lastError = error
        const runtime = candidate
        if (error instanceof UpstreamError) {
          if (error.kind === 'auth' && !emitted) {
            try {
              const refreshed = await this.refreshAccount(runtime.account)
              runtime.account = refreshed
              const body = toWorkBuddyBody(request)
              const response = await this.client.chatStream(refreshed, body, signal)
              const responseId = `chatcmpl_${randomUUID().replaceAll('-', '')}`
              yield { type: 'start', responseId, model: request.model.id }
              for await (const event of parseUpstreamSse(response, responseId)) {
                if (event.type !== 'start') emitted = true
                yield event
              }
              await this.options.store.touch(this.options.variant.realm, refreshed.uid)
              return
            } catch (refreshError) {
              lastError = refreshError
            }
          }
          if (error.kind === 'rate_limit' || error.kind === 'credit') {
            this.markCooldown(runtime.account, request.model.upstreamId, error)
            if (!emitted) continue
          }
        }
        if (emitted) {
          yield {
            type: 'error',
            error: {
              kind: 'upstream',
              status: error instanceof UpstreamError ? error.status : 502,
              message: error instanceof Error ? error.message : String(error),
            },
          }
          return
        }
      }
    }

    if (lastError instanceof UpstreamError) {
      throw new GatewayError(lastError.kind, upstreamStatus(lastError.kind), lastError.message, lastError.retryAfterMs)
    }
    throw new GatewayError('upstream', 502, lastError instanceof Error ? lastError.message : '所有账号都不可用')
  }

  private runtimeFor(account: WorkBuddyAccount): AccountRuntime {
    const existing = this.runtimes.get(account.uid)
    if (existing) {
      existing.account = account
      return existing
    }
    const runtime: AccountRuntime = {
      account,
      models: new Set(fallbackModels(this.options.variant).map(model => model.id)),
      catalog: [],
    }
    this.runtimes.set(account.uid, runtime)
    return runtime
  }

  private pickAccounts(modelId: string): AccountRuntime[] {
    const now = Date.now()
    const candidates = [...this.runtimes.values()].filter(runtime => {
      if (!runtime.account.enabled) return false
      if (!runtime.models.has(modelId)) return false
      // A billing snapshot with packages and zero remaining is a known
      // exhausted account; an empty snapshot means "unknown", not zero.
      if (isKnownExhausted(runtime.account)) return false
      const cooldown = this.cooldowns.get(this.cooldownKey(runtime.account, modelId))
      return cooldown === undefined || cooldown.until <= now
    })
    if (candidates.length === 0) return []
    const sorted = candidates.sort((a, b) => {
      const preferred = Number(Boolean(b.account.preferred)) - Number(Boolean(a.account.preferred))
      if (preferred !== 0) return preferred
      return (a.account.lastUsedAtMs ?? 0) - (b.account.lastUsedAtMs ?? 0)
    })
    const offset = this.roundRobin % sorted.length
    this.roundRobin += 1
    return [...sorted.slice(offset), ...sorted.slice(0, offset)]
  }

  private cooldownKey(account: WorkBuddyAccount, modelId: string): string {
    return `${account.uid}:${modelId}`
  }

  private markCooldown(account: WorkBuddyAccount, modelId: string, error: UpstreamError): void {
    const retryAfter = error.retryAfterMs ?? (error.kind === 'credit' ? 30 * 60_000 : 60_000)
    this.cooldowns.set(this.cooldownKey(account, modelId), {
      until: Date.now() + retryAfter,
      reason: error.kind === 'credit' ? 'credit' : 'rate_limit',
    })
  }

  private async ensureToken(account: WorkBuddyAccount): Promise<WorkBuddyAccount> {
    if (account.expiresAtMs > Date.now() + this.refreshMarginMs) return account
    return this.refreshAccount(account)
  }

  private async refreshAccount(account: WorkBuddyAccount): Promise<WorkBuddyAccount> {
    const runtime = this.runtimeFor(account)
    if (runtime.refreshPromise) return runtime.refreshPromise
    if (account.refreshToken === '') {
      throw new GatewayError('auth', 401, 'WorkBuddy 登录已失效，请重新登录')
    }
    const promise = (async () => {
      try {
        const result = await this.client.refresh(account)
        const updated: WorkBuddyAccount = {
          ...account,
          accessToken: result.accessToken,
          ...(result.refreshToken === undefined ? {} : { refreshToken: result.refreshToken }),
          expiresAtMs: result.expiresAtMs ?? account.expiresAtMs,
          ...(result.domain === undefined ? {} : { domain: result.domain }),
        }
        await this.options.store.upsert(updated)
        runtime.account = updated
        return updated
      } finally {
        runtime.refreshPromise = undefined
      }
    })()
    runtime.refreshPromise = promise
    return promise
  }
}

export function toWorkBuddyBody(request: CanonicalRequest): Record<string, unknown> {
  const messages = request.messages.map(toWorkBuddyMessage).filter(message => message !== undefined)
  const body: Record<string, unknown> = {
    model: request.model.upstreamId,
    messages,
    stream: true,
    ...(request.tools.length === 0 ? {} : { tools: request.tools.map(tool => ({ type: 'function', function: tool })) }),
    ...(request.tools.length === 0 ? {} : { tool_choice: toolChoiceFor(request.toolChoice) }),
    ...(request.parallelToolCalls ? {} : { parallel_tool_calls: false }),
    ...(request.maxOutputTokens === undefined ? {} : { max_tokens: request.maxOutputTokens }),
    ...(request.temperature === undefined ? {} : { temperature: request.temperature }),
    ...(request.topP === undefined ? {} : { top_p: request.topP }),
    ...(request.stop === undefined || request.stop.length === 0 ? {} : { stop: request.stop }),
    ...(request.reasoningEffort === undefined ? {} : { reasoning_effort: request.reasoningEffort }),
  }
  if (request.toolChoice === 'none') {
    delete body['tools']
    delete body['tool_choice']
  }
  return body
}

function toolChoiceFor(choice: CanonicalToolChoice): unknown {
  if (typeof choice === 'string') return choice
  return { type: 'function', function: { name: choice.name } }
}

function toWorkBuddyMessage(message: CanonicalMessage): Record<string, unknown> | undefined {
  if (message.role === 'tool') {
    const result = message.content.find(item => item.type === 'tool_result')
    if (result?.type !== 'tool_result') return undefined
    return { role: 'tool', tool_call_id: result.toolCallId, content: result.content }
  }

  const texts: string[] = []
  const images: Array<Record<string, unknown>> = []
  const toolCalls: Array<Record<string, unknown>> = []
  for (const part of message.content) {
    if (part.type === 'text') texts.push(part.text)
    else if (part.type === 'image') {
      images.push({
        type: 'image_url',
        image_url: { url: `data:${part.mediaType};base64,${part.data}` },
      })
    } else if (part.type === 'tool_call') {
      toolCalls.push({
        id: part.id,
        type: 'function',
        function: { name: part.name, arguments: part.arguments },
      })
    }
  }

  if (images.length > 0) {
    return {
      role: message.role,
      content: [
        ...texts.map(text => ({ type: 'text', text })),
        ...images,
      ],
    }
  }
  const content = texts.join('\n')
  return {
    role: message.role,
    content,
    ...(toolCalls.length === 0 ? {} : { tool_calls: toolCalls }),
  }
}

export async function* parseUpstreamSse(response: Response, responseId: string): AsyncGenerator<CanonicalEvent> {
  const body = response.body
  if (body === null) throw new UpstreamError('empty upstream response', 502, 'upstream')
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let finished = false
  let usage: CanonicalUsage | undefined
  const toolCalls = new Map<number, { id: string; name: string; started: boolean }>()

  const finishToolCalls = function* (): Generator<CanonicalEvent> {
    for (const [index, tool] of toolCalls) {
      if (tool.started) yield { type: 'tool_call_end', index }
    }
  }

  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const events = buffer.split(/\r?\n\r?\n/)
      buffer = events.pop() ?? ''
      for (const event of events) {
        for (const line of event.split(/\r?\n/)) {
          if (!line.startsWith('data:')) continue
          const data = line.slice(5).trim()
          if (data === '[DONE]') {
            if (!finished) {
              yield* finishToolCalls()
              finished = true
              yield { type: 'finish', reason: toolCalls.size > 0 ? 'tool_calls' : 'stop' }
            }
            return
          }
          let chunk: unknown
          try {
            chunk = JSON.parse(data)
          } catch {
            continue
          }
          if (!isObject(chunk)) continue
          if (isObject(chunk['error'])) {
            const error = chunk['error']
            const message = typeof error['message'] === 'string' ? error['message'] : 'upstream error'
            const status = number(error['status']) || number(error['statusCode'])
            throw new UpstreamError(
              message,
              status > 0 ? status : 502,
              classifyUpstreamError(status > 0 ? status : 502, message),
            )
          }
          if (typeof chunk['usage'] === 'object' && chunk['usage'] !== null) {
            const raw = chunk['usage'] as Record<string, unknown>
            usage = {
              inputTokens: number(raw['prompt_tokens']),
              outputTokens: number(raw['completion_tokens']),
              ...(isObject(raw['prompt_tokens_details']) && typeof raw['prompt_tokens_details']['cached_tokens'] === 'number'
                ? { cachedInputTokens: raw['prompt_tokens_details']['cached_tokens'] }
                : {}),
              ...(isObject(raw['completion_tokens_details']) && typeof raw['completion_tokens_details']['reasoning_tokens'] === 'number'
                ? { reasoningTokens: raw['completion_tokens_details']['reasoning_tokens'] }
                : {}),
            }
            yield { type: 'usage', usage }
          }
          const choices = Array.isArray(chunk['choices']) ? chunk['choices'] : []
          const choice = choices[0]
          if (!isObject(choice)) continue
          const delta = isObject(choice['delta']) ? choice['delta'] : {}
          if (typeof delta['content'] === 'string' && delta['content'] !== '') {
            yield { type: 'text', delta: delta['content'] }
          }
          const reasoning = typeof delta['reasoning_content'] === 'string'
            ? delta['reasoning_content']
            : typeof delta['reasoning'] === 'string'
              ? delta['reasoning']
              : ''
          if (reasoning !== '') yield { type: 'reasoning', delta: reasoning }
          if (Array.isArray(delta['tool_calls'])) {
            for (const rawCall of delta['tool_calls']) {
              if (!isObject(rawCall)) continue
              const index = number(rawCall['index'])
              const fn = isObject(rawCall['function']) ? rawCall['function'] : {}
              const name = typeof fn['name'] === 'string' ? fn['name'] : ''
              const id = typeof rawCall['id'] === 'string' ? rawCall['id'] : ''
              const existing = toolCalls.get(index)
              if (existing === undefined) {
                const call = { id: id || `call_${randomUUID().replaceAll('-', '')}`, name, started: false }
                toolCalls.set(index, call)
                if (name !== '') {
                  call.started = true
                  yield { type: 'tool_call_start', index, id: call.id, name }
                }
              } else if (!existing.started && name !== '') {
                existing.name = name
                existing.started = true
                yield { type: 'tool_call_start', index, id: existing.id, name }
              }
              const args = typeof fn['arguments'] === 'string' ? fn['arguments'] : ''
              if (args !== '') yield { type: 'tool_call_delta', index, argumentsDelta: args }
            }
          }
          if (typeof choice['finish_reason'] === 'string' && choice['finish_reason'] !== '') {
            yield* finishToolCalls()
            finished = true
            yield { type: 'finish', reason: mapFinishReason(choice['finish_reason']) }
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
  if (!finished) {
    yield* finishToolCalls()
    yield { type: 'finish', reason: toolCalls.size > 0 ? 'tool_calls' : 'stop' }
  }
}

function mapFinishReason(value: string): 'stop' | 'tool_calls' | 'length' | 'content_filter' {
  if (value === 'tool_calls' || value === 'function_call') return 'tool_calls'
  if (value === 'length') return 'length'
  if (value === 'content_filter') return 'content_filter'
  return 'stop'
}

function isKnownExhausted(account: WorkBuddyAccount): boolean {
  const credits = account.credits
  return credits !== undefined && credits.packages.length > 0 && credits.total <= 0
}

function upstreamStatus(kind: string): number {
  if (kind === 'auth') return 401
  if (kind === 'credit') return 402
  if (kind === 'rate_limit') return 429
  if (kind === 'not_found') return 404
  if (kind === 'invalid_request') return 400
  return 502
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function number(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}
