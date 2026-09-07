<script setup lang="ts">
import { ref } from 'vue'
import { useSendFriendRequest } from '@/features/friends/composables/useSendFriendRequest'

const isDialogOpen = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  (e: 'friend-added'): void
}>()

const addresseeEmail = ref('')

const {
  doSendFriendRequest,
  isLoadingSendFriendRequest,
  isErrorSendFriendRequest,
  errorMessageSendFriendRequest,
} = useSendFriendRequest()

async function handleSendRequest() {
  await doSendFriendRequest(addresseeEmail.value)
  if (!isErrorSendFriendRequest.value) {
    addresseeEmail.value = ''
    isDialogOpen.value = false
    emit('friend-added')
  }
}
</script>

<template>
  <v-dialog v-model="isDialogOpen" max-width="400">
    <v-card class="rounded-xl pa-2">
      <v-card-title>Ajouter un ami</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="addresseeEmail"
          label="Email de ton ami"
          type="email"
          :error="isErrorSendFriendRequest"
          :error-messages="isErrorSendFriendRequest ? errorMessageSendFriendRequest : ''"
          @keyup.enter="handleSendRequest"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="isDialogOpen = false">Annuler</v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :loading="isLoadingSendFriendRequest"
          @click="handleSendRequest"
        >
          Envoyer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>