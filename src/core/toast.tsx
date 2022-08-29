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
const toast = (content: Content, options?: ToastOptions) => openToast(content, TYPE.DEFAULT, options);
/** info toast */
toast.info = (content: Content, options?: ToastOptions) => openToast(content, TYPE.INFO, options);
/** error toast */
toast.error = (content: Content, options?: ToastOptions) => openToast(content, TYPE.ERROR, options);
/** warning toast */
toast.warning = (content: Content, options?: ToastOptions) => openToast(content, TYPE.WARNING, options);
toast.warn = toast.warning;
/** success toast */
toast.success = (content: Content, options?: ToastOptions) => openToast(content, TYPE.SUCCESS, options);
/** loading toast */
toast.loading = (content: Content, options?: ToastOptions) => openToast(
  content,
  TYPE.DEFAULT,
  mergeOptions(options, {
    isLoading: true,
    autoClose: false,
    closeOnClick: false,
    closeButton: false,
    draggable: false,
  } as ToastOptions),
);
/** dark toast */
toast.dark = (content: Content, options?: ToastOptions) => mergeOptions(
  content,
  TYPE.DEFAULT,
  mergeOptions(options, { theme: 'dark' }),
);

toast.POSITION = POSITION;
toast.TYPE = TYPE;

export default toast;
