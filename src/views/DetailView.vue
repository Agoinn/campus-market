<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router'
import { useItemsStore } from '@/stores/items'
import { categorySlug } from '@/utils/category'
import { formatPrice, formatRelativeTime } from '@/utils/format'
import { computed } from 'vue'
import { showToast } from 'vant'
import { useFavoritesStore } from '@/stores/favorites'
const favorites = useFavoritesStore()
const isFavorite = computed(() => (item ?
  favorites.isFavorite(item.id) : false))
function contact(){
  showToast('演示页: 这里以后接聊天或者卖家联系方式')
}
const route = useRoute()
const router = useRouter()
const itemsStore = useItemsStore()
const item = itemsStore.items.find((i) => i.id === route.params.id)

function goBack(){
  if(window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <div class="page detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="goBack"></van-nav-bar>
    <template v-if="item">
      <div class="detail__cover" :class="`cover--${categorySlug[item.category]}`">
        <img v-if="item.image" :src="item.image" alt="" />
        <span v-else aria-hidden="true">{{ item.cover }}</span>
      </div>
      <section class="detail__main">
        <div class="detail__priece-row">
          <span class="price-tag">{{ formatPrice(item.price) }}</span>
          <span class="detail__condition">{{ item.condition }}</span>
        </div>
        <h1 class="detail__title display">{{ item.title }}</h1>
          <div class="detail__meta">
            <span>{{ item.category }}</span>
            <span>{{ formatRelativeTime(item.createdAt) }}</span>
          </div>
          <p class="detail__desc">{{ item.description }}</p>
      </section>
      <div class="detail__seller">
        <div class="detail__avater">{{ item.seller.slice(0,1) }}</div>
        <div class="detail__seller-info">
          <strong>{{ item.seller }}</strong>
          <span>{{ item.campus }}</span>
        </div>
      </div>
      <van-action-bar safe-area-inset-bottom>
        <van-action-bar-icon
          :icon="isFavorite ? 'star' : 'star-o'"
          :text="isFavorite ? '已收藏' : '收藏'"
          :color="isFavorite ? '#f25c2a' : undefined"
          @click="favorites.toggle(item.id)"
        />
        <van-action-bar-button type="primary" text="联系商家" @click="contact"/>
      </van-action-bar>
    </template>
    <van-empty v-else description="这件东西可能已经被卖掉了">
      <van-button round type="primary" @click="router.replace('/')">回首页看看</van-button>
    </van-empty>
  </div>
</template>
<style scoped>
  .detail__cover{
    display: grid;
    place-items: center;
    aspect-ratio: 4 / 3;
    font-size: 96px;
  }
  .detail{
    padding: 0 0 88px;
  }
  .detail__main{
    padding: 18px 16px 24px;
  }
  .detail__priece-row{
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .detail__condition{
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
  .detail__meta{
    display: flex;
    gap: 12px;
    color: var(--ink-soft);
    font-size: 12px;
  }
  .detail__desc{
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.75;
    white-space: pre-wrap;
  }
  .detail__seller{
    display: flex;
    align-items: center;
    gap:12px;
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid  var(--line);
  }
  .detail__avater{
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--ink);
    color: #fff;
    font-size: 18px;
  }
  .detail__seller-info{
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .detail__seller-info strong{
    font-size: 14px;
  }
  .detail__seller-info span{
    color: var(--ink-soft);
    font-size: 12px;
  }
  .detail :deep(.van-action-bar){
    border-top: 1px solid var(--line);
    background: var(--surface);
  }
  .detail :deep(.van-action-bar-button){
    border-radius: 4px;
  }
  .detail__cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>