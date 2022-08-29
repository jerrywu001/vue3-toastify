import { Plugin } from 'vue';
import { TransitionGroupOptions } from './types';
import { defaultGlobalOptions } from './utils/constant';
import { mergeOptions, saveGlobalOptions } from './utils/tools';

const Vue3Toastify: Plugin = {
  install(app, options = {} as TransitionGroupOptions) {
    const globalOptions = mergeOptions<TransitionGroupOptions>(defaultGlobalOptions, options);
    saveGlobalOptions(globalOptions);
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
