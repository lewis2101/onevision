import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {checkAuth} from "@/api/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/ru'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'login'
  },
  {
    path: '/:locale(ru|kk)',
    beforeEnter: async (to, from, next) => {
      await checkAuth()
      next()
    },
    component: () => import('@/components/base-layout.vue'),
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('@/views/Main.vue')
      },
      {
        path: 'diagram',
        name: 'diagram',
        component: () => import('@/views/Diagram.vue')
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/Report.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
