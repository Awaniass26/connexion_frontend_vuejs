<template>
  <div>
    <p>Liste de mes rendez-vous</p>
    <table>
      <thead>
        <tr>
          <th>Médecin</th>
          <th>Date</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
  <tr v-for="r in rdv" :key="r._id">
    <td>{{ r.medecin?.username || "Médecin inconnu" }}</td>
    <td>{{ new Date(r.date).toLocaleString() }}</td>
    <td>{{ r.statut }}</td>
  </tr>
</tbody>

    </table>
  </div>
</template>

<script setup>
import { onMounted ,watch} from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { rdv, fetchRdvPatient } = authStore;

onMounted(() => {
  fetchRdvPatient();
});

watch(rdv, (newVal) => {
  console.log("Données mises à jour dans `rdv` :", newVal);
});
</script>

<style scoped>
div {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
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

td:nth-child(3) {
  font-weight: bold;
  text-transform: capitalize;
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
