import { createRouter, createWebHistory } from 'vue-router'
import DocsView from '../views/DocsView.vue'

export type Route = typeof routes[0];
export const routes = [
  {
    path: '/',
    name: 'docs',
    label: 'Врачи',
    component: DocsView,
  },
  {
    path: '/nurses',
    name: 'nurses',
    label: 'Медсестры',
    component: () => import('../views/NursesView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
