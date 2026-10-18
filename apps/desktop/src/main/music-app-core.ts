export interface OrpheusSongPayload {
  type: 'song'
  id: number
  cmd: 'play'
}

export function normalizeSongId(value: string | number): number {
  const id = typeof value === 'number' ? value : Number.parseInt(value, 10)
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('歌曲 ID 必须是正整数')
  }
  return id
}

export function orpheusSongUrl(value: string | number): string {
  const payload: OrpheusSongPayload = { type: 'song', id: normalizeSongId(value), cmd: 'play' }
  return `orpheus://${Buffer.from(JSON.stringify(payload), 'utf8').toString('base64')}`
}
