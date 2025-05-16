<template>
  <div id="app" class="app-container">
    <!-- <img src="./assets/logo.png" alt="Logo" class="logo" />
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/login" v-if="!isAuthenticated">Login</RouterLink>
    <RouterLink to="/register" v-if="!isAuthenticated">Registrar</RouterLink>
    <RouterLink to="/dashboard" v-if="isAuthenticated">Dashboard</RouterLink>
    <button @click="logout" v-if="isAuthenticated">Logout</button> -->
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';

// import { useAuthStore } from '@/store/auth';
// import { computed } from 'vue';
// import { RouterView, useRouter } from 'vue-router';

// const router = useRouter();
// const auth = useAuthStore();
// const isAuthenticated = computed(() => auth.isAuthenticated);

// const logout = () => {
//   auth.logout();
//   router.go('/login');
// };
</script>

<style>
.app-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.logo {
  display: block;
  margin: 0 auto 20px;
  max-width: 200px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.footer {
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.footer a {
  color: #1a73e8;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>