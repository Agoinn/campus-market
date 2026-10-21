import { defineStore } from 'pinia'

const STORAGE_KEY = 'campus-market:favorites'

function loadIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as string[]
  } catch {
    // 读不到就当作没有收藏
  }
  return []
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: loadIds(),
  }),

  getters: {
    count: (state) => state.ids.length,
    isFavorite: (state) => (id: string) => state.ids.includes(id),
  },

  actions: {
    toggle(id: string) {
      this.ids = this.ids.includes(id)
        ? this.ids.filter((item) => item !== id)
        : [...this.ids, id]

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids))
      } catch {
        // 存储失败时只保留内存状态
      }
    },
  },
})
