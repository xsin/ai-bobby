/** Friendly relative time, e.g. 刚刚 / 12 分钟前 / 3 小时前 / 昨天 / 4 天前. */
export function relativeTime(atMs: number, nowMs = Date.now()): string {
  const minutes = Math.max(0, Math.round((nowMs - atMs) / 60_000))
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  if (hours < 36) return '昨天'
  return `${Math.round(hours / 24)} 天前`
}
