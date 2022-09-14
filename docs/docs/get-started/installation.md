# Installation

:::tip
View it with a PC, the effect is even better
:::

## Requirements

`vue` version >=`3.2.0`

## Installation


:::code-group
```bash  [Npm]
npm install --save jerry-todo
```

```bash  [Yarn]
yarn add jerry-todo
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
import { toast } from 'jerry-todo';
import { defineComponent } from 'vue';
import 'jerry-todo/dist/index.css';

const JsxDemo = defineComponent({
  setup() {
    const notify = () => toast('Wow so easy !');

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

<script>
import { toast } from 'jerry-todo';

export default {
   name: "App",
   setup() {
    const notify = () => toast("Wow so easy !", { autoClose: 3000 });
    return { notify };
   }
};
</script>
```

```js /src/main.js [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity from 'jerry-todo';
import 'jerry-todo/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: 3000,
    // ...
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::
