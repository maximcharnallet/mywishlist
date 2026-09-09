import { ref } from 'vue'
import { getAllFriends } from '@/features/friends/services/friend.service'
import { friendStore } from '@/features/friends/stores/friends.store'

export function useGetAllFriends() {
  const store = friendStore()

  const isErrorGetAllFriends = ref(false)
  const errorMessageGetAllFriends = ref('')
  const isLoadingGetAllFriends = ref(false)

  async function doGetAllFriends() {
    isLoadingGetAllFriends.value = true
    try {
      const friends = await getAllFriends()
      store.setFriends(friends)
    } catch (error: any) {
      isErrorGetAllFriends.value = true
      errorMessageGetAllFriends.value = error.message
    } finally {
      isLoadingGetAllFriends.value = false
    }
  }

  return {
    doGetAllFriends,
    isErrorGetAllFriends,
    errorMessageGetAllFriends,
    isLoadingGetAllFriends,
  }
}