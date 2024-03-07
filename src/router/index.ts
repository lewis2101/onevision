import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/ru'
  },
  {
    path: '/:locale(ru|kk)',
    name: 'main',
    component: () => import('@/views/Main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
