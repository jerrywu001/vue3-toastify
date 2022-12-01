# Define callback

You can define two callbacks. Their names are self-explanatory:

- onOpen
- onClose

::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast("Hello there", {
    onOpen: () => window.alert('Called when I open'),
    onClose: () => window.alert('Called when I close'),
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
