import { defineStore } from "pinia";

import axios from "axios";

export const authStore = defineStore("auth", {

    state:() => ({
        authUser: null
    }),

    getters:{
        user: (state) => state.authUser
    },

    actions: {
    async getToken  ()  {
    await axios.get('/sanctum/csrf-cookie');
    },
async getUser() {
    const token = localStorage.getItem('access_token');
    if (token) {
        try {
            const response = await axios.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update authUser to store both user data and role
            this.authUser = {
                ...response.data.user, // Spread user data
                role: response.data.role // Add role to the user object
            };
        } catch (error) {
            console.error('Failed to fetch user:', error);
            this.authUser = null;  // Clear authUser if request fails (e.g., token is invalid)
        }
    } else {
        this.authUser = null;  // No token found, set user to null
    }
}
,

  async logOut() {
    try {
        // Kirim request logout dengan menyertakan token di header
        await axios.post('/api/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        // Hapus token dari localStorage dan reset user state
        localStorage.removeItem('access_token');
        this.authUser = null;
    } catch (error) {
        console.error('Logout error:', error);
    }
}


    }
});

