import { addToast } from '../..';
import { createVNode, render } from 'vue';
import { defaultToastOptions, POSITION, TYPE } from '../../utils/constant';
import { generateRenderRoot, generateToastId } from '../../utils/tools';
import { ToastifyContainer } from '../../components';
import type { Content, ToastOptions, ToastType } from '../../types';

function openToast(content: Content, type: ToastType, options = {} as ToastOptions) {
  options = { ...defaultToastOptions, type, ...options };
  if (!options.toastId) {
    options.toastId = generateToastId();
  }
  options = { ...options, content } as ToastOptions;
  const rootDom = generateRenderRoot(options);

  addToast(options);

  // @ts-ignore
  const vm = createVNode(ToastifyContainer, options);
  render(vm, rootDom);
}

/** default toast */
const toast = (content: Content, options?: ToastOptions) => openToast(content, 'default', options);
/** info toast */
toast.info = (content: Content, options?: ToastOptions) => openToast(content, 'info', options);
/** error toast */
toast.error = (content: Content, options?: ToastOptions) => openToast(content, 'error', options);
/** warning toast */
toast.warn = (content: Content, options?: ToastOptions) => openToast(content, 'warn', options);
/** success toast */
toast.success = (content: Content, options?: ToastOptions) => openToast(content, 'success', options);
toast.POSITION = POSITION;
toast.TYPE = TYPE;

export default toast;
