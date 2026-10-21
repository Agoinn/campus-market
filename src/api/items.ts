import { seedItems } from '@/data/items'
import type { Item } from '@/types'

/**
 * 骨架阶段用本地数据模拟接口，故意保留异步，方便练习 loading / 错误态。
 * 接真实后端时替换成：
 *   return (await http.get<Item[]>('/items')).data
 */
export function fetchItems(): Promise<Item[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(seedItems), 450)
  })
}
