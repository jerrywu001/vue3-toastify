import { cacheRenderInstance } from '../store';
import { createApp, nextTick } from 'vue';
import { Event, eventManager } from '..';
import { generateRenderRoot, toastContainerInScreen } from '../utils/render';
import { generateToastId, getGlobalOptions, mergeOptions } from '../utils/tools';
import { POSITION, THEME, TRANSITIONS, TYPE } from '../utils/constant';
import { ToastifyContainer } from '../components';
import type { Content, Data, Id, ToastOptions, ToastType } from '../types';

function openToast(content: Content, type: ToastType, options = {} as ToastOptions) {
  options = mergeOptions<ToastOptions>(getGlobalOptions(), { type }, options);

  if (!options.toastId) {
    options.toastId = generateToastId();
  }

  options = {
    ...options,
    content,
    containerId: options.containerId || String(options.position),
  } as ToastOptions;

  if (!toastContainerInScreen(options.position)) {
    const rootDom = generateRenderRoot(options);
    const app = createApp(ToastifyContainer, options as Data);
    app.mount(rootDom);
    cacheRenderInstance(app, rootDom.id);
  }

  nextTick(() => {
    eventManager.emit(Event.Add, content, options);
  });

  return options.toastId as Id;
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
toast.remove = (toastId: Id) => {
  eventManager.emit(Event.Remove, toastId);
};

/** clear all toast */
toast.clearAll = (containerId?: Id) => {
  eventManager.emit(Event.ClearAll, containerId);
};

toast.POSITION = POSITION;
toast.THEME = THEME;
toast.TYPE = TYPE;
toast.TRANSITIONS = TRANSITIONS;

export default toast;
