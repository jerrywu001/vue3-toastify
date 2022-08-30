# Vue3 toastify

## The playground

::: playground
:::

::: sandbox
```vue App.vue
<template>
  <div>{{ a }} hello</div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const a = ref(1);
    return { a };
  }
}
</script>
```
:::
