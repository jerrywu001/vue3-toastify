# Define callback

You can define two callbacks. Their names are self-explanatory:

- onOpen
- onClose

::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast("Hello there", {
        onOpen: () => window.alert('Called when I open'),
        onClose: () => window.alert('Called when I close'),
      });
    };

    return { notify };
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
