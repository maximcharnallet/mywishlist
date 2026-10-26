<script setup lang="ts">
import { computed, ref } from 'vue'
import { friendStore } from '@/features/friends/stores/friends.store'
import ReserveGiftDialog from '@/features/friends/components/reserveGiftDialog.vue'

const props = defineProps<{
  friendId: string
  friendName: string
  isLoading: boolean
}>()

const store = friendStore()
const gifts = computed(() => store.friendGiftsById[props.friendId] ?? [])

const reserveDialog = ref(false)
const selectedGiftId = ref<string | null>(null)
const selectedGift = computed(() => gifts.value.find((g) => g.id === selectedGiftId.value) ?? null)

function openReserveDialog(giftId: string) {
selectedGiftId.value = giftId
reserveDialog.value = true
}
</script>

<template>
  <div v-if="isLoading" class="text-center py-4">
    <v-progress-circular indeterminate color="grey" size="24"></v-progress-circular>
  </div>

  <v-row v-else-if="gifts.length" dense>
    <v-col v-for="gift in gifts" :key="gift.id" cols="12">
      <v-card
        class="rounded-xl pa-2"
        elevation="0"
        variant="outlined"
        color="grey-lighten-2"
        style="cursor: pointer"
        @click="openReserveDialog(gift.id)"
      >        
        <v-card-item>
          <template #append>
            <v-chip v-if="gift.isReserved" size="small" color="grey" variant="flat">
              'Réservé' 
            </v-chip>
          </template>
          <v-card-title class="text-body-1 font-weight-bold text-grey-darken-3">
            {{ gift.title }}
          </v-card-title>
          <v-card-text class="text-body-1 text-grey-darken-3">
            {{ gift.description }}
          </v-card-text>
          <v-card-subtitle class="text-subtitle-2 font-weight-medium text-secondary">
            {{ gift.price }} €
          </v-card-subtitle>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>

  <div v-else class="text-center text-grey py-4">
    {{ friendName }} n'a pas encore ajouté de cadeaux
  </div>
<ReserveGiftDialog v-model="reserveDialog" :gift="selectedGift" :friend-id="friendId" />
</template>