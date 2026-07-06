import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/features/auth/services/register.service'

export function useRegister () {
  const router = useRouter()
  const isError = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  async function doRegister (name: string, email: string, password: string, passwordConfirm: string) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      isError.value = true
      errorMessage.value = 'Veuillez remplir tous les champs'
      return
    }
    console.log({name, email, password, passwordConfirm})
    isLoading.value = true
    try {
      await register(name, email, password, passwordConfirm)
      router.push('/login')
    } catch (error: any) {
      isError.value = true
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }
  return {
    doRegister,
    isError,
    errorMessage,
    isLoading,
  }
}
