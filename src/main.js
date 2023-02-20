import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/icon.scss';
import './assets/normalize.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

const app = createApp(App);
app.use(createPinia());

app.mount('#app');
