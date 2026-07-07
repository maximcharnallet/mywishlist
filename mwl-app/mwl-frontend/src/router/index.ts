import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '@/features/auth/components/Login.vue'
import Register from '@/features/auth/components/Register.vue'
import Accueil from '@/features/wishlist/components/Accueil.vue'

const publicRoutes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
]

const privateRoutes: RouteRecordRaw[] = [
  { path: '/accueil', name: 'accueil', component: Accueil, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    ...publicRoutes,
    ...privateRoutes,
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }
})

export default router