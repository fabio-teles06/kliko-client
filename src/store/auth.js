import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // user: null,
        token: localStorage.getItem('token') || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        async login(email, password) {
            const res = await axios.post(`${import.meta.env.API_URL}/auth/login`, { email, password });
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
            //this.user
        },
        async register(name, email, password) {
            const res = await axios.post(`${import.meta.env.API_URL}/auth/register`, { name, email, password });
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
            //this.user
        },
        async logout() {
            //TODO: await axios.post(`${process.env.VUE_APP_API_URL}/auth/logout`);
            this.token = null;
            localStorage.removeItem('token');
        },
    }
})