import { ref } from 'vue'
import { updateProfile } from '@/features/auth/services/user.service'
import { sessionStore } from '@/features/auth/stores/session.store'

export function useUpdateProfile() {
  const store = sessionStore()
  const isErrorUpdateProfile = ref(false)
  const errorMessageUpdateProfile = ref('')
  const isLoadingUpdateProfile = ref(false)

  async function doUpdateProfile(data: { name?: string; avatarColor?: string }): Promise<boolean> {
    isLoadingUpdateProfile.value = true
    isErrorUpdateProfile.value = false
    try {
      const updated = await updateProfile(data)
      store.updateUser(updated)
      return true
    } catch (error: any) {
      isErrorUpdateProfile.value = true
      errorMessageUpdateProfile.value = error.message
      return false
    } finally {
      isLoadingUpdateProfile.value = false
    }
  }

  return { 
    doUpdateProfile, 
    isErrorUpdateProfile, 
    errorMessageUpdateProfile, 
    isLoadingUpdateProfile 
  }
}