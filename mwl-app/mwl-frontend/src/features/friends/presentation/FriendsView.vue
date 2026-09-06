<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { friendStore } from '@/features/friends/store/friends.store'
import { storeToRefs } from 'pinia'
import { useSendFriendRequest } from '@/features/friends/composables/useSendFriendRequest'
import { useGetAllFriends } from '@/features/friends/composables/useGetAllFriends'
import { useGetPendingFriendRequests } from '@/features/friends/composables/useGetPendingFriendRequests'
import { useRespondFriendRequest } from '@/features/friends/composables/useRespondFriendRequest'

const store = friendStore()
const { friends, receivedRequests } = storeToRefs(store)

const { doGetAllFriends } = useGetAllFriends()

const { 
  doGetPendingFriendRequests, 
  isLoadingGetPendingFriendRequests, 
  isErrorGetPendingFriendRequests 
} = useGetPendingFriendRequests()

const { 
  doRespondFriendRequest, 
  isLoadingRespondFriendRequest, 
  isErrorRespondFriendRequest 
} = useRespondFriendRequest()

const { 
  doSendFriendRequest,
  isLoadingSendFriendRequest,
  isErrorSendFriendRequest,
  errorMessageSendFriendRequest,
} = useSendFriendRequest()

const isDialogOpen = ref(false)
const addresseeEmail = ref('')

onMounted(() => {
  doGetAllFriends()
  doGetPendingFriendRequests()
})

async function handleSendRequest() {
  await doSendFriendRequest(addresseeEmail.value)
  if (!isErrorSendFriendRequest.value) {
    addresseeEmail.value = ''
    isDialogOpen.value = false
  }
}

async function handleRespond(id: string, decision: 'accepted' | 'declined') {
  await doRespondFriendRequest(id, decision)
  if (decision === 'accepted') {
    doGetAllFriends()
  }
}
</script>

<template>
  <v-container class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5 font-weight-bold">Mes Proches 👥</h2>
      <v-btn icon="mdi-plus" color="primary" @click="isDialogOpen = true"></v-btn>
    </div>

    <v-card v-if="receivedRequests.length" class="rounded-xl overflow-hidden mb-4" elevation="1">
      <v-card-title class="text-subtitle-1">Demandes reçues</v-card-title>
      <v-list lines="two">
        <template v-for="(request, index) in receivedRequests" :key="request.id">
          <v-list-item :title="request.requester.name">
            <template v-slot:prepend>
              <v-avatar>
                <v-img v-if="request.requester.avatarUrl" :src="request.requester.avatarUrl"></v-img>
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

    <v-card class="rounded-xl overflow-hidden" elevation="1">
      <v-list lines="two">
        <template v-for="(friend, index) in friends" :key="friend.id">
          <v-list-item :title="friend.name" link>
            <template v-slot:append>
              <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
          <v-divider v-if="index < friends.length - 1" inset></v-divider>
        </template>
      </v-list>
    </v-card>

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
  </v-container>
</template>