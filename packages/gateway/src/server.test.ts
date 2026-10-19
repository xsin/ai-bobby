import { request as httpRequest } from 'node:http'
import { afterEach, describe, expect, it } from 'vitest'
import {
  ModelRegistry,
  makeModelRef,
  type CanonicalEvent,
  type CanonicalRequest,
  type ModelDescriptor,
  type ProviderAdapter,
  type ProviderId,
} from '@ai-bobby/core'
import { GatewayService } from './server'

const model: ModelDescriptor = {
  ...makeModelRef('workbuddy', 'hy3', 'Hy3'),
  groupName: 'WorkBuddy',
  capabilities: { text: true, images: true, tools: true, reasoning: true },
  contextWindow: 192_000,
  maxOutputTokens: 64_000,
  status: 'available',
  accounts: 1,
}

class FakeProvider implements ProviderAdapter {
  readonly id: ProviderId = 'workbuddy'
  readonly displayName = 'WorkBuddy'
  private calls = 0
  lastRequest: CanonicalRequest | undefined

  listModels(): readonly ModelDescriptor[] {
    return [model]
  }

  async *chat(request: CanonicalRequest, _signal?: AbortSignal): AsyncIterable<CanonicalEvent> {
    this.lastRequest = request
    this.calls += 1
    yield { type: 'start', responseId: 'cmpl_test', model: request.model.id }
    if (request.tools.length > 0) {
      yield { type: 'tool_call_start', index: 0, id: 'call_1', name: 'read_file' }
      yield { type: 'tool_call_delta', index: 0, argumentsDelta: '{"path":"a"}' }
      yield { type: 'tool_call_end', index: 0 }
      yield { type: 'usage', usage: { inputTokens: 12, outputTokens: 3 } }
      yield { type: 'finish', reason: 'tool_calls' }
      return
    }
    yield { type: 'text', delta: 'Hello' }
    yield { type: 'text', delta: ', world' }
    yield { type: 'usage', usage: { inputTokens: 12, outputTokens: 3 } }
    yield { type: 'finish', reason: 'stop' }
  }

  get callCount(): number {
    return this.calls
  }
}

/** Waits long enough for the request body to end before touching the signal. */
class SlowProvider extends FakeProvider {
  signalAborted = false

  override async *chat(request: CanonicalRequest, signal?: AbortSignal): AsyncIterable<CanonicalEvent> {
    await new Promise(resolve => setTimeout(resolve, 30))
    this.signalAborted = signal?.aborted ?? false
    yield* super.chat(request)
  }
}

function setup() {
  const registry = new ModelRegistry()
  registry.replace('workbuddy', [model])
  const provider = new FakeProvider()
  const gateway = new GatewayService({
    registry,
    adapters: new Map([['workbuddy', provider]]),
    apiKey: 'test-key',
    port: 0,
  })
  return { gateway, provider }
}

const servers: GatewayService[] = []
afterEach(async () => {
  await Promise.all(servers.splice(0).map(server => server.stop()))
})

async function start(gateway: GatewayService): Promise<string> {
  servers.push(gateway)
  const port = await gateway.start()
  return `http://127.0.0.1:${port}`
}

function auth(extra: Record<string, string> = {}) {
  return { Authorization: 'Bearer test-key', ...extra }
}

function rawStatus(port: number, path: string, headers: Record<string, string>): Promise<number> {
  return new Promise((resolve, reject) => {
    const req = httpRequest({ hostname: '127.0.0.1', port, path, method: 'GET', headers }, response => {
      response.resume()
      resolve(response.statusCode ?? 0)
    })
    req.on('error', reject)
    req.end()
  })
}

describe('gateway', () => {
  it('serves unauthenticated health and protected models', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const health = await fetch(`${base}/health`)
    expect(health.status).toBe(200)
    expect(await health.json()).toMatchObject({ status: 'ok' })

    const unauthorized = await fetch(`${base}/v1/models`)
    expect(unauthorized.status).toBe(401)

    const models = await fetch(`${base}/v1/models`, { headers: auth() })
    expect(models.status).toBe(200)
    const body = (await models.json()) as { data: Array<Record<string, unknown>> }
    expect(body.data).toHaveLength(1)
    expect(body.data[0]).toMatchObject({ id: 'wb/hy3', group: 'workbuddy', name: 'WB. Hy3' })
  })

  it('returns a non-streaming completion', async () => {
    const { gateway, provider } = setup()
    const base = await start(gateway)
    const response = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        messages: [{ role: 'user', content: 'hi' }],
      }),
    })
    expect(response.status).toBe(200)
    const body = (await response.json()) as Record<string, any>
    expect(body.object).toBe('chat.completion')
    expect(body.model).toBe('wb/hy3')
    expect(body.choices[0].message.content).toBe('Hello, world')
    expect(body.usage).toMatchObject({ prompt_tokens: 12, completion_tokens: 3 })
    expect(provider.lastRequest?.model.upstreamId).toBe('hy3')
    expect(provider.callCount).toBe(1)
  })

  it('streams chat.completion.chunk events and [DONE]', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const response = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        stream: true,
        stream_options: { include_usage: true },
        messages: [{ role: 'user', content: 'hi' }],
      }),
    })
    expect(response.status).toBe(200)
    const text = await response.text()
    expect(text).toContain('chat.completion.chunk')
    expect(text).toContain('"content":"Hello"')
    expect(text).toContain('"content":", world"')
    expect(text).toContain('"finish_reason":"stop"')
    expect(text).toContain('"prompt_tokens":12')
    expect(text.trim().endsWith('data: [DONE]')).toBe(true)
  })

  it('rejects browser origins and non-loopback hosts', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const origin = await fetch(`${base}/v1/models`, { headers: auth({ Origin: 'https://evil.example' }) })
    expect(origin.status).toBe(403)
    const port = Number(new URL(base).port)
    const hostStatus = await rawStatus(port, '/v1/models', { ...auth(), Host: 'example.com' })
    expect(hostStatus).toBe(403)
  })

  it('validates model and request body', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const missing = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ model: 'wb/nope', messages: [{ role: 'user', content: 'hi' }] }),
    })
    expect(missing.status).toBe(404)
    const bad = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ model: 'wb/hy3', messages: [] }),
    })
    expect(bad.status).toBe(400)
  })

  it('serves the Responses API (non-stream and tool calls)', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const response = await fetch(`${base}/v1/responses`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ model: 'wb/hy3', input: 'hi' }),
    })
    expect(response.status).toBe(200)
    const body = (await response.json()) as Record<string, any>
    expect(body.object).toBe('response')
    expect(body.output[0].content[0].text).toBe('Hello, world')
    expect(body.usage.total_tokens).toBe(15)

    const tool = await fetch(`${base}/v1/responses`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        input: 'read',
        tools: [
          { type: 'function', name: 'read_file', parameters: { type: 'object' } },
          { type: 'web_search' },
        ],
      }),
    })
    const toolBody = (await tool.json()) as Record<string, any>
    expect(toolBody.output[0]).toMatchObject({ type: 'function_call', name: 'read_file', arguments: '{"path":"a"}' })
  })

  it('streams Responses events', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const response = await fetch(`${base}/v1/responses`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ model: 'wb/hy3', input: 'hi', stream: true }),
    })
    const text = await response.text()
    expect(text).toContain('event: response.created')
    expect(text).toContain('response.output_text.delta')
    expect(text).toContain('Hello')
    expect(text).toContain('event: response.completed')
  })

  it('serves Anthropic Messages (non-stream and stream)', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const response = await fetch(`${base}/v1/messages`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01' }),
      body: JSON.stringify({ model: 'wb/hy3', max_tokens: 100, messages: [{ role: 'user', content: 'hi' }] }),
    })
    expect(response.status).toBe(200)
    const body = (await response.json()) as Record<string, any>
    expect(body.type).toBe('message')
    expect(body.content[0].text).toBe('Hello, world')
    expect(body.stop_reason).toBe('end_turn')

    const tool = await fetch(`${base}/v1/messages`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        max_tokens: 100,
        messages: [{ role: 'user', content: 'read' }],
        tools: [{ name: 'read_file', input_schema: { type: 'object' } }],
      }),
    })
    const toolBody = (await tool.json()) as Record<string, any>
    expect(toolBody.stop_reason).toBe('tool_use')
    expect(toolBody.content[0]).toMatchObject({ type: 'tool_use', name: 'read_file', input: { path: 'a' } })

    const systemRole = await fetch(`${base}/v1/messages`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        max_tokens: 100,
        messages: [
          { role: 'system', content: 'be brief' },
          { role: 'user', content: 'hi' },
        ],
      }),
    })
    expect(systemRole.status).toBe(200)

    const stream = await fetch(`${base}/v1/messages`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ model: 'wb/hy3', max_tokens: 100, stream: true, messages: [{ role: 'user', content: 'hi' }] }),
    })
    const text = await stream.text()
    expect(text).toContain('event: message_start')
    expect(text).toContain('content_block_delta')
    expect(text).toContain('message_stop')
  })

  it('maps tool calls into an OpenAI message', async () => {
    const { gateway } = setup()
    const base = await start(gateway)
    const provider = (gateway as unknown as { options: { adapters: Map<string, ProviderAdapter> } }).options.adapters.get('workbuddy')
    expect(provider).toBeDefined()
    const response = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        messages: [{ role: 'user', content: 'read a file' }],
        tools: [{ type: 'function', function: { name: 'read_file', parameters: { type: 'object' } } }],
      }),
    })
    expect(response.status).toBe(200)
  })
  it('keeps the upstream signal alive after the request body ends', async () => {
    const registry = new ModelRegistry()
    registry.replace('workbuddy', [model])
    const provider = new SlowProvider()
    const gateway = new GatewayService({
      registry,
      adapters: new Map([['workbuddy', provider]]),
      apiKey: 'test-key',
      port: 0,
    })
    const base = await start(gateway)
    const response = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: auth({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        model: 'wb/hy3',
        messages: [{ role: 'user', content: 'hi' }],
        stream: true,
      }),
    })
    expect(response.status).toBe(200)
    expect(await response.text()).toContain('data:')
    expect(provider.signalAborted).toBe(false)
  })
})
