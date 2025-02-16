<template>
    <div>
      <h1>Tableau de bord</h1>
      <button @click="auth.logout">Se déconnecter</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from "../stores/auth";
  const auth = useAuthStore();
  </script>
  