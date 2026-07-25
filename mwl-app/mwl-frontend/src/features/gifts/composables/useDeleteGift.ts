import { ref } from 'vue'
import { deleteGift } from '@/features/gifts/services/gift.service'
import { giftStore } from '@/features/gifts/stores/gifts.store'

export function useDeleteGift () {
  const store = giftStore()

  const isErrorDeleteGift = ref(false)
  const errorMessageDeleteGift = ref('')
  const isLoadingDeleteGift = ref(false)

  async function doDeleteGift (id: string) {
    isLoadingDeleteGift.value = true
    try {
      await deleteGift(id)
      store.removeGift(id)
    } catch (error: any) {
      isErrorDeleteGift.value = true
      errorMessageDeleteGift.value = error.message
    } finally {
      isLoadingDeleteGift.value = false
    }
  }

  return {
    doDeleteGift,
    isErrorDeleteGift,
    errorMessageDeleteGift,
    isLoadingDeleteGift,
  }
}