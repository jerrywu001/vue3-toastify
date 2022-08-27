import { ref } from 'vue';
import { ToastOptions } from 'vue3-toastify/types';

export const toastOptionList = ref<ToastOptions[]>([]);

export const addToast = (item: ToastOptions) => {
  toastOptionList.value.push(item);
};
