# Delay notification appearance

You can delay the notification appearance as shown below. Under the hood, the library simply uses `setTimeout` for you.

:::warning
`toast.remove` has no effect if called during the delay before a given toast appears.
:::

::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast('Show after 1sec', { delay: 1000 });
    };

    return { notify };
  }
};
</script>

<template>
  <div>
    <button @click="notify">Delay toast !</button>
  </div>
</template>
```
:::
