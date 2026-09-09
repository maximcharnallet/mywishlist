<script setup lang="ts">
import { computed } from 'vue'
import { friendStore } from '@/features/friends/stores/friends.store'

const props = defineProps<{
  friendId: string
  friendName: string
  isLoading: boolean
}>()

const store = friendStore()
const gifts = computed(() => store.friendGiftsById[props.friendId] ?? [])
</script>

<template>
  <div v-if="isLoading" class="text-center py-4">
    <v-progress-circular indeterminate color="grey" size="24"></v-progress-circular>
  </div>

  <v-row v-else-if="gifts.length" dense>
    <v-col v-for="gift in gifts" :key="gift.id" cols="12">
      <v-card class="rounded-xl pa-2" elevation="0" variant="outlined" color="grey-lighten-2">
        <v-card-item>
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
</template>