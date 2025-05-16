<template>
  <div class="register-container">
    <h2>Registrar</h2>
    <form @submit.prevent="submit">
      <input v-model="name" type="text" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirmar Senha" required />
      <p>Já tem uma conta? <router-link to="/login">Entrar</router-link></p>
      <button :disabled="isLoading" type="submit">Criar Conta</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const auth = useAuthStore();

const submit = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem';
    return;
  }

  isLoading.value = true;

  try {
    await auth.register(name.value, email.value, password.value);
    successMessage.value = 'Conta criada com sucesso! Você pode fazer login agora.';
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errorMessage.value = 'Email já cadastrado';
    } else {
      errorMessage.value = 'Erro ao registrar, tente novamente';
    }
  } finally {
    isLoading.value = false;
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
  display: border-box;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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