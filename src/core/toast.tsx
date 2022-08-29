import { addToast } from '../store';
import { createApp } from 'vue';
import { generateRenderRoot, toastContainerInScreen } from '../utils/render';
import { generateToastId, getGlobalOptions, mergeOptions } from '../utils/tools';
import { POSITION, TYPE } from '../utils/constant';
import { ToastifyContainer } from '../components';
import type { Content, ToastOptions, ToastType } from '../types';

function openToast(content: Content, type: ToastType, options = {} as ToastOptions) {
  options = mergeOptions<ToastOptions>(getGlobalOptions(), { type }, options);

  if (!options.toastId) {
    options.toastId = generateToastId();
  }
  options = { ...options, content } as ToastOptions;
  console.log('Toast options: ', options);

  addToast(options);

  if (!toastContainerInScreen(options.position)) {
    const rootDom = generateRenderRoot(options);
    // @ts-ignore
    const app = createApp(ToastifyContainer, options);
    app.mount(rootDom);
  }
}

/** default toast */
const toast = (content: Content, options?: ToastOptions) => openToast(content, 'default', options);
/** info toast */
toast.info = (content: Content, options?: ToastOptions) => openToast(content, 'info', options);
/** error toast */
toast.error = (content: Content, options?: ToastOptions) => openToast(content, 'error', options);
/** warning toast */
toast.warn = (content: Content, options?: ToastOptions) => openToast(content, 'warning', options);
/** success toast */
toast.success = (content: Content, options?: ToastOptions) => openToast(content, 'success', options);
toast.POSITION = POSITION;
toast.TYPE = TYPE;

export default toast;
