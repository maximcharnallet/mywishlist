<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { friendStore } from '@/features/friends/store/friends.store'
import { storeToRefs } from 'pinia'
import { useGetAllFriends } from '@/features/friends/composables/useGetAllFriends'
import { useGetPendingFriendRequests } from '@/features/friends/composables/useGetPendingFriendRequests'
import { useGetFriendGifts } from '@/features/friends/composables/useGetFriendGifts'
import AddFriendDialog from '@/features/friends/components/addFriendDialog.vue'
import ReceivedRequestsDialog from '@/features/friends/components/receivedRequestsDialog.vue'
import friendGifts from '@/features/friends/components/friendGifts.vue'

const store = friendStore()
const { friends, receivedRequests } = storeToRefs(store)

const { doGetAllFriends } = useGetAllFriends()

const {
  doGetPendingFriendRequests,
  isLoadingGetPendingFriendRequests,
  isErrorGetPendingFriendRequests,
} = useGetPendingFriendRequests()

const { doGetFriendGifts, isLoadingGetFriendGifts } = useGetFriendGifts()

const isAddDialogOpen = ref(false)
const isRequestsDialogOpen = ref(false)
const openedFriendId = ref<string | null>(null)

onMounted(() => {
  doGetAllFriends()
  doGetPendingFriendRequests()
})

function handleFriendAccepted() {
  doGetAllFriends()
}

watch(openedFriendId, (friendId) => {
  if (friendId) {
    doGetFriendGifts(friendId)
  }
})
</script>

<template>
  <v-container class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5 font-weight-bold">Mes Proches 👥</h2>
      <div class="d-flex align-center">
        <v-btn icon="mdi-bell-outline" variant="text" @click="isRequestsDialogOpen = true">
          <v-badge v-if="receivedRequests.length" :content="receivedRequests.length" color="error" floating>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon="mdi-plus" color="primary" @click="isAddDialogOpen = true"></v-btn>
      </div>
    </div>

    <v-expansion-panels v-if="friends.length" v-model="openedFriendId">
      <v-expansion-panel
        v-for="friend in friends"
        :key="friend.id"
        :value="friend.id"
        class="rounded-xl mb-3 elevation-1"
      >
        <v-expansion-panel-title>{{ friend.name }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <friendGifts
            :friend-id="friend.id"
            :friend-name="friend.name"
            :is-loading="isLoadingGetFriendGifts"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card v-else class="rounded-xl overflow-hidden" elevation="1">
      <v-card-text class="text-center text-grey py-8">
        <v-icon size="40" class="mb-2">mdi-account-group-outline</v-icon>
        <div>Vous n'avez pas encore d'amis</div>
      </v-card-text>
    </v-card>

    <AddFriendDialog v-model="isAddDialogOpen" />
    <ReceivedRequestsDialog v-model="isRequestsDialogOpen" @friend-accepted="handleFriendAccepted" />
  </v-container>
</template>