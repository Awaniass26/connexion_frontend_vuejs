<!-- <template>
  <div class="container">
    <div class="overlay"></div>
    <div class="welcome-box">
      <h1>🏥 Bienvenue à l'Hôpital Santé+</h1>
      <p class="subtitle">Votre santé, notre priorité</p>

      <div v-if="isAuthenticated" class="links">
        <router-link v-if="role === 'Secretaire'" to="/register" class="btn btn-primary">Se connecter</router-link>
        <router-link v-if="role === 'Secretaire'" to="/dashboard" class="btn btn-secondary">Tableau de bord Secretaire</router-link>
        <router-link v-if="role === 'Medecin'" to="/medecin-dashboard" class="btn btn-secondary">Tableau de bord Medecin</router-link>
        <router-link v-if="role === 'Patient'" to="/patient-dashboard" class="btn btn-secondary">Tableau de bord Patient</router-link>
      </div>

      <div v-else class="links">
        <router-link to="/login" class="btn btn-primary">Se connecter</router-link>
        <p v-if="canShowRegister">
          Pas de compte ? <router-link to="/register" class="lk">S'inscrire ici</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);
const role = computed(() => authStore.role);

// Seul le premier Secretaire peut s'inscrire
const canShowRegister = computed(() => !isAuthenticated.value);
</script>


<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/images/hosp.jpg") center/cover no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.welcome-box {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 400px;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #333;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lk {
  color: #3dc2ff;
  text-decoration: underline;
}

.btn {
  padding: 12px 18px;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.btn-primary {
  background: #3dc2ff;
  color: white;
  border: none;
}

.btn-secondary {
  background: white;
  color: #3dc2ff;
  border: 2px solid #3dc2ff;
}
</style> -->

<template>
  <div class="login-container">
    <div class="left-section"></div>

    <div class="right-section">
      <div class="login-box">
        <h1 class="title">Bienvenue</h1>
        <div v-if="isAuthenticated" class="links">
        <router-link v-if="role === 'Secretaire'" to="/register" class="btn btn-primary">Se connecter</router-link>
        <router-link v-if="role === 'Secretaire'" to="/dashboard" class="btn btn-secondary">Tableau de bord Secretaire</router-link>
        <router-link v-if="role === 'Medecin'" to="/medecin-dashboard" class="btn btn-secondary">Tableau de bord Medecin</router-link>
        <router-link v-if="role === 'Patient'" to="/patient-dashboard" class="btn btn-secondary">Tableau de bord Patient</router-link>
      </div>
        <p class="subtitle">Nouvel utilisateur ? <router-link to="/register">S'inscrire</router-link></p>

        <form @submit.prevent="login">
          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="email" placeholder="Email address" required />
          </div>

          <div class="input-group">
            <label>Mot de passe</label>
            <input type="password" v-model="password" placeholder="Votre mot de passe" required />
          </div>

          <button type="submit" class="btn-primary">Se connecter</button>

          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember">Se souvenir de moi</label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const login = async () => {
  await authStore.login(email.value, password.value, rememberMe.value);
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  border: 2px solid gray;
}

.left-section {
  flex: 1;
  background: url("/images/img.jpg") center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.left-section .logo {
  font-size: 2rem;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: 30px;
}

.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.login-box {
  width: 350px;
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: #3dc2ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 0.9rem;
}

.remember-me input {
  margin-right: 8px;
}

.router-link-active {
  color: #3dc2ff;
}
</style>
