import props from './prop';
import { DefineComponent, defineComponent, watchEffect } from 'vue';
import { toastOptionList } from '../..';
import type { ToastOptions } from '../../types';

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  setup(_props: ToastOptions) {
    watchEffect(() => {
      if (toastOptionList) {
        console.log(toastOptionList);
      }
    });

    return () => (
      <>
        {
          toastOptionList.value.map((item) => (
            <div>
              {item.content}
            </div>
          ))
        }
      </>
    );
  },
}) as DefineComponent<ToastOptions>;

export default ToastifyContainer;
