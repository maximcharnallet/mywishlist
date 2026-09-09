<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { friendStore } from '@/features/friends/stores/friends.store'
import { useRespondFriendRequest } from '@/features/friends/composables/useRespondFriendRequest'

const isDialogOpen = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  (e: 'friend-accepted'): void
}>()

const store = friendStore()
const { receivedRequests } = storeToRefs(store)

const {
  doRespondFriendRequest,
  isLoadingRespondFriendRequest,
  isErrorRespondFriendRequest,
} = useRespondFriendRequest()

async function handleRespond(id: string, decision: 'accepted' | 'declined') {
  await doRespondFriendRequest(id, decision)
  if (decision === 'accepted') {
    emit('friend-accepted')
  }
}
</script>

<template>
  <v-dialog v-model="isDialogOpen" max-width="450">
    <v-card class="rounded-xl pa-2">
      <v-card-title class="text-subtitle-1 d-flex align-center justify-space-between">
        Demandes reçues
        <v-btn icon="mdi-close" variant="text" size="small" @click="isDialogOpen = false"></v-btn>
      </v-card-title>

      <v-card-text v-if="!receivedRequests.length" class="text-center text-grey py-6">
        Aucune demande en attente.
      </v-card-text>

      <v-list v-else lines="two">
        <template v-for="(request, index) in receivedRequests" :key="request.id">
          <v-list-item :title="request.requester.name">
            <template v-slot:prepend>
              <v-avatar>
                <v-img v-if="request.requester.avatarColor" :src="request.requester.avatarColor"></v-img>
                <v-icon v-else>mdi-account</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn
                icon="mdi-check"
                color="success"
                variant="text"
                :loading="isLoadingRespondFriendRequest"
                @click="handleRespond(request.id, 'accepted')"
              ></v-btn>
              <v-btn
                icon="mdi-close"
                color="error"
                variant="text"
                :loading="isLoadingRespondFriendRequest"
                @click="handleRespond(request.id, 'declined')"
              ></v-btn>
            </template>
          </v-list-item>
          <v-divider v-if="index < receivedRequests.length - 1" inset></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>