# Enable right to left support

React-toastify has built-in support for RTL layout. All you need to do is to set the `rtl` prop to `true`.

## global

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
    const notify = () => {
      toast('Wow so easy !', {
        // rtl: false,
      });
    };
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
    rtl: true,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## with toast option

```js
toast('Wow so easy !', {
  rtl: true,
});
```
