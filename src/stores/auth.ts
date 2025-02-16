import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";


export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("token") || "");
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            token.value = res.data.token;
            localStorage.setItem("token", token.value);
            router.push("/dashboard");
        } catch (error) {
            console.error("Erreur de connexion :", error);
        }
    };

    const register = async (username: string, email: string, password: string, role: string) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", { username, email, password, role });
            console.log("Inscription réussie :", res.data);
        } catch (error) {
            console.error("Erreur d'inscription :", error);
        }
    };

    const logout = () => {
        token.value = "";
        localStorage.removeItem("token");
        router.push("/login");
    };

    return { token, login, register, logout };
});
