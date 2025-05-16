<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Senha" required />
            <p>Não tem uma conta? <router-link to="/register">Registrar</router-link></p>
            <button type="submit" :disabled="isLoading">
                <span v-if="isLoading">Entrando...</span>
                <span v-else>Entrar</span>
            </button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
    errorMessage.value = '';

    isLoading.value = true
    try {
        await auth.login(email.value, password.value)
        router.push('/dashboard')
    } catch (err) {
        if (err.response && err.response.status === 422) {
            errorMessage.value = 'Email ou senha inválidos';
        } else {
            errorMessage.value = 'Erro ao fazer login, tente novamente';
        }
    } finally {
        isLoading.value = false
    }
}
</script>

<style>
.login-container {
    max-width: 400px;
    margin: 60px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

input {
    display: border-box;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
}

button {
    width: 100%;
    padding: 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>