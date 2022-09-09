import { onMounted, onUnmounted, reactive, toRaw } from 'vue';
import { Content, Id, ToastOptions, TransitionGroupOptions } from '../types';
import { eventManager, Event, unmountAllContainer, unmountContainer } from '..';

export interface ToastMap {
  [containerId: Id]: ToastOptions[];
}

type Options = ToastOptions & TransitionGroupOptions;

export const toastMap = reactive({} as ToastMap);

export function getAllToast() {
  const rawMap = toRaw(toastMap);
  return Object.values(rawMap).reduce((t, v) => [...t, ...v], []);
}

export function getContainerId(id: Id) {
  const all = getAllToast();
  const toast = all.find(v => v.toastId === id);

  return toast?.containerId;
}

export function removeOne(id?: Id) {
  if (id) {
    const containerId = getContainerId(id);
    if (containerId) {
      const toasts = toastMap[containerId];
      toastMap[containerId] = toasts.filter(v => v.toastId !== id);

      if (!toastMap[containerId].length) {
        unmountContainer(containerId);
      }
    }
  }
}

export function addOne(_: Content, opts: Options) {
  const { containerId = '' } = opts;
  if (containerId) {
    toastMap[containerId] = toastMap[containerId] || [];
    if (!toastMap[containerId].find(v => v.toastId === opts.toastId)) {
      if (opts.newestOnTop) {
        toastMap[containerId].unshift(opts);
      } else {
        toastMap[containerId].push(opts);
      }
    }
  }
}

export function clearAll(containerId?: Id) {
  if (!containerId) {
    unmountAllContainer();
  } else {
    unmountContainer(containerId);
  }
}

export function useToastContainer(props = {} as Options) {
  onMounted(() => {
    eventManager
      .off(Event.Add, addOne)
      .off(Event.Remove, addOne)
      .on(Event.Add, addOne)
      .on(Event.Remove, removeOne)
      .off(Event.ClearAll, clearAll)
      .on(Event.ClearAll, clearAll);
  });

  onUnmounted(() => {
    eventManager
      .off(Event.Add, addOne)
      .off(Event.ClearAll, clearAll)
      .off(Event.Remove, removeOne);
  });

  return {
    toastMap,
  };
}
