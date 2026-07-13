<script setup lang="ts">
  import { ref } from 'vue'

  const friends = ref([
    { id: 1, name: 'Alice Martin', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', giftCount: 5 },
    { id: 2, name: 'Thomas Bernard', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', giftCount: 3 },
    { id: 3, name: 'Chloé Petit', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', giftCount: 0 },
  ])
</script>

<template>
  <v-container class="pa-4">
    <h2 class="text-h5 font-weight-bold mb-4">Mes Proches 👥</h2>

    <v-card class="rounded-xl overflow-hidden" elevation="1">
      <v-list lines="two">
        <template v-for="(friend, index) in friends" :key="friend.id">
          <v-list-item
            :title="friend.name"
            :subtitle="friend.giftCount > 0 ? `${friend.giftCount} cadeaux disponibles` : 'Aucun cadeau pour le moment'"
            link
          >
            <template v-slot:prepend>
              <v-avatar :image="friend.avatar"></v-avatar>
            </template>

            <template v-slot:append>
              <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
          
          <v-divider v-if="index < friends.length - 1" inset></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>