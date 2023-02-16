# Delay notification appearance

You can delay the notification appearance as shown below. Under the hood, the library simply uses `setTimeout` for you.

:::warning
`toast.remove` has no effect if called during the delay before a given toast appears.
:::

::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast('Show after 1sec', {
    delay: 1000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
</script>

<template>
  <div>
    <button @click="notify">Delay toast !</button>
  </div>
</template>
```
:::
