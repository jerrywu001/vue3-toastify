import { ToastContentProps } from 'jerry-todo/types';
import { DefineComponent, defineComponent } from 'vue';

const Msg = defineComponent({
  props: {
    closeToast: Function,
    toastProps: Object,
  },
  // @ts-ignore
  setup(props: ToastContentProps) {
    return () => (
      <div>
        <p>I am a jsx component</p>
        <p>Position: {props.toastProps?.position}</p>
        <button style="color: red;" onClick={props.closeToast}>Click me to close toast</button>
      </div>
    );
  },
}) as DefineComponent<ToastContentProps>;

export default Msg;
