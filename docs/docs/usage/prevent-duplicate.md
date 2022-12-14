# Prevent duplicate

There are two ways to prevent duplicates toast. Use the one that fits your use case 👌.

## Simply provide a toast id

Providing a custom toast id is certainly the most straightforward way to prevent duplicate.


::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const customId = 'custom-id';

const notify = () => {
  toast("I cannot be duplicated!", {
    toastId: customId,
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::

## Check if a toast is already displayed

Maybe there is some situations where you cannot provide a custom toast id, in that case, you can check if a toast is already displayed by calling `toast.isActive(id)`


::: sandbox
```vue App.vue
<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastId = ref('');

const notify = () => {
  if (!toast.isActive(toastId.value)) {
    toastId.value = toast('I cannot be duplicated!');
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
