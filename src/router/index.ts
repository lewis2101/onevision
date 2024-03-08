import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/ru'
  },
  {
    path: '/:locale(ru|kk)',
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
