import props from './prop';
import { computed, DefineComponent, defineComponent } from 'vue';
import { toastOptionList } from '../..';
import type { ToastOptions } from '../../types';
import ToastItem from '../ToastItem';

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  setup(_props: ToastOptions) {
    const toasts = computed(() => toastOptionList.value.filter(v => v.position === _props.position));

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
