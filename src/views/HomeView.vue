<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ItemCard from '@/components/ItemCard.vue'
import { useItemsStore } from '@/stores/items'
import { CATEGORIES, type Category } from '@/types'

const router = useRouter()
const itemsStore = useItemsStore()

const keyword = ref('')
const activeCategory = ref<'全部' | Category>('全部')
const refreshing = ref(false)
const categoryOptions: readonly ('全部' | Category)[] = ['全部', ...CATEGORIES]

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()

  return itemsStore.items.filter((item) => {
    const matchCategory = activeCategory.value === '全部' || item.category === activeCategory.value
    const matchKeyword =
      !kw || `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(kw)
    return matchCategory && matchKeyword
  })
})

const featured = computed(() => filtered.value[0])
const rest = computed(() => filtered.value.slice(1))

onMounted(() => {
  itemsStore.load()
})

async function onRefresh() {
  await new Promise((resolve) => window.setTimeout(resolve, 500))
  refreshing.value = false
}

function openItem(id: string) {
  router.push(`/item/${id}`)
}
</script>

<template>
  <main class="page home">
    <header class="home__header">
      <div class="home__title-row">
        <h1 class="display">校园集市</h1>
        <span class="stamp">今日 {{ itemsStore.items.length }} 件</span>
      </div>
      <p class="home__subtitle">把闲置交给下一个同学</p>
      <van-search
        v-model="keyword"
        background="transparent"
        placeholder="搜一搜：教材、耳机、自行车"
      />
    </header>

    <nav class="category-tabs" aria-label="商品分类">
      <button
        v-for="category in categoryOptions"
        :key="category"
        class="category-tab"
        :class="{ 'category-tab--active': activeCategory === category }"
        type="button"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </nav>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div v-if="itemsStore.loading" class="skeleton-wrap">
        <van-skeleton title :row="3" />
        <van-skeleton title :row="3" />
      </div>

      <template v-else-if="filtered.length">
        <ItemCard v-if="featured" :item="featured" featured @open="openItem" />
        <div class="item-grid">
          <ItemCard v-for="item in rest" :key="item.id" :item="item" @open="openItem" />
        </div>
      </template>

      <van-empty v-else description="没有找到，换个词试试" />
    </van-pull-refresh>
  </main>
</template>

<style scoped>
.home__header {
  padding: 12px 0 4px;
  border-bottom: 1px solid var(--line);
}

.home__title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.home h1 {
  font-size: 34px;
  line-height: 1.1;
}

.home__subtitle {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 13px;
}

.stamp {
  padding: 4px 8px;
  border: 1.5px solid var(--accent);
  border-radius: 3px;
  color: var(--accent);
  font-family: Georgia, 'Songti SC', serif;
  font-size: 12px;
  white-space: nowrap;
  transform: rotate(-4deg);
}

.home :deep(.van-search) {
  padding: 12px 0 4px;
}

.home :deep(.van-search__content) {
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--surface);
}

.category-tabs {
  display: flex;
  gap: 8px;
  padding: 14px 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  flex: 0 0 auto;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: transparent;
  color: var(--ink-soft);
  font-size: 13px;
  cursor: pointer;
}

.category-tab--active {
  border-color: var(--ink);
  background: var(--ink);
  color: #fff;
}

.skeleton-wrap {
  display: grid;
  gap: 12px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
</style>
