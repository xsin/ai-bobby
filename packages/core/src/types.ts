export type ProviderId = 'opencode' | 'workbuddy' | 'workbuddy-ai' | 'nvidia'
export type Realm = 'cn' | 'intl'

export type ModelStatus =
  | 'available'
  | 'chat_only'
  | 'pending'
  | 'unavailable'
  | 'rate_limited'
  | 'no_account'

export interface ModelCapabilities {
  text: boolean
  images: boolean
  tools: boolean
  reasoning: boolean
}

export interface ModelBilling {
  credits?: string
  badges?: readonly string[]
  free: boolean
  rateUnknown?: boolean
}

export interface ModelRef {
  provider: ProviderId
  upstreamId: string
  id: string
  displayName: string
}

export interface ModelDescriptor extends ModelRef {
  groupName: string
  capabilities: ModelCapabilities
  contextWindow?: number
  maxOutputTokens?: number
  status: ModelStatus
  accounts?: number
  billing?: ModelBilling
  latencyMs?: number
  checkedAtMs?: number
  error?: string
  upstream?: Record<string, unknown>
}

export type CanonicalContent =
  | { type: 'text'; text: string }
  | { type: 'image'; mediaType: string; data: string }
  | { type: 'tool_call'; id: string; name: string; arguments: string }
  | { type: 'tool_result'; toolCallId: string; content: string; isError?: boolean }

export interface CanonicalMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: CanonicalContent[]
}

export interface CanonicalTool {
  name: string
  description?: string
  parameters: Record<string, unknown>
}

export type CanonicalToolChoice = 'auto' | 'none' | 'required' | { name: string }

export interface CanonicalRequest {
  model: ModelRef
  messages: CanonicalMessage[]
  tools: CanonicalTool[]
  toolChoice: CanonicalToolChoice
  parallelToolCalls: boolean
  maxOutputTokens?: number
  temperature?: number
  topP?: number
  stop?: string[]
  reasoningEffort?: 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max'
  stream: boolean
  metadata?: Record<string, string>
}

export interface CanonicalUsage {
  inputTokens: number
  outputTokens: number
  cachedInputTokens?: number
  reasoningTokens?: number
}

export type CanonicalErrorKind =
  | 'auth'
  | 'credit'
  | 'rate_limit'
  | 'not_found'
  | 'upstream'
  | 'invalid_request'

export interface CanonicalError {
  kind: CanonicalErrorKind
  message: string
  status: number
  retryAfterMs?: number
}

export type CanonicalEvent =
  | { type: 'start'; responseId: string; model: string }
  | { type: 'text'; delta: string }
  | { type: 'reasoning'; delta: string }
  | { type: 'tool_call_start'; index: number; id: string; name: string }
  | { type: 'tool_call_delta'; index: number; argumentsDelta: string }
  | { type: 'tool_call_end'; index: number }
  | { type: 'usage'; usage: CanonicalUsage }
  | { type: 'finish'; reason: 'stop' | 'tool_calls' | 'length' | 'content_filter' }
  | { type: 'error'; error: CanonicalError }

export interface ProviderAdapter {
  readonly id: ProviderId
  readonly displayName: string
  listModels(): readonly ModelDescriptor[]
  chat(request: CanonicalRequest, signal: AbortSignal): AsyncIterable<CanonicalEvent>
}

export interface ChatRequestContext {
  requestId: string
  startedAtMs: number
}
