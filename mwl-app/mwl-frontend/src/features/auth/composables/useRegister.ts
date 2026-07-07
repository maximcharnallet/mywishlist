import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/features/auth/services/register.service'

export function useRegister () {
  const router = useRouter()
  const isErrorRegister = ref(false)
  const errorMessageRegister = ref('')
  const isLoadingRegister = ref(false)

  async function doRegister (name: string, email: string, password: string, passwordConfirm: string) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      isErrorRegister.value = true
      errorMessageRegister.value = 'Veuillez remplir tous les champs'
      return
    }
    isLoadingRegister.value = true
    try {
      await register(name, email, password, passwordConfirm)
      router.push('/login')
    } catch (error: any) {
      isErrorRegister.value = true
      errorMessageRegister.value = error.message
    } finally {
      isLoadingRegister.value = false
    }
  }
  return {
    doRegister,
    isErrorRegister,
    errorMessageRegister,
    isLoadingRegister,
  }
}
