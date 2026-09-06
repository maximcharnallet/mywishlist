import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Friend, PendingFriendRequest } from '@/features/friends/types/friend.type'

export const friendStore = defineStore('friend', () => {
  const friends = ref<Friend[]>([])
  const receivedRequests = ref<PendingFriendRequest[]>([])

  function setFriends(newFriends: Friend[]) {
    friends.value = newFriends
  }

  function setReceivedRequests(requests: PendingFriendRequest[]) {
    receivedRequests.value = requests
  }

  function removeReceivedRequest(id: string) {
    receivedRequests.value = receivedRequests.value.filter((r) => r.id !== id)
  }

  return {
    friends,
    receivedRequests,
    setFriends,
    setReceivedRequests,
    removeReceivedRequest,
  }
})