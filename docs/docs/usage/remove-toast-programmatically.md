# Remove toast programmatically

An id is returned each time you display a toast, use it to remove a given toast programmatically by calling `toast.remove(toastId)`

:::danger
If you call `toast.remove` without argument, all the displayed toasts will be removed.
:::

::: sandbox
```vue App.vue
<script>
import { ref } from 'vue';
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const toastId = ref('');
    const notify = () => toastId.value = toast('Hello!!!');
    const dismiss = () =>  toast.remove(toastId.value);
    const dismissAll = () =>  toast.clearAll(); // toast.clearAll(containerId?: Id): void;

    return { notify, dismiss, dismissAll };
  }
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
    <button @click="dismiss">Dismiss</button>
    <button @click="dismissAll">Dismiss All</button>
  </div>
</template>
```
:::
