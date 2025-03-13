<template>
  <div class="container">
    <h1>Gestion des utilisateurs</h1>
    
    <h2>Ajouter un utilisateur</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="newUser.username" type="text" placeholder="Nom d'utilisateur" required />
      <input v-model="newUser.email" type="email" placeholder="Email" required />
      <input v-model="newUser.password" type="password" placeholder="Mot de passe" required />
      <select v-model="newUser.role">
        <option value="Medecin">Médecin</option>
        <option value="Patient">Patient</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>

    <h2>Liste des utilisateurs</h2>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const users = ref([]);
const newUser = ref({ username: "", email: "", password: "", role: "Medecin" });

const fetchUsers = async () => {
    await auth.fetchUsers();
    users.value = auth.users;
};

const handleRegister = async () => {
    await auth.registerUser(newUser.value.username, newUser.value.email, newUser.value.password, newUser.value.role);
    newUser.value = { username: "", email: "", password: "", role: "Medecin" }; // Réinitialiser le formulaire
};

onMounted(fetchUsers);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #007bff;
  margin-bottom: 15px;
}

h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

input, select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s;
}

input:focus, select:focus {
  border: 1px solid #007bff;
}

button {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

th {
  background: #007bff;
  color: white;
  text-align: left;
  padding: 12px;
  font-size: 16px;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
  color: #333;
}

tbody tr:hover {
  background: #f0f8ff;
  transition: background 0.3s ease;
}

@media screen and (max-width: 600px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
