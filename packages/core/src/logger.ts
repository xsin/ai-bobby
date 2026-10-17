const SECRET_KEYS = /(token|authorization|api[-_]?key|secret|cookie|password)/i

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface Logger {
  debug(message: string, fields?: Record<string, unknown>): void
  info(message: string, fields?: Record<string, unknown>): void
  warn(message: string, fields?: Record<string, unknown>): void
  error(message: string, fields?: Record<string, unknown>): void
}

export function redact(value: unknown, depth = 0): unknown {
  if (depth > 4) return '[depth]'
  if (value === null || value === undefined) return value
  if (typeof value === 'string') {
    return value
      .replace(/(Bearer\s+)[A-Za-z0-9._~+/=-]+/gi, '$1<redacted>')
      .replace(/(sk-[A-Za-z0-9_-]{8})[A-Za-z0-9_-]+/g, '$1…')
  }
  if (typeof value !== 'object') return value
  if (Array.isArray(value)) return value.slice(0, 20).map(item => redact(item, depth + 1))
  const out: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    out[key] = SECRET_KEYS.test(key) ? '<redacted>' : redact(item, depth + 1)
  }
  return out
}

export function createLogger(level: LogLevel = 'info'): Logger {
  const order: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 }
  const enabled = (candidate: LogLevel) => order[candidate] >= order[level]
  const write = (candidate: LogLevel, message: string, fields?: Record<string, unknown>) => {
    if (!enabled(candidate)) return
    const line = {
      time: new Date().toISOString(),
      level: candidate,
      message,
      ...(fields === undefined ? {} : { fields: redact(fields) }),
    }
    const target = candidate === 'error' ? console.error : candidate === 'warn' ? console.warn : console.log
    target(JSON.stringify(line))
  }
  return {
    debug: (message, fields) => write('debug', message, fields),
    info: (message, fields) => write('info', message, fields),
    warn: (message, fields) => write('warn', message, fields),
    error: (message, fields) => write('error', message, fields),
  }
}
