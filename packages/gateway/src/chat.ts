import { GatewayError, type CanonicalContent, type CanonicalMessage, type CanonicalRequest, type CanonicalTool, type ModelDescriptor } from '@ai-bobby/core'

export interface ParsedChatRequest {
  model: string
  stream: boolean
  includeUsage: boolean
  messages: CanonicalMessage[]
  tools: CanonicalTool[]
  toolChoice: 'auto' | 'none' | 'required' | { name: string }
  parallelToolCalls: boolean
  maxOutputTokens?: number
  temperature?: number
  topP?: number
  stop?: string[]
  reasoningEffort?: CanonicalRequest['reasoningEffort']
}

export function parseChatRequest(body: unknown, model: ModelDescriptor): ParsedChatRequest {
  if (!isObject(body)) throw new GatewayError('invalid_request', 400, '请求体必须是 JSON 对象')
  if (body['n'] !== undefined && body['n'] !== 1) {
    throw new GatewayError('invalid_request', 400, '只支持 n=1')
  }
  const rawMessages = body['messages']
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    throw new GatewayError('invalid_request', 400, 'messages 必须是非空数组')
  }
  const messages = rawMessages.map((message, index) => parseMessage(message, index, model))
  const tools = parseTools(body['tools'])
  const toolChoice = parseToolChoice(body['tool_choice'], tools)
  if (model.status === 'chat_only' && tools.length > 0) {
    throw new GatewayError('invalid_request', 400, '该模型仅支持普通对话，不支持工具调用')
  }
  const maxTokens = numberOrUndefined(body['max_completion_tokens'] ?? body['max_tokens'])
  if (maxTokens !== undefined && (!Number.isInteger(maxTokens) || maxTokens <= 0)) {
    throw new GatewayError('invalid_request', 400, 'max_tokens 必须是正整数')
  }
  const temperature = numberOrUndefined(body['temperature'])
  const topP = numberOrUndefined(body['top_p'])
  const stop = parseStop(body['stop'])
  const reasoningEffort = parseEffort(body['reasoning_effort'] ?? (isObject(body['reasoning']) ? body['reasoning']['effort'] : undefined))
  const stream = body['stream'] === true
  const streamOptions = isObject(body['stream_options']) ? body['stream_options'] : {}
  return {
    model: model.id,
    stream,
    includeUsage: streamOptions['include_usage'] === true,
    messages,
    tools,
    toolChoice,
    parallelToolCalls: body['parallel_tool_calls'] !== false,
    ...(maxTokens === undefined ? {} : { maxOutputTokens: maxTokens }),
    ...(temperature === undefined ? {} : { temperature }),
    ...(topP === undefined ? {} : { topP }),
    ...(stop === undefined ? {} : { stop }),
    ...(reasoningEffort === undefined ? {} : { reasoningEffort }),
  }
}

function parseMessage(value: unknown, index: number, model: ModelDescriptor): CanonicalMessage {
  if (!isObject(value)) throw new GatewayError('invalid_request', 400, `messages[${index}] 不是对象`)
  const role = value['role']
  if (role !== 'system' && role !== 'developer' && role !== 'user' && role !== 'assistant' && role !== 'tool') {
    throw new GatewayError('invalid_request', 400, `messages[${index}] role 不合法`)
  }
  const content: CanonicalContent[] = []
  const rawContent = value['content']
  if (typeof rawContent === 'string') {
    if (rawContent !== '') content.push({ type: 'text', text: rawContent })
  } else if (Array.isArray(rawContent)) {
    for (const part of rawContent) {
      if (!isObject(part)) continue
      if (part['type'] === 'text' && typeof part['text'] === 'string') {
        content.push({ type: 'text', text: part['text'] })
      } else if (part['type'] === 'image_url') {
        if (!model.capabilities.images) throw new GatewayError('invalid_request', 400, '该模型不支持图片输入')
        const imageUrl = isObject(part['image_url']) ? part['image_url']['url'] : undefined
        const match = typeof imageUrl === 'string' && /^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/]+={0,2})$/.exec(imageUrl)
        if (!match) throw new GatewayError('invalid_request', 400, '图片必须是 PNG/JPEG/WebP/GIF 的 base64 data URL')
        content.push({ type: 'image', mediaType: match[1]!, data: match[2]! })
      }
    }
  } else if (rawContent !== null && rawContent !== undefined) {
    throw new GatewayError('invalid_request', 400, `messages[${index}] content 不合法`)
  }

  if (Array.isArray(value['tool_calls'])) {
    for (const call of value['tool_calls']) {
      if (!isObject(call)) continue
      const fn = isObject(call['function']) ? call['function'] : {}
      const name = typeof fn['name'] === 'string' ? fn['name'] : ''
      const args = typeof fn['arguments'] === 'string' ? fn['arguments'] : ''
      if (name === '') continue
      content.push({
        type: 'tool_call',
        id: typeof call['id'] === 'string' ? call['id'] : `call_${index}`,
        name,
        arguments: args,
      })
    }
  }

  if (role === 'tool') {
    const toolCallId = typeof value['tool_call_id'] === 'string' ? value['tool_call_id'] : ''
    return {
      role: 'tool',
      content: [{
        type: 'tool_result',
        toolCallId,
        content: content.filter(part => part.type === 'text').map(part => (part as { text: string }).text).join('\n'),
      }],
    }
  }

  return {
    role: role === 'developer' ? 'system' : role,
    content,
  }
}

function parseTools(value: unknown): CanonicalTool[] {
  if (value === undefined) return []
  if (!Array.isArray(value)) throw new GatewayError('invalid_request', 400, 'tools 必须是数组')
  return value.map((tool, index) => {
    if (!isObject(tool) || tool['type'] !== 'function' || !isObject(tool['function'])) {
      throw new GatewayError('invalid_request', 400, `tools[${index}] 必须是 function 工具`)
    }
    const fn = tool['function']
    const name = typeof fn['name'] === 'string' ? fn['name'] : ''
    if (name === '') throw new GatewayError('invalid_request', 400, `tools[${index}] 缺少 name`)
    return {
      name,
      ...(typeof fn['description'] === 'string' ? { description: fn['description'] } : {}),
      parameters: isObject(fn['parameters']) ? fn['parameters'] : { type: 'object', properties: {} },
    }
  })
}

function parseToolChoice(value: unknown, tools: readonly CanonicalTool[]): 'auto' | 'none' | 'required' | { name: string } {
  if (value === undefined) return 'auto'
  if (value === 'auto' || value === 'none' || value === 'required') {
    if (value === 'required' && tools.length === 0) throw new GatewayError('invalid_request', 400, 'tool_choice=required 需要 tools')
    return value
  }
  if (isObject(value) && isObject(value['function']) && typeof value['function']['name'] === 'string') {
    const name = value['function']['name']
    if (!tools.some(tool => tool.name === name)) throw new GatewayError('invalid_request', 400, `tool_choice 指定的工具不存在：${name}`)
    return { name }
  }
  throw new GatewayError('invalid_request', 400, 'tool_choice 不合法')
}

function parseStop(value: unknown): string[] | undefined {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) {
    const stops = value.filter((item): item is string => typeof item === 'string')
    return stops.length === 0 ? undefined : stops
  }
  return undefined
}

function parseEffort(value: unknown): CanonicalRequest['reasoningEffort'] {
  if (value === 'minimal' || value === 'low' || value === 'medium' || value === 'high' || value === 'xhigh' || value === 'max') {
    return value
  }
  return undefined
}

function numberOrUndefined(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
