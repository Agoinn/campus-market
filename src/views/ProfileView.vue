<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

import ItemCard from '@/components/ItemCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useItemsStore } from '@/stores/items'

const router = useRouter()
const itemsStore = useItemsStore()
const favorites = useFavoritesStore()

const published = computed(() => itemsStore.published)

function notReady(label: string) {
  showToast(`${label}页面还没做，先留着`)
}

function openItem(id: string) {
  router.push(`/item/${id}`)
}
</script>

<template>
  <main class="page profile">
    <header class="profile__card">
      <div class="profile__avatar">山</div>
      <div class="profile__identity">
        <h1 class="display">校园用户</h1>
        <p>山西工程技术学院 2027 届</p>
      </div>
    </header>

    <div class="profile__stats">
      <div>
        <strong>{{ published.length }}</strong>
        <span>我发布的</span>
      </div>
      <div>
        <strong>{{ favorites.count }}</strong>
        <span>收藏</span>
      </div>
    </div>

    <van-cell-group inset>
      <van-cell title="设置" is-link @click="notReady('设置')" />
      <van-cell title="关于这个项目" is-link @click="notReady('关于')" />
    </van-cell-group>

    <section v-if="published.length" class="profile__posts">
      <h2 class="display">我发布的</h2>
      <div class="item-grid">
        <ItemCard
          v-for="item in published"
          :key="item.id"
          :item="item"
          @open="openItem"
        />
      </div>
    </section>

    <van-empty v-else description="还没发布过东西，去发一件吧">
      <van-button round type="primary" @click="router.push('/publish')">去发布</van-button>
    </van-empty>
  </main>
</template>

<style scoped>
.profile__card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border-radius: var(--radius);
  background: var(--ink);
  color: #fff;
}

.profile__avatar {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--accent);
  font-family: Georgia, 'Songti SC', serif;
  font-size: 22px;
}

.profile__identity h1 {
  font-size: 22px;
  line-height: 1.2;
}

.profile__identity p {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.profile__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 14px 0 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.profile__stats div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 14px 0;
}

.profile__stats div + div {
  border-left: 1px solid var(--line);
}

.profile__stats strong {
  font-family: 'Bahnschrift', 'DIN Alternate', sans-serif;
  font-size: 22px;
}

.profile__stats span {
  color: var(--ink-soft);
  font-size: 12px;
}

.profile :deep(.van-cell-group--inset) {
  margin: 0;
}

.profile__posts {
  margin-top: 24px;
}

.profile__posts h2 {
  margin-bottom: 12px;
  font-size: 18px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
</style>
