# Handling autoClose

The `autoClose` prop accept a duration in milliseconds or `false`.

## Change the default delay

:::info
close toast after 8 seconds
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

const notify = () => toast("Wow so easy !");
</script>
```

```js /src/main.js [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: 8000,
    position: toast.POSITION.BOTTOM_CENTER,
    // ...
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Change the delay per toast for more control

:::warning
It will overrides the global options
:::

::: sandbox
```vue App.vue [active]
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const closeAfter15 = () => {
  toast("Will close after 15s", {
    autoClose: 15000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

const closeAfter7 = () => {
  toast("Will close after 7s", {
    autoClose: 7000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
</script>

<template>
  <div>
    <button @click="closeAfter15">Close after 15 seconds</button>
    <button @click="closeAfter7">Close after 7 seconds</button>
  </div>
</template>
```

```js /src/main.js
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity, { toast } from 'vue3-toastify';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: 8000,
    position: toast.POSITION.BOTTOM_CENTER,
    // ...
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Prevent the toast from closing by default


::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';

const show = () => toast(
  "can not auto close",
  {
    position: toast.POSITION.BOTTOM_CENTER,
  }
);
</script>

<template>
  <div>
    <button @click="show">show toast</button>
  </div>
</template>
```

```js /src/main.js [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: false,
    position: toast.POSITION.BOTTOM_CENTER,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Prevent the toast from closing per toast


::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const show = () => toast(
  "can not auto close",
  {
    autoClose: false,
    position: toast.POSITION.BOTTOM_CENTER,
  }
);
</script>

<template>
  <div>
    <button @click="show">show toast</button>
  </div>
</template>
```
:::
