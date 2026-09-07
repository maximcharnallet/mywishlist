import { ref } from 'vue'
import { getFriendGifts } from '@/features/friends/services/friend.service'
import { friendStore } from '@/features/friends/store/friends.store'

export function useGetFriendGifts() {
  const store = friendStore()

  const isErrorGetFriendGifts = ref(false)
  const errorMessageGetFriendGifts = ref('')
  const isLoadingGetFriendGifts = ref(false)

  async function doGetFriendGifts(friendId: string, force = false) {
    if (!force && store.friendGiftsById[friendId]) {
      return
    }

    isLoadingGetFriendGifts.value = true
    try {
      const gifts = await getFriendGifts(friendId)
      store.setFriendGifts(friendId, gifts)
    } catch (error: any) {
      isErrorGetFriendGifts.value = true
      errorMessageGetFriendGifts.value = error.message
    } finally {
      isLoadingGetFriendGifts.value = false
    }
  }

  return {
    doGetFriendGifts,
    isErrorGetFriendGifts,
    errorMessageGetFriendGifts,
    isLoadingGetFriendGifts,
  }
}