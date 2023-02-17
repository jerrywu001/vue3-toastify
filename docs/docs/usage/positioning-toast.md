# Positioning toast

By default, all the toasts will be positioned on the top right of your browser. If a position is set on a toast, the one defined on ToastContainer will be replaced.

The following values are allowed: **top-right**, **top-center**, **top-left**, **bottom-right**, **bottom-center**, **bottom-left**

For convenience, `toast` exposes a `POSITION` property to avoid any typos.

## example

:::tip
View it with a PC, the effect is even better
:::

::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast("Default Notification !");

  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER,
  });

  toast.error("Error Notification !", {
    position: toast.POSITION.TOP_LEFT,
  });

  toast.warn("Warning Notification !", {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  toast.info("Info Notification !", {
    position: toast.POSITION.BOTTOM_CENTER,
  });

  toast("Custom Style Notification with css class!", {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'foo-bar',
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<style>
.foo-bar { color: #f00; }
</style>
```
:::
