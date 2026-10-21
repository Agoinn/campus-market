const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp

  if (diff < MINUTE) return '刚刚'
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} 分钟前`
  if (diff < DAY) return `${Math.floor(diff / HOUR)} 小时前`
  if (diff < 7 * DAY) return `${Math.floor(diff / DAY)} 天前`

  const date = new Date(timestamp)
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日`
}

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('zh-CN')}`
}
