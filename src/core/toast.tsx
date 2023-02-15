import { cacheRenderInstance } from '../store';
import { createApp, nextTick, toRaw } from 'vue';
import { getAllToast, getToast, ToastActions } from '..';
import { generateRenderRoot, toastContainerInScreen } from '../utils/render';
import { generateToastId, getGlobalOptions, getSystemThem, isFn, isStr, mergeOptions } from '../utils/tools';
import { POSITION, THEME, TRANSITIONS, TYPE } from '../utils/constant';
import { ToastifyContainer } from '../components';
import type { Content, Data, Id, ToastOptions, ToastProps, ToastType, UpdateOptions } from '../types';

let inThrottle = false;

function openToast(content: Content, type: ToastType, options = {} as ToastOptions) {
  if (inThrottle) return;

  options = mergeOptions<ToastOptions>(getGlobalOptions(), { type }, options);

  if (!options.toastId || (typeof options.toastId !== 'string' && typeof options.toastId !== 'number')) {
    options.toastId = generateToastId();
  }

  options = {
    ...options,
    content,
    containerId: options.containerId || String(options.position),
  } as ToastOptions;

  const progress = Number(options?.progress);
  if (progress < 0) {
    options.progress = 0;
  }
  if (progress > 1) {
    options.progress = 1;
  }

  if (options.theme === 'auto') {
    options.theme = getSystemThem();
  }

  if (!options.multiple) {
    inThrottle = true;
    toast.clearAll(undefined, false);

    setTimeout(() => {
      handler(content, type, options);
    }, 0);

    setTimeout(() => {
      inThrottle = false;
    }, 390);
  } else {
    handler(content, type, options);
  }

  return options.toastId as Id;
}

function handler(content: Content, type: ToastType, options = {} as ToastOptions) {
  if (!toastContainerInScreen(options.position)) {
    const rootDom = generateRenderRoot(options);
    const app = createApp(ToastifyContainer, options as Data);
    app.mount(rootDom);
    cacheRenderInstance(app, rootDom.id);
  }

  nextTick(() => {
    if (options.updateId) {
      ToastActions.update(options as UpdateOptions);
    } else {
      ToastActions.add(content, options);
    }
  });
}

/** default toast */
const toast = (content: Content, options?: ToastOptions) => openToast(content, TYPE.DEFAULT, options);
/** info toast */
toast.info = (content: Content, options?: ToastOptions) => openToast(content, TYPE.INFO, options);
/** error toast */
toast.error = (content: Content, options?: ToastOptions) => openToast(content, TYPE.ERROR, options);
/** warning toast */
toast.warning = (content: Content, options?: ToastOptions) => openToast(content, TYPE.WARNING, options);
toast.warn = toast.warning;
/** success toast */
toast.success = (content: Content, options?: ToastOptions) => openToast(content, TYPE.SUCCESS, options);
/** loading toast */
toast.loading = (content: Content, options?: ToastOptions) => openToast(
  content,
  TYPE.DEFAULT,
  mergeOptions(options, {
    isLoading: true,
    autoClose: false,
    closeOnClick: false,
    closeButton: false,
    draggable: false,
  } as ToastOptions),
);
/** dark toast */
toast.dark = (content: Content, options?: ToastOptions) => openToast(
  content,
  TYPE.DEFAULT,
  mergeOptions(options, { theme: THEME.DARK }),
);

/** remove a toast */
toast.remove = (toastId?: Id) => {
  if (toastId) {
    ToastActions.dismiss(toastId);
  } else {
    ToastActions.clear();
  }
};

/** clear all toast */
toast.clearAll = (containerId?: Id, withExitAnimation?: boolean) => {
  ToastActions.clear(containerId, withExitAnimation);
};

/**
 * return true if one container is displaying the toast
 */
toast.isActive = (toastId: Id) => {
  let isToastActive = false;

  const all = getAllToast();
  isToastActive = all.findIndex(v => v.toastId === toastId) > -1;

  return isToastActive;
};

toast.update = (toastId: Id, options: UpdateOptions = {}) => {
  // if you call toast and toast.update directly nothing will be displayed
  // this is why I defered the update
  setTimeout(() => {
    const item = getToast(toastId);
    if (item) {
      const oldOptions = toRaw(item);
      const { content: oldContent } = oldOptions;

      const nextOptions = {
        ...oldOptions,
        ...options,
        toastId: options.toastId || toastId,
        updateId: generateToastId(),
      } as ToastProps & UpdateOptions;

      const content = nextOptions.render || oldContent;
      delete nextOptions.render;

      openToast(content as Content, nextOptions.type as ToastType, nextOptions);
    }
  }, 0);
};

/**
 * Used for controlled progress bar.
 */
toast.done = (id: Id) => {
  toast.update(id, {
    isLoading: false,
    progress: 1,
  });
};

toast.promise = handlePromise;

export interface ToastPromiseParams<T = unknown> {
  pending?: string | UpdateOptions<void>;
  success?: string | UpdateOptions<T>;
  error?: string | UpdateOptions<any>;
}

function handlePromise<T = unknown>(
  promise: Promise<T> | (() => Promise<T>),
  { pending, error, success }: ToastPromiseParams<T>,
  options?: ToastOptions,
) {
  let id: Id | undefined;

  if (pending) {
    id = isStr(pending)
      ? toast.loading(pending, options)
      : toast.loading(pending.render as Content, {
        ...options,
        ...(pending as ToastOptions),
      });
  }

  const resetParams = {
    isLoading: undefined,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null,
    delay: 100,
  };

  const resolver = (
    type: ToastType,
    input: string | UpdateOptions<T> | undefined,
    result: T,
  ) => {
    // Remove the toast if the input has not been provided. This prevents the toast from hanging
    // in the pending state if a success/error toast has not been provided.
    if (input == null) {
      toast.remove(id);
      return;
    }

    const baseParams = {
      type,
      ...resetParams,
      ...options,
      data: result,
    };
    const params = isStr(input) ? { render: input } : input;

    // if the id is set we know that it's an update
    if (id) {
      toast.update(id, {
        ...baseParams,
        ...params,
        isLoading: false,
        autoClose: true,
      } as UpdateOptions);
    } else {
      // using toast.promise without loading
      toast(params.render as Content, {
        ...baseParams,
        ...params,
        isLoading: false,
        autoClose: true,
      } as ToastOptions);
    }

    return result;
  };

  const p = isFn(promise) ? promise() : promise;

  // call the resolvers only when needed
  p.then(result => resolver('success', success, result)).catch(err => resolver('error', error, err));

  return p;
}

toast.POSITION = POSITION;
toast.THEME = THEME;
toast.TYPE = TYPE;
toast.TRANSITIONS = TRANSITIONS;

export default toast;
