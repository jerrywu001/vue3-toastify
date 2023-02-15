# Define callback

You can define two callbacks. Their names are self-explanatory:

- onOpen
- onClose

::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast("Hello there", {
    onOpen: () => window.alert('Called when I open'),
    onClose: () => window.alert('Called when I close'),
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::

## pass props to callback

::: details Msg.vue
```vue
<script lang="ts">
import { ToastProps } from 'vue3-toastify';
import { PropType } from 'vue';

export default {
  name: 'Msg',
  props: {
    closeToast: Function as PropType<(e?: MouseEvent) => void>,
    toastProps: Object as PropType<ToastProps>,
  },
};
</script>

<template>
  <div>
    <p>I am a vue component</p>
    <p>Position: {{ toastProps?.position }}</p>
    <button
      @click="($event) => { closeToast && closeToast($event) }"
    >
      Click me to close toast
    </button>
  </div>
</template>

```
:::

- usage in single vue file

```vue
<script lang="ts" setup>
import Msg from './Msg.vue';

const show = () => {
  toast(
    ({ closeToast, toastProps }) => h(Msg, { closeToast, toastProps }),
    {
      data: { uid: 'sdsd' },
      onOpen: ({ uid }) => console.log(uid),
    },
  );
};
</script>
```

- usage in jsx

```jsx
import { toast } from 'vue3-toastify';
import { defineComponent } from 'vue';
import Msg from './Msg.vue';

const JsxDemo = defineComponent({
  setup() {
    const displayMsg = () => {
      toast(<Msg uid="test custom props" />, {
        closeOnClick: false,
        autoClose: 8000,
        onOpen: (props) => {
          console.log(props);
        },
        onClose: (props) => {
          console.log(props);
        },
      });

      // or

      // toast(Msg, {
      //   closeOnClick: false,
      //   autoClose: 8000,
      //   data: {
      //     uid: 'custom from data',
      //   },
      //   onOpen: (props) => {
      //     console.log(props);
      //   },
      //   onClose: (props) => {
      //     console.log(props);
      //   },
      // });
    };

    return () => (
      <div>
        <button onClick={displayMsg}>toast in .jsx</button>
      </div>
    );
  },
});

export default JsxDemo;
```
