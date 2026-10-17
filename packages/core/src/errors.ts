import type { CanonicalError, CanonicalErrorKind } from './types'

export class GatewayError extends Error {
  constructor(
    readonly kind: CanonicalErrorKind,
    readonly status: number,
    message: string,
    readonly retryAfterMs?: number,
  ) {
    super(message)
    this.name = 'GatewayError'
  }

  toCanonical(): CanonicalError {
    return {
      kind: this.kind,
      status: this.status,
      message: this.message,
      ...(this.retryAfterMs === undefined ? {} : { retryAfterMs: this.retryAfterMs }),
    }
  }
}

export function classifyStatus(status: number): CanonicalErrorKind {
  if (status === 401 || status === 403) return 'auth'
  if (status === 402) return 'credit'
  if (status === 429) return 'rate_limit'
  if (status === 404) return 'not_found'
  if (status >= 500) return 'upstream'
  return 'invalid_request'
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}
