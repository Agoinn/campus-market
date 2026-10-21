<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

import { useFavoritesStore } from '@/stores/favorites'
import { useItemsStore } from '@/stores/items'
import { categorySlug } from '@/utils/category'
import { formatPrice, formatRelativeTime } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const itemsStore = useItemsStore()
const favorites = useFavoritesStore()

const item = computed(() => itemsStore.findById(String(route.params.id)))
const isFavorite = computed(() => (item.value ? favorites.isFavorite(item.value.id) : false))

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

function contact() {
  showToast('演示页：这里以后接聊天或卖家联系方式')
}
</script>

<template>
  <div class="page detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="goBack" />

    <template v-if="item">
      <div class="detail__cover" :class="`cover--${categorySlug[item.category]}`">
        <span aria-hidden="true">{{ item.cover }}</span>
      </div>

      <section class="detail__main">
        <div class="detail__price-row">
          <span class="price-tag">{{ formatPrice(item.price) }}</span>
          <span class="detail__condition">{{ item.condition }}</span>
        </div>

        <h1 class="detail__title display">{{ item.title }}</h1>

        <div class="detail__meta">
          <span>{{ item.category }}</span>
          <span>{{ formatRelativeTime(item.createdAt) }}</span>
        </div>

        <p class="detail__desc">{{ item.description }}</p>

        <div class="detail__seller">
          <div class="detail__avatar">{{ item.seller.slice(0, 1) }}</div>
          <div class="detail__seller-info">
            <strong>{{ item.seller }}</strong>
            <span>{{ item.campus }}</span>
          </div>
        </div>
      </section>

      <van-action-bar safe-area-inset-bottom>
        <van-action-bar-icon
          :icon="isFavorite ? 'star' : 'star-o'"
          :text="isFavorite ? '已收藏' : '收藏'"
          :color="isFavorite ? '#f25c2a' : undefined"
          @click="favorites.toggle(item.id)"
        />
        <van-action-bar-button type="primary" text="联系卖家" @click="contact" />
      </van-action-bar>
    </template>

    <van-empty v-else description="这件东西可能已经被卖掉了">
      <van-button round type="primary" @click="router.replace('/')">回首页看看</van-button>
    </van-empty>
  </div>
</template>

<style scoped>
.detail {
  padding: 0 0 96px;
}

.detail :deep(.van-nav-bar) {
  background: var(--paper);
}

.detail__cover {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  font-size: 96px;
}

.detail__main {
  padding: 18px 16px 24px;
}

.detail__price-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail__condition {
  padding: 2px 8px;
  border: 1px solid var(--line);
  border-radius: 3px;
  color: var(--ink-soft);
  font-size: 12px;
}

.detail__title {
  margin: 12px 0 8px;
  font-size: 24px;
  line-height: 1.3;
}

.detail__meta {
  display: flex;
  gap: 12px;
  color: var(--ink-soft);
  font-size: 12px;
}

.detail__desc {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.75;
  white-space: pre-wrap;
}

.detail__seller {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.detail__avatar {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--ink);
  color: #fff;
  font-family: Georgia, 'Songti SC', serif;
  font-size: 18px;
}

.detail__seller-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail__seller-info strong {
  font-size: 14px;
}

.detail__seller-info span {
  color: var(--ink-soft);
  font-size: 12px;
}

.detail :deep(.van-action-bar) {
  border-top: 1px solid var(--line);
  background: var(--surface);
}

.detail :deep(.van-action-bar-button) {
  border-radius: 4px;
}
</style>
