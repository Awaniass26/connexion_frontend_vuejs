<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useAuthStore } from "../stores/auth";
  
  const auth = useAuthStore();
  const email = ref("");
  const password = ref("");
  
  const handleLogin = () => {
      auth.login(email.value, password.value);
  };
  </script>
  