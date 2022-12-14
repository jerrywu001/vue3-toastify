import props from './prop';
import ToastItem from '../ToastItem';
import { computed, DefineComponent, defineComponent } from 'vue';
import { useToastContainer } from '../..';
import type { Id, ToastOptions } from '../../types';

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  // @ts-ignore
  setup(_props: ToastOptions) {
    const { toastMap } = useToastContainer(_props);
    const containerId = computed(() => _props.containerId as Id);
    const allToasts = computed<ToastOptions[]>(() => toastMap[containerId.value] || []);
    const toasts = computed(() => allToasts.value.filter(v => v.position === _props.position));

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
}) as DefineComponent<ToastOptions>;

export default ToastifyContainer;
