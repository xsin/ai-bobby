import { describe, expect, it } from 'vitest'
import { relativeTime } from './relative-time'

const NOW = Date.UTC(2026, 9, 19, 3, 0, 0)
const minutes = (value: number) => value * 60_000
const hours = (value: number) => value * 60 * 60_000

describe('relativeTime', () => {
  it('labels recent backups in minutes', () => {
    expect(relativeTime(NOW - minutes(2), NOW)).toBe('2 分钟前')
    expect(relativeTime(NOW - minutes(59), NOW)).toBe('59 分钟前')
  })

  it('labels hours and days', () => {
    expect(relativeTime(NOW - hours(3), NOW)).toBe('3 小时前')
    expect(relativeTime(NOW - hours(25), NOW)).toBe('昨天')
    expect(relativeTime(NOW - hours(72), NOW)).toBe('3 天前')
  })
})
