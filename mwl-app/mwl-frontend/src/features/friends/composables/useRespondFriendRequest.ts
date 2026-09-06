import { ref } from 'vue'
import { respondFriendRequest } from '@/features/friends/services/friend.service'
import { friendStore } from '@/features/friends/store/friends.store'

export function useRespondFriendRequest() {
  const store = friendStore()

  const isErrorRespondFriendRequest = ref(false)
  const errorMessageRespondFriendRequest = ref('')
  const isLoadingRespondFriendRequest = ref(false)

  async function doRespondFriendRequest(id: string, decision: 'accepted' | 'declined') {
    isLoadingRespondFriendRequest.value = true
    try {
      await respondFriendRequest(id, decision)
      store.removeReceivedRequest(id)
    } catch (error: any) {
      isErrorRespondFriendRequest.value = true
      errorMessageRespondFriendRequest.value = error.message
    } finally {
      isLoadingRespondFriendRequest.value = false
    }
  }

  return {
    doRespondFriendRequest,
    isErrorRespondFriendRequest,
    errorMessageRespondFriendRequest,
    isLoadingRespondFriendRequest,
  }
}