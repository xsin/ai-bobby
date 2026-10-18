import { describe, expect, it } from 'vitest'
import { messages } from './i18n'

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, shape(child)]),
    )
  }
  return typeof value
}

describe('i18n', () => {
  it('keeps zh/en content structurally aligned', () => {
    expect(shape(messages.en)).toEqual(shape(messages.zh))
  })
})
