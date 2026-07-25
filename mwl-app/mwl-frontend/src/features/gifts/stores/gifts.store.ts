import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Gift } from '@/features/gifts/types/gift.type'

export const giftStore = defineStore('gift', () => {
  const title = ref('')
  const description = ref('')
  const price = ref('')

  const gifts = ref<Gift[]>([])

  function setGifts(newGifts: Gift[]) {
    gifts.value = newGifts
  }

  function addGift(gift: Gift) {
    gifts.value.push(gift)
  }

  function removeGift(id: string) {
    gifts.value = gifts.value.filter(gift => gift.id !== id)
  }

  function updateGift(gift: Gift) {
    const index = gifts.value.findIndex(g => g.id === gift.id)
    if (index !== -1) {
      gifts.value[index] = gift
    }
  }

  return {
    title,
    description,
    price,
    gifts,
    setGifts,
    addGift,
    removeGift,
    updateGift,
  }
})