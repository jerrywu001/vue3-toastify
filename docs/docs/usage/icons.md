# Icons

## Built-in icons

![icons](./icons.png)

Notifications of different types (`toast.info`, `toast.error`, `toast.success`, `toast.warning`) display an icon associated with the selected type.


::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast.info('Hello!!'); // same as toast('Hello!!', { type: 'info' });
      toast.error('Hello!!');
      toast.success('Hello!!');
      toast.success('Hello!!', {
        theme: 'colored',
        position: toast.POSITION.TOP_LEFT,
      });
      toast.warn('Hello!!', {
        position: toast.POSITION.TOP_LEFT,
      });
      toast.warn('Hello!!', {
        theme: 'dark',
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

## Disable icons

- Disable the icon individually

::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast.error('Without icon', {
        icon: false,
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

- Disable the icon gloabally


::: sandbox
```vue App.vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script>
import { toast } from 'jerry-todo';

export default {
  name: 'App',
  setup() {
    const notify = () => toast.error('Disable the icon gloabally !');
    return { notify };
  }
};
</script>
```

```js /src/main.js [active]
import App from './App.vue';
import { createApp } from 'vue';
import Vue3Toasity from 'jerry-todo';
import 'jerry-todo/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    icon: false,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Custom icons

::: sandbox
```vue App.vue
<script>
import { toast } from 'jerry-todo';
import { customIcon } from './icon.jsx';
import 'jerry-todo/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast.success('You can provide any string', {
        icon: "🚀",
      });

      toast.success('You can provide any number', {
        icon: 1,
      });

      toast.success('And of course a component of your choice', {
        icon: customIcon,
        position: toast.POSITION.TOP_LEFT,
        autoClose: false
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

```jsx /src/icon.jsx
export const customIcon = () => (
  <svg t="1663149271052" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1490" width="32" height="32"><path d="M672 234.666667a32 32 0 0 1 0-64v64zM853.333333 352a32 32 0 0 1-64 0H853.333333zM672 170.666667h64v64h-64V170.666667zM853.333333 288v64h-64v-64H853.333333zM736 170.666667A117.333333 117.333333 0 0 1 853.333333 288h-64c0-29.44-23.893333-53.333333-53.333333-53.333333V170.666667zM352 789.333333a32 32 0 0 1 0 64v-64zM170.666667 672a32 32 0 0 1 64 0H170.666667zM352 853.333333h-64v-64h64V853.333333zM170.666667 736v-64h64v64H170.666667zM288 853.333333A117.333333 117.333333 0 0 1 170.666667 736h64c0 29.44 23.893333 53.333333 53.333333 53.333333V853.333333zM672 789.333333a32 32 0 0 0 0 64v-64zM853.333333 672a32 32 0 0 0-64 0H853.333333zM672 853.333333h64v-64h-64V853.333333zM853.333333 736v-64h-64v64H853.333333zM736 853.333333A117.333333 117.333333 0 0 0 853.333333 736h-64c0 29.44-23.893333 53.333333-53.333333 53.333333V853.333333zM234.666667 352a32 32 0 0 1-64 0h64zM352 170.666667a32 32 0 0 1 0 64V170.666667zM170.666667 352v-64h64v64H170.666667zM288 170.666667h64v64h-64V170.666667zM170.666667 288A117.333333 117.333333 0 0 1 288 170.666667v64c-29.44 0-53.333333 23.893333-53.333333 53.333333H170.666667z" fill="#222222" p-id="1491"></path><path d="M170.666667 469.333333m32 0l618.666666 0q32 0 32 32l0 0q0 32-32 32l-618.666666 0q-32 0-32-32l0 0q0-32 32-32Z" fill="#222222" p-id="1492"></path></svg>
);
```
:::
