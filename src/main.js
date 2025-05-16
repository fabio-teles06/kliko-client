import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(ui)
app.use(pinia);
app.mount('#app');
