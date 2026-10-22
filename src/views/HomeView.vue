<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import { CATEGORIES, type Category } from '@/types'
import { computed, ref } from 'vue'
const keyword = ref('')
import { useItemsStore } from '@/stores/items'
const itemsStore = useItemsStore()
itemsStore.load()
const refreshing = ref(false)
async function onRefresh() {
  await itemsStore.reload()
  refreshing.value = false
}
const activeCategory = ref<'全部' | Category>('全部')
const categoryOptions: ('全部' | Category)[] = ['全部', ...CATEGORIES]
const filtered = computed(() => {
  const kw = keyword.value.trim()
  return itemsStore.items.filter((item) => {
    const byCategory = activeCategory.value === '全部' || item.category === activeCategory.value
    const byKeyword = !kw || item.title.includes(kw)
    return byCategory && byKeyword
  })
})
const featured = computed(() => filtered.value[0])
const rest = computed(() => filtered.value.slice(1))
import { useRouter } from 'vue-router'
const router = useRouter()
function openItem(id: string) {
  router.push(`/item/${id}`)
}
</script>

<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <main class="page home">
    <!-- 从这里开始，自己写 -->
    <div class="home__header">
      <h1 class="display">校园集市</h1>
      <p class="home__sub">把闲置交给下一个同学</p>
    </div>
    <van-search v-model="keyword" placeholder="搜一搜:教材、耳机、自行车" />
      <nav class="category-tabs">
        <button v-for="category in categoryOptions" :key="category" class="category-tab" :class="{'is-active' : activeCategory === category}" @click="activeCategory = category">
          {{ category }}
        </button>
      </nav>
    
      <van-skeleton v-if="itemsStore.loading" title :row="3" />
      <template v-else-if="filtered.length">
        <p class="home__count">共{{ filtered.length }} 件</p>
        <item-card v-if="featured" :item="featured" featured @open="openItem" />
        <div class="item-grid">
          <ItemCard v-for="item in rest" :key="item.id" :item="item" @open="openItem" />
        </div>
      </template>

      <van-empty v-else description="没有找到,换个词试试" />
    
  </main>
  </van-pull-refresh>
</template>

<style scoped>
.item-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.category-tabs{
  display: flex;
  gap: 8px;
  margin: 12px 0 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.category-tab{
  flex:none;
  padding: 6px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink-soft);
  font-size: 13px;
  cursor: var(--paper);
}
.home__header{
  margin-bottom: 16px;
}
.home__sub{
  margin-top: 4px;
  color: var(--ink-soft);
  font-size: 13px;
}
.home__count{
  margin-bottom: 10px;
  color: var(--ink-soft);
  font-size: 12px;
}
</style>
