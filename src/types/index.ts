export const CATEGORIES = ['数码', '书籍', '生活', '运动', '其他'] as const
export type Category = (typeof CATEGORIES)[number]

export const CONDITIONS = ['全新', '九成新', '八成新', '七成新', '有使用痕迹'] as const
export type Condition = (typeof CONDITIONS)[number]

export interface Item {
  id: string
  title: string
  price: number
  category: Category
  condition: Condition
  description: string
  seller: string
  campus: string
  cover: string
  createdAt: number
  owner: 'seed' | 'me'
}

export type NewItem = Omit<Item, 'id' | 'createdAt' | 'owner'>
