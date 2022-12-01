# Use a custom id

A custom `toastId` can be used to replace the one generated. You can provide a `number` or a `string`.


::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast("I use a custom id", { toastId: "customId" });
};

const remove = () => {
  toast.remove("customId");
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
    <button @click="remove">Remove !</button>
  </div>
</template>
```
:::
