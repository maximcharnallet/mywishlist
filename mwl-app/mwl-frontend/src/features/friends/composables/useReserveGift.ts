import { ref } from 'vue'
import { reserveGift, unreserveGift } from '@/features/friends/services/friend.service'
import { useGetFriendGifts } from '@/features/friends/composables/useGetFriendGifts'

export function useReserveGift() {
  const { doGetFriendGifts } = useGetFriendGifts()

  const isErrorReserveGift = ref(false)
  const errorMessageReserveGift = ref('')
  const isLoadingReserveGift = ref(false)

  async function run(action: () => Promise<void>, friendId: string) {
    isLoadingReserveGift.value = true
    isErrorReserveGift.value = false
    try {
      await action()
    } catch (error: any) {
      isErrorReserveGift.value = true
      errorMessageReserveGift.value = error.message
    } finally {
      await doGetFriendGifts(friendId, true)
      isLoadingReserveGift.value = false
    }
  }

  function doReserveGift(giftId: string, friendId: string) {
    return run(() => reserveGift(giftId, friendId), friendId)
  }

  function doUnreserveGift(giftId: string, friendId: string) {
    return run(() => unreserveGift(giftId), friendId)
  }

  return {
    doReserveGift,
    doUnreserveGift,
    isErrorReserveGift,
    errorMessageReserveGift,
    isLoadingReserveGift,
  }
}