# Render just html string

## global

::: sandbox
```vue /src/App.vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

const notify = () => {
  toast('Hello world.\n I am <strong>jack</strong>', {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
</script>
```

```js /src/main.ts [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    dangerouslyHTMLString: true,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## with toast option

```js
toast('Hello world.\n I am <strong>jack</strong>', {
  dangerouslyHTMLString: true, // can override the global option
});
```
