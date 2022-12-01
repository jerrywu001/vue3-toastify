# Remove toast programmatically

An id is returned each time you display a toast, use it to remove a given toast programmatically by calling `toast.remove(toastId)`

:::danger
If you call `toast.remove` without argument, all the displayed toasts will be removed.
:::

::: sandbox
```vue App.vue
<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastId = ref('');
const notify = () => toastId.value = toast('Hello!!!');
const dismiss = () =>  toast.remove(toastId.value);
const dismissAll = () =>  toast.clearAll(); // toast.clearAll(containerId?: Id): void;
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
