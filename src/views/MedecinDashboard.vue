v<template>
  <div class="dashboard">
    <h1>Mes Rendez-vous</h1>
    <table>
      <thead>
        <tr>
          <th>Patient</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rdv" :key="r._id">
          <td>{{ r.patient?.username || "Inconnu" }}</td>
          <td>{{ new Date(r.date).toLocaleString() }}</td>
          <td>{{ r.statut }}</td>
          <td>
            <button @click="gererRendezVous(r._id, 'confirmer')" :disabled="r.statut === 'confirmé'">Confirmer</button>
            <button @click="gererRendezVous(r._id, 'annuler')" :disabled="r.statut === 'annulé'">Annuler</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { rdv, fetchRdvMedecin, gererRendezVous } = authStore;

onMounted(() => {
  fetchRdvMedecin();
});
</script>

<style scoped>
.dashboard {
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

th {
  background: #007bff;
  color: white;
  text-align: center;
  padding: 12px;
  font-size: 16px;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
  color: #333;
  text-align: center;
}

tbody tr:hover {
  background: #f0f8ff;
  transition: background 0.3s ease;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

button:first-child {
  background-color: #28a745;
  color: white;
}

button:first-child:hover {
  background-color: #218838;
}

button:last-child {
  background-color: #dc3545;
  color: white;
}

button:last-child:hover {
  background-color: #c82333;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

td:nth-child(3) {
  font-weight: bold;
  border-radius: 5px;
  padding: 5px;
}

td:nth-child(3):contains("confirmé") {
  color: #28a745;
}

td:nth-child(3):contains("annulé") {
  color: #dc3545;
}

td:nth-child(3):contains("en attente") {
  color: #ffc107;
}

@media screen and (max-width: 600px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
