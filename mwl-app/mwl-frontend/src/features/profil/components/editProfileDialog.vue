<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUpdateProfile } from '@/features/auth/composables/useUpdateProfile'
import { sessionStore } from '@/features/auth/stores/session.store'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const session = sessionStore()
const { doUpdateProfile, isLoadingUpdateProfile, isErrorUpdateProfile, errorMessageUpdateProfile } = useUpdateProfile()

const AVATAR_COLORS = ['#F25C74', '#4C6EF5', '#12B886', '#F59F00', '#7048E8', '#E64980', '#15AABF', '#495057']

const name = ref('')
const avatarColor = ref('')

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      name.value = session.name
      avatarColor.value = session.avatarColor
    }
  },
)

async function handleSubmit() {
  const success = await doUpdateProfile({ name: name.value, avatarColor: avatarColor.value })
  if (success) emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="400" @update:model-value="$emit('update:modelValue', $event)">
    <v-card class="rounded-xl pa-2">
      <v-card-title>Modifier mon profil</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Nom" variant="outlined" density="comfortable" class="mb-2"></v-text-field>

        <div class="text-caption text-grey mb-2">Couleur de l'avatar</div>
        <div class="d-flex flex-wrap ga-2 mb-2">
          <v-avatar
            v-for="color in AVATAR_COLORS"
            :key="color"
            :color="color"
            size="36"
            class="cursor-pointer"
            :style="avatarColor === color ? 'outline: 2px solid black; outline-offset: 2px' : ''"
            @click="avatarColor = color"
          ></v-avatar>
        </div>

        <div v-if="isErrorUpdateProfile" class="text-error text-caption">{{ errorMessageUpdateProfile }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="$emit('update:modelValue', false)">Annuler</v-btn>
        <v-btn color="#F25C74" :loading="isLoadingUpdateProfile" @click="handleSubmit">Enregistrer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>