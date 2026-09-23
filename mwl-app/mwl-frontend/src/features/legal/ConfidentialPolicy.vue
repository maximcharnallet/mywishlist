<script setup lang="ts">
</script>

<template>
  <v-container class="py-8" style="max-width: 720px;">
    <h1 class="text-h5 font-weight-bold mb-1">Politique de confidentialité</h1>

    <p class="mb-4">
      La présente politique décrit comment mywishlist collecte, utilise et protège les données
      personnelles de ses utilisateurs, conformément au Règlement (UE) 2016/679 (RGPD).
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">1. Responsable du traitement</h2>
    <p class="mb-4">
      Maxime Charnallet, éditeur du site mywishlist
      (https://mywishlistmouagaga.fr)<br />
      Contact : maxime.charnallet@gmail.com
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">2. Données collectées</h2>
    <p class="mb-2">
      Lors de la création et de l'utilisation d'un compte mywishlist, les données suivantes sont
      traitées :
    </p>
    <ul class="mb-4">
      <li>Nom</li>
      <li>Adresse email</li>
      <li>Mot de passe (stocké sous forme hachée, jamais en clair)</li>
      <li>
        Contenu créé par l'utilisateur : listes de cadeaux, demandes et relations d'amis (statuts en
        attente / acceptée / refusée)
      </li>
    </ul>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">3. Finalités du traitement</h2>
    <ul class="mb-4">
      <li>Création et gestion du compte utilisateur</li>
      <li>Authentification (jeton de session JWT)</li>
      <li>Fonctionnement des fonctionnalités "Ma Liste" et "Mes Proches" (partage de listes de cadeaux entre amis)</li>
    </ul>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">4. Base légale</h2>
    <p class="mb-4">
      Le traitement repose sur l'exécution du contrat conclu avec l'utilisateur lors de la création de
      son compte (article 6.1.b du RGPD) : ces données sont nécessaires au fonctionnement du service
      demandé.
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">5. Destinataires des données</h2>
    <p class="mb-4">
      Seul l'éditeur du site a accès à l'ensemble des données. Elles ne sont ni vendues, ni cédées, ni
      partagées à des fins commerciales. Les autres utilisateurs ("amis") ne voient que les listes de
      cadeaux explicitement partagées via la fonctionnalité "amis".
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">6. Hébergement</h2>
    <p class="mb-4">
      Les données sont hébergées sur un serveur privé virtuel (VPS) situé en France, chez OVH SAS
      (2 rue Kellermann, 59100 Roubaix). Aucun transfert de données hors de l'Union européenne n'est
      effectué.
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">7. Durée de conservation</h2>
    <p class="mb-4">
      Les données sont conservées tant que le compte utilisateur est actif. Un utilisateur peut demander
      la suppression de son compte et de ses données à tout moment.
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">8. Sécurité</h2>
    <ul class="mb-4">
      <li>Mots de passe hachés, jamais stockés en clair</li>
      <li>Connexion chiffrée (HTTPS)</li>
      <li>Authentification par jeton JWT</li>
    </ul>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">9. Cookies et traceurs</h2>
    <p class="mb-4">
      mywishlist n'utilise pas de cookies publicitaires ni de traceurs tiers. Le jeton de session (JWT)
      est stocké dans le stockage local du navigateur (localStorage) et sert uniquement à maintenir la
      connexion ; il est strictement nécessaire au fonctionnement du service et n'est donc pas soumis au
      recueil de consentement prévu par la réglementation "cookies" de la CNIL.
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">10. Droits des utilisateurs</h2>
    <p class="mb-2">Conformément au RGPD, chaque utilisateur dispose des droits suivants sur ses données :</p>
    <ul class="mb-4">
      <li>Droit d'accès</li>
      <li>Droit de rectification</li>
      <li>Droit à l'effacement</li>
      <li>Droit à la limitation du traitement</li>
      <li>Droit à la portabilité</li>
      <li>Droit d'opposition</li>
    </ul>
    <p class="mb-4">Ces droits peuvent être exercés en écrivant à [votre adresse email de contact].</p>
    <p class="mb-4">
      Chaque utilisateur dispose également du droit d'introduire une réclamation auprès de la CNIL
      (www.cnil.fr) s'il estime que ses droits ne sont pas respectés.
    </p>

    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">11. Modification de la politique</h2>
    <p>
      Cette politique peut être mise à jour ; la date de dernière modification figure en haut de ce
      document.
    </p>
  </v-container>
</template>
