import { ToastContainerOptions } from '..';
import { reactive } from 'vue';

export const appInstance = reactive<{ useHandler: any }>({ useHandler: undefined });

export const globalOptions = reactive<{ [key: string]: ToastContainerOptions }>({});

export const globalCache = reactive({} as { lastUrl: string });
