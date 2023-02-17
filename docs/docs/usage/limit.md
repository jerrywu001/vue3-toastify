# Limit the number of toast displayed

Notifications are useful to get the attention of the user. But displaying too many of them can also be counterproductive. The [container props](../api/container.md) expose a `limit` prop to meet your needs.

::: danger What happens to the notifications that are not displayed ? 🧐
Because they are added to a queue. They will be displayed as soon as a slot is free.
:::

::: sandbox
```js /src/main.ts [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity from 'vue3-toastify';

createApp(App).use(
  Vue3Toasity,
  {
    limit: 2,
  },
).mount('#app');
```

```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast(
    `hello ${parseInt(String(Math.random() * 100), 10)}`,
    {
      position: toast.POSITION.BOTTOM_CENTER,
    },
  );
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::


::: tip
You can also use `updateGlobalOptions` hook to defined the `container props`.

```ts
updateGlobalOptions({
  limit: 2,
});
```

then use it per toast

```ts
toast.success('Wow so easy!');
```
:::
