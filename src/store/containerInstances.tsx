/* eslint-disable guard-for-in */
import { type App, reactive } from 'vue';
import { toastMap } from '../composables';
import { Id } from '../types';

export const containerInstances = reactive({} as Record<string, App<Element>>);

export function cacheRenderInstance(app: App<Element>, id: Id) {
  const container = document.getElementById(String(id));
  if (container) {
    containerInstances[container.id] = app;
  }
}

export function unmountContainer(containerId: Id) {
  const id = String(containerId);

  if (!containerInstances[id]) return;

  try {
    containerInstances[id].unmount();
  } catch (error) {
    // error
  }
  document.getElementById(id)?.remove();
  delete containerInstances[id];

  if (Object.prototype.hasOwnProperty.call(toastMap, id)) {
    delete toastMap[id];
  }
}

export function unmountAllContainer() {
  for (const id in containerInstances) {
    unmountContainer(id);
  }

  for (const id in toastMap) {
    if (Object.prototype.hasOwnProperty.call(toastMap, id)) {
      delete toastMap[id];
    }
  }
}
