<template>
  <div class="shortener-box">
    <form @submit.prevent="encurtarUrl" class="shortener-form">
      <input type="text" v-model="url" placeholder="Digite a URL" class="url-input" />
      <button type="submit" class="submit-button">Encurtar</button>
    </form>

    <div v-if="shortUrl" class="result-box">
      <strong>✅ Seu link encurtado:</strong>
      <p class="warning-text">Salve-o, pois essa será a última vez que verá esse link.</p>
      <p class="warning-text">Estou trabalhando em um sistema para gerenciar melhor os links criados.</p>
      <a :href="shortUrl" target="_blank" class="short-url">{{ shortUrl }}</a>
      <button @click="copiarUrl" class="copy-button">Copiar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UrlShortener',
  data() {
    return {
      url: '',
      shortUrl: ''
    };
  },
  methods: {
    async encurtarUrl() {
      try {
        const res = await axios.post(`https://www.kliko.app.br/shorten`, {
          url: this.url
        });
        this.shortUrl = res.data.shortUrl;
      } catch (error) {
        console.error(error);
        alert('Erro ao encurtar o link');
      }
    },
    copiarUrl() {
      navigator.clipboard.writeText(this.shortUrl)
        .then(() => {
          alert('Link copiado para a área de transferência!');
        })
        .catch(() => {
          alert('Erro ao copiar o link.');
        });
    }
  }
};
</script>
<style scoped>
.shortener-box {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.shortener-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.url-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.submit-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.result-box {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-left: 4px solid #4CAF50;
  border-radius: 8px;
}

.warning-text {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}

.short-url {
  font-size: 18px;
  color: #1a73e8;
  word-break: break-all;
}

.copy-button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.copy-button:hover {
  background-color: #1976D2;
}

@media (max-width: 600px) {
  .shortener-form {
    flex-direction: column;
  }

  .url-input {
    width: 100%;
  }

  .copy-button {
    width: 100%;
    margin-top: 10px;
  }

  .submit-button {
    width: 100%;
  }
}
</style>
