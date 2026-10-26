<script setup lang="ts">
import type { FriendGift } from '@/features/friends/types/friend.type'
import { useReserveGift } from '@/features/friends/composables/useReserveGift'

const props = defineProps<{
  gift: FriendGift | null
  friendId: string
}>()
const model = defineModel<boolean>({ default: false })

const {
  doReserveGift,
  doUnreserveGift,
  isLoadingReserveGift,
  isErrorReserveGift,
  errorMessageReserveGift,
} = useReserveGift()

async function confirm() {
  if (!props.gift) return
  if (props.gift.reservedByMe) {
    await doUnreserveGift(props.gift.id, props.friendId)
  } else {
    await doReserveGift(props.gift.id, props.friendId)
  }
  if (!isErrorReserveGift.value) model.value = false
}
</script>

<template>
  <v-dialog v-model="model" max-width="400">
    <v-card v-if="gift" class="rounded-xl pa-2">
      <v-card-title class="text-body-1 font-weight-bold">
        {{ gift.title }}
      </v-card-title>
      <v-card-text>
        <template v-if="gift.reservedByMe">
          Vous avez réservé ce cadeau. Voulez-vous annuler votre réservation ?
        </template>
        <template v-else-if="gift.isReserved">
          Quelqu'un a déjà réservé ce cadeau.
        </template>
        <template v-else>
          Voulez-vous réserver ce cadeau ? Vos autres amis verront qu'il est réservé, mais pas par qui. Le propriétaire ne le verra pas.
        </template>
        <v-alert v-if="isErrorReserveGift" type="error" variant="tonal" density="compact" class="mt-3">
          {{ errorMessageReserveGift }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="model = false">Fermer</v-btn>
        <v-btn
          v-if="!gift.isReserved || gift.reservedByMe"
          color="#F25C74"
          variant="flat"
          class="text-white"
          :loading="isLoadingReserveGift"
          @click="confirm"
        >
          {{ gift.reservedByMe ? 'Annuler ma réservation' : 'Réserver' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>