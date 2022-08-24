import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// @ts-ignore
import routes from 'virtual:generated-pages'; // 类似于router

import Vue3Toasity, { type GlobalOptions } from 'vue3-toastify';

import App from './App.vue';

import '@unocss/reset/tailwind.css';
import 'virtual:windi.css';
import 'uno.css';
import './styles/main.css';
import './index.css';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
app.use(router);
app.use(Vue3Toasity, { duration: 3000 } as GlobalOptions);
app.mount('#app');
