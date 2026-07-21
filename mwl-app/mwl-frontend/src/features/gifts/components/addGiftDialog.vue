<script setup lang="ts">
  import { giftStore } from '@/features/gifts/stores/gifts.store'
  import { storeToRefs } from 'pinia'
  import { useCreateGift } from '@/features/gifts/composables/useCreateGift'

  const dialog = defineModel<boolean>({ required: true })

  const store = giftStore()
  const { title, description, price } = storeToRefs(store)

  const { doCreateGift, isLoadingCreateGift, isErrorCreateGift, errorMessageCreateGift } = useCreateGift()

  function closeDialog () {
    dialog.value = false
    title.value = ''
    description.value = ''
    price.value = ''
  }

  async function handleCreateGift () {
    await doCreateGift(title.value, description.value || undefined, price.value ? Number(price.value) : undefined)
    if (!isErrorCreateGift.value) {
      closeDialog()
    }
  }
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="rounded-xl pa-2">
      <v-card-title class="text-h6 font-weight-bold">Ajouter un cadeau</v-card-title>
      <v-card-text>
        <v-text-field v-model="title" label="Titre" density="comfortable" />
        <v-textarea v-model="description" label="Description" density="comfortable" rows="3" />
        <v-text-field v-model="price" label="Prix (€)" type="number" density="comfortable" />
        <v-alert v-if="isErrorCreateGift" type="error" density="compact" class="mt-2">
          {{ errorMessageCreateGift }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="closeDialog">Annuler</v-btn>
        <v-btn color="#F25C74" class="text-white" :loading="isLoadingCreateGift" @click="handleCreateGift">
          Ajouter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>