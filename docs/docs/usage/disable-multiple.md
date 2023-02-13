# Disable multiple.

> Each click shows only one toast, and override the previous one.


## global

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
  toast('Hello world', {
    position: toast.POSITION.BOTTOM_CENTER,
  });
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
    multiple: false,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## with toast option

```js
toast('Hello world.\n I am <strong>jack</strong>', {
  multiple: false, // can override the global option
});
```
