import { isVNode, nextTick, onMounted, onUnmounted, reactive, toRaw } from 'vue';
import { Content, Id, ToastOptions, ToastProps, UpdateOptions } from '../types';
import { eventManager, Event, unmountAllContainer, unmountContainer } from '..';

export interface ToastMap {
  [containerId: Id]: ToastOptions[];
}

export const toastMap = reactive({} as ToastMap);

export function getAllToast() {
  const rawMap = toRaw(toastMap);
  return Object.values(rawMap).reduce((t, v) => [...t, ...v], []);
}

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
export function getToast(toastId: Id) {
  const toasts = getAllToast();

  return toasts.find(v => v.toastId === toastId);
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
      let item = toasts.find(v => v.toastId === id);

      toastMap[containerId] = toasts.filter(v => v.toastId !== id);

      if (!toastMap[containerId].length) {
        unmountContainer(containerId, false);
      }

      nextTick(() => {
        if (item?.onClose) {
          item.onClose(getCallbackProps(item));
          item = undefined;
        }
      });
    }
  }
}

export function addOne(_: Content, opts: ToastProps) {
  const { containerId = '' } = opts;
  if (containerId) {
    toastMap[containerId] = toastMap[containerId] || [];
    if (!toastMap[containerId].find(v => v.toastId === opts.toastId)) {
      setTimeout(() => {
        if (opts.newestOnTop) {
          toastMap[containerId].unshift(opts);
        } else {
          toastMap[containerId].push(opts);
        }
        if (opts.onOpen) {
          opts.onOpen(getCallbackProps(opts));
        }
      }, opts.delay || 0);
    }
  }
}

function getCallbackProps(opts: ToastProps) {
  const result = isVNode(opts.content) ? toRaw(opts.content.props) : null;
  return result ?? toRaw(opts.data ?? {});
}

export function updateToast(opts = {} as UpdateOptions) {
  const { containerId = '' } = opts;
  if (containerId && opts.updateId) {
    toastMap[containerId] = toastMap[containerId] || [];
    const item = toastMap[containerId].find(v => v.toastId === opts.toastId);
    if (item) {
      setTimeout(() => {
        for (const optName in opts) {
          if (Object.prototype.hasOwnProperty.call(opts, optName)) {
            const value = opts[optName];
            item[optName] = value;
          }
        }
      }, opts.delay || 0);
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

export function useToastContainer(props = {} as ToastProps) {
  onMounted(() => {
    eventManager
      .off(Event.Add, addOne)
      .off(Event.Remove, addOne)
      .off(Event.Update, updateToast)
      .off(Event.ClearAll, clearAll)
      .on(Event.Add, addOne)
      .on(Event.Update, updateToast)
      .on(Event.Remove, removeOne)
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
