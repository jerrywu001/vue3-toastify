import { Plugin } from 'vue';
import { ToastContainerOptions } from './types';
import { defaultGlobalOptions } from './utils/constant';
import { mergeOptions, saveGlobalOptions } from './utils/tools';
import { appInstance } from './store';

const Vue3Toastify: Plugin = {
  install(_, options = {} as Partial<ToastContainerOptions>) {
    appInstance.useHandler = options.useHandler || (() => {});
    updateGlobalOptions(options);
  },
};

// CDN compatibility
if (typeof window !== 'undefined') {
  window.Vue3Toastify = Vue3Toastify;
}

export function updateGlobalOptions(options = {} as Partial<ToastContainerOptions>) {
  const globalOptions = mergeOptions<ToastContainerOptions>(defaultGlobalOptions, options);

  saveGlobalOptions(globalOptions);
}

export default Vue3Toastify;
export * from './types'; // can not delete
export * from './components';
export * from './core';
export * from './store';
export * from './composables';
export { Bounce, Flip, Slide, Zoom } from './utils/constant';
