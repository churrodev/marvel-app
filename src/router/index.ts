import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/series/:id',
      name: 'SeriesDetail',
      component: () => import('@/series/SeriesDetail.vue')
    },
    {
      path: '/favorites',
      name: 'SeriesFavorites',
      component: () => import('@/series/TheFavorites.vue')
    },
  ]
})

export default router
