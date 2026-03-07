import props from './prop';
import ToastItem from '../ToastItem';
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import { ToastActions, globalCache, queue, toastContainers } from '../..';
import { getGlobalOptions } from '../../utils/tools';
import type { Id, ToastContainerOptions, ToastOptions } from '../../types';

const URL_CHANGE_EVENT = 'vue3-toastify:url-change';
let listeners = 0;
let stopWatch: (() => void) | undefined;

function watchOnUrlChange() {
  if (typeof window === 'undefined') {
    return;
  }

  if (globalCache.lastUrl !== window.location.href) {
    globalCache.lastUrl = window.location.href;
    const shouldClear = (item: Pick<ToastOptions, 'clearOnUrlChange'>) => {
      if (typeof item.clearOnUrlChange === 'boolean') {
        return item.clearOnUrlChange;
      }

      // Fallback to global config when toast-level option is not defined.
      return getGlobalOptions().clearOnUrlChange !== false;
    };

    const toasts: ToastOptions[] = Object.values(toastContainers).reduce((result, list) => {
      if (Array.isArray(list)) {
        result.push(...list);
      }

      return result;
    }, [] as ToastOptions[]);

    for (const item of toasts) {
      if (item.toastId && shouldClear(item)) {
        ToastActions.dismiss(item.toastId);
      }
    }

    queue.items = queue.items.filter((item) => !shouldClear(item.toastProps));
  }
}

function watchHistoryMethods() {
  const { history } = window;
  const rawPushState = history.pushState;
  const rawReplaceState = history.replaceState;

  history.pushState = function(...args: Parameters<History['pushState']>) {
    const result = rawPushState.apply(this, args);

    window.dispatchEvent(new Event(URL_CHANGE_EVENT));
    return result;
  };

  history.replaceState = function(...args: Parameters<History['replaceState']>) {
    const result = rawReplaceState.apply(this, args);

    window.dispatchEvent(new Event(URL_CHANGE_EVENT));
    return result;
  };

  return () => {
    history.pushState = rawPushState;
    history.replaceState = rawReplaceState;
  };
}

function listenOnUrlChange() {
  if (typeof window === 'undefined' || stopWatch) {
    return;
  }

  const restoreHistoryMethods = watchHistoryMethods();
  const listener = () => watchOnUrlChange();

  window.addEventListener(URL_CHANGE_EVENT, listener);
  window.addEventListener('popstate', listener);
  window.addEventListener('hashchange', listener);

  stopWatch = () => {
    restoreHistoryMethods();
    window.removeEventListener(URL_CHANGE_EVENT, listener);
    window.removeEventListener('popstate', listener);
    window.removeEventListener('hashchange', listener);
    stopWatch = undefined;
  };
}

function unlistenOnUrlChange() {
  if (!stopWatch) {
    return;
  }

  stopWatch();
  globalCache.lastUrl = '';
}

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  // @ts-ignore
  setup(_props: ToastContainerOptions) {
    const containerId = computed(() => _props.containerId as Id);
    const allToasts = computed<ToastOptions[]>(() => toastContainers[containerId.value] || []);
    const toasts = computed(() => allToasts.value.filter((v) => v.position === _props.position));

    onMounted(() => {
      if (typeof window !== 'undefined') {
        listeners += 1;
        listenOnUrlChange();
      }
    });

    onUnmounted(() => {
      if (typeof window !== 'undefined' && listeners > 0) {
        listeners -= 1;
        if (listeners === 0) {
          unlistenOnUrlChange();
        }
      }
    });

    return () => 
      <>
        {
          toasts.value.map((item) => {
            const { toastId = '' } = item;

            return (
              <ToastItem key={toastId} {...item} />
            );
          })
        }
      </>
    ;
  },
});

export default ToastifyContainer;
