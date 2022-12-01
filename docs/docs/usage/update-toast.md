# Update a toast

When you update a toast, the toast options and the content are inherited but don't worry you can update them as well.

## Basic example

::: sandbox
```vue App.vue
<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastId = ref('');
const notify = () => toastId.value = toast('Hello', { autoClose: false });
const update = () => toast.update(toastId.value, {
  type: toast.TYPE.INFO,
  autoClose: 5000,
});
</script>

<template>
  <div>
    <button @click="notify">notify !</button>
    <button @click="update">update !</button>
  </div>
</template>
```
:::

## Update the content

::: sandbox
```vue App.vue
<script setup>
import { ref, h } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastId = ref('');
const notify = () => toastId.value = toast('Hello', { autoClose: false });
const update = () => {
  toast.update(
    toastId.value,
    {
      // render: 'New content',
      // render: SomeVNode, // ToastContent<T>
      render: (props) => {
        console.log(props);
        return h('div', 'new content');
      }, // ToastContentProps<T>
      type: toast.TYPE.INFO,
      autoClose: 5000,
    }, // ToastOptions
  );
};
</script>

<template>
  <div>
    <button @click="notify">notify !</button>
    <button @click="update">update !</button>
  </div>
</template>
```
:::

:::tip
you can also update other `ToastOptions`
:::
