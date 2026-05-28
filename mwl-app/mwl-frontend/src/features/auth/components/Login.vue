<script setup lang="ts">
</script>
<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card width="400">
      <h1 class="text-center mt-4">
        My Whish List
      </h1>
      <v-img src="/logo.png" height="150"></v-img>
      <v-card-title class="text-center">Connexion</v-card-title>
      <v-card-text>
          <v-text-field label="Email" type="email" required></v-text-field>
          <v-text-field label="Password" type="password" required></v-text-field>
          <v-btn color="primary" class="mt-4" block>Se connecter</v-btn>
          <v-btn color="primary" class="mt-2" block>S'enregistrer</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
