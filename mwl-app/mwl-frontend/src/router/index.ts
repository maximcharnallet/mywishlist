import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/features/auth/components/Login.vue'
import Register from '@/features/auth/components/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    }
  ],
})

export default router
