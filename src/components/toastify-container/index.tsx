import { DefineComponent, defineComponent, onMounted } from 'vue';
import type { ToastOptions } from '../../types';
import props from './prop';

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  setup(_props: ToastOptions) {
    onMounted(() => {
      console.log('props===>', _props);
    });

    return () => (
      <div>jjjjjjjj</div>
    );
  },
}) as DefineComponent<ToastOptions>;

export default ToastifyContainer;
