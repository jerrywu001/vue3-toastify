import { GlobalOptions } from './types';
import { ToastifyContainer } from './components';
import { Plugin } from 'vue';

const defaultOptions = {
  duration: 5000,
} as GlobalOptions;

const Vue3Toastify: Plugin = {
  install(app, options = defaultOptions) {
    console.log(options);
    app.component('ToastifyContainer', ToastifyContainer);
  },
};

// CDN compatibility
if (window !== undefined && 'Vue' in window) {
  window.Vue3Toastify = Vue3Toastify;
}

export default Vue3Toastify;
export * from './types'; // can not delete
export * from './components';
export * from './hooks';
