import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import { randomUUID, timingSafeEqual } from 'node:crypto'
import {
  GatewayError,
  ModelRegistry,
  createLogger,
  type CanonicalEvent,
  type CanonicalUsage,
  type Logger,
  type ModelDescriptor,
  type ProviderAdapter,
  type ProviderId,
} from '@ai-bobby/core'
import { parseChatRequest } from './chat'
import { collect, type Collected } from './collect'
import { anthropicJson, parseAnthropicRequest, streamAnthropic } from './anthropic'
import { parseResponsesRequest, responsesJson, streamResponses } from './responses'

export interface GatewayServiceOptions {
  registry: ModelRegistry
  adapters: Map<ProviderId, ProviderAdapter>
  apiKey: string
  port?: number
  host?: string
  version?: string
  logger?: Logger
  maxBodyBytes?: number
  maxConcurrency?: number
}

export class GatewayService {
  private server: Server | undefined
  private listeningPort = 0
  private active = 0
  private readonly logger: Logger
  private readonly maxBodyBytes: number
  private readonly maxConcurrency: number
  private readonly host: string

  constructor(private readonly options: GatewayServiceOptions) {
    this.logger = options.logger ?? createLogger('info')
    this.maxBodyBytes = options.maxBodyBytes ?? 64 * 1024 * 1024
    this.maxConcurrency = options.maxConcurrency ?? 8
    this.host = options.host ?? '127.0.0.1'
  }

  get port(): number {
    return this.listeningPort
  }

  async start(): Promise<number> {
    if (this.server) return this.listeningPort
    const server = createServer((req, res) => {
      void this.handle(req, res)
    })
    this.server = server
    server.requestTimeout = 0
    server.headersTimeout = 15_000
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject)
      server.listen(this.options.port ?? 46890, this.host, () => resolve())
    })
    const address = server.address()
    this.listeningPort = typeof address === 'object' && address !== null ? address.port : (this.options.port ?? 46890)
    this.logger.info('gateway listening', { port: this.listeningPort, host: this.host })
    return this.listeningPort
  }

  async stop(): Promise<void> {
    const server = this.server
    this.server = undefined
    if (!server) return
    await new Promise<void>((resolve, reject) => {
      server.close(error => (error ? reject(error) : resolve()))
      server.closeAllConnections()
    })
  }

  private async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const startedAt = Date.now()
    try {
      if (!isLoopbackHost(req.headers.host)) {
        this.error(res, new GatewayError('invalid_request', 403, 'Host 必须是回环地址'))
        return
      }
      if (req.headers.origin !== undefined) {
        this.error(res, new GatewayError('invalid_request', 403, '不接受浏览器 Origin'))
        return
      }
      const url = new URL(req.url ?? '/', `http://${req.headers.host ?? '127.0.0.1'}`)
      if (req.method === 'GET' && url.pathname === '/health') {
        this.json(res, 200, { status: 'ok', version: this.options.version ?? '0.1.0', port: this.listeningPort })
        return
      }
      if (!this.authorized(req)) {
        this.error(res, new GatewayError('auth', 401, '缺少或无效的 API Key'))
        return
      }
      if (req.method === 'GET' && url.pathname === '/v1/models') {
        this.json(res, 200, this.modelsBody(url.searchParams.get('all') === '1'))
        return
      }
      if (req.method === 'POST' && url.pathname === '/v1/chat/completions') {
        await this.chat(req, res)
        return
      }
      if (req.method === 'POST' && url.pathname === '/v1/messages/count_tokens') {
        await this.countTokens(req, res)
        return
      }
      if (req.method === 'POST' && url.pathname === '/v1/responses') {
        await this.protocol(req, res, 'responses')
        return
      }
      if (req.method === 'POST' && url.pathname === '/v1/messages') {
        await this.protocol(req, res, 'anthropic')
        return
      }
      this.error(res, new GatewayError('not_found', 404, `没有这个路由：${req.method} ${url.pathname}`))
    } catch (error) {
      this.error(res, error)
    } finally {
      if (this.active === 0) this.logger.debug('request finished', { ms: Date.now() - startedAt })
    }
  }

  private authorized(req: IncomingMessage): boolean {
    const expected = this.options.apiKey
    if (expected === '') return false
    const header = req.headers.authorization
    const bearer = typeof header === 'string' ? /^Bearer\s+(.+)$/i.exec(header.trim())?.[1] : undefined
    const xApiKey = req.headers['x-api-key']
    const provided = bearer ?? (typeof xApiKey === 'string' ? xApiKey : undefined)
    if (provided === undefined) return false
    const a = Buffer.from(provided)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
  }

  private modelsBody(all: boolean): Record<string, unknown> {
    return {
      object: 'list',
      data: this.options.registry.list({ all }).map(model => modelJson(model)),
    }
  }

  private async chat(req: IncomingMessage, res: ServerResponse): Promise<void> {
    if (this.active >= this.maxConcurrency) {
      this.error(res, new GatewayError('rate_limit', 429, '本机网关并发已满，请稍后重试'))
      return
    }
    this.active += 1
    const controller = new AbortController()
    // IncomingMessage 'close' fires as soon as the request body is consumed,
    // which aborted every upstream call before it started. Abort only when the
    // response itself closes before finishing (a real client disconnect).
    res.on('close', () => {
      if (!res.writableEnded) controller.abort()
    })
    try {
      const body = await readJsonBody(req, this.maxBodyBytes)
      const modelId = isObject(body) && typeof body['model'] === 'string' ? body['model'] : ''
      if (modelId === '') throw new GatewayError('invalid_request', 400, 'model 必须是字符串')
      const model = this.options.registry.find(modelId)
      if (model === undefined) throw new GatewayError('not_found', 404, `模型不存在：${modelId}`)
      const adapter = this.options.adapters.get(model.provider)
      if (adapter === undefined) throw new GatewayError('upstream', 502, `来源未启用：${model.provider}`)
      const parsed = parseChatRequest(body, model)
      const request = {
        model: { provider: model.provider, upstreamId: model.upstreamId, id: model.id, displayName: model.displayName },
        messages: parsed.messages,
        tools: parsed.tools,
        toolChoice: parsed.toolChoice,
        parallelToolCalls: parsed.parallelToolCalls,
        ...(parsed.maxOutputTokens === undefined ? {} : { maxOutputTokens: parsed.maxOutputTokens }),
        ...(parsed.temperature === undefined ? {} : { temperature: parsed.temperature }),
        ...(parsed.topP === undefined ? {} : { topP: parsed.topP }),
        ...(parsed.stop === undefined ? {} : { stop: parsed.stop }),
        ...(parsed.reasoningEffort === undefined ? {} : { reasoningEffort: parsed.reasoningEffort }),
        stream: parsed.stream,
      }

      if (!parsed.stream) {
        const result = await collect(adapter.chat(request, controller.signal))
        this.json(res, 200, completionBody(model, result))
        return
      }

      const iterator = adapter.chat(request, controller.signal)[Symbol.asyncIterator]()
      const first = await iterator.next()
      if (first.done) throw new GatewayError('upstream', 502, '上游没有返回任何事件')
      this.writeSseHeaders(res)
      const state = createStreamState(model)
      this.sendEvent(res, state, first.value)
      for (;;) {
        const next = await iterator.next()
        if (next.done) break
        this.sendEvent(res, state, next.value)
      }
      if (!state.finished) this.finishStream(res, state, 'stop')
      if (state.usage !== undefined) {
        this.writeChunk(res, state, {
          choices: [],
          usage: usageJson(state.usage),
        })
      }
      res.end('data: [DONE]\n\n')
    } catch (error) {
      if (!res.headersSent) {
        this.error(res, error)
      } else {
        const gatewayError = toGatewayError(error)
        res.write(`data: ${JSON.stringify({ error: errorJson(gatewayError) })}\n\n`)
        res.end('data: [DONE]\n\n')
      }
    } finally {
      this.active = Math.max(0, this.active - 1)
    }
  }

  private sendEvent(res: ServerResponse, state: StreamState, event: CanonicalEvent): void {
    switch (event.type) {
      case 'start':
        state.responseId = event.responseId
        this.writeChunk(res, state, {
          choices: [{ index: 0, delta: { role: 'assistant' }, finish_reason: null }],
        })
        break
      case 'text':
        this.writeChunk(res, state, {
          choices: [{ index: 0, delta: { content: event.delta }, finish_reason: null }],
        })
        break
      case 'reasoning':
        this.writeChunk(res, state, {
          choices: [{ index: 0, delta: { reasoning_content: event.delta }, finish_reason: null }],
        })
        break
      case 'tool_call_start':
        state.toolCalls.add(event.index)
        this.writeChunk(res, state, {
          choices: [{
            index: 0,
            delta: {
              tool_calls: [{
                index: event.index,
                id: event.id,
                type: 'function',
                function: { name: event.name, arguments: '' },
              }],
            },
            finish_reason: null,
          }],
        })
        break
      case 'tool_call_delta':
        this.writeChunk(res, state, {
          choices: [{
            index: 0,
            delta: { tool_calls: [{ index: event.index, function: { arguments: event.argumentsDelta } }] },
            finish_reason: null,
          }],
        })
        break
      case 'tool_call_end':
        break
      case 'usage':
        state.usage = event.usage
        break
      case 'finish':
        this.finishStream(res, state, event.reason)
        break
      case 'error':
        state.finished = true
        res.write(`data: ${JSON.stringify({ error: errorJson(toGatewayError(event.error)) })}\n\n`)
        break
    }
  }

  private finishStream(res: ServerResponse, state: StreamState, reason: string): void {
    if (state.finished) return
    state.finished = true
    const finishReason = state.toolCalls.size > 0 ? 'tool_calls' : reason
    this.writeChunk(res, state, { choices: [{ index: 0, delta: {}, finish_reason: finishReason }] })
  }

  private writeChunk(res: ServerResponse, state: StreamState, body: Record<string, unknown>): void {
    const payload = {
      id: state.responseId,
      object: 'chat.completion.chunk',
      created: state.created,
      model: state.model.id,
      ...body,
    }
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  }

  private writeSseHeaders(res: ServerResponse): void {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    })
  }

  private async protocol(req: IncomingMessage, res: ServerResponse, protocol: 'responses' | 'anthropic'): Promise<void> {
    if (this.active >= this.maxConcurrency) {
      this.protocolError(res, protocol, new GatewayError('rate_limit', 429, '本机网关并发已满，请稍后重试'))
      return
    }
    this.active += 1
    const controller = new AbortController()
    // IncomingMessage 'close' fires as soon as the request body is consumed,
    // which aborted every upstream call before it started. Abort only when the
    // response itself closes before finishing (a real client disconnect).
    res.on('close', () => {
      if (!res.writableEnded) controller.abort()
    })
    try {
      const body = await readJsonBody(req, this.maxBodyBytes)
      const modelId = isObject(body) && typeof body['model'] === 'string' ? body['model'] : ''
      if (modelId === '') throw new GatewayError('invalid_request', 400, 'model 必须是字符串')
      const model = this.options.registry.find(modelId)
      if (model === undefined) throw new GatewayError('not_found', 404, `模型不存在：${modelId}`)
      const adapter = this.options.adapters.get(model.provider)
      if (adapter === undefined) throw new GatewayError('upstream', 502, `来源未启用：${model.provider}`)
      const parsed = protocol === 'responses'
        ? parseResponsesRequest(body, model)
        : parseAnthropicRequest(body, model)
      if (!parsed.stream) {
        const result = await collect(adapter.chat(parsed.request, controller.signal))
        if (protocol === 'responses') responsesJson(res, model, result)
        else anthropicJson(res, model, result)
        return
      }
      const iterator = adapter.chat(parsed.request, controller.signal)[Symbol.asyncIterator]()
      const first = await iterator.next()
      if (first.done) throw new GatewayError('upstream', 502, '上游没有返回任何事件')
      const events = chain(first.value, iterator)
      if (protocol === 'responses') streamResponses(res, model, events)
      else streamAnthropic(res, model, events)
    } catch (error) {
      if (!res.headersSent) this.protocolError(res, protocol, error)
      else res.end()
    } finally {
      this.active = Math.max(0, this.active - 1)
    }
  }

  private protocolError(res: ServerResponse, protocol: 'responses' | 'anthropic', error: unknown): void {
    const gatewayError = toGatewayError(error)
    if (protocol === 'responses') {
      this.json(res, gatewayError.status, { error: errorJson(gatewayError) })
      return
    }
    const type = gatewayError.kind === 'auth'
      ? 'authentication_error'
      : gatewayError.kind === 'rate_limit'
        ? 'rate_limit_error'
        : gatewayError.kind === 'invalid_request' || gatewayError.kind === 'not_found'
          ? 'invalid_request_error'
          : 'api_error'
    this.json(res, gatewayError.status, { type: 'error', error: { type, message: gatewayError.message } })
  }

  private async countTokens(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const body = await readJsonBody(req, this.maxBodyBytes)
    this.json(res, 200, { input_tokens: estimateTokens(body) })
  }

  private json(res: ServerResponse, status: number, body: unknown): void {
    const payload = JSON.stringify(body)
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    })
    res.end(payload)
  }

  private error(res: ServerResponse, error: unknown): void {
    const gatewayError = toGatewayError(error)
    this.logger.warn('gateway error', { kind: gatewayError.kind, status: gatewayError.status, message: gatewayError.message })
    this.json(res, gatewayError.status, { error: errorJson(gatewayError) })
  }
}

interface StreamState {
  responseId: string
  created: number
  model: ModelDescriptor
  finished: boolean
  usage?: CanonicalUsage
  toolCalls: Set<number>
}

function createStreamState(model: ModelDescriptor): StreamState {
  return {
    responseId: `chatcmpl_${randomUUID().replaceAll('-', '')}`,
    created: Math.floor(Date.now() / 1000),
    model,
    finished: false,
    toolCalls: new Set(),
  }
}

function completionBody(model: ModelDescriptor, result: Collected): Record<string, unknown> {
  const toolCalls = [...result.toolCalls.entries()]
    .sort(([a], [b]) => a - b)
    .map(([index, call]) => ({
      index,
      id: call.id,
      type: 'function',
      function: { name: call.name, arguments: call.arguments || '{}' },
    }))
  const message: Record<string, unknown> = {
    role: 'assistant',
    content: result.text === '' && toolCalls.length > 0 ? null : result.text,
    ...(result.reasoning === '' ? {} : { reasoning_content: result.reasoning }),
    ...(toolCalls.length === 0 ? {} : { tool_calls: toolCalls }),
  }
  return {
    id: `chatcmpl_${randomUUID().replaceAll('-', '')}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: model.id,
    choices: [{
      index: 0,
      message,
      finish_reason: toolCalls.length > 0 ? 'tool_calls' : result.finishReason,
    }],
    ...(result.usage === undefined ? {} : { usage: usageJson(result.usage) }),
  }
}

function usageJson(usage: CanonicalUsage): Record<string, unknown> {
  return {
    prompt_tokens: usage.inputTokens,
    completion_tokens: usage.outputTokens,
    total_tokens: usage.inputTokens + usage.outputTokens,
    ...(usage.cachedInputTokens === undefined ? {} : { prompt_tokens_details: { cached_tokens: usage.cachedInputTokens } }),
    ...(usage.reasoningTokens === undefined ? {} : { completion_tokens_details: { reasoning_tokens: usage.reasoningTokens } }),
  }
}

function modelJson(model: ModelDescriptor): Record<string, unknown> {
  return {
    id: model.id,
    object: 'model',
    created: 0,
    owned_by: model.provider,
    name: model.displayName,
    group: model.provider,
    group_name: model.groupName,
    capabilities: model.capabilities,
    context_window: model.contextWindow,
    max_output_tokens: model.maxOutputTokens,
    status: model.status,
    accounts: model.accounts ?? 0,
    ...(model.billing === undefined ? {} : { billing: model.billing }),
  }
}

function errorJson(error: GatewayError): Record<string, unknown> {
  return {
    message: error.message,
    type: error.kind,
    code: error.kind,
    ...(error.retryAfterMs === undefined ? {} : { retry_after_ms: error.retryAfterMs }),
  }
}

function toGatewayError(error: unknown): GatewayError {
  if (error instanceof GatewayError) return error
  if (isObject(error) && typeof error['kind'] === 'string' && typeof error['status'] === 'number' && typeof error['message'] === 'string') {
    const kind = error['kind']
    if (kind === 'auth' || kind === 'credit' || kind === 'rate_limit' || kind === 'not_found' || kind === 'upstream' || kind === 'invalid_request') {
      return new GatewayError(kind, error['status'] as number, error['message'] as string, error['retryAfterMs'] as number | undefined)
    }
  }
  if (error instanceof Error) {
    const candidate = error as Error & { kind?: string; status?: number; retryAfterMs?: number }
    const kind = candidate.kind
    const status = candidate.status
    if (
      (kind === 'auth' || kind === 'credit' || kind === 'rate_limit' || kind === 'not_found' || kind === 'upstream' || kind === 'invalid_request') &&
      typeof status === 'number'
    ) {
      return new GatewayError(kind, status, error.message, candidate.retryAfterMs)
    }
    return new GatewayError('upstream', 502, error.message)
  }
  return new GatewayError('upstream', 502, String(error))
}

function isLoopbackHost(host: string | undefined): boolean {
  if (host === undefined || host === '') return false
  const hostname = host.replace(/^\[/, '').replace(/\](:\d+)?$/, '').replace(/:\d+$/, '')
  return hostname === '127.0.0.1' || hostname === 'localhost' || hostname === '::1'
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function readJsonBody(req: IncomingMessage, limit: number): Promise<unknown> {
  const contentType = req.headers['content-type']
  if (typeof contentType !== 'string' || !contentType.toLowerCase().startsWith('application/json')) {
    throw new GatewayError('invalid_request', 415, 'Content-Type 必须是 application/json')
  }
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > limit) throw new GatewayError('invalid_request', 413, '请求体过大')
    chunks.push(buffer)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new GatewayError('invalid_request', 400, '请求体不是合法 JSON')
  }
}

function estimateTokens(body: unknown): number {
  const text = JSON.stringify(body ?? '')
  const cjk = (text.match(/[\u3400-\u9fff]/g) ?? []).length
  return Math.max(1, Math.ceil((text.length - cjk) / 4 + cjk / 1.5))
}

async function* chain<T>(first: T, iterator: AsyncIterator<T>): AsyncGenerator<T> {
  yield first
  for (;;) {
    const next = await iterator.next()
    if (next.done) return
    yield next.value
  }
}
