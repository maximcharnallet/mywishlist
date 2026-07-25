import { ref } from 'vue'
import { updateGift } from '@/features/gifts/services/gift.service'
import { giftStore } from '@/features/gifts/stores/gifts.store'

export function useUpdateGift () {
  const store = giftStore()

  const isErrorUpdateGift = ref(false)
  const errorMessageUpdateGift = ref('')
  const isLoadingUpdateGift = ref(false)

  async function doUpdateGift (id: string, title?: string, description?: string, price?: number) {
    isErrorUpdateGift.value = false
    isLoadingUpdateGift.value = true
    try {
      const gift = await updateGift(id, title, description, price)
      store.updateGift(gift)
    } catch (error: any) {
      isErrorUpdateGift.value = true
      errorMessageUpdateGift.value = error.message
    } finally {
      isLoadingUpdateGift.value = false
    }
  }

  return {
    doUpdateGift,
    isErrorUpdateGift,
    errorMessageUpdateGift,
    isLoadingUpdateGift,
  }
}