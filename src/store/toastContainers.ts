import { isVNode, nextTick, reactive, toRaw } from 'vue';
import { Content, Id, ToastOptions, ToastProps, UpdateOptions } from '../types';
import { addExitAnimateToNode, clearContainers, removeContainer } from '..';

export interface IToastContainers {
  [containerId: Id]: ToastOptions[];
}

export const toastContainers = reactive({} as IToastContainers);

export function getAllToast() {
  const rawMap = toRaw(toastContainers);
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

function getCallbackProps(opts: ToastProps) {
  const result = isVNode(opts.content) ? toRaw(opts.content.props) : null;
  return result ?? toRaw(opts.data ?? {});
}

const ToastActions = {
  /**
   * add a toast
   * @param _ ..
   * @param opts toast props
   */
  add(_: Content, opts: ToastProps) {
    const { containerId = '' } = opts;
    if (containerId) {
      toastContainers[containerId] = toastContainers[containerId] || [];
      if (!toastContainers[containerId].find(v => v.toastId === opts.toastId)) {
        setTimeout(() => {
          if (opts.newestOnTop) {
            toastContainers[containerId]?.unshift(opts);
          } else {
            toastContainers[containerId]?.push(opts);
          }
          if (opts.onOpen) {
            opts.onOpen(getCallbackProps(opts));
          }
        }, opts.delay || 0);
      }
    }
  },
  /**
   * remove a toast
   * @param id toastId
   */
  remove(id?: Id) {
    if (id) {
      const containerId = getContainerId(id);
      if (containerId) {
        const toasts = toastContainers[containerId];
        let item = toasts.find(v => v.toastId === id);

        toastContainers[containerId] = toasts.filter(v => v.toastId !== id);

        if (!toastContainers[containerId].length) {
          removeContainer(containerId, false);
        }

        nextTick(() => {
          if (item?.onClose) {
            item.onClose(getCallbackProps(item));
            item = undefined;
          }
        });
      }
    }
  },
  /**
   * update the toast
   * @param opts toast props
   */
  update(opts = {} as UpdateOptions) {
    const { containerId = '' } = opts;
    if (containerId && opts.updateId) {
      toastContainers[containerId] = toastContainers[containerId] || [];
      const item = toastContainers[containerId].find(v => v.toastId === opts.toastId);
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
  },
  /**
   * clear all toasts in container.
   * @param containerId container id
   */
  clear(containerId?: Id, withExitAnimation = true) {
    if (!containerId) {
      clearContainers(withExitAnimation);
    } else {
      removeContainer(containerId, withExitAnimation);
    }
  },
  dismissCallback(evt: AnimationEvent) {
    // @ts-ignore
    const toastId = evt.currentTarget?.id;
    const node = document.getElementById(toastId);
    if (node) {
      node.removeEventListener('animationend', ToastActions.dismissCallback, false);
      setTimeout(() => {
        this.remove(toastId);
      });
    }
  },
  dismiss(toastId?: Id) {
    if (toastId) {
      const allToasts = getAllToast();
      for (const item of allToasts) {
        if (item.toastId === toastId) {
          addExitAnimateToNode(item, (node) => {
            node.addEventListener('animationend', ToastActions.dismissCallback, false);
          });
          break;
        }
      }
    }
  },
};

export { ToastActions };
