import { ToastifyContainer, type ToastFunc } from 'vue3-toastify';
import type { Plugin, VNode } from 'vue';

declare const Vue3Toastify: Plugin;
export default Vue3Toastify;

declare global {
  interface Window {
    // toast for CDN compatibility
    Vue3Toastify?: typeof Vue3Toastify;
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
