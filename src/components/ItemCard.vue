<script setup lang="ts">
import { computed } from 'vue'

import { useFavoritesStore } from '@/stores/favorites'
import type { Item } from '@/types'
import { categorySlug } from '@/utils/category'
import { formatPrice, formatRelativeTime } from '@/utils/format'

const props = defineProps<{
  item: Item
  featured?: boolean
}>()

const emit = defineEmits<{
  open: [id: string]
}>()

const favorites = useFavoritesStore()
const isFavorite = computed(() => favorites.isFavorite(props.item.id))

function open() {
  emit('open', props.item.id)
}
</script>

<template>
  <article
    class="item-card"
    :class="{ 'item-card--featured': featured }"
    role="button"
    tabindex="0"
    @click="open"
    @keydown.enter="open"
  >
    <div class="item-card__cover" :class="`cover--${categorySlug[item.category]}`">
      <span class="item-card__emoji" aria-hidden="true">{{ item.cover }}</span>
      <button
        class="item-card__fav"
        :class="{ 'is-fav': isFavorite }"
        type="button"
        :aria-label="isFavorite ? '取消收藏' : '收藏'"
        @click.stop="favorites.toggle(item.id)"
      >
        <van-icon :name="isFavorite ? 'star' : 'star-o'" />
      </button>
    </div>

    <div class="item-card__body">
      <h3 class="item-card__title">{{ item.title }}</h3>
      <div class="item-card__meta">
        <span>{{ item.condition }}</span>
        <span>{{ item.category }}</span>
      </div>
      <div class="item-card__foot">
        <span class="item-card__price">{{ formatPrice(item.price) }}</span>
        <span v-if="featured" class="item-card__time">{{ formatRelativeTime(item.createdAt) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.item-card--featured {
  margin-bottom: 12px;
}

@media (hover: hover) {
  .item-card:hover {
    border-color: var(--ink);
  }
}

.item-card:active {
  transform: scale(0.99);
}

.item-card__cover {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
}

.item-card--featured .item-card__cover {
  aspect-ratio: 16 / 7;
}

.item-card__emoji {
  font-size: 52px;
  line-height: 1;
  filter: saturate(0.9);
}

.item-card--featured .item-card__emoji {
  font-size: 76px;
}

.item-card__fav {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid rgba(23, 35, 59, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
  font-size: 17px;
  cursor: pointer;
}

.item-card__fav.is-fav {
  color: var(--accent);
}

.item-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px 12px;
}

.item-card__title {
  display: -webkit-box;
  min-height: 39px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-card--featured .item-card__title {
  min-height: 0;
  font-size: 18px;
}

.item-card__meta {
  display: flex;
  gap: 8px;
  color: var(--ink-soft);
  font-size: 11px;
}

.item-card__meta span {
  padding: 1px 6px;
  border: 1px solid var(--line);
  border-radius: 3px;
}

.item-card__foot {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: auto;
}

.item-card__price {
  color: var(--accent);
  font-family: 'Bahnschrift', 'DIN Alternate', 'Arial Narrow', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.item-card--featured .item-card__price {
  font-size: 22px;
}

.item-card__time {
  color: var(--ink-soft);
  font-size: 11px;
}
</style>
