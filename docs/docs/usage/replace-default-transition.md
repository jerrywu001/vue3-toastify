# Replace the default transition

There are 4 built-in transitions provided.

- Bounce
- Slide
- Zoom
- Flip

Bounce is used by default, but you can replace it with your own transition, or with one from the list above.


::: sandbox
```vue App.vue
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast('BOUNCE', {
        transition: toast.TRANSITIONS.BOUNCE,
      });
      toast('FLIP', {
        transition: toast.TRANSITIONS.FLIP,
      });
      toast('ZOOM', {
        transition: toast.TRANSITIONS.ZOOM,
        position: toast.POSITION.TOP_LEFT,
      });
      toast('SLIDE', {
        transition: toast.TRANSITIONS.SLIDE,
        position: toast.POSITION.TOP_LEFT,
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

- change globally

```js
app.use(
  Vue3Toasity,
  {
    transition: toast.TRANSITIONS.FLIP,
    // toast.TRANSITIONS.BOUNCE
    // toast.TRANSITIONS.ZOOM
    // toast.TRANSITIONS.SLIDE
  }, // as ToastContainerOptions
);
```
