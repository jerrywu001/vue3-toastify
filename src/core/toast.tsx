
import { queue, doAppend } from '../store';
import { nextTick, toRaw } from 'vue';
import { getAllToast, getToast, ToastActions } from '..';
import { generateToastId, getGlobalOptions, getSystemTheme, isFn, isStr, mergeOptions } from '../utils/tools';
import { POSITION, THEME, TRANSITIONS, TYPE } from '../utils/constant';
import { globalCache } from '../store/globalOptions';
import type { Content, Id, ToastContainerOptions, ToastOptions, ToastType, UpdateOptions } from '../types';
import { UnmountTag } from '../utils/render';

type ToastSetting = ToastOptions & ToastContainerOptions;
type OmitTypeToastOption = Omit<ToastOptions, 'type' | 'disabledEnterTransition'>;
type OmitThemeToastOption = Omit<ToastOptions, 'theme'>;
type OmitLoadingOptsToastOption = Omit<ToastOptions, 'isLoading' | 'draggable'>;

let inThrottle = false;

function getAllActiveToast() {
  const result: ToastOptions[] = [];
  const items = getAllToast();

  items.forEach((v) => {
    const container = document.getElementById(v.containerId as string);

    if (container && !container.classList.contains(UnmountTag)) {
      result.push(v);
    }
  });
  return result;
}

function watingForQueue(limit?: number) {
  const displayedCount = getAllActiveToast().length;
  const limitCount = limit ?? 0;

  return limitCount > 0 && displayedCount + queue.items.length >= limitCount;
}

function resolveQueue(options: ToastSetting) {
  if (watingForQueue(options.limit) && !options.updateId) {
    queue.items.push({
      toastId: options.toastId as Id,
      containerId: options.containerId as Id,
      toastContent: options.content as Content,
      toastProps: options,
    });
  }
}

function openToast(content: Content, type: ToastType, options = {} as ToastOptions): Id {
  // @ts-ignore
  if (inThrottle) return;

  options = mergeOptions<ToastOptions>(getGlobalOptions(), { type }, toRaw(options));

  if (!options.toastId || typeof options.toastId !== 'string' && typeof options.toastId !== 'number') {
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
    options.theme = getSystemTheme();
  }

  resolveQueue(options);

  globalCache.lastUrl = window.location.href;

  if (!(options as ToastSetting).multiple) {
    inThrottle = true;
    toast.clearAll(undefined, false);

    setTimeout(() => {
      doAppend(content, options);
    }, 0);

    setTimeout(() => {
      inThrottle = false;
    }, 390);
  } else if (!queue.items.length) {
    doAppend(content, options);
  } else if (options.updateId) {
    doAppend(content, options);
  }

  return options.toastId as Id;
}

/** default toast */
const toast = (content: Content, options?: ToastOptions) => openToast(content, TYPE.DEFAULT, options);

/** info toast */
toast.info = (content: Content, options?: OmitTypeToastOption) => openToast(content, TYPE.DEFAULT, {
  ...options,
  type: TYPE.INFO,
});

/** error toast */
toast.error =
  (content: Content, options?: OmitTypeToastOption) => openToast(content, TYPE.DEFAULT, {
    ...options,
    type: TYPE.ERROR,
  });

/** warning toast */
toast.warning =
  (content: Content, options?: OmitTypeToastOption) => openToast(content, TYPE.DEFAULT, {
    ...options,
    type: TYPE.WARNING,
  });

toast.warn = toast.warning;

/** success toast */
toast.success =
  (content: Content, options?: OmitTypeToastOption) => openToast(content, TYPE.DEFAULT, {
    ...options,
    type: TYPE.SUCCESS,
  });

/** loading toast */
toast.loading = (content: Content, options?: OmitLoadingOptsToastOption) => openToast(
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
toast.dark = (content: Content, options?: OmitThemeToastOption) => openToast(
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
  nextTick(() => {
    ToastActions.clear(containerId, withExitAnimation);
  });
};

/**
 * return true if one container is displaying the toast
 */
toast.isActive = (toastId: Id) => {
  let isToastActive = false;

  const all = getAllActiveToast();

  isToastActive = all.findIndex((v) => v.toastId === toastId) > -1;

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
      } as ToastSetting & UpdateOptions;

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
  options?: OmitLoadingOptsToastOption,
) {
  let id: Id | undefined;
  const loadingOpts = {
    ...options || {},
    autoClose: false,
  };

  if (pending) {
    id = isStr(pending)
      ? toast.loading(pending, loadingOpts)
      : toast.loading(pending.render as Content, {
        ...loadingOpts,
        ...(pending as OmitLoadingOptsToastOption),
      });
  }

  const resetParams = {
    autoClose: options?.autoClose ?? true,
    closeOnClick: options?.closeOnClick ?? true,
    closeButton: options?.autoClose ?? null,
    isLoading: undefined,
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
      } as UpdateOptions);
    } else {
      // using toast.promise without loading
      toast(params.render as Content, {
        ...baseParams,
        ...params,
        isLoading: false,
      } as ToastOptions);
    }

    return result;
  };

  const p = isFn(promise) ? promise() : promise;

  // call the resolvers only when needed
  p
    .then((result) => {
      resolver('success', success, result);
    }).catch((err) => {
      resolver('error', error, err);
    });

  return p;
}

toast.POSITION = POSITION;
toast.THEME = THEME;
toast.TYPE = TYPE;
toast.TRANSITIONS = TRANSITIONS;

export default toast;
