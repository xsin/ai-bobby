import type { WorkBuddyAccount } from './accounts'
import { accountFromLogin } from './accounts'
import { jsonHeaders, type WorkBuddyVariant } from './variants'

export const LOGIN_PENDING_CODE = 11217
export const LOGIN_TTL_MS = 10 * 60 * 1000

export class LoginError extends Error {
  constructor(
    message: string,
    readonly status = 0,
    readonly code = 0,
  ) {
    super(message)
    this.name = 'LoginError'
  }
}

export interface LoginStart {
  state: string
  authUrl: string
}

export type LoginPoll =
  | { status: 'pending'; message: string }
  | { status: 'ok'; account: WorkBuddyAccount }

type FetchLike = typeof fetch

export async function startLogin(
  variant: WorkBuddyVariant,
  fetchImpl: FetchLike = fetch,
): Promise<LoginStart> {
  const response = await fetchImpl(`${variant.base}/v2/plugin/auth/state?platform=CLI`, {
    method: 'POST',
    headers: { ...jsonHeaders(variant), 'Content-Type': 'application/json' },
    body: '{}',
    signal: AbortSignal.timeout(30_000),
  })
  const envelope = await readEnvelope(response, 'auth/state')
  const data = isObject(envelope.data) ? envelope.data : {}
  const state = typeof data['state'] === 'string' ? data['state'] : ''
  const authUrl = typeof data['authUrl'] === 'string' ? data['authUrl'] : ''
  if (state === '' || authUrl === '') {
    throw new LoginError('登录接口没有返回 state/authUrl', response.status, envelope.code)
  }
  return { state, authUrl }
}

export async function pollLogin(
  variant: WorkBuddyVariant,
  state: string,
  fetchImpl: FetchLike = fetch,
): Promise<LoginPoll> {
  const response = await fetchImpl(
    `${variant.base}/v2/plugin/auth/token?state=${encodeURIComponent(state)}`,
    {
      headers: jsonHeaders(variant),
      signal: AbortSignal.timeout(30_000),
    },
  )
  const envelope = await readEnvelope(response, 'auth/token')
  if (envelope.code === LOGIN_PENDING_CODE) {
    return { status: 'pending', message: envelope.msg || '等待浏览器登录' }
  }
  if (envelope.code !== 0) {
    throw new LoginError(envelope.msg || '登录失败', response.status, envelope.code)
  }
  const data = isObject(envelope.data) ? envelope.data : {}
  const accessToken = typeof data['accessToken'] === 'string' ? data['accessToken'] : ''
  if (accessToken === '') {
    return { status: 'pending', message: '等待 token' }
  }
  const refreshToken = typeof data['refreshToken'] === 'string' ? data['refreshToken'] : ''
  const expiresAtMs = normalizeExpiry(data['expiresAt']) || jwtExpiryMs(accessToken) || Date.now() + 30 * 60_000
  const claims = decodeJwt(accessToken)
  const uid =
    (typeof data['uid'] === 'string' && data['uid']) ||
    (typeof claims['uid'] === 'string' && claims['uid']) ||
    (typeof claims['sub'] === 'string' && claims['sub']) ||
    ''
  const domain = typeof data['domain'] === 'string' ? data['domain'] : new URL(variant.base).hostname
  let nickname = ''
  let enterpriseId = typeof data['enterpriseId'] === 'string' ? data['enterpriseId'] : undefined

  try {
    const profile = await fetchProfile(variant, state, accessToken, fetchImpl)
    nickname = profile.nickname
    enterpriseId = profile.enterpriseId ?? enterpriseId
  } catch {
    // Profile is best-effort; the token is already usable.
  }

  return {
    status: 'ok',
    account: accountFromLogin(variant, {
      uid: uid || `unknown-${Date.now()}`,
      ...(nickname === '' ? {} : { nickname }),
      domain,
      ...(enterpriseId === undefined ? {} : { enterpriseId }),
      accessToken,
      refreshToken,
      expiresAtMs,
    }),
  }
}

export async function fetchProfile(
  variant: WorkBuddyVariant,
  state: string,
  accessToken: string,
  fetchImpl: FetchLike = fetch,
): Promise<{ nickname: string; uid?: string; enterpriseId?: string }> {
  const response = await fetchImpl(
    `${variant.base}/v2/plugin/login/account?state=${encodeURIComponent(state)}`,
    { headers: jsonHeaders(variant, accessToken), signal: AbortSignal.timeout(15_000) },
  )
  const envelope = await readEnvelope(response, 'login/account')
  const data = isObject(envelope.data) ? envelope.data : {}
  return {
    nickname: typeof data['nickname'] === 'string' ? data['nickname'] : '',
    ...(typeof data['uid'] === 'string' ? { uid: data['uid'] } : {}),
    ...(typeof data['enterpriseId'] === 'string' ? { enterpriseId: data['enterpriseId'] } : {}),
  }
}

export function normalizeExpiry(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value < 1e12 ? value * 1000 : value
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Date.parse(value)
    if (Number.isFinite(parsed)) return parsed
    const numeric = Number(value)
    if (Number.isFinite(numeric) && numeric > 0) return numeric < 1e12 ? numeric * 1000 : numeric
  }
  return 0
}

export function decodeJwt(token: string): Record<string, unknown> {
  try {
    const segment = token.split('.')[1]
    if (!segment) return {}
    const padded = segment.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (segment.length % 4)) % 4)
    const parsed: unknown = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'))
    return isObject(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

export function jwtExpiryMs(token: string): number {
  const exp = decodeJwt(token)['exp']
  return typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 : 0
}

interface Envelope {
  code: number
  msg: string
  data: unknown
}

async function readEnvelope(response: Response, route: string): Promise<Envelope> {
  const text = await response.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new LoginError(`WorkBuddy ${route} 返回非 JSON（HTTP ${response.status}）：${text.slice(0, 160)}`, response.status)
  }
  if (!isObject(parsed)) {
    throw new LoginError(`WorkBuddy ${route} 返回格式异常`, response.status)
  }
  const code = typeof parsed['code'] === 'number' ? parsed['code'] : -1
  const msg = typeof parsed['msg'] === 'string' ? parsed['msg'] : ''
  if (!response.ok && code === -1) {
    throw new LoginError(`WorkBuddy ${route} 返回 HTTP ${response.status}`, response.status, code)
  }
  return { code, msg, data: parsed['data'] }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
