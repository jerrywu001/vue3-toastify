import { toast } from 'jerry-todo';
import { defineComponent } from 'vue';
import { ComponentIcon, VNodeIcon } from './icon';
// import MsgH from './MsgH.vue';
// import Msg from './Msg';

const JsxDemo = defineComponent({
  setup() {
    const displayMsg = () => {
      toast('HELLO', {
        icon: ({ theme, type }) => <ComponentIcon theme={theme} type={type} />,
        autoClose: 8000,
      });
    };

    return () => (
      <div>
        <button onClick={displayMsg}>displayMsg</button>
      </div>
    );
  },
});

export default JsxDemo;
