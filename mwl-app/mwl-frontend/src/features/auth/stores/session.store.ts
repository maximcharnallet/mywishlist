import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SessionUser } from '@/features/auth/types/user.type'

export const sessionStore = defineStore('session', () => {
  const user = ref<SessionUser | null>(null)

  function getPayload() {
    const token = localStorage.getItem('user_token')
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  }

  function getId() {
    return getPayload()?.id ?? ''
  }

  function setUser(newUser: SessionUser) {
    user.value = newUser
  }

  function updateUser(partial: Partial<SessionUser>) {
    if (!user.value) return
    user.value = { ...user.value, ...partial }
  }

  const name = computed(() => user.value?.name ?? '')
  const avatarColor = computed(() => user.value?.avatarColor ?? '#F25C74')

  function logout() {
    localStorage.removeItem('user_token')
    user.value = null
  }

  return { 
    user, 
    name, 
    avatarColor, 
    getId, 
    setUser, 
    updateUser, 
    logout }
})