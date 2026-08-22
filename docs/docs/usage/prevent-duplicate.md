# Prevent duplicate

There are two ways to prevent duplicates toast. Use the one that fits your use case 👌.

## Simply provide a toast id

Providing a custom toast id is certainly the most straightforward way to prevent duplicate.


::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const customId = 'custom-id';

const notify = () => {
  toast("I cannot be duplicated!", {
    toastId: customId,
    position: toast.POSITION.BOTTOM_CENTER,
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

## Reset when a duplicate is triggered

By default, a duplicate is ignored and the original toast keeps its remaining
auto-close time. Enable `resetOnDuplicate` to restart that timer and replay a
short visual cue whenever the same toast is triggered again.

```ts
toast.error('The connection is unavailable', {
  toastId: 'connection-error',
  autoClose: 5000,
  resetOnDuplicate: true,
});
```

The content of the toast on screen is kept as is: only the timer and the cue are
replayed. Use [`toast.update`](./update-toast.md) when the message itself has to
change.

## Check if a toast is already displayed

Maybe there is some situations where you cannot provide a custom toast id, in that case, you can check if a toast is already displayed by calling `toast.isActive(id)`


::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastId = ref('');

const notify = () => {
  if (!toast.isActive(toastId.value)) {
    toastId.value = toast('I cannot be duplicated!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
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
