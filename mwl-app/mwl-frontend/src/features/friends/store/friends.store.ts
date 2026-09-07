import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Friend, PendingFriendRequest } from '@/features/friends/types/friend.type'
import type { Gift } from '@/features/gifts/types/gift.type'

export const friendStore = defineStore('friend', () => {
  const friends = ref<Friend[]>([])
  const receivedRequests = ref<PendingFriendRequest[]>([])
  const friendGiftsById = ref<Record<string, Gift[]>>({})

  function setFriends(newFriends: Friend[]) {
    friends.value = newFriends
  }

  function setReceivedRequests(requests: PendingFriendRequest[]) {
    receivedRequests.value = requests
  }

  function removeReceivedRequest(id: string) {
    receivedRequests.value = receivedRequests.value.filter((r) => r.id !== id)
  }

  function setFriendGifts(friendId: string, gifts: Gift[]) {
    friendGiftsById.value[friendId] = gifts
  }

  return {
    friends,
    receivedRequests,
    friendGiftsById,
    setFriends,
    setReceivedRequests,
    removeReceivedRequest,
    setFriendGifts,
  }
})