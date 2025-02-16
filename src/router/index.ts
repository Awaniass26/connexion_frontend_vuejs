import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./../views/HomeView.vue";
import LoginView from "./../views/LoginView.vue";
import RegisterView from "./../views/RegisterView.vue";
import DashboardView from "./../views/DashboardView.vue";


const routes = [
    { path: "/", component: HomeView },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    { path: "/dashboard", component: DashboardView, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Protéger la route Dashboard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.meta.requiresAuth && !token) {
        next("/login");
    } else {
        next();
    }
});

export default router;
