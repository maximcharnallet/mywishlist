import { ref } from 'vue'
import { createGift } from '@/features/gifts/services/gift.service'
import { giftStore } from '@/features/gifts/stores/gifts.store'

export function useCreateGift () {
  const store = giftStore()

  const isErrorCreateGift = ref(false)
  const errorMessageCreateGift = ref('')
  const isLoadingCreateGift = ref(false)

  async function doCreateGift (title: string, description?: string, price?: number) {
    if (!title.trim()) {
      isErrorCreateGift.value = true
      errorMessageCreateGift.value = 'Le titre est requis'
      return
    }
    isLoadingCreateGift.value = true
    try {
      const gift = await createGift(title, description, price)
      store.addGift(gift)
    } catch (error: any) {
      isErrorCreateGift.value = true
      errorMessageCreateGift.value = error.message
    } finally {
      isLoadingCreateGift.value = false
    }
  }
  return {
    doCreateGift,
    isErrorCreateGift,
    errorMessageCreateGift,
    isLoadingCreateGift,
  }
}