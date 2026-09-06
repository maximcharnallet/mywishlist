import { ref } from 'vue'
import { getPendingFriendRequests } from '@/features/friends/services/friend.service'
import { friendStore } from '@/features/friends/store/friends.store'

export function useGetPendingFriendRequests() {
  const store = friendStore()

  const isErrorGetPendingFriendRequests = ref(false)
  const errorMessageGetPendingFriendRequests = ref('')
  const isLoadingGetPendingFriendRequests = ref(false)

  async function doGetPendingFriendRequests() {
    isLoadingGetPendingFriendRequests.value = true
    try {
      const requests = await getPendingFriendRequests()
      store.setReceivedRequests(requests)
    } catch (error: any) {
      isErrorGetPendingFriendRequests.value = true
      errorMessageGetPendingFriendRequests.value = error.message
    } finally {
      isLoadingGetPendingFriendRequests.value = false
    }
  }

  return {
    doGetPendingFriendRequests,
    isErrorGetPendingFriendRequests,
    errorMessageGetPendingFriendRequests,
    isLoadingGetPendingFriendRequests,
  }
}