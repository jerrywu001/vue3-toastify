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

<script>
import { toast } from 'jerry-todo';

export default {
   name: "App",
   setup() {
    const notify = () => toast("Wow so easy !");
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
    autoClose: 8000,
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
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const closeAfter15 = () => {
      toast("Will close after 15s", {
        autoClose: 15000,
      });
    };

    const closeAfter7 = () => {
      toast("Will close after 7s", {
        autoClose: 7000,
      });
    };

    return { closeAfter15, closeAfter7 };
  }
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
import Vue3Toasity from 'jerry-todo';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: 8000,
    // ...
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Prevent the toast from closing by default


::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';

export default {
  name: "App",
  setup() {
    const show = () => toast("can not auto close");

    return { show };
  }
};
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
import Vue3Toasity from 'jerry-todo';
import 'jerry-todo/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    autoClose: false,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Prevent the toast from closing per toast


::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const show = () => toast("can not auto close", { autoClose: false });

    return { show };
  }
};
</script>

<template>
  <div>
    <button @click="show">show toast</button>
  </div>
</template>
```
:::
