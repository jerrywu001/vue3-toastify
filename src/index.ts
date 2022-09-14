import { Plugin } from 'vue';
import { ToastContainerOptions } from './types';
import { defaultGlobalOptions } from './utils/constant';
import { mergeOptions, saveGlobalOptions } from './utils/tools';

const Vue3Toastify: Plugin = {
  install(app, options = {} as ToastContainerOptions) {
    const globalOptions = mergeOptions<ToastContainerOptions>(defaultGlobalOptions, options);
    saveGlobalOptions(globalOptions);
  },
};

// CDN compatibility
if (typeof window !== 'undefined') {
  window.Vue3Toastify = Vue3Toastify;
}

export default Vue3Toastify;
export * from './types'; // can not delete
export * from './components';
export * from './core';
export * from './store';
export * from './composables';
