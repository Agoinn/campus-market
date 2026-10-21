<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showTabbar = computed(() => route.meta.tabbar !== false)
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <van-tabbar v-if="showTabbar" route safe-area-inset-bottom>
      <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/publish" icon="add-o">发布</van-tabbar-item>
      <van-tabbar-item replace to="/favorites" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
