# Installation

## Requirements

vue version >=3.2.0

## Installation

- With npm:

```bash
npm install --save vue3-toastify
```

- With yarn:

```bash
yarn add vue3-toastify
```

## Global config


```ts
import { createApp } from 'vue';
import Vue3Toasity, { type TransitionGroupOptions } from 'vue3-toastify';
import App from './App.vue';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(
  Vue3Toasity,
  {
    autoClose: 3000,
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
    // ...
  } as TransitionGroupOptions,
);

app.mount('#app');

```

## demo

```vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => toast("Wow so easy !");
</script>
```

::: details jsx demo
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
