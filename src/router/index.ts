import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./../views/HomeView.vue";
import LoginView from "./../views/LoginView.vue";
import RegisterView from "./../views/RegisterView.vue";
import DashboardView from "./../views/DashboardView.vue";
import MedecinDashboard from "./../views/MedecinDashboard.vue";
import PatientDashboard from "./../views/PatientDashboard.vue";
import axios from "axios";

const routes = [
    { path: "/", component: HomeView, meta: { requiresNoAuth: true } },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView, meta: { requiresSecretaire: true } },
    { path: "/dashboard", component: DashboardView, meta: { requiresAuth: true, requiresSecretaire: true } },
    { path: "/medecin-dashboard", component: MedecinDashboard, meta: { requiresAuth: true, requiresMedecin: true } },
    { path: "/patient-dashboard", component: PatientDashboard, meta: { requiresAuth: true, requiresPatient: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

async function checkIfSecretaireExists() {
    try {
        const res = await axios.get("http://localhost:5000/auth/secretaires-count");
        return res.data.count >= 2;
    } catch (error) {
        console.error("Erreur lors de la vérification des Secrétaires :", error);
        return false;
    }
}

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (to.path === "/register") {
        const isSecretaireFull = await checkIfSecretaireExists();
        if (isSecretaireFull) {
            next("/login"); 
        } else {
            next();
        }
        return;
    }

    if (to.meta.requiresAuth && !token) {
        next("/login");
    } else if (to.meta.requiresSecretaire && role !== "Secretaire") {
        next("/login");
    } else if (to.meta.requiresMedecin && role !== "Medecin") {
        next("/login");
    } else if (to.meta.requiresPatient && role !== "Patient") {
        next("/login");
    } else {
        next();
    }
});

export default router;
