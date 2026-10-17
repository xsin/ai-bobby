import { randomUUID } from 'node:crypto'
import type { CanonicalContent, CanonicalMessage, CanonicalRequest, CanonicalTool, ModelDescriptor, CanonicalUsage } from '@ai-bobby/core'
import { GatewayError } from '@ai-bobby/core'
import { collect, type Collected } from './collect'

export interface ParsedResponsesRequest {
  request: CanonicalRequest
  stream: boolean
}

export function parseResponsesRequest(body: unknown, model: ModelDescriptor): ParsedResponsesRequest {
  if (!isObject(body)) throw new GatewayError('invalid_request', 400, '请求体必须是 JSON 对象')
  const messages: CanonicalMessage[] = []
  const instructions = typeof body['instructions'] === 'string' ? body['instructions'] : ''
  if (instructions !== '') messages.push({ role: 'system', content: [{ type: 'text', text: instructions }] })
  const input = body['input']
  if (typeof input === 'string') {
    messages.push({ role: 'user', content: [{ type: 'text', text: input }] })
  } else if (Array.isArray(input)) {
    for (const item of input) appendInputItem(messages, item, model)
  } else if (input !== undefined) {
    throw new GatewayError('invalid_request', 400, 'input 必须是字符串或数组')
  }
  if (messages.length === 0) throw new GatewayError('invalid_request', 400, 'input 不能为空')

  const tools = parseTools(body['tools'])
  const toolChoice = parseToolChoice(body['tool_choice'])
  if (model.status === 'chat_only' && tools.length > 0) {
    throw new GatewayError('invalid_request', 400, '该模型仅支持普通对话，不支持工具调用')
  }
  const maxTokens = number(body['max_output_tokens'])
  const reasoning = isObject(body['reasoning']) ? body['reasoning'] : {}
  const effort = reasoning['effort']
  const stream = body['stream'] === true
  return {
    stream,
    request: {
      model: { provider: model.provider, upstreamId: model.upstreamId, id: model.id, displayName: model.displayName },
      messages,
      tools,
      toolChoice,
      parallelToolCalls: body['parallel_tool_calls'] !== false,
      ...(maxTokens === undefined ? {} : { maxOutputTokens: maxTokens }),
      ...(number(body['temperature']) === undefined ? {} : { temperature: number(body['temperature']) }),
      ...(number(body['top_p']) === undefined ? {} : { topP: number(body['top_p']) }),
      ...(effort === 'minimal' || effort === 'low' || effort === 'medium' || effort === 'high' || effort === 'xhigh' || effort === 'max' ? { reasoningEffort: effort } : {}),
      stream,
    },
  }
}

function appendInputItem(messages: CanonicalMessage[], item: unknown, model: ModelDescriptor): void {
  if (typeof item === 'string') {
    messages.push({ role: 'user', content: [{ type: 'text', text: item }] })
    return
  }
  if (!isObject(item)) return
  if (item['type'] === 'function_call') {
    messages.push({
      role: 'assistant',
      content: [{
        type: 'tool_call',
        id: typeof item['call_id'] === 'string' ? item['call_id'] : `call_${randomUUID()}`,
        name: typeof item['name'] === 'string' ? item['name'] : '',
        arguments: typeof item['arguments'] === 'string' ? item['arguments'] : '{}',
      }],
    })
    return
  }
  if (item['type'] === 'function_call_output') {
    messages.push({
      role: 'tool',
      content: [{
        type: 'tool_result',
        toolCallId: typeof item['call_id'] === 'string' ? item['call_id'] : '',
        content: typeof item['output'] === 'string' ? item['output'] : JSON.stringify(item['output'] ?? ''),
      }],
    })
    return
  }
  if (item['type'] === 'message' || item['role'] !== undefined) {
    const role = item['role']
    if (role !== 'user' && role !== 'assistant' && role !== 'system' && role !== 'developer') return
    const content: CanonicalContent[] = []
    const raw = item['content']
    if (typeof raw === 'string') content.push({ type: 'text', text: raw })
    else if (Array.isArray(raw)) {
      for (const part of raw) {
        if (!isObject(part)) continue
        if (part['type'] === 'input_text' || part['type'] === 'output_text' || part['type'] === 'text') {
          if (typeof part['text'] === 'string') content.push({ type: 'text', text: part['text'] })
        } else if (part['type'] === 'input_image') {
          if (!model.capabilities.images) throw new GatewayError('invalid_request', 400, '该模型不支持图片输入')
          const url = typeof part['image_url'] === 'string' ? part['image_url'] : isObject(part['image_url']) ? part['image_url']['url'] : undefined
          const match = typeof url === 'string' && /^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/]+={0,2})$/.exec(url)
          if (!match) throw new GatewayError('invalid_request', 400, '图片必须是 base64 data URL')
          content.push({ type: 'image', mediaType: match[1]!, data: match[2]! })
        }
      }
    }
    messages.push({ role: role === 'developer' ? 'system' : role, content })
  }
}

function parseTools(value: unknown): CanonicalTool[] {
  if (value === undefined) return []
  if (!Array.isArray(value)) throw new GatewayError('invalid_request', 400, 'tools 必须是数组')
  const parsed: CanonicalTool[] = []
  for (const [index, tool] of value.entries()) {
    if (!isObject(tool)) throw new GatewayError('invalid_request', 400, `tools[${index}] 不合法`)
    // Codex may advertise built-in tools (web_search, local_shell, ...) that
    // have no function name. They are not ours to execute; skip them rather
    // than failing the whole request.
    if (tool['type'] !== undefined && tool['type'] !== 'function') continue
    const fn = isObject(tool['function']) ? tool['function'] : tool
    const name = typeof fn['name'] === 'string' ? fn['name'] : ''
    if (name === '') throw new GatewayError('invalid_request', 400, `tools[${index}] 缺少 name`)
    parsed.push({
      name,
      ...(typeof fn['description'] === 'string' ? { description: fn['description'] } : {}),
      parameters: isObject(fn['parameters']) ? fn['parameters'] : { type: 'object', properties: {} },
    })
  }
  return parsed
}

function parseToolChoice(value: unknown): 'auto' | 'none' | 'required' | { name: string } {
  if (value === undefined) return 'auto'
  if (value === 'auto' || value === 'none' || value === 'required') return value
  if (isObject(value)) {
    const name = typeof value['name'] === 'string'
      ? value['name']
      : isObject(value['function']) && typeof value['function']['name'] === 'string'
        ? value['function']['name']
        : ''
    if (name !== '') return { name }
  }
  throw new GatewayError('invalid_request', 400, 'tool_choice 不合法')
}

export function responsesBody(model: ModelDescriptor, result: Collected): Record<string, unknown> {
  const output = buildOutput(result)
  return {
    id: `resp_${randomUUID().replaceAll('-', '')}`,
    object: 'response',
    created_at: Math.floor(Date.now() / 1000),
    status: 'completed',
    model: model.id,
    output,
    usage: usageJson(result.usage),
  }
}

export function responsesJson(res: import('node:http').ServerResponse, model: ModelDescriptor, result: Collected): void {
  const payload = JSON.stringify(responsesBody(model, result))
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(payload) })
  res.end(payload)
}

export function streamResponses(res: import('node:http').ServerResponse, model: ModelDescriptor, events: AsyncIterable<import('@ai-bobby/core').CanonicalEvent>): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  const responseId = `resp_${randomUUID().replaceAll('-', '')}`
  const created = Math.floor(Date.now() / 1000)
  let sequence = 0
  const send = (type: string, data: Record<string, unknown>) => {
    res.write(`event: ${type}\ndata: ${JSON.stringify({ type, sequence_number: sequence++, response_id: responseId, ...data })}\n\n`)
  }
  send('response.created', { response: { id: responseId, object: 'response', created_at: created, status: 'in_progress', model: model.id, output: [] } })

  let messageItem: { id: string; outputIndex: number; started: boolean; text: string } | undefined
  const finalMessage: { outputIndex: number; item: Record<string, unknown> }[] = []
  const toolItems = new Map<number, { id: string; callId: string; name: string; outputIndex: number; arguments: string; started: boolean }>()
  const finalTools: { outputIndex: number; item: Record<string, unknown> }[] = []
  let usage: CanonicalUsage | undefined
  let nextOutputIndex = 0
  let finishReason: Collected['finishReason'] = 'stop'

  const ensureMessage = () => {
    if (messageItem) return messageItem
    const item = { id: `msg_${randomUUID().replaceAll('-', '')}`, outputIndex: nextOutputIndex++, started: true, text: '' }
    messageItem = item
    send('response.output_item.added', { output_index: item.outputIndex, item: { id: item.id, type: 'message', status: 'in_progress', role: 'assistant', content: [] } })
    send('response.content_part.added', { item_id: item.id, output_index: item.outputIndex, content_index: 0, part: { type: 'output_text', text: '', annotations: [] } })
    return item
  }

  const closeMessage = () => {
    if (!messageItem) return
    const item = messageItem
    send('response.output_text.done', { item_id: item.id, output_index: item.outputIndex, content_index: 0, text: item.text })
    send('response.content_part.done', { item_id: item.id, output_index: item.outputIndex, content_index: 0, part: { type: 'output_text', text: item.text, annotations: [] } })
    send('response.output_item.done', { output_index: item.outputIndex, item: { id: item.id, type: 'message', status: 'completed', role: 'assistant', content: [{ type: 'output_text', text: item.text, annotations: [] }] } })
    finalMessage.push({ outputIndex: item.outputIndex, item: { id: item.id, type: 'message', status: 'completed', role: 'assistant', content: [{ type: 'output_text', text: item.text, annotations: [] }] } })
    messageItem = undefined
  }

  const closeTools = () => {
    for (const tool of toolItems.values()) {
      if (!tool.started) continue
      send('response.function_call_arguments.done', { item_id: tool.id, output_index: tool.outputIndex, arguments: tool.arguments })
      const item = { id: tool.id, type: 'function_call', status: 'completed', call_id: tool.callId, name: tool.name, arguments: tool.arguments }
      send('response.output_item.done', { output_index: tool.outputIndex, item })
      finalTools.push({ outputIndex: tool.outputIndex, item })
    }
  }

  void (async () => {
    try {
      for await (const event of events) {
        switch (event.type) {
          case 'text': {
            const item = ensureMessage()
            item.text += event.delta
            send('response.output_text.delta', { item_id: item.id, output_index: item.outputIndex, content_index: 0, delta: event.delta })
            break
          }
          case 'reasoning':
            break
          case 'tool_call_start': {
            closeMessage()
            const item = { id: `fc_${randomUUID().replaceAll('-', '')}`, callId: event.id, name: event.name, outputIndex: nextOutputIndex++, arguments: '', started: true }
            toolItems.set(event.index, item)
            send('response.output_item.added', { output_index: item.outputIndex, item: { id: item.id, type: 'function_call', status: 'in_progress', call_id: item.callId, name: item.name, arguments: '' } })
            break
          }
          case 'tool_call_delta': {
            const item = toolItems.get(event.index)
            if (item) {
              item.arguments += event.argumentsDelta
              send('response.function_call_arguments.delta', { item_id: item.id, output_index: item.outputIndex, delta: event.argumentsDelta })
            }
            break
          }
          case 'tool_call_end':
            break
          case 'usage':
            usage = event.usage
            break
          case 'finish':
            finishReason = event.reason
            break
          case 'error':
            send('error', { code: event.error.kind, message: event.error.message, param: null })
            res.end()
            return
          case 'start':
            break
        }
      }
      closeMessage()
      closeTools()
      const finalResponse = {
        id: responseId,
        object: 'response',
        created_at: created,
        status: 'completed',
        model: model.id,
        output: [...finalMessage, ...finalTools].sort((a, b) => a.outputIndex - b.outputIndex).map(entry => entry.item),
        usage: usageJson(usage),
      }
      send('response.completed', { response: finalResponse })
      res.end()
    } catch (error) {
      send('error', { code: 'upstream', message: error instanceof Error ? error.message : String(error), param: null })
      res.end()
    }
  })()
}

function buildOutput(result: Collected): unknown[] {
  const output: unknown[] = []
  if (result.text !== '' || result.toolCalls.size === 0) {
    output.push({
      id: `msg_${randomUUID().replaceAll('-', '')}`,
      type: 'message',
      status: 'completed',
      role: 'assistant',
      content: [{ type: 'output_text', text: result.text, annotations: [] }],
    })
  }
  for (const [index, call] of [...result.toolCalls.entries()].sort(([a], [b]) => a - b)) {
    output.push({
      id: `fc_${randomUUID().replaceAll('-', '')}`,
      type: 'function_call',
      status: 'completed',
      call_id: call.id,
      name: call.name,
      arguments: call.arguments || '{}',
    })
  }
  return output
}

function usageJson(usage: CanonicalUsage | undefined): Record<string, unknown> {
  const input = usage?.inputTokens ?? 0
  const output = usage?.outputTokens ?? 0
  return {
    input_tokens: input,
    output_tokens: output,
    total_tokens: input + output,
    ...(usage?.cachedInputTokens === undefined ? {} : { input_tokens_details: { cached_tokens: usage.cachedInputTokens } }),
    ...(usage?.reasoningTokens === undefined ? {} : { output_tokens_details: { reasoning_tokens: usage.reasoningTokens } }),
  }
}

function number(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
