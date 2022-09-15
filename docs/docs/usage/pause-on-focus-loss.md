# Pause toast timer when the window loses focus

The default behavior is to pause the toast timer whenever the window loses focus. You can opt-out by setting the `pauseOnFocusLoss` props to `false`.

::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

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

```js
app.use(
  Vue3Toasity,
  {
    pauseOnFocusLoss: false,
  }, // as ToastContainerOptions
);
```
