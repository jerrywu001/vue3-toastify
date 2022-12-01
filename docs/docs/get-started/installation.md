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
```vue App.vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
  }); // ToastOptions
}
</script>
```

```js /src/main.js [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: 3000,
    // ...
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::
