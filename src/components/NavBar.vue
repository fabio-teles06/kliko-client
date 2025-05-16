<template>
    <nav class="navbar">
        <div class="navbar-brand">
            Kliko
        </div>
        <ul class="navbar-menu">
            <li>
                <a href="/">Sobre</a>
            </li>
            <li v-if="isAuthenticated">
                <a href="#" @click.prevent="logout">Logout</a>
            </li>
            <li v-else>
                <a href="login">Login</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>

import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

const auth = useAuthStore();
const isAuthenticated = computed(() => auth.isAuthenticated);

const logout = () => {
    auth.logout();
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    color: #fff;
    padding: 1rem;
}

.navbar-menu {
    list-style: none;
    display: flex;
    gap: 1rem;
}

.navbar-menu a {
    color: #fff;
    text-decoration: none;
}
</style>