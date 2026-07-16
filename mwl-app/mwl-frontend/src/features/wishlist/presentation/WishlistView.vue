<script setup lang="ts">
  import { ref } from 'vue'


  const gifts = ref([
    { id: 1, name: 'Vélo de ville électrique', price: 1200, link: 'https://...', icon: 'mdi-bike' },
    { id: 2, name: 'BD - Qui veut la peau de Ramirez ? ', price: 24, link: 'https://...', icon: 'mdi-book-open-variant' },
  ])
</script>

<template>
  <v-container class="pa-4">
    <div class="d-flex justify-between align-center mb-4">
      <h2 class="text-h5 font-weight-bold color-primary">Mes envies 🎁</h2>
      <v-chip color="#F25C74" variant="flat" class="text-white">
        {{ gifts.length }} cadeaux
      </v-chip>
    </div>

    <!-- Liste des cadeaux -->
    <v-row dense>
      <v-col v-for="gift in gifts" :key="gift.id" cols="12">
        <v-card class="rounded-xl pa-2" elevation="1" variant="outlined" color="grey-lighten-2">
          <template v-slot:prepend>
            <v-avatar color="#F25C74" class="text-white">
              <v-icon>{{ gift.icon }}</v-icon>
            </v-avatar>
          </template>
          
          <v-card-item>
            <v-card-title class="text-body-1 font-weight-bold text-grey-darken-3">
              {{ gift.name }}
            </v-card-title>
            <v-card-subtitle class="text-subtitle-2 font-weight-medium text-secondary">
              {{ gift.price }} €
            </v-card-subtitle>
          </v-card-item>

          <template v-slot:append>
            <v-btn icon="mdi-open-in-new" variant="text" color="grey-darken-1" :href="gift.link" target="_blank"></v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      color="#F25C74"
      icon="mdi-plus"
      size="large"
      location="bottom right"
      position="fixed"
      class="mb-16 mr-4 text-white"
      elevation="4"
    ></v-btn>
  </v-container>
</template>