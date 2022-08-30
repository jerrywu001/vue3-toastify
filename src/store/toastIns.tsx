import { type App, ref } from 'vue';
import { Id } from '../types';

export const toastInsMap = ref<Record<string, App<Element>>>({});

export function cacheRenderInstance(app: App<Element>, id: Id) {
  const container = document.getElementById(String(id));
  if (container) {
    toastInsMap.value[container.id] = app;
  }
}
