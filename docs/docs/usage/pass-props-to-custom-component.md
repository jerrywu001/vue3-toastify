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
:::
```


