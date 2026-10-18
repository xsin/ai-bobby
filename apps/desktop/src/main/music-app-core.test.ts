import { describe, expect, it } from 'vitest'
import { normalizeSongId, orpheusSongUrl } from './music-app-core'

describe('music app deep link', () => {
  it('matches the payload used by the NetEase web client', () => {
    expect(orpheusSongUrl(29816860)).toBe(
      'orpheus://eyJ0eXBlIjoic29uZyIsImlkIjoyOTgxNjg2MCwiY21kIjoicGxheSJ9',
    )
  })

  it('accepts numeric strings and trims no digits', () => {
    expect(normalizeSongId('3440589170')).toBe(3440589170)
    expect(orpheusSongUrl('3440589170')).toBe(
      'orpheus://eyJ0eXBlIjoic29uZyIsImlkIjozNDQwNTg5MTcwLCJjbWQiOiJwbGF5In0=',
    )
  })

  it('rejects invalid ids', () => {
    expect(() => normalizeSongId('0')).toThrow('歌曲 ID')
    expect(() => normalizeSongId('-1')).toThrow('歌曲 ID')
    expect(() => normalizeSongId('abc')).toThrow('歌曲 ID')
  })
})
