<script setup lang="ts">
  import { ref } from 'vue'
  import router from '@/router'
  import { useRegister } from '@/features/auth/composables/useRegister'


  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')

  const { doRegister, isErrorRegister, errorMessageRegister, isLoadingRegister } = useRegister()



  async function handleRegister() {
    await doRegister(name.value, email.value, password.value, passwordConfirm.value)
    name.value = ''
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
  }

  function toLogin() {
    router.push({ name: 'login' })
  }

</script>
<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card width="400">
      <h1 class="text-center mt-4">
        My Whish List
      </h1>
      <v-img src="/logo.png" height="150"></v-img>
      <v-card-title class="text-center">Inscription</v-card-title>
      <v-card-text>
        <v-alert v-if="isErrorRegister" type="error" class="mb-4" density="compact" closable>
          {{ errorMessageRegister }}
        </v-alert>
        <v-form @submit.prevent="handleRegister">
          <v-text-field v-model="name" label="Nom" type="text" required></v-text-field> 
          <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
          <v-text-field v-model="password" label="Mot de passe" type="password" required></v-text-field>
          <v-text-field v-model="passwordConfirm" label="Confirmer le mot de passe" type="password" required></v-text-field>
          <v-btn type="submit" color="primary" class="mt-2" block :loading="isLoadingRegister">
            S'enregistrer
          </v-btn>
        </v-form>
        <a href="#" class="mt-2 d-block text-center" @click.prevent="toLogin">Connexion</a>
      </v-card-text>
    </v-card>
  </v-container> 
</template>
