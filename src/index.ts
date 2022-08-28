import { Plugin } from 'vue';
import { defaultGlobalOptions } from './utils/constant';

const Vue3Toastify: Plugin = {
  install(app, options = {}) {
    options = { ...defaultGlobalOptions, ...options };
    console.log(options);
  },
};

// CDN compatibility
if (window !== undefined && 'Vue' in window) {
  window.Vue3Toastify = Vue3Toastify;
}

export default Vue3Toastify;
export * from './types'; // can not delete
export * from './components';
export * from './core';
export * from './store';
