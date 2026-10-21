import type { Category } from '@/types'

export const categorySlug: Record<Category, string> = {
  数码: 'digital',
  书籍: 'book',
  生活: 'life',
  运动: 'sport',
  其他: 'other',
}

export const categoryCover: Record<Category, string> = {
  数码: '📱',
  书籍: '📚',
  生活: '🪑',
  运动: '🏸',
  其他: '📦',
}
