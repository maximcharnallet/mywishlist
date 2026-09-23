<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import GiftsView from '@/features/gifts/presentation/GiftsView.vue'
  import FriendsView from '@/features/friends/presentation/FriendsView.vue'
  import ProfilView from '@/features/profil/presentation/ProfilView.vue'
  import { sessionStore } from '@/features/auth/stores/session.store'
  import { useGetMe } from '@/features/auth/composables/useGetMe'
  import { useRouter } from 'vue-router'

  const currentTab = ref('wishlist')
  const tabOrder = ['wishlist', 'friends', 'profil']

  const session = sessionStore()
  const router = useRouter()
  const { doGetMe } = useGetMe()

  let touchStartX = 0
  let touchStartY = 0

  onMounted(() => {
    doGetMe()
  })

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }
  function handleTouchEnd(e: TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX
    const deltaY = e.changedTouches[0].clientY - touchStartY
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return

    const currentIndex = tabOrder.indexOf(currentTab.value)
    if (deltaX < 0 && currentIndex < tabOrder.length - 1) {
      currentTab.value = tabOrder[currentIndex + 1] 
    } else if (deltaX > 0 && currentIndex > 0) {
      currentTab.value = tabOrder[currentIndex - 1] 
    }
  }
  function handleLogout() {
    session.logout()
    router.push('/login')
  }
</script>

<template>
    <v-layout class="bg-grey-lighten-4" style="min-height: 100dvh;">    
      <v-app-bar color="#F25C74" density="compact" elevation="2">
      <div class="app-bar-grid">
        <div class="greeting text-truncate">
          <v-btn @click="currentTab= 'profil'">
            <v-icon size="18" class="mr-1">mdi-account-circle</v-icon>
            <span>{{ session.name }}</span>          
          </v-btn>
        </div>

        <div class="d-flex align-center justify-center">
          <v-img
            src="/LogoMWL.svg"
            max-height="40"
            max-width="40"
            class="mr-3"
          ></v-img>
          <span class="text-h6 font-weight-bold text-white">My Wish List</span>
        </div>

        <div class="d-flex justify-end">
          <v-btn
            variant="text"
            density="compact"
            color="white"
            size="small"
            @click="handleLogout"
          >
            <v-icon size="18" class="mr-1">mdi-logout</v-icon>
            <span class="d-none d-sm-inline">Se déconnecter</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <v-window v-model="currentTab" :touch="false">
        <v-window-item value="wishlist">
          <GiftsView />
        </v-window-item>

        <v-window-item value="friends">
          <FriendsView />
        </v-window-item>

        <v-window-item value="profil">
          <ProfilView />
        </v-window-item>
      </v-window>
    </v-main>

    <v-footer app class="justify-center text-caption">
      <router-link to="/legalmentions" class="text-medium-emphasis">Mentions légales</router-link>
      ·
      <router-link to="/confidentialpolicy" class="text-medium-emphasis">Politique de confidentialité</router-link>
    </v-footer>

   

    <v-bottom-navigation v-model="currentTab" color="primary" grow>
      <v-btn value="wishlist"><v-icon>mdi-gift</v-icon><span>Ma Liste</span></v-btn>
      <v-btn value="friends"><v-icon>mdi-account-group</v-icon><span>Mes Proches</span></v-btn>
      <v-btn value="profil"><v-icon>mdi-account</v-icon><span>Profil</span></v-btn>
    </v-bottom-navigation>

  </v-layout>
</template>

<style scoped>
  .app-bar-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    padding: 0 8px;
  }

  .greeting {
    color: white;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    max-width: 140px;
  }

  :deep(.v-bottom-navigation) {
  height: calc(56px + env(safe-area-inset-bottom, 0px)) !important;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>