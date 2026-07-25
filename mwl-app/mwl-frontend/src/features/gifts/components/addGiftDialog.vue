<script setup lang="ts">
  import { giftStore } from '@/features/gifts/stores/gifts.store'
  import { storeToRefs } from 'pinia'
  import { useCreateGift } from '@/features/gifts/composables/useCreateGift'
  import { useUpdateGift } from '@/features/gifts/composables/useUpdateGift'
  import type { Gift } from '@/features/gifts/types/gift.type'
import { computed, watch } from 'vue'

  const dialog = defineModel<boolean>({ required: true })

    const props = defineProps<{
      gift?: Gift | null
    }>()


  const store = giftStore()
  const { title, description, price } = storeToRefs(store)

  const { doCreateGift, isLoadingCreateGift, isErrorCreateGift, errorMessageCreateGift } = useCreateGift()
  const { doUpdateGift, isLoadingUpdateGift, isErrorUpdateGift, errorMessageUpdateGift } = useUpdateGift()

  const isEditMode = computed(() => !!props.gift)

  watch(dialog, (isOpen) => {
    if (!isOpen) return
    if (props.gift) {
      title.value = props.gift.title
      description.value = props.gift.description ?? ''
      price.value = props.gift.price != null ? String(props.gift.price) : ''
    } else {
      title.value = ''
      description.value = ''
      price.value = ''
    }
  })


  function closeDialog () {
    dialog.value = false
    title.value = ''
    description.value = ''
    price.value = ''
  }

  async function handleSubmit () {
    if (isEditMode.value && props.gift) {
      await doUpdateGift(
        props.gift.id,
        title.value,
        description.value || undefined,
        price.value ? Number(price.value) : undefined,
      )
      if (!isErrorUpdateGift.value) closeDialog()
    } else {
      await doCreateGift(
        title.value,
        description.value || undefined,
        price.value ? Number(price.value) : undefined,
      )
      if (!isErrorCreateGift.value) closeDialog()
    }
  }
</script>


<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="rounded-xl pa-2">
      <v-card-title class="text-h6 font-weight-bold">
        {{ isEditMode ? 'Modifier le cadeau' : 'Ajouter un cadeau' }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="title" label="Titre" density="comfortable" />
        <v-textarea v-model="description" label="Description" density="comfortable" rows="3" />
        <v-text-field v-model="price" label="Prix (€)" type="number" density="comfortable" />
        <v-alert
          v-if="isEditMode ? isErrorUpdateGift : isErrorCreateGift"
          type="error"
          density="compact"
          class="mt-2"
        >
          {{ isEditMode ? errorMessageUpdateGift : errorMessageCreateGift }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="closeDialog">Annuler</v-btn>
        <v-btn
          color="#F25C74"
          class="text-white"
          :loading="isEditMode ? isLoadingUpdateGift : isLoadingCreateGift"
          @click="handleSubmit"
        >
          {{ isEditMode ? 'Modifier' : 'Ajouter' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>