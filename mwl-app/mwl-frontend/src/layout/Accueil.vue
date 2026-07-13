<script setup lang="ts">
  import { ref } from 'vue'
  import WishlistView from '@/features/wishlist/presentation/WishlistView.vue'
  import FriendsView from '@/features/friends/presentation/FriendsView.vue'
  import ProfilView from '@/features/profil/presentation/ProfilView.vue'

  const currentTab = ref('wishlist')
</script>

<template>
  <v-layout class="bg-grey-lighten-4" style="min-height: 100vh;">
    <v-app-bar color="#F25C74" density="compact" elevation="2">
      <div class="d-flex align-center justify-center w-100">
        <v-img 
          src="/LogoMWL.svg"
          max-height="40" 
          max-width="40" 
          class="mr-3"
          ></v-img>
        <span class="text-h6 font-weight-bold text-white">My Wish List</span>
      </div>
    </v-app-bar>

    <v-main>
      <v-window v-model="currentTab" :touch="false">
        
        <v-window-item value="wishlist">
          <WishlistView />
        </v-window-item>

        <v-window-item value="friends">
          <FriendsView />
        </v-window-item>

        <v-window-item value="profil">
          <ProfilView />
        </v-window-item>

      </v-window>
    </v-main>

    <v-bottom-navigation v-model="currentTab" color="primary" grow>
      <v-btn value="wishlist"><v-icon>mdi-gift</v-icon><span>Ma Liste</span></v-btn>
      <v-btn value="friends"><v-icon>mdi-account-group</v-icon><span>Mes Proches</span></v-btn>
      <v-btn value="profil"><v-icon>mdi-account</v-icon><span>Profil</span></v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>