import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRegister } from '../composables/useRegister'

export const authStore = defineStore('auth', () => {
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')

  const { isError, errorMessage, isLoading, doRegister } = useRegister()

  async function handleRegister() {
    await doRegister(
      name.value,
      email.value,
      password.value,
      passwordConfirm.value
    )
  }

  return{
    name,
    email,
    password,
    passwordConfirm,
    isError,
    errorMessage,
    isLoading,
    handleRegister,
  }
  
})