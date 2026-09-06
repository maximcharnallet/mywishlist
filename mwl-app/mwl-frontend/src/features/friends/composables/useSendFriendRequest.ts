import { ref } from 'vue'
import { sendFriendRequest } from '@/features/friends/services/friend.service'

export function useSendFriendRequest() {
  const isErrorSendFriendRequest = ref(false)
  const errorMessageSendFriendRequest = ref('')
  const isLoadingSendFriendRequest = ref(false)

  async function doSendFriendRequest(addresseeEmail: string) {
    if (!addresseeEmail.trim()) {
      isErrorSendFriendRequest.value = true
      errorMessageSendFriendRequest.value = "L'email est requis"
      return
    }
    isLoadingSendFriendRequest.value = true
    try {
      await sendFriendRequest(addresseeEmail)
    } catch (error: any) {
      isErrorSendFriendRequest.value = true
      errorMessageSendFriendRequest.value = error.message
    } finally {
      isLoadingSendFriendRequest.value = false
    }
  }

  return {
    doSendFriendRequest,
    isErrorSendFriendRequest,
    errorMessageSendFriendRequest,
    isLoadingSendFriendRequest,
  }
}