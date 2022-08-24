/* eslint-disable @typescript-eslint/no-empty-interface */
import { ToastifyContainer } from './components';
import type { Plugin, VNode } from 'vue';

declare const Vue3Toastify: Plugin;
export default Vue3Toastify;

declare global {
  interface Window {
    Vue3Toastify?: Vue3Toastify;
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: ToastFunc;
  }

  export interface GlobalComponents {
    ToastifyContainer: typeof ToastifyContainer;
  }
}
