# Installation

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

see: demo --> `main.js`

## demo

::: details For Jsx
```jsx
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

function App() {
  const notify = () => toast("Wow so easy !");

  return () => (
    <div>
      <button onClick={notify}>Notify !</button>
    </div>
  );
}
```
:::

::: sandbox
```vue App.vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';

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
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: 3000,
    // ...
  },
).mount('#app');
```
:::
