![](https://user-images.githubusercontent.com/5574267/130804494-a9d2d69c-f170-4576-b2e1-0bb7f13dd92d.gif)

# Requirements

vue version >=3.2.0

# Installation

```bash
npm install --save vue3-toastify
# yarn add vue3-toastify
```

# Demo

[A demo is worth a thousand words](https://vue3-toastify.js-bridge.com)

[备用地址](https://vue3-toastify.netlify.app)

# Document

Check the [documentation](https://vue3-toastify.js-bridge.com/get-started/introduction.html) to get you started!

[备用地址](https://vue3-toastify.netlify.app/get-started/introduction.html)

# The gist

```html
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
   name: "App",
   setup() {
    const notify = () => {
      toast("Wow so easy !", {
        autoClose: 1000,
      }); // ToastOptions
    }
    return { notify };
   }
};
</script>
```

## Init/Update Global Props

```ts
// main.ts
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "vue3-toastify/global"
    ]
  }
}
```

or

```ts
updateGlobalOptions({ rtl: true });

toast.success('Wow so easy!');
```

## use global components (antd eg.)

```ts
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

## nuxt

[A nuxt demo](https://stackblitz.com/edit/nuxt-starter-1gszqs?file=app.vue,plugins%2Fvue3-toastify.ts)

- plugins/vue3-toastify.ts

```ts
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 1000 });

  return {
    provide: { toast },
  };
});

```

- demo.vue

```html
<script setup>
// import { toast } from 'vue3-toastify';

nextTick(() => {
  if (process.client) {
    useNuxtApp().$toast('notify after nextTick');
  }
});

const notify = () => {
  useNuxtApp().$toast.info('toastify success');
  // or
  // toast.info('toastify success');
};
</script>

<template>
  <button @click="notify">notify by click</button>
</template>
```

## Using the ES Module Build

[jsfiddle demo](https://jsfiddle.net/jerrywu001/r42xous5/)

```html
<html lang="en">

<head>
  <link href="https://cdn.jsdelivr.net/npm/vue3-toastify@0.2.1/dist/index.css" rel="stylesheet" />
  <title>Using the ES Module Build</title>
</head>

<body>
  <div id="app">
    <button @click="notify">show toast</button>
    <span>&nbsp;&nbsp;</span>
    <button @click="dismiss">dismiss</button>
  </div>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      }
    }
  </script>
  <script type="module">
    import { createApp } from 'vue'
    import { toast } from 'https://unpkg.com/vue3-toastify@0.2.1/dist/index.mjs'

    createApp({
      data() {
        return {
          toastId: '',
          toastIds: [],
        };
      },
      methods: {
        notify() {
          const toastId = toast.info(
            'hello',
            {
              rtl: true,
              limit: 3,
              position: toast.POSITION.BOTTOM_CENTER,
            },
          );
          this.toastIds.push(toastId);
        },
        dismiss() {
          console.log(this.toastIds)
          this.toastIds.forEach(id => {
            toast.remove(this.toastId);
          });
          /* toast.clearAll() */;
        },
      }
    }).mount('#app')
  </script>
</body>

</html>
```

## Sponsors

<p align="center">
  <h3 align="center">Special Sponsor</h3>
</p>

<p align="center">
  <a target="_blank" href="https://www.bnsense.com/">
  <img alt="special sponsor appwrite" src="https://www.bnsense.com/uploads/LOGO/imgs/logo_1704355682323.png" width="300">
  </a>
</p>

<p align="center">
  <a href="https://ik.imagekit.io/jerrywu001/sponsors.svg?updatedAt=1691025797559">
    <img src="https://ik.imagekit.io/jerrywu001/sponsors.svg?updatedAt=1691025797559"/>
  </a>
</p>
