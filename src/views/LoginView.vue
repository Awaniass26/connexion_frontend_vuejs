<template>
  <div class="container">
    <div class="form-box">
      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #74ebd5, #acb6e5); 
}

.form-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
}

h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus {
  border-color: #ff9a9e;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 154, 158, 0.5);
}

button {
  width: 100%;
  padding: 10px;
  background: #74ebd5;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

button:active {
  transform: scale(0.98);
}
</style>
