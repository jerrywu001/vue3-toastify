import props from './prop';
import ToastItem from '../ToastItem';
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import { ToastActions, globalCache, toastContainers } from '../..';
import type { Id, ToastContainerOptions, ToastOptions } from '../../types';

let listerner = 0;

function watchOnUrlChange() {
  if (typeof window === 'undefined') {
    return;
  }

  if (listerner) {
    window.cancelAnimationFrame(listerner);
  }

  listerner = window.requestAnimationFrame(watchOnUrlChange);

  if (globalCache.lastUrl !== window.location.href) {
    globalCache.lastUrl = window.location.href;
    ToastActions.clear();
  }
}

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  // @ts-ignore
  setup(_props: ToastContainerOptions) {
    const containerId = computed(() => _props.containerId as Id);
    const allToasts = computed<ToastOptions[]>(() => toastContainers[containerId.value] || []);
    const toasts = computed(() => allToasts.value.filter(v => v.position === _props.position));

    onMounted(() => {
      if (typeof window !== 'undefined' && _props.clearOnUrlChange) {
        window.requestAnimationFrame(watchOnUrlChange);
      }
    });

    onUnmounted(() => {
      if (typeof window !== 'undefined' && listerner) {
        window.cancelAnimationFrame(listerner);
        globalCache.lastUrl = '';
      }
    });

    return () => (
      <>
        {
          toasts.value.map((item) => {
            const { toastId = '' } = item;

            return (
              <ToastItem key={toastId} { ...item } />
            );
          })
        }
      </>
    );
  },
});

export default ToastifyContainer;
