<template>
    <div class="register-container">
      <h2>Registrar</h2>
      <form @submit.prevent="register">
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
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async register() {
        this.errorMessage = '';
        this.successMessage = '';
  
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'As senhas não coincidem.';
          return;
        }
  
        try {
          const res = await fetch(`${process.env.VUE_APP_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password
            })
          });
  
          const data = await res.json();
  
          if (res.ok) {
            this.successMessage = 'Conta criada com sucesso!';
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          } else {
            this.errorMessage = data.message || 'Erro ao criar conta.';
          }
        } catch (err) {
          this.errorMessage = 'Erro na requisição.';
        }
      }
    }
  };
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
  