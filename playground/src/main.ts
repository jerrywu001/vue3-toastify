import { App, createApp } from 'vue';
import router from './routes';

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';

import Root from './App.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import './styles/main.css';
import './index.css';

import '../../src/styles/main.scss'; // 不要修改或删除

const app = createApp(Root);

app.use(router);

resolveGLobalComponents(app);

function resolveGLobalComponents(instance: App<Element>) {
  instance.use(Antd);
}

app.use(
  Vue3Toasity,
  {
    useHandler: resolveGLobalComponents,
    // rtl: true,
    containerClassName: 'container-classsssssss',
    toastClassName: 'toast-classssssss',
    bodyClassName: 'toast-body-Ccccct-size',
    progressClassName: 'fancy-progress-bar',
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
  } as ToastContainerOptions,
);

app.mount('#app');
