# Installation

:::tip
View it with a PC, the effect is even better
:::

## Requirements

`vue` version >=`3.2.0`

## Installation


:::code-group
```bash  [Npm]
npm install --save vue3-toastify
```

```bash  [Yarn]
yarn add vue3-toastify
```
:::

## Global config

see: [demo](#demo) --> `main.js`

## demo

:::warning
Don't forget to import styles
:::

::: details For Jsx
```jsx
import { toast } from 'vue3-toastify';
import { defineComponent } from 'vue';
import 'vue3-toastify/dist/index.css';

const JsxDemo = defineComponent({
  setup() {
    const notify = () => {
      toast('Wow so easy !');
    };

    return () => (
      <div>
        <button onClick={notify}>Notify !</button>
      </div>
    );
  },
});

export default JsxDemo;
:::

::: sandbox
```vue /src/App.vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script setup lang="ts">
import { toast, type ToastOptions } from 'vue3-toastify';

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions);
}
</script>
```

```js /src/main.ts [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toastify,
  {
    autoClose: 3000,
    // ...
  } as ToastContainerOptions,
).mount('#app');
```
:::
