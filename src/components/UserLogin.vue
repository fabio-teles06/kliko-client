<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Senha" required />
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

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
    isLoading.value = true
    //erro
    try {
        await auth.login(email.value, password.value)
        router.push('/dashboard')
    } catch (err) {
        alert('Erro ao fazer login')
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
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
}

button {
    width: 100%;
    padding: 10px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>