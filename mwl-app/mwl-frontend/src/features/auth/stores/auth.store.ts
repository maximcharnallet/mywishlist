import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRegister } from '../composables/useRegister'
import { useSignin } from '../composables/useSignin'

export const authStore = defineStore('auth', () => {
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')

  const { isErrorRegister, errorMessageRegister, isLoadingRegister, doRegister } = useRegister()

  const { isErrorAuth, errorMessageAuth, isLoadingAuth, doSignin } = useSignin()

  async function handleRegister() {
    await doRegister(
      name.value,
      email.value,
      password.value,
      passwordConfirm.value
    )
    name.value = ''
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
  }

  async function handleSignin() {
    await doSignin(email.value, password.value)
    email.value = ''
    password.value = ''
  }

  return{
    name,
    email,
    password,
    passwordConfirm,
    isErrorRegister,
    errorMessageRegister,
    isLoadingRegister,
    handleRegister,
    isErrorAuth,
    errorMessageAuth,
    isLoadingAuth,
    handleSignin,
  }
  
})