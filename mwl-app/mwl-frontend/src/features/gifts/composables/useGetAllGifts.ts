import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getAllGifts } from '@/features/gifts/services/gift.service'
import { giftStore } from '@/features/gifts/stores/gifts.store'

export function useGetAllGifts () {
  const store = giftStore()
  const { gifts } = storeToRefs(store)

  const isErrorGetAllGifts = ref(false)
  const errorMessageGetAllGifts = ref('')
  const isLoadingGetAllGifts = ref(false)

  async function doGetAllGifts () {
    isLoadingGetAllGifts.value = true
    try {
      const data = await getAllGifts()
      store.setGifts(data)
    } catch (error: any) {
      isErrorGetAllGifts.value = true
      errorMessageGetAllGifts.value = error.message
    } finally {
      isLoadingGetAllGifts.value = false
    }
  }

  return {
    gifts,
    doGetAllGifts,
    isErrorGetAllGifts,
    errorMessageGetAllGifts,
    isLoadingGetAllGifts,
  }
}