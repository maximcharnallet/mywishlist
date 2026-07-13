<script setup lang="ts">
  import { sessionStore } from '@/features/auth/stores/session.store'
  import { storeToRefs } from 'pinia'

  const store = sessionStore()
  const { name } = storeToRefs(store)

  const handleLogout = () => {
    console.log('Déconnexion')
  }
</script>

<template>
  <v-container class="pa-4 text-center">
    <v-avatar color="#F25C74" size="90" class="text-white font-weight-bold text-h3 mb-3 elevation-2">
      {{ name ? name.charAt(0).toUpperCase() : 'U' }}
    </v-avatar>
    
    <h2 class="text-h5 font-weight-bold text-grey-darken-3">{{ name }}</h2>
    <p class="text-body-2 text-grey mb-6">Membre depuis 2026</p>

   
    <v-card class="rounded-xl text-left mb-4" elevation="1">
      <v-list>
        <v-list-item prepend-icon="mdi-account-edit" title="Modifier mon profil" link></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item prepend-icon="mdi-bell" title="Notifications" link></v-list-item>
      </v-list>
    </v-card>


    <v-card class="rounded-xl text-left" elevation="1">
      <v-list>
        <v-list-item 
          prepend-icon="mdi-logout" 
          title="Se déconnecter" 
          base-color="error" 
          @click="handleLogout"
          link
        ></v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>