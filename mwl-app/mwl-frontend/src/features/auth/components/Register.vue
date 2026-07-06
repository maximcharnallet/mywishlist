<script setup lang="ts">
  import { authStore } from '@/features/auth/store/auth.store'
  import { storeToRefs } from 'pinia'

  const store = authStore()
  const { name, email, password, passwordConfirm, isError, errorMessage, isLoading } = storeToRefs(store)

  async function handleRegister() {
    await store.handleRegister()
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
        <v-alert v-if="isError" type="error" class="mb-4" density="compact" closable>
          {{ errorMessage }}
        </v-alert>
        <v-text-field v-model="name" label="Nom" type="text" required></v-text-field> 
        <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="password" label="Mot de passe" type="password" required></v-text-field>
        <v-text-field v-model="passwordConfirm" label="Confirmer le mot de passe" type="password" required></v-text-field>
        <v-btn color="primary" class="mt-2" block @click="handleRegister" :loading="isLoading">
          S'enregistrer
        </v-btn>
        <a href="/login" class="mt-2 d-block text-center">Connexion</a>
      </v-card-text>
    </v-card>
  </v-container> 
</template>
