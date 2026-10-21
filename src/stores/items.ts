import { defineStore } from 'pinia'

import { fetchItems } from '@/api/items'
import { seedItems } from '@/data/items'
import type { Item, NewItem } from '@/types'

const STORAGE_KEY = 'campus-market:items'

function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Item[]
  } catch {
    // 本地数据损坏时退回种子数据
  }
  return seedItems
}

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: loadItems(),
    loaded: false,
    loading: false,
  }),

  getters: {
    published: (state) => state.items.filter((item) => item.owner === 'me'),
    findById: (state) => (id: string) => state.items.find((item) => item.id === id),
  },

  actions: {
    async load() {
      if (this.loaded || this.loading) return
      this.loading = true
      try {
        const remote = await fetchItems()
        const mine = this.items.filter((item) => item.owner === 'me')
        this.items = [...mine, ...remote]
        this.loaded = true
      } finally {
        this.loading = false
      }
    },

    add(input: NewItem) {
      const item: Item = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        owner: 'me',
      }
      this.items.unshift(item)
      this.persist()
      return item
    },

    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      } catch {
        // 存储空间不足时不影响当前会话
      }
    },
  },
})
