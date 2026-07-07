<script setup lang="ts">
  import router from '@/router'
  import { useSignin } from '@/features/auth/composables/useSignin'
  import { authStore } from '@/features/auth/store/auth.store'
  import { storeToRefs } from 'pinia'

  const store = authStore()
  const { email, password} = storeToRefs(store)
  const { doSignin } = useSignin()

  async function handleSignin(){
    await doSignin(email.value, password.value)
  }

  function toRegister() {
    router.push({ name: 'register' })
}
</script>
<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card width="400">
      <h1 class="text-center mt-4">
        My Whish List
      </h1>
      <v-img src="/logo.png" height="150"></v-img>
      <v-card-title class="text-center">Connexion</v-card-title>
      <v-card-text>
          <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
          <v-text-field v-model="password" label="Mot de passe" type="password" required></v-text-field>
          <v-btn color="primary" class="mt-4" block @click="handleSignin">Se connecter</v-btn>
          <v-btn color="primary" class="mt-2" block @click="toRegister">S'enregistrer</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
  