import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("token") || "");
    const role = ref(localStorage.getItem("role") || "");
    const router = useRouter();
    const users = ref([]); 
    const patients = ref([]);
    const rdv = ref([]);
    

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/auth/users", {
                headers: { Authorization: `Bearer ${token.value}` },
            });
            console.log("Utilisateurs récupérés :", res.data);
            users.value = res.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        }
    };
    

const registerUser = async (username: string, email: string, password: string, role: string) => {
    try {
        const res = await axios.post("http://localhost:5000/auth/register-user",
            { username, email, password, role },
            { headers: { Authorization: `Bearer ${token.value}` } }
        );
        console.log("Utilisateur créé :", res.data);
        console.log("Données envoyées pour l'inscription :", { username, email, password, role });
        
        await fetchUsers();
        console.log("fetchUsers() a bien été appelé !"); 
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
    }
};



    const register = async (username: string, email: string, password: string, value: string) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/register", { username, email, password });
            console.log("Inscription réussie :", res.data);
        } catch (error) {
            console.error("Erreur d'inscription :", error);
        }
    };
    

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", { email, password });
            token.value = res.data.token;
            role.value = res.data.user.role.name; 
            localStorage.setItem("token", token.value);
            localStorage.setItem("role", role.value);

            if (role.value === "Secretaire") {
                router.push("/dashboard");
            } else if (role.value === "Medecin") {
                router.push("/medecin-dashboard");
            } else if (role.value === "Patient") {
                router.push("/patient-dashboard");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
        }
    };


    const fetchPatients = async () => {
        try {
            const res = await axios.get("http://localhost:5000/auth/medecin/patients", {
                headers: { Authorization: `Bearer ${token.value}` },
            });
            patients.value = res.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des patients :", error);
        }
    };

    const fetchRdvMedecin = async () => {
        try {
            const res = await axios.get("http://localhost:5000/rdv/medecin", {
                headers: { Authorization: `Bearer ${token.value}` },
            });
            console.log("Rendez-vous médecin récupérés :", res.data);
            rdv.value = res.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des rendez-vous médecin :", error);
        }
    };
    
    
    const gererRendezVous = async (rdvId: string, action: string) => {
        try {
            await axios.put("http://localhost:5000/rdv/gerer", 
                { rdvId, action },
                { headers: { Authorization: `Bearer ${token.value}` } }
            );
            fetchRdvMedecin(); 
        } catch (error) {
            console.error("Erreur lors de la mise à jour du rendez-vous :", error);
        }
    };

    const fetchRdvPatient = async () => {
        try {
            const res = await axios.get("http://localhost:5000/rdv/patient", {
                headers: { Authorization: `Bearer ${token.value}` },
            });
            console.log("Rendez-vous du patient récupérés :", res.data);
            rdv.value = res.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des rendez-vous patient :", error);
        }
    };
    
    

    const logout = () => {
        token.value = "";
        role.value = "";
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/login");
    };

    return { token, role, login, fetchRdvMedecin, rdv, gererRendezVous, fetchPatients, patients, fetchUsers, users, registerUser, register, logout, fetchRdvPatient };
});
