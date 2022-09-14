import { toast, ToastContentProps } from 'jerry-todo';
import { defineComponent } from 'vue';
// import MsgH from './MsgH.vue';
// import Msg from './Msg';

const JsxDemo = defineComponent({
  setup() {
    const displayMsg = () => {
      // toast(MsgH, { closeOnClick: false, autoClose: 8000 });
      toast(({ closeToast, toastProps }: ToastContentProps) => (
        <div>
          <p>I am a jsx component</p>
          <p>Position: {toastProps?.position}</p>
          <button style="color: red;" onClick={closeToast}>Click me to close toast</button>
        </div>
      ), { closeOnClick: false, autoClose: 8000 });
    };

    return () => (
      <div>
        <button onClick={displayMsg}>displayMsg</button>
      </div>
    );
  },
});

export default JsxDemo;
