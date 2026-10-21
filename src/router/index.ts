import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { tabbar: true },
    },
    {
      path: '/item/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
      meta: { tabbar: false },
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/PublishView.vue'),
      meta: { tabbar: true },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
      meta: { tabbar: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { tabbar: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
