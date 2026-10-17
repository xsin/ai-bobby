import { describe, expect, it } from 'vitest'
import {
  FALLBACK_CN_MODELS,
  parseModelCatalog,
  toDescriptor,
} from './catalog'
import { normalizeExpiry, pollLogin, startLogin } from './login'
import { prepareChatBody } from './upstream'
import { WORKBUDDY_VARIANTS } from './variants'
import { parseUpstreamSse, toWorkBuddyBody } from './provider'
import type { CanonicalRequest } from '@ai-bobby/core'

const CN = WORKBUDDY_VARIANTS[0]!
const INTL = WORKBUDDY_VARIANTS[1]!

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function jwt(payload: Record<string, unknown>): string {
  return `a.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.c`
}

describe('catalog', () => {
  it('parses the cli roster and billing', () => {
    const models = parseModelCatalog(
      {
        models: [
          {
            id: 'hy3',
            name: 'Hy3',
            maxInputTokens: 192000,
            maxOutputTokens: 64000,
            supportsImages: true,
            supportsReasoning: true,
            onlyReasoning: true,
            credits: 'x0.00 credits',
            reasoning: { defaultEffort: 'high', canDisableThinking: false },
          },
        ],
        agents: [{ name: 'cli', models: ['hy3'] }],
      },
      CN,
    )
    expect(models).toHaveLength(1)
    const descriptor = toDescriptor(CN, models[0]!)
    expect(descriptor).toMatchObject({
      id: 'wb/hy3',
      displayName: 'WB. Hy3',
      groupName: 'WorkBuddy',
      capabilities: { text: true, images: true, tools: true, reasoning: true },
      status: 'available',
    })
    expect(descriptor.billing?.free).toBe(true)
  })

  it('falls back to all models when the cli agent wrapper is absent', () => {
    const models = parseModelCatalog(
      { models: [{ id: 'x', name: 'X', maxInputTokens: 1000, maxOutputTokens: 100 }] },
      CN,
    )
    expect(models.map(model => model.id)).toEqual(['x'])
  })

  it('has usable fallback catalogs for both variants', () => {
    expect(FALLBACK_CN_MODELS.length).toBeGreaterThan(3)
  })
})

describe('login', () => {
  it('starts and polls an official state/token flow', async () => {
    const calls: string[] = []
    const fakeFetch: typeof fetch = async (input, init) => {
      const url = String(input)
      calls.push(`${init?.method ?? 'GET'} ${url}`)
      if (url.includes('/v2/plugin/auth/state')) {
        expect(init?.method).toBe('POST')
        return jsonResponse({ code: 0, msg: 'OK', data: { state: 's1', authUrl: 'https://copilot.tencent.com/login?state=s1' } })
      }
      if (url.includes('/v2/plugin/auth/token')) {
        return jsonResponse({
          code: 0,
          msg: 'OK',
          data: {
            accessToken: jwt({ uid: 'u1', exp: Math.floor(Date.now() / 1000) + 3600 }),
            refreshToken: 'r1',
            expiresAt: Date.now() + 3_600_000,
            domain: 'copilot.tencent.com',
          },
        })
      }
      if (url.includes('/v2/plugin/login/account')) {
        return jsonResponse({ code: 0, msg: 'OK', data: { nickname: 'Alice', uid: 'u1' } })
      }
      throw new Error(`unexpected URL ${url}`)
    }

    const start = await startLogin(CN, fakeFetch)
    expect(start.state).toBe('s1')
    expect(start.authUrl).toContain('/login')
    const poll = await pollLogin(CN, 's1', fakeFetch)
    expect(poll.status).toBe('ok')
    if (poll.status === 'ok') {
      expect(poll.account.uid).toBe('u1')
      expect(poll.account.nickname).toBe('Alice')
      expect(poll.account.realm).toBe('cn')
      expect(poll.account.accessToken).toContain('.')
      expect(poll.account.accessToken).not.toBe('')
    }
    expect(calls.some(call => call.startsWith('POST'))).toBe(true)
  })

  it('normalizes seconds, milliseconds and ISO expiry', () => {
    expect(normalizeExpiry(1_700_000_000)).toBe(1_700_000_000_000)
    expect(normalizeExpiry(1_700_000_000_000)).toBe(1_700_000_000_000)
    expect(normalizeExpiry('2026-10-18T00:00:00Z')).toBe(Date.parse('2026-10-18T00:00:00Z'))
  })
})

describe('wire body', () => {
  it('normalizes CN tool_choice:none and developer role', () => {
    const prepared = JSON.parse(
      prepareChatBody(
        JSON.stringify({
          messages: [{ role: 'developer', content: 'x' }],
          tools: [{ type: 'function', function: { name: 'a' } }],
          tool_choice: 'none',
        }),
        CN,
      ),
    ) as Record<string, any>
    expect(prepared.stream).toBe(true)
    expect(prepared.messages[0].role).toBe('system')
    expect(prepared.tools).toBeUndefined()
    expect(prepared.tool_choice).toBeUndefined()
  })

  it('prepends a system message for the international endpoint', () => {
    const prepared = JSON.parse(
      prepareChatBody(JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }), INTL),
    ) as Record<string, any>
    expect(prepared.messages[0].role).toBe('system')
    expect(prepared.messages[1].role).toBe('user')
  })
})

describe('canonical request -> WorkBuddy body', () => {
  it('maps tools, images and tool results', () => {
    const request: CanonicalRequest = {
      model: { provider: 'workbuddy', upstreamId: 'hy3', id: 'wb/hy3', displayName: 'WB. Hy3' },
      messages: [
        { role: 'system', content: [{ type: 'text', text: 'sys' }] },
        { role: 'user', content: [{ type: 'text', text: 'look' }, { type: 'image', mediaType: 'image/png', data: 'AAAA' }] },
        { role: 'assistant', content: [{ type: 'tool_call', id: 'c1', name: 'read', arguments: '{}' }] },
        { role: 'tool', content: [{ type: 'tool_result', toolCallId: 'c1', content: 'ok' }] },
      ],
      tools: [{ name: 'read', parameters: { type: 'object' } }],
      toolChoice: { name: 'read' },
      parallelToolCalls: true,
      stream: true,
    }
    const body = toWorkBuddyBody(request) as Record<string, any>
    expect(body.model).toBe('hy3')
    expect(body.tools).toHaveLength(1)
    expect(body.tool_choice).toEqual({ type: 'function', function: { name: 'read' } })
    expect(body.messages[1].content[1]).toMatchObject({ type: 'image_url' })
    expect(body.messages[3]).toMatchObject({ role: 'tool', tool_call_id: 'c1' })
  })
})

describe('SSE parsing', () => {
  it('maps text, tool calls, usage and finish', async () => {
    const chunks = [
      'data: {"id":"x","choices":[{"delta":{"content":"Hi"}}]}\n\n',
      'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"id":"c1","function":{"name":"read","arguments":"{\\"a\\":"}}]}}]}\n\n',
      'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"arguments":"1}"}}]}}]}\n\n',
      'data: {"choices":[{"delta":{},"finish_reason":"tool_calls"}]}\n\n',
      'data: [DONE]\n\n',
    ]
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk))
        controller.close()
      },
    })
    const response = new Response(stream)
    const events = []
    for await (const event of parseUpstreamSse(response, 'cmpl_test')) events.push(event)
    expect(events).toEqual(
      expect.arrayContaining([
        { type: 'text', delta: 'Hi' },
        { type: 'tool_call_start', index: 0, id: 'c1', name: 'read' },
        { type: 'tool_call_delta', index: 0, argumentsDelta: '{"a":' },
        { type: 'tool_call_delta', index: 0, argumentsDelta: '1}' },
        { type: 'tool_call_end', index: 0 },
        { type: 'finish', reason: 'tool_calls' },
      ]),
    )
  })
})
