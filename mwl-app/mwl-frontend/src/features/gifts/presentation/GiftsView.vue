<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { giftStore } from '@/features/gifts/stores/gifts.store'
  import { storeToRefs } from 'pinia'
  import { useGetAllGifts } from '@/features/gifts/composables/useGetAllGifts'
  import addGiftDialog from '@/features/gifts/components/addGiftDialog.vue'

  const store = giftStore()
  const { gifts } = storeToRefs(store)

  const { doGetAllGifts } = useGetAllGifts()

  const dialog = ref(false)

  function openDialog () {
    dialog.value = true
  }

  onMounted(() => {
    doGetAllGifts()
  })
</script>

<template>
  <v-container class="pa-4">
    <div class="d-flex justify-between align-center mb-4">
      <h2 class="text-h5 font-weight-bold color-primary">Mes envies 🎁</h2>
      <v-chip color="#F25C74" variant="flat" class="text-white">
        {{ gifts.length }} cadeaux
      </v-chip>
    </div>
    <v-row dense>
      <v-col v-for="gift in gifts" :key="gift.id" cols="12">
        <v-card class="rounded-xl pa-2" elevation="1" variant="outlined" color="grey-lighten-2">
          <v-card-item>
            <v-card-title class="text-body-1 font-weight-bold text-grey-darken-3">
              {{ gift.title }}
            </v-card-title>
            <v-card-text class="text-body-1 text-grey-darken-3">
              {{ gift.description }}
            </v-card-text>
            <v-card-subtitle class="text-subtitle-2 font-weight-medium text-secondary">
              {{ gift.price }} €
            </v-card-subtitle>
          </v-card-item>
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
      @click="openDialog"
    ></v-btn>

    <addGiftDialog v-model="dialog" />
  </v-container>
</template>