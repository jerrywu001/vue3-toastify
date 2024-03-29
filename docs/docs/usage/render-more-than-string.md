# Render more than string

You can render any valid ReactNode: string, number, component... This is really straightforward.

## Basic example

:::tip
When you render a component, a `closeToast` prop and the `toastProps` are injected into your component.
:::


::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import Msg from './Msg.vue';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast(Msg, {
    closeOnClick: false,
    autoClose: 8000,
    position: toast.POSITION.BOTTOM_CENTER,
  });

  // not work in single vue file!!!!
  // toast(<Msg />, { closeOnClick: false, autoClose: 8000 });
};
</script>

<template>
  <div>
    <button @click="notify">toast in .vue</button>
  </div>
</template>
```

```vue /src/Msg.vue [active]
<script lang="ts">
import type { ToastOptions } from 'vue3-toastify';
import type { PropType } from 'vue';

export default {
  name: 'Msg',
  props: {
    closeToast: Function as PropType<(e?: MouseEvent) => void>,
    toastProps: Object as PropType<ToastOptions>,
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

:::tip
You can also write with a tsx component. that is cool!!
:::

::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { h } from 'vue';
import JsxDemo from './JsxDemo.tsx';
import Msg from './Msg.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const show = () => {
  toast(
    ({ closeToast, toastProps }) => h(Msg, { closeToast, toastProps }),
    {
      closeOnClick: false,
      autoClose: 8000,
      position: toast.POSITION.BOTTOM_CENTER,
    },
  );
};
</script>

<template>
  <JsxDemo />
  <button @click="show">toast with callback in .vue</button>
</template>
```

```jsx /src/JsxDemo.tsx [active]
import { toast } from 'vue3-toastify';
import { defineComponent } from 'vue';
import Msg from './Msg';

const JsxDemo = defineComponent({
  setup() {
    const displayMsg = () => {
      toast(<Msg uid="test custom props" />, {
        closeOnClick: false,
        autoClose: 8000,
        position: toast.POSITION.BOTTOM_CENTER,
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
      //   position: toast.POSITION.BOTTOM_CENTER,
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

      // cool !!!
      toast(({ closeToast, toastProps }) => (
        <div>
          <p>I am a jsx component</p>
          <p>Position: {toastProps?.position}</p>
          <button
            style="color: red;"
            onClick={closeToast}
          >
            Click me to close toast
          </button>
        </div>
      ), {
        closeOnClick: false,
        autoClose: 8000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
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

```vue /src/Msg.vue
<script lang="ts">
import type { ToastOptions } from 'vue3-toastify';
import type { PropType } from 'vue';

export default {
  name: 'Msg',
  props: {
    closeToast: Function as PropType<(e?: MouseEvent) => void>,
    toastProps: Object as PropType<ToastOptions>,
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

## Example with pinia

In this example we will use pinia to share state accross a component and a toast. Increment and display a toast at the same time to see how the state stay in sync !


::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { useCounterStore } from './stores/useCounterStore';
import CountDisplay from './CountDisplay.vue';
import 'vue3-toastify/dist/index.css';

const { increment } = useCounterStore();
const notify = () => toast(CountDisplay, {
  autoClose: false,
  closeOnClick: false,
  position: toast.POSITION.BOTTOM_CENTER,
});
</script>

<template>
  <div>
    <button @click="notify">show toast</button>
    <br />
    <button @click="increment">increment</button>
  </div>
</template>
```

```vue /src/CountDisplay.vue
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from './stores/useCounterStore';

const store = useCounterStore();
const { count } = storeToRefs(store);
</script>

<template>
  <p>The current counter count is {{ count }}</p>
</template>
```

```js /src/stores/useCounterStore.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

```js /src/main.ts
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

createApp(App).use(createPinia()).mount('#app');
```
:::
