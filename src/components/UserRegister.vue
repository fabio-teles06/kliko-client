<template>
  <div class="register-container">
    <h2>Registrar</h2>
    <form @submit.prevent="submit">
      <input v-model="name" type="text" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirmar Senha" required />
      <button type="submit">Criar Conta</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  isLoading.value = true
  //erro
  try {
    await auth.register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Erro ao fazer login')
  } finally {
    isLoading.value = false
  }
}
</script>

<style>
.register-container {
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
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>