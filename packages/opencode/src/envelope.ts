import { GatewayError, type CanonicalMessage, type CanonicalRequest, type CanonicalTool, type CanonicalToolChoice } from '@ai-bobby/core'

export interface Envelope {
  content: string
  calls: Array<{ name: string; arguments: Record<string, unknown> }>
}

export function buildSystemPrompt(request: CanonicalRequest): string {
  const tools = request.toolChoice === 'none' ? [] : request.tools
  return [
    'You are the reasoning component of an external assistant. Never invoke native tools; the external client owns execution.',
    'Continue the external conversation supplied as JSON and return exactly one JSON object, with no Markdown fences:',
    '{"content":"text for the user, empty if only calling tools","calls":[{"name":"an allowed external tool name","arguments":{}}]}',
    'Both fields are required. Use [] when no tools are needed.',
    'Choose actions ONLY from the external tools supplied in this request. Never invent a tool or perform the action yourself.',
    'A returned call is a proposal, not a completed action. Never claim it has executed.',
    `Available external tools: ${JSON.stringify(tools.map(tool => ({ name: tool.name, description: tool.description, parameters: tool.parameters })))}`,
    request.toolChoice === 'none' || tools.length === 0
      ? 'calls MUST be empty.'
      : typeof request.toolChoice === 'object'
        ? `Call ONLY ${JSON.stringify(request.toolChoice.name)} at least once.`
        : request.toolChoice === 'required'
          ? 'Return at least one tool call.'
          : 'Call tools only when needed.',
    request.parallelToolCalls ? '' : 'Return at most one tool call.',
  ].filter(Boolean).join('\n')
}

export function conversationText(messages: readonly CanonicalMessage[]): string {
  return JSON.stringify(messages)
}

export function decodeEnvelope(text: string, tools: readonly CanonicalTool[], choice: CanonicalToolChoice, parallel: boolean): Envelope {
  let value: unknown
  try {
    value = JSON.parse(text.trim().replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/i, '$1'))
  } catch {
    throw new GatewayError('upstream', 502, '模型没有返回合法的 JSON 信封')
  }
  if (!isObject(value)) throw new GatewayError('upstream', 502, '模型信封不是对象')
  const content = typeof value['content'] === 'string' ? value['content'] : undefined
  let calls = value['calls']
  if (calls === undefined && Array.isArray(value['tool_calls'])) {
    calls = value['tool_calls'].map(call => {
      if (!isObject(call)) return null
      const fn = isObject(call['function']) ? call['function'] : call
      return { name: fn['name'], arguments: fn['arguments'] }
    })
  }
  if (content === undefined || !Array.isArray(calls)) {
    throw new GatewayError('upstream', 502, '模型信封缺少 content/calls')
  }
  if (!parallel && calls.length > 1) throw new GatewayError('upstream', 502, '模型返回了多个工具调用（已禁用并行）')
  if (choice === 'none' && calls.length > 0) throw new GatewayError('upstream', 502, '模型违反了 tool_choice:none')
  if ((choice === 'required' || typeof choice === 'object') && calls.length === 0) {
    throw new GatewayError('upstream', 502, '模型没有返回必需的工具调用')
  }
  const allowed = new Set(tools.map(tool => tool.name))
  const normalized = calls.map(call => {
    if (!isObject(call) || typeof call['name'] !== 'string' || !allowed.has(call['name'])) {
      throw new GatewayError('upstream', 502, '模型返回了不在本次工具列表中的调用')
    }
    let args = call['arguments']
    if (typeof args === 'string') {
      try {
        args = JSON.parse(args)
      } catch {
        throw new GatewayError('upstream', 502, '工具参数不是合法 JSON')
      }
    }
    if (!isObject(args)) throw new GatewayError('upstream', 502, '工具参数必须是对象')
    if (typeof choice === 'object' && call['name'] !== choice.name) {
      throw new GatewayError('upstream', 502, '模型调用了未被指定的工具')
    }
    return { name: call['name'], arguments: args }
  })
  return { content, calls: normalized }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
