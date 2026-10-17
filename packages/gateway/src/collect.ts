import { GatewayError, type CanonicalEvent, type CanonicalUsage } from '@ai-bobby/core'

export interface Collected {
  text: string
  reasoning: string
  toolCalls: Map<number, { id: string; name: string; arguments: string }>
  usage?: CanonicalUsage
  finishReason: 'stop' | 'tool_calls' | 'length' | 'content_filter'
  error?: GatewayError
}

export async function collect(events: AsyncIterable<CanonicalEvent>): Promise<Collected> {
  const result: Collected = {
    text: '',
    reasoning: '',
    toolCalls: new Map(),
    finishReason: 'stop',
  }
  for await (const event of events) {
    switch (event.type) {
      case 'text':
        result.text += event.delta
        break
      case 'reasoning':
        result.reasoning += event.delta
        break
      case 'tool_call_start':
        result.toolCalls.set(event.index, { id: event.id, name: event.name, arguments: '' })
        break
      case 'tool_call_delta': {
        const call = result.toolCalls.get(event.index)
        if (call !== undefined) call.arguments += event.argumentsDelta
        break
      }
      case 'usage':
        result.usage = event.usage
        break
      case 'finish':
        result.finishReason = event.reason
        break
      case 'error':
        result.error = new GatewayError(event.error.kind, event.error.status, event.error.message, event.error.retryAfterMs)
        break
      case 'start':
      case 'tool_call_end':
        break
    }
  }
  if (result.error) throw result.error
  return result
}
