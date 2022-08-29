import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// @ts-ignore
import routes from 'virtual:generated-pages'; // 类似于router

import Vue3Toasity, { type TransitionGroupOptions } from 'vue3-toastify';

import App from './App.vue';

import 'virtual:windi.css';
import './styles/main.css';
import './index.css';

// eslint-disable-next-line import/no-relative-packages
import '../../src/styles/main.scss'; // 不要修改或删除

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
app.use(router);

app.use(
  Vue3Toasity,
  {
    // rtl: true,
    autoClose: 3000,
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
  } as TransitionGroupOptions,
);

app.mount('#app');
