# Pause toast timer when the window loses focus

The default behavior is to pause the toast timer whenever the window loses focus. You can opt-out by setting the `pauseOnFocusLoss` props to `false`.

::: sandbox
```vue App.vue
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast('default enable');

      toast('disable pauseOnFocusLoss', {
        pauseOnFocusLoss: false,
      });
    };

    return { notify };
  }
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::

- disable globally

```ts
app.use(
  Vue3Toasity,
  {
    pauseOnFocusLoss: false,
  } as ToastContainerOptions,
);
```

or

```ts
updateGlobalOptions({ rtl: true });

toast.success('Wow so easy!');
```
