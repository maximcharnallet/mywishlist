import { ref } from 'vue'
import { getMe } from '@/features/auth/services/user.service'
import { sessionStore } from '@/features/auth/stores/session.store'

export function useGetMe() {
  const store = sessionStore()
  const isErrorGetMe = ref(false)
  const errorMessageGetMe = ref('')
  const isLoadingGetMe = ref(false)

  async function doGetMe() {
    isLoadingGetMe.value = true
    try {
      const me = await getMe()
      store.setUser(me)
    } catch (error: any) {
      isErrorGetMe.value = true
      errorMessageGetMe.value = error.message
    } finally {
      isLoadingGetMe.value = false
    }
  }

  return { 
    doGetMe, 
    isErrorGetMe, 
    errorMessageGetMe, 
    isLoadingGetMe 
  }
}