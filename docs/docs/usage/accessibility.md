# Accessibility

By default, all toasts are diplayed with the ARIA `role` alert. This can be changed globally or per toast.

## Globally

```ts
import { createApp } from 'vue';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue';

const app = createApp(App);

app.use(
  Vue3Toasity,
  {
    role: 'custom-role',
  } as ToastContainerOptions,
);

app.mount('#app');

```

## Per toast

```ts
toast("hello", {
  role: "custom-role",
} as ToastOptions);
```

Refer to https://www.w3.org/WAI/PF/aria/roles for more information.
