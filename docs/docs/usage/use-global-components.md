# Use global components

## Nuxt
```js
// vue3-toastify.client.ts
import Vue3Toastify, { toast, type ToastContainerOptions, type IconProps } from 'vue3-toastify';
import { useRouter } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();

    function resolveGLobalComponents(instance: App<Element>) {
        instance.use(router);
    }
    nuxtApp.vueApp.use(
      Vue3Toasity,
      {
        // the Toast application is separate from the main application, so we need to call .use
        useHandler: resolveGLobalComponents,
        // other props...
      } as ToastContainerOptions,
    );

    return {
        provide: { toast },
    };
});

```

## Ant design
```js
// app.ts
import { App, createApp } from 'vue';
import router from './routes';

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';

import Root from './App.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

function resolveGLobalComponents(instance: App<Element>) {
  instance.use(Antd);
}

const app = createApp(Root);

app.use(router);

resolveGLobalComponents(app);

app.use(
  Vue3Toasity,
  {
    // the Toast application is separate from the main application, so we need to call .use
    useHandler: resolveGLobalComponents,
    // other props...
  } as ToastContainerOptions,
);

app.mount('#app');
```
