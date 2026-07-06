import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signin } from '@/features/auth/services/auth.service'

export function useSignin () {
  const router = useRouter()
  const isError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  async function doSignin (email: string, password: string) {
    isError.value = false
    if (!email.trim() || !password.trim()) {
      isError.value = true
      errorMessage.value = 'Veuillez remplir tous les champs'
      return
    }
    isLoading.value = true
    try {
      await signin(email, password)
      router.push('/accueil')
    } catch (error: any) {
      isError.value = true
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }
  return {
    doSignin,
    isError,
    errorMessage,
    isLoading,
  }
}
