<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDeleteProfile } from '@/features/auth/composables/useDeleteProfile'
import { sessionStore } from '@/features/auth/stores/session.store'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const session = sessionStore()
const { doDeleteProfile, isLoadingDeleteProfile, isErrorDeleteProfile, errorMessageDeleteProfile } = useDeleteProfile()

const isSuccess = ref(false)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

async function handleDelete() {
  const success = await doDeleteProfile()
  if (success) {
    isSuccess.value = true
  }
}

function handleConfirmSuccess() {
  isOpen.value = false
  router.push('/login')
}
</script>

<template>
  <v-dialog v-model="isOpen" max-width="420" :persistent="isSuccess">
    <v-card class="rounded-xl">
      <v-card-title class="text-h6 font-weight-bold">Supprimer mon compte</v-card-title>
      <v-card-text>
        <template v-if="isSuccess">
          <v-alert type="success" variant="tonal" density="compact">
            Ton compte a bien été supprimé.
          </v-alert>
        </template>
        <template v-else>
          <p>
            Es-tu sûr(e) de vouloir supprimer ton compte{{ session.name ? `, ${session.name}` : '' }} ?
            Cette action est irréversible : ta liste de cadeaux et tes demandes d'amis seront définitivement supprimées.
          </p>
          <v-alert v-if="isErrorDeleteProfile" type="error" variant="tonal" class="mt-4" density="compact">
            {{ errorMessageDeleteProfile }}
          </v-alert>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <template v-if="isSuccess">
          <v-btn color="primary" @click="handleConfirmSuccess">OK</v-btn>
        </template>
        <template v-else>
          <v-btn variant="text" :disabled="isLoadingDeleteProfile" @click="isOpen = false">Annuler</v-btn>
          <v-btn color="error" :loading="isLoadingDeleteProfile" @click="handleDelete">Supprimer</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>