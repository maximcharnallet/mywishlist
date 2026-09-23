import { ref } from 'vue'
import { deleteProfile } from '@/features/auth/services/user.service'
import { sessionStore } from '@/features/auth/stores/session.store'

export function useDeleteProfile() {
  const store = sessionStore()
  const isErrorDeleteProfile = ref(false)
  const errorMessageDeleteProfile = ref('')
  const isLoadingDeleteProfile = ref(false)

  async function doDeleteProfile(): Promise<boolean> {
    isLoadingDeleteProfile.value = true
    isErrorDeleteProfile.value = false
    try {
      await deleteProfile()
      store.logout()
      return true
    } catch (error: any) {
      isErrorDeleteProfile.value = true
      errorMessageDeleteProfile.value = error.message
      return false
    } finally {
      isLoadingDeleteProfile.value = false
    }
  }

  return {
    doDeleteProfile,
    isErrorDeleteProfile,
    errorMessageDeleteProfile,
    isLoadingDeleteProfile,
  }
}