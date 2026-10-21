<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import ItemCard from '@/components/ItemCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useItemsStore } from '@/stores/items'

const router = useRouter()
const itemsStore = useItemsStore()
const favorites = useFavoritesStore()

const favoriteItems = computed(() =>
  itemsStore.items.filter((item) => favorites.isFavorite(item.id)),
)

function openItem(id: string) {
  router.push(`/item/${id}`)
}
</script>

<template>
  <main class="page favorites">
    <header class="favorites__header">
      <h1 class="display">收藏</h1>
      <p>{{ favorites.count }} 件想再看看的东西</p>
    </header>

    <div v-if="favoriteItems.length" class="item-grid">
      <ItemCard
        v-for="item in favoriteItems"
        :key="item.id"
        :item="item"
        @open="openItem"
      />
    </div>

    <van-empty v-else description="还没有收藏，去首页逛逛">
      <van-button round type="primary" @click="router.push('/')">去首页</van-button>
    </van-empty>
  </main>
</template>

<style scoped>
.favorites__header {
  padding: 8px 0 18px;
}

.favorites h1 {
  font-size: 30px;
  line-height: 1.2;
}

.favorites__header p {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 13px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
</style>
