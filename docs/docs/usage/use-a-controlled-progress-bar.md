# Use a controlled progress bar

:::tip
you can controll progress value from `1 to 0` or `0 to 1`
:::

:::danger
you can only use `toast.update` to update progress value
:::

## example

::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const progress = ref(1);
const type = ref(toast.TYPE.DEFAULT);
const toastId = ref('');
let interval;

const notify = () => {
  toastId.value = toast(
    'custom progress',
    {
      toastId: 'custom id',
      type: type.value,
      progress: progress.value,
      position: toast.POSITION.BOTTOM_RIGHT,
      onOpen: () => setTimeout(changeProgress, 600),
    }, // as ToastOptions
  );
};

const changeProgress = () => {
  interval = setInterval(() => {
    progress.value -= 0.05;

    // update progress
    toast.update(toastId.value, {
      progress: progress.value,
      type: progress.value <= 0 ? toast.TYPE.SUCCESS : type.value,
    });

    // reset status
    if (progress.value <= 0) {
      clearInterval(interval);
      type.value = toast.TYPE.DEFAULT;
      progress.value = 1;
    }
  }, 100);
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::
