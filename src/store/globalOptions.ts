import { ToastContainerOptions } from '..';
import { reactive } from 'vue';

export const globalOptions = reactive<{ [key: string]: ToastContainerOptions }>({});

export const globalCache = reactive<{
  lastUrl: string;
}>({});
