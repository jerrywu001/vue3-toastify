# Pass porps to your custom component.

> `expandCustomProps` default is false.

- `expandCustomProps`: true

::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CustomComp from './CustomComp.vue';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast(CustomComp, {
    type: 'warning',
    expandCustomProps: true,
    contentProps: {
      title: 'hello world',
      color: '#00a2ed',
    },
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```

```vue /src/CustomComp.vue
<template>
  <div :style="`color: ${color}`">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
});
</script>
```
:::

- enable globally

```ts
app.use(
  Vue3Toasity,
  {
    expandCustomProps: true, // default is false
  } as ToastContainerOptions,
);
```

- `expandCustomProps`: false

::: sandbox
```vue /src/App.vue
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CustomComp from './CustomComp.vue';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast(CustomComp, {
    type: 'warning',
    contentProps: {
      title: 'hello world',
      color: '#00a2ed',
    },
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```

```vue /src/CustomComp.vue
<template>
  <div :style="`color: ${contentProps.color}`">
    {{ contentProps.title }}
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  contentProps: {
    type: Object as PropType<{ title: string; color: String }>,
    default: () => ({}),
  },
});
</script>
```

## Use a Custom Vue Component in Your Toasts

You can render **any Vue component** inside a toast — ideal for displaying rich, dynamic content.

When using Vue 3, the easiest approach is to create a composable that wraps your custom component and the `vue3-toastify` API.

---

### Example: Custom Toast Component

::: sandbox

```ts /src/composables/useToast.ts
import { h } from "vue";
import { toast, ToastType } from "vue3-toastify";
import ToastContent from "@/components/ToastContent.vue";

export const useToast = () => {
  const showToast = ({
    status,
    title,
    message,
  }: {
    status: ToastType;
    title?: string;
    message: string;
  }) => {
    toast(() => h(ToastContent, { status, title, message }), {
      type: status,
      icon: false,
    });
  };

  return { showToast };
};
```

```vue /src/components/ToastContent.vue
<template>
  <div class="toast-content">
    <strong v-if="title">{{ title }}</strong>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string;
  title?: string;
  message: string;
}>();
</script>

<style scoped>
.toast-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
```

```vue /src/App.vue
<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import "vue3-toastify/dist/index.css";

const { showToast } = useToast();

const notify = () => {
  showToast({
    status: "success",
    title: "Success",
    message: "Your data was saved successfully!",
  });
};
</script>

<template>
  <button @click="notify">Show Toast</button>
</template>
```


