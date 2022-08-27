import { ref } from 'vue';
import { ToastOptions } from '../types';

export const toastOptionList = ref<ToastOptions[]>([]);

export const addToast = (item: ToastOptions) => {
  toastOptionList.value.push(item);
};
