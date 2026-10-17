import { describe, expect, it } from 'vitest'
import { GatewayError } from '@ai-bobby/core'
import { freeModels, toDescriptor } from './catalog'
import { decodeEnvelope } from './envelope'

describe('OpenCode free model catalog', () => {
  it('filters by price, not by name', () => {
    const models = freeModels({
      all: [{
        id: 'opencode',
        models: {
          'free-one': { name: 'Free One', cost: { input: 0, output: 0, cache: { read: 0, write: 0 } }, capabilities: { input: { image: true }, output: { text: true }, toolcall: true, reasoning: true }, limit: { context: 1000, output: 100 } },
          'pretend-free': { name: 'Free But Paid', cost: { input: 1, output: 0, cache: { read: 0, write: 0 } }, capabilities: { output: { text: true } } },
          'chat-only': { name: 'Chat Only', cost: { input: 0, output: 0, cache: { read: 0, write: 0 } }, capabilities: { input: { image: false }, output: { text: true }, toolcall: false } },
          deprecated: { name: 'Deprecated', cost: { input: 0, output: 0, cache: { read: 0, write: 0 } }, status: 'deprecated' },
        },
      }],
    })
    expect(models.map(model => model.id)).toEqual(['chat-only', 'free-one'])
    const descriptor = toDescriptor(models[1]!)
    expect(descriptor).toMatchObject({
      id: 'oc/free-one',
      displayName: 'OC. Free One',
      groupName: 'OpenCode',
      capabilities: { images: false, tools: true, reasoning: true },
    })
  })
})

describe('envelope decoding', () => {
  const tools = [{ name: 'read_file', parameters: { type: 'object' } }]

  it('accepts text and tool calls', () => {
    const envelope = decodeEnvelope('{"content":"hi","calls":[{"name":"read_file","arguments":{"path":"a"}}]}', tools, 'auto', true)
    expect(envelope.content).toBe('hi')
    expect(envelope.calls[0]).toEqual({ name: 'read_file', arguments: { path: 'a' } })
  })

  it('accepts a fenced JSON response', () => {
    const envelope = decodeEnvelope('```json\n{"content":"hi","calls":[]}\n```', tools, 'auto', true)
    expect(envelope.calls).toEqual([])
  })

  it('rejects unlisted tools and tool_choice violations', () => {
    expect(() => decodeEnvelope('{"content":"","calls":[{"name":"native","arguments":{}}]}', tools, 'auto', true)).toThrow(GatewayError)
    expect(() => decodeEnvelope('{"content":"","calls":[{"name":"read_file","arguments":{}}]}', tools, 'none', true)).toThrow(GatewayError)
    expect(() => decodeEnvelope('{"content":"","calls":[]}', tools, 'required', true)).toThrow(GatewayError)
  })
})
