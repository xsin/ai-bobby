import { randomUUID } from 'node:crypto'
import type { ServerResponse } from 'node:http'
import {
  GatewayError,
  type CanonicalContent,
  type CanonicalEvent,
  type CanonicalMessage,
  type CanonicalRequest,
  type CanonicalTool,
  type CanonicalUsage,
  type ModelDescriptor,
} from '@ai-bobby/core'
import { collect, type Collected } from './collect'

export interface ParsedAnthropicRequest {
  request: CanonicalRequest
  stream: boolean
}

export function parseAnthropicRequest(body: unknown, model: ModelDescriptor): ParsedAnthropicRequest {
  if (!isObject(body)) throw new GatewayError('invalid_request', 400, '请求体必须是 JSON 对象')
  const maxTokens = typeof body['max_tokens'] === 'number' ? body['max_tokens'] : undefined
  if (maxTokens === undefined || !Number.isInteger(maxTokens) || maxTokens <= 0) {
    throw new GatewayError('invalid_request', 400, 'max_tokens 必须是正整数')
  }
  if (typeof body['model'] !== 'string' || body['model'] === '') throw new GatewayError('invalid_request', 400, 'model 必须是字符串')
  const messages: CanonicalMessage[] = []
  const system = parseSystem(body['system'])
  if (system.length > 0) messages.push({ role: 'system', content: system })
  const rawMessages = body['messages']
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) throw new GatewayError('invalid_request', 400, 'messages 必须是非空数组')
  for (const raw of rawMessages) appendMessage(messages, raw, model)
  const tools = parseTools(body['tools'])
  const toolChoice = parseToolChoice(body['tool_choice'])
  if (model.status === 'chat_only' && tools.length > 0) throw new GatewayError('invalid_request', 400, '该模型仅支持普通对话，不支持工具调用')
  return {
    stream: body['stream'] === true,
    request: {
      model: { provider: model.provider, upstreamId: model.upstreamId, id: model.id, displayName: model.displayName },
      messages,
      tools,
      toolChoice,
      parallelToolCalls: true,
      maxOutputTokens: maxTokens,
      ...(typeof body['temperature'] === 'number' ? { temperature: body['temperature'] } : {}),
      ...(typeof body['top_p'] === 'number' ? { topP: body['top_p'] } : {}),
      ...(Array.isArray(body['stop_sequences']) ? { stop: body['stop_sequences'].filter((item): item is string => typeof item === 'string') } : {}),
      stream: body['stream'] === true,
    },
  }
}

function parseSystem(value: unknown): CanonicalContent[] {
  if (typeof value === 'string') return value === '' ? [] : [{ type: 'text', text: value }]
  if (!Array.isArray(value)) return []
  const out: CanonicalContent[] = []
  for (const block of value) {
    if (isObject(block) && block['type'] === 'text' && typeof block['text'] === 'string') {
      out.push({ type: 'text', text: block['text'] })
    }
  }
  return out
}

function appendMessage(messages: CanonicalMessage[], value: unknown, model: ModelDescriptor): void {
  if (!isObject(value)) throw new GatewayError('invalid_request', 400, 'messages 项不合法')
  const role = value['role']
  if (role !== 'user' && role !== 'assistant') throw new GatewayError('invalid_request', 400, 'Anthropic messages 只支持 user/assistant')
  const raw = value['content']
  const content: CanonicalContent[] = []
  const toolResults: CanonicalMessage[] = []
  if (typeof raw === 'string') content.push({ type: 'text', text: raw })
  else if (Array.isArray(raw)) {
    for (const block of raw) {
      if (!isObject(block)) continue
      if (block['type'] === 'text' && typeof block['text'] === 'string') {
        content.push({ type: 'text', text: block['text'] })
      } else if (block['type'] === 'image') {
        if (!model.capabilities.images) throw new GatewayError('invalid_request', 400, '该模型不支持图片输入')
        const source = isObject(block['source']) ? block['source'] : {}
        if (source['type'] === 'base64' && typeof source['media_type'] === 'string' && typeof source['data'] === 'string') {
          content.push({ type: 'image', mediaType: source['media_type'], data: source['data'] })
        } else {
          throw new GatewayError('invalid_request', 400, '只支持 base64 图片')
        }
      } else if (block['type'] === 'tool_use') {
        content.push({
          type: 'tool_call',
          id: typeof block['id'] === 'string' ? block['id'] : `call_${randomUUID()}`,
          name: typeof block['name'] === 'string' ? block['name'] : '',
          arguments: JSON.stringify(block['input'] ?? {}),
        })
      } else if (block['type'] === 'tool_result') {
        const resultContent = block['content']
        const text = typeof resultContent === 'string'
          ? resultContent
          : Array.isArray(resultContent)
            ? resultContent.filter(item => isObject(item) && item['type'] === 'text' && typeof item['text'] === 'string').map(item => (item as { text: string }).text).join('\n')
            : JSON.stringify(resultContent ?? '')
        toolResults.push({
          role: 'tool',
          content: [{
            type: 'tool_result',
            toolCallId: typeof block['tool_use_id'] === 'string' ? block['tool_use_id'] : '',
            content: text,
            ...(block['is_error'] === true ? { isError: true } : {}),
          }],
        })
      }
    }
  }
  if (content.length > 0) messages.push({ role, content })
  messages.push(...toolResults)
}

function parseTools(value: unknown): CanonicalTool[] {
  if (value === undefined) return []
  if (!Array.isArray(value)) throw new GatewayError('invalid_request', 400, 'tools 必须是数组')
  return value.map((tool, index) => {
    if (!isObject(tool) || typeof tool['name'] !== 'string' || tool['name'] === '') {
      throw new GatewayError('invalid_request', 400, `tools[${index}] 缺少 name`)
    }
    return {
      name: tool['name'],
      ...(typeof tool['description'] === 'string' ? { description: tool['description'] } : {}),
      parameters: isObject(tool['input_schema']) ? tool['input_schema'] : { type: 'object', properties: {} },
    }
  })
}

function parseToolChoice(value: unknown): 'auto' | 'none' | 'required' | { name: string } {
  if (value === undefined) return 'auto'
  if (!isObject(value)) throw new GatewayError('invalid_request', 400, 'tool_choice 不合法')
  const type = value['type']
  if (type === 'auto') return 'auto'
  if (type === 'any') return 'required'
  if (type === 'none') return 'none'
  if (type === 'tool' && typeof value['name'] === 'string') return { name: value['name'] }
  throw new GatewayError('invalid_request', 400, 'tool_choice 不合法')
}

export function anthropicBody(model: ModelDescriptor, result: Collected): Record<string, unknown> {
  const content: Record<string, unknown>[] = []
  if (result.text !== '') content.push({ type: 'text', text: result.text })
  for (const call of [...result.toolCalls.values()]) {
    content.push({ type: 'tool_use', id: call.id, name: call.name, input: parseJsonObject(call.arguments) })
  }
  return {
    id: `msg_${randomUUID().replaceAll('-', '')}`,
    type: 'message',
    role: 'assistant',
    model: model.id,
    content: content.length === 0 ? [{ type: 'text', text: '' }] : content,
    stop_reason: result.toolCalls.size > 0 ? 'tool_use' : result.finishReason === 'length' ? 'max_tokens' : 'end_turn',
    stop_sequence: null,
    usage: {
      input_tokens: result.usage?.inputTokens ?? 0,
      output_tokens: result.usage?.outputTokens ?? 0,
    },
  }
}

export function anthropicJson(res: ServerResponse, model: ModelDescriptor, result: Collected): void {
  const payload = JSON.stringify(anthropicBody(model, result))
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(payload) })
  res.end(payload)
}

export function streamAnthropic(res: ServerResponse, model: ModelDescriptor, events: AsyncIterable<CanonicalEvent>): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  const messageId = `msg_${randomUUID().replaceAll('-', '')}`
  let sequence = 0
  const send = (type: string, data: Record<string, unknown>) => {
    res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`)
  }
  let index = 0
  let textBlock: number | undefined
  let text = ''
  const toolBlocks = new Map<number, { index: number; id: string; name: string; json: string }>()
  let usage: CanonicalUsage | undefined
  let stopReason = 'end_turn'

  const closeText = () => {
    if (textBlock === undefined) return
    send('content_block_stop', { index: textBlock })
    textBlock = undefined
  }
  const closeTools = () => {
    for (const tool of toolBlocks.values()) {
      send('content_block_stop', { index: tool.index })
    }
  }

  void (async () => {
    try {
      send('message_start', {
        message: {
          id: messageId,
          type: 'message',
          role: 'assistant',
          model: model.id,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      })
      for await (const event of events) {
        switch (event.type) {
          case 'text':
            if (textBlock === undefined) {
              textBlock = index++
              send('content_block_start', { index: textBlock, content_block: { type: 'text', text: '' } })
            }
            text += event.delta
            send('content_block_delta', { index: textBlock, delta: { type: 'text_delta', text: event.delta } })
            break
          case 'reasoning':
            break
          case 'tool_call_start': {
            closeText()
            const block = { index: index++, id: event.id, name: event.name, json: '' }
            toolBlocks.set(event.index, block)
            send('content_block_start', { index: block.index, content_block: { type: 'tool_use', id: block.id, name: block.name, input: {} } })
            break
          }
          case 'tool_call_delta': {
            const block = toolBlocks.get(event.index)
            if (block) {
              block.json += event.argumentsDelta
              send('content_block_delta', { index: block.index, delta: { type: 'input_json_delta', partial_json: event.argumentsDelta } })
            }
            break
          }
          case 'tool_call_end':
            break
          case 'usage':
            usage = event.usage
            break
          case 'finish':
            stopReason = event.reason === 'length' ? 'max_tokens' : event.reason === 'tool_calls' ? 'tool_use' : 'end_turn'
            break
          case 'error':
            send('error', { error: { type: 'api_error', message: event.error.message } })
            res.end()
            return
          case 'start':
            break
        }
      }
      closeText()
      closeTools()
      send('message_delta', {
        delta: { stop_reason: stopReason, stop_sequence: null },
        usage: { output_tokens: usage?.outputTokens ?? 0 },
      })
      send('message_stop', {})
      res.end()
    } catch (error) {
      send('error', { error: { type: 'api_error', message: error instanceof Error ? error.message : String(error) } })
      res.end()
    }
  })()
}

function parseJsonObject(value: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(value || '{}')
    return isObject(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
