import {
  addExitAnimateToNode,
  cacheRenderInstance,
  clearContainers,
  removeContainer,
  toast,
  ToastifyContainer,
} from '..';
import {
  Content,
  Data,
  Id,
  ToastContainerOptions,
  ToastOptions,
  UpdateOptions,
} from '../types';
import {
  createApp,
  isVNode,
  nextTick,
  reactive,
  toRaw,
} from 'vue';
import { generateRenderRoot, toastContainerInScreen, UnmountTag } from '../utils/render';

type ToastSetting = ToastOptions & ToastContainerOptions;

interface QueuedToast {
  toastId: Id;
  containerId: Id;
  toastContent: Content;
  toastProps: ToastSetting;
}

function getContainerIdByToastId(id: Id) {
  const all = getAllToast();
  const item = all.find((v) => v.toastId === id);

  return item?.containerId;
}

function getContainerById(containerId: Id) {
  return document.getElementById(containerId as string);
}

function needWaitingForUnmount(options: ToastOptions) {
  const container = getContainerById(options.containerId as string);

  return container && container.classList.contains(UnmountTag);
}

function getCallbackProps(opts: ToastSetting) {
  const result = isVNode(opts.content) ? toRaw(opts.content.props) : null;

  return result ?? toRaw(opts.data ?? {});
}

function existQueueItem(containerId?: Id) {
  if (!containerId) {
    return queue.items.length > 0;
  } else {
    const items = queue.items.filter((v) => v.containerId === containerId);

    return items.length > 0;
  }
}

export function appendFromQueue() {
  if (queue.items.length > 0) {
    const append = queue.items.shift();

    doAppend(append?.toastContent as Content, append?.toastProps);
  }
}

export interface IToastContainers {[containerId: Id]: ToastOptions[]}

export const toastContainers = reactive({} as IToastContainers);

export const queue = reactive({ items: [] as QueuedToast[] });

export function getAllToast() {
  const rawMap = toRaw(toastContainers);

  return Object.values(rawMap).reduce((t, v) => [...t, ...v], []);
}

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
export function getToast(toastId: Id) {
  const toasts = getAllToast();

  return toasts.find((v) => v.toastId === toastId);
}

export function doAppend(content: Content, options = {} as ToastOptions) {
  if (needWaitingForUnmount(options)) {
    const container = getContainerById(options.containerId as Id);

    if (container) {
      container.addEventListener('animationend', resolveAppend.bind(null, content, options), false);
    }
  } else {
    resolveAppend(content, options);
  }
}

function resolveAppend(content: Content, options = {} as ToastOptions) {
  const container = getContainerById(options.containerId as Id);

  if (container) {
    container.removeEventListener('animationend', resolveAppend.bind(null, content, options), false);
  }

  const sameContainerToasts = toastContainers[options.containerId as Id] || [];
  const hasSameContainer = sameContainerToasts.length > 0;

  if (!hasSameContainer && !toastContainerInScreen(options.position)) {
    const rootDom = generateRenderRoot(options);
    const app = createApp(ToastifyContainer, options as Data);

    app.mount(rootDom);
    cacheRenderInstance(app, rootDom.id);
  }

  if (hasSameContainer && !options.updateId) {
    // should display in the same container.
    options.position = sameContainerToasts[0].position;
  }

  nextTick(() => {
    if (options.updateId) {
      ToastActions.update(options as UpdateOptions);
    } else {
      ToastActions.add(content, options);
    }
  });
}

const ToastActions = {
  /**
   * add a toast
   * @param _ ..
   * @param opts toast props
   */
  add(_: Content, opts: ToastSetting) {
    const { containerId = '' } = opts;

    if (containerId) {
      toastContainers[containerId] = toastContainers[containerId] || [];
      if (!toastContainers[containerId].find((v) => v.toastId === opts.toastId)) {
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
      const containerId = getContainerIdByToastId(id);

      if (containerId) {
        const toasts = toastContainers[containerId];
        let item = toasts.find((v) => v.toastId === id);

        toastContainers[containerId] = toasts.filter((v) => v.toastId !== id);

        if (!toastContainers[containerId].length && !existQueueItem(containerId)) {
          removeContainer(containerId, false);
        }

        appendFromQueue();

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
      const prevOtps = toastContainers[containerId].find((v) => v.toastId === opts.toastId);
      const enabledEnter = prevOtps?.position !== opts.position || prevOtps?.transition !== opts.transition;
      const newOpts = {
        ...opts,
        disabledEnterTransition: !enabledEnter,
        updateId: undefined,
      } as ToastOptions;

      ToastActions.dismissForce(opts?.toastId as string);
      setTimeout(() => {
        toast(newOpts.content as Content, newOpts);
      }, opts.delay || 0);
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
        ToastActions.remove(toastId);
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
  dismissForce(toastId?: Id) {
    if (toastId) {
      const allToasts = getAllToast();

      for (const item of allToasts) {
        if (item.toastId === toastId) {
          const node = document.getElementById(toastId as string);

          if (node) {
            node.remove();
            node.removeEventListener('animationend', ToastActions.dismissCallback, false);
            ToastActions.remove(toastId);
          }

          break;
        }
      }
    }
  },
};

export { ToastActions };
