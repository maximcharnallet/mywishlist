import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signin } from '@/features/auth/services/auth.service'

export function useSignin () {
  const router = useRouter()
  const isErrorAuth = ref(false)
  const errorMessageAuth = ref('')
  const isLoadingAuth = ref(false)

  async function doSignin (email: string, password: string) {
    isErrorAuth.value = false
    if (!email.trim() || !password.trim()) {
      isErrorAuth.value = true
      errorMessageAuth.value = 'Veuillez remplir tous les champs'
      return
    }
    isLoadingAuth.value = true
    try {
      await signin(email, password)
      router.push('/accueil')
    } catch (error: any) {
      isErrorAuth.value = true
      errorMessageAuth.value = error.message
    } finally {
      isLoadingAuth.value = false
    }
  }
  return {
    doSignin,
    isErrorAuth,
    errorMessageAuth,
    isLoadingAuth,
  }
}
