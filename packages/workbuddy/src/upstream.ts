import type { CanonicalErrorKind } from '@ai-bobby/core'
import type { WorkBuddyAccount, WorkBuddyCredits } from './accounts'
import { parseModelCatalog, type WorkBuddyCatalogModel } from './catalog'
import { chatHeaders, jsonHeaders, type WorkBuddyVariant } from './variants'

export class UpstreamError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly kind: CanonicalErrorKind,
    readonly retryAfterMs?: number,
  ) {
    super(message)
    this.name = 'UpstreamError'
  }
}

export interface RefreshResult {
  accessToken: string
  refreshToken?: string
  expiresAtMs?: number
  domain?: string
}

type FetchLike = typeof fetch

export class WorkBuddyClient {
  private readonly fetchImpl: FetchLike

  constructor(
    readonly variant: WorkBuddyVariant,
    fetchImpl: FetchLike = fetch,
  ) {
    this.fetchImpl = fetchImpl
  }

  async fetchCatalog(account: WorkBuddyAccount): Promise<WorkBuddyCatalogModel[]> {
    const response = await this.fetchImpl(`${this.variant.base}/v3/config`, {
      headers: jsonHeaders(this.variant, account.accessToken, account),
      signal: AbortSignal.timeout(30_000),
    })
    const { document } = await readEnvelope(response, 'v3/config')
    const data = isObject(document['data'])
      ? document['data']
      : 'models' in document || 'agents' in document
        ? document
        : {}
    return parseModelCatalog(data, this.variant)
  }

  async chatStream(
    account: WorkBuddyAccount,
    body: Record<string, unknown>,
    signal: AbortSignal,
  ): Promise<Response> {
    const prepared = prepareChatBody(JSON.stringify(body), this.variant)
    const response = await this.fetchImpl(`${this.variant.base}/v2/chat/completions`, {
      method: 'POST',
      headers: chatHeaders(this.variant, account.accessToken, account),
      body: prepared,
      signal,
    })
    if (!response.ok) {
      const text = (await response.text()).slice(0, 4096)
      throw upstreamError(response.status, text, response.headers.get('retry-after'))
    }
    return response
  }

  async refresh(account: WorkBuddyAccount): Promise<RefreshResult> {
    const headers: Record<string, string> = {
      ...jsonHeaders(this.variant),
      'Content-Type': 'application/json',
      'X-Refresh-Token': account.refreshToken,
      'X-Auth-Refresh-Source': 'workbuddy',
      ...(account.enterpriseId === undefined ? {} : { 'X-Enterprise-Id': account.enterpriseId }),
    }
    const response = await this.fetchImpl(`${this.variant.base}/v2/plugin/auth/token/refresh`, {
      method: 'POST',
      headers,
      body: '{}',
      signal: AbortSignal.timeout(30_000),
    })
    const { document } = await readEnvelope(response, 'auth/token/refresh')
    const data = isObject(document['data']) ? document['data'] : {}
    const accessToken = typeof data['accessToken'] === 'string' ? data['accessToken'] : ''
    if (accessToken === '') throw new UpstreamError('refresh returned no accessToken', response.status, 'auth')
    return {
      accessToken,
      ...(typeof data['refreshToken'] === 'string' && data['refreshToken'] !== ''
        ? { refreshToken: data['refreshToken'] }
        : {}),
      ...(typeof data['expiresIn'] === 'number' && data['expiresIn'] > 0
        ? { expiresAtMs: Date.now() + data['expiresIn'] * 1000 }
        : {}),
      ...(typeof data['domain'] === 'string' && data['domain'] !== '' ? { domain: data['domain'] } : {}),
    }
  }

  async billing(account: WorkBuddyAccount): Promise<WorkBuddyCredits> {
    const response = await this.fetchImpl(`${this.variant.billingBase}/v2/billing/meter/get-user-resource`, {
      headers: {
        ...jsonHeaders(this.variant, account.accessToken, account),
        'X-Domain': account.domain,
        ...(account.enterpriseId === undefined ? {} : { 'X-Tenant-Id': account.enterpriseId }),
      },
      signal: AbortSignal.timeout(20_000),
    })
    const { document } = await readEnvelope(response, 'billing')
    const data = isObject(document['data']) ? document['data'] : {}
    const packages = Array.isArray(data['packages'])
      ? data['packages'].flatMap(item => {
          if (!isObject(item)) return []
          const remain = number(item['Remain'])
          const size = number(item['Size'])
          return [{
            name: typeof item['PackageName'] === 'string' ? item['PackageName'] : 'package',
            remain,
            size,
            ...(typeof item['CycleEndTime'] === 'string'
              ? { endTimeMs: Date.parse(item['CycleEndTime']) || undefined }
              : {}),
          }]
        })
      : []
    return {
      total: packages.reduce((sum, item) => sum + item.remain, 0),
      packages,
      fetchedAtMs: Date.now(),
    }
  }
}

export function prepareChatBody(source: string, variant: WorkBuddyVariant): string {
  let body: unknown
  try {
    body = JSON.parse(source)
  } catch {
    return source
  }
  if (!isObject(body)) return source
  body['stream'] = true
  normalizeDeveloperRole(body)
  normalizeToolChoice(body)
  if (body['reasoning_effort'] === 'off') delete body['reasoning_effort']
  if (variant.international) {
    const messages = body['messages']
    if (Array.isArray(messages)) {
      const first = messages[0]
      if (!isObject(first) || first['role'] !== 'system') {
        messages.unshift({ role: 'system', content: 'You are a helpful assistant.' })
      }
    }
  }
  return JSON.stringify(body)
}

function normalizeDeveloperRole(body: Record<string, unknown>): void {
  const messages = body['messages']
  if (!Array.isArray(messages)) return
  for (const message of messages) {
    if (isObject(message) && message['role'] === 'developer') message['role'] = 'system'
  }
}

function normalizeToolChoice(body: Record<string, unknown>): void {
  if (!('tool_choice' in body)) return
  const choice = body['tool_choice']
  if (typeof choice === 'string') {
    if (choice.trim().toLowerCase() === 'none') {
      delete body['tool_choice']
      delete body['tools']
      delete body['functions']
    }
    return
  }
  if (!isObject(choice)) return
  const type = typeof choice['type'] === 'string' ? choice['type'].toLowerCase() : ''
  if (type === 'none') {
    delete body['tool_choice']
    delete body['tools']
    delete body['functions']
    return
  }
  if (type === 'function') {
    const fn = isObject(choice['function']) ? choice['function'] : {}
    const name = typeof fn['name'] === 'string' ? fn['name'] : ''
    if (name !== '') body['tool_choice'] = { type: 'function', function: { name } }
    return
  }
  if (type === 'required') body['tool_choice'] = 'required'
  else if (type === 'auto') body['tool_choice'] = 'auto'
}

interface Envelope {
  document: Record<string, unknown>
}

async function readEnvelope(response: Response, route: string): Promise<Envelope> {
  const text = await response.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new UpstreamError(`WorkBuddy ${route} 返回非 JSON (HTTP ${response.status})`, response.status, 'upstream')
  }
  if (!isObject(parsed)) {
    throw new UpstreamError(`WorkBuddy ${route} 返回格式异常`, response.status, 'upstream')
  }
  const code = typeof parsed['code'] === 'number' ? parsed['code'] : 0
  if (!response.ok || (code !== 0 && code !== undefined)) {
    const msg =
      typeof parsed['msg'] === 'string' && parsed['msg'] !== ''
        ? parsed['msg']
        : `WorkBuddy ${route} 返回 HTTP ${response.status}`
    throw upstreamError(response.status, msg)
  }
  return { document: parsed }
}

function upstreamError(status: number, body: string, retryAfter?: string | null): UpstreamError {
  const lower = body.toLowerCase()
  const kind: CanonicalErrorKind =
    status === 402 ||
    /insufficient|credit|quota|积分不足|额度不足|余额不足/.test(lower)
      ? 'credit'
      : status === 401 || status === 403
        ? 'auth'
        : status === 429
          ? 'rate_limit'
          : status === 404
            ? 'not_found'
            : status >= 500
              ? 'upstream'
              : 'invalid_request'
  const seconds = retryAfter === null || retryAfter === undefined ? 0 : Number(retryAfter)
  return new UpstreamError(
    body.slice(0, 400) || `WorkBuddy HTTP ${status}`,
    status,
    kind,
    Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : undefined,
  )
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function number(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}
