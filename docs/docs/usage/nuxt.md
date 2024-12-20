# Nuxt

[Nuxt demo](https://stackblitz.com/edit/nuxt-starter-1gszqs?file=app.vue,plugins%2Fvue3-toastify.ts)

- plugins/vue3-toastify.ts

```ts
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 1000 });

  return {
    provide: { toast },
  };
});

```

- demo.vue

```html
<script setup>
onMounted(() => {
  const { $toast } = useNuxtApp();
  $toast('notify on mounted');
})

const notify = () => {
  const { $toast } = useNuxtApp();
  $toast.info('toastify success');
};
</script>

<template>
  <button @click="notify">notify by click</button>
</template>
```
