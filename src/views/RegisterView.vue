<template>
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="handleRegister">
        <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useAuthStore } from "../stores/auth";
  
  const auth = useAuthStore();
  const username = ref("");
  const email = ref("");
  const password = ref("");
  
  const handleRegister = () => {
      auth.register(username.value, email.value, password.value);
  };
  </script>
  