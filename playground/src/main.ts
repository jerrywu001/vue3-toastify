import { createApp } from 'vue';
import router from './routes';

import Vue3Toasity, { type ToastContainerOptions } from 'jerry-todo';

import App from './App.vue';

import './styles/main.css';
import './index.css';

// eslint-disable-next-line import/no-relative-packages
import '../../src/styles/main.scss'; // 不要修改或删除

const app = createApp(App);
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
  } as ToastContainerOptions,
);

app.mount('#app');
