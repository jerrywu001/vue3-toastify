# Use a custom close button or remove it

## Override the default one

You can pass a custom close button to the ToastContainer to replace the default one.

:::tip
When you use a custom close button, your button will receive a `closeToast` function. You need to use it to close the toast.
:::


::: sandbox
```vue App.vue
<script>
import { h } from 'vue';
import { toast } from 'vue3-toastify';
import { VNodeIcon, ComponentIcon } from './icons.jsx';
import 'vue3-toastify/dist/index.css';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast('component close icon1', {
        closeOnClick: false,
        autoClose: false,
        closeButton: ComponentIcon, // ComponentIcon as CloseBtnType,
      });

      toast('component close icon2', {
        closeOnClick: false,
        autoClose: false,
        closeButton: (props) => h(ComponentIcon, props), // CloseButtonProps
      });

      toast('VNode close icon', {
        closeOnClick: false,
        autoClose: false,
        closeButton: ({ closeToast }) => h(VNodeIcon, { onClick: closeToast  }),
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

```jsx /src/icons.jsx
// import { ToastType } from 'vue3-toastify'; // type ToastType, type IconProps, type ToastTheme
import { defineComponent, PropType } from 'vue';
import props from './props';

export const ComponentIcon = defineComponent({
  props,
  setup(props, { attrs }) { // props: CloseButtonProps
    return () => (
      <svg
        onClick={props.closeToast} // do not forget this!!!!!
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
      >
        <path d="M499.2 951.466667c-234.666667 0-426.666667-192-426.666667-426.666667 0-17.066667 0-38.4 4.266667-55.466667 4.266667-12.8 12.8-17.066667 25.6-17.066666 12.8 4.266667 17.066667 12.8 17.066667 25.6-4.266667 12.8-4.266667 29.866667-4.266667 46.933333 0 213.333333 170.666667 384 384 384s384-170.666667 384-384-170.666667-384-384-384c-25.6 0-46.933333 4.266667-72.533333 8.533333-12.8 0-21.333333-4.266667-25.6-17.066666 0-12.8 4.266667-21.333333 17.066666-25.6 25.6-4.266667 51.2-8.533333 81.066667-8.533334 234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667z" fill="#7162AD" p-id="3129"></path><path d="M119.466667 418.133333h-8.533334c-8.533333-4.266667-17.066667-17.066667-12.8-29.866666 42.666667-119.466667 128-213.333333 238.933334-256 12.8-4.266667 21.333333 0 25.6 12.8 4.266667 12.8 0 21.333333-12.8 25.6C256 213.333333 174.933333 298.666667 140.8 405.333333c-4.266667 8.533333-12.8 12.8-21.333333 12.8z" fill="#A495FC" p-id="3130"></path><path d="M392.533333 657.066667c-4.266667 0-12.8 0-17.066666-4.266667-8.533333-8.533333-8.533333-21.333333 0-29.866667l213.333333-213.333333c8.533333-8.533333 21.333333-8.533333 29.866667 0s8.533333 21.333333 0 29.866667l-213.333334 213.333333c0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3131"></path><path d="M605.866667 657.066667c-4.266667 0-12.8 0-17.066667-4.266667l-213.333333-213.333333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866666 0l213.333334 213.333333c8.533333 8.533333 8.533333 21.333333 0 29.866667 0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3132"></path>
      </svg>
    );
  },
});

export const VNodeIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path d="M499.2 951.466667c-234.666667 0-426.666667-192-426.666667-426.666667 0-17.066667 0-38.4 4.266667-55.466667 4.266667-12.8 12.8-17.066667 25.6-17.066666 12.8 4.266667 17.066667 12.8 17.066667 25.6-4.266667 12.8-4.266667 29.866667-4.266667 46.933333 0 213.333333 170.666667 384 384 384s384-170.666667 384-384-170.666667-384-384-384c-25.6 0-46.933333 4.266667-72.533333 8.533333-12.8 0-21.333333-4.266667-25.6-17.066666 0-12.8 4.266667-21.333333 17.066666-25.6 25.6-4.266667 51.2-8.533333 81.066667-8.533334 234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667z" fill="#7162AD" p-id="3129"></path><path d="M119.466667 418.133333h-8.533334c-8.533333-4.266667-17.066667-17.066667-12.8-29.866666 42.666667-119.466667 128-213.333333 238.933334-256 12.8-4.266667 21.333333 0 25.6 12.8 4.266667 12.8 0 21.333333-12.8 25.6C256 213.333333 174.933333 298.666667 140.8 405.333333c-4.266667 8.533333-12.8 12.8-21.333333 12.8z" fill="#A495FC" p-id="3130"></path><path d="M392.533333 657.066667c-4.266667 0-12.8 0-17.066666-4.266667-8.533333-8.533333-8.533333-21.333333 0-29.866667l213.333333-213.333333c8.533333-8.533333 21.333333-8.533333 29.866667 0s8.533333 21.333333 0 29.866667l-213.333334 213.333333c0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3131"></path><path d="M605.866667 657.066667c-4.266667 0-12.8 0-17.066667-4.266667l-213.333333-213.333333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866666 0l213.333334 213.333333c8.533333 8.533333 8.533333 21.333333 0 29.866667 0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3132"></path>
  </svg>
);
```

```js /src/props.js
const props = {
  theme: {
    type: String, //  as PropType<ToastTheme>
  },
  type: {
    type: String, // as PropType<ToastType>
  },
  closeToast: {
    type: Function, // as PropType<(e?: MouseEvent) => void>
  },
  ariaLabel: {
    type: String,
    required: false,
    default: 'close',
  },
};

export default props;
```
:::

:::details Code in Jsx:
```jsx
toast('HELLO', {
  closeButton: (props) => (
    <ComponentIcon
      {...props}
      class="xxx"
    />
  ),
  autoClose: false,
  closeOnClick: false,
});

// or
toast('HELLO', {
  closeButton: ({ closeToast }) => (
    <VNodeIcon
      // @ts-ignore
      onClick={closeToast}
      class="xxx"
    />
  ),
  autoClose: false,
  closeOnClick: false,
});
```
:::

## Define it globally

::: sandbox
```vue App.vue
<script>
import { toast } from 'vue3-toastify';

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast('component close icon');
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

```jsx /src/icons.jsx
// import { ToastType } from 'vue3-toastify'; // type ToastType, type IconProps, type ToastTheme
import { defineComponent, PropType } from 'vue';
import props from './props';

export const ComponentIcon = defineComponent({
  props,
  setup(props, { attrs }) { // props: CloseButtonProps
    return () => (
      <svg
        onClick={props.closeToast} // do not forget this!!!!!
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
      >
        <path d="M499.2 951.466667c-234.666667 0-426.666667-192-426.666667-426.666667 0-17.066667 0-38.4 4.266667-55.466667 4.266667-12.8 12.8-17.066667 25.6-17.066666 12.8 4.266667 17.066667 12.8 17.066667 25.6-4.266667 12.8-4.266667 29.866667-4.266667 46.933333 0 213.333333 170.666667 384 384 384s384-170.666667 384-384-170.666667-384-384-384c-25.6 0-46.933333 4.266667-72.533333 8.533333-12.8 0-21.333333-4.266667-25.6-17.066666 0-12.8 4.266667-21.333333 17.066666-25.6 25.6-4.266667 51.2-8.533333 81.066667-8.533334 234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667z" fill="#7162AD" p-id="3129"></path><path d="M119.466667 418.133333h-8.533334c-8.533333-4.266667-17.066667-17.066667-12.8-29.866666 42.666667-119.466667 128-213.333333 238.933334-256 12.8-4.266667 21.333333 0 25.6 12.8 4.266667 12.8 0 21.333333-12.8 25.6C256 213.333333 174.933333 298.666667 140.8 405.333333c-4.266667 8.533333-12.8 12.8-21.333333 12.8z" fill="#A495FC" p-id="3130"></path><path d="M392.533333 657.066667c-4.266667 0-12.8 0-17.066666-4.266667-8.533333-8.533333-8.533333-21.333333 0-29.866667l213.333333-213.333333c8.533333-8.533333 21.333333-8.533333 29.866667 0s8.533333 21.333333 0 29.866667l-213.333334 213.333333c0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3131"></path><path d="M605.866667 657.066667c-4.266667 0-12.8 0-17.066667-4.266667l-213.333333-213.333333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866666 0l213.333334 213.333333c8.533333 8.533333 8.533333 21.333333 0 29.866667 0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3132"></path>
      </svg>
    );
  },
});

export const VNodeIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path d="M499.2 951.466667c-234.666667 0-426.666667-192-426.666667-426.666667 0-17.066667 0-38.4 4.266667-55.466667 4.266667-12.8 12.8-17.066667 25.6-17.066666 12.8 4.266667 17.066667 12.8 17.066667 25.6-4.266667 12.8-4.266667 29.866667-4.266667 46.933333 0 213.333333 170.666667 384 384 384s384-170.666667 384-384-170.666667-384-384-384c-25.6 0-46.933333 4.266667-72.533333 8.533333-12.8 0-21.333333-4.266667-25.6-17.066666 0-12.8 4.266667-21.333333 17.066666-25.6 25.6-4.266667 51.2-8.533333 81.066667-8.533334 234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667z" fill="#7162AD" p-id="3129"></path><path d="M119.466667 418.133333h-8.533334c-8.533333-4.266667-17.066667-17.066667-12.8-29.866666 42.666667-119.466667 128-213.333333 238.933334-256 12.8-4.266667 21.333333 0 25.6 12.8 4.266667 12.8 0 21.333333-12.8 25.6C256 213.333333 174.933333 298.666667 140.8 405.333333c-4.266667 8.533333-12.8 12.8-21.333333 12.8z" fill="#A495FC" p-id="3130"></path><path d="M392.533333 657.066667c-4.266667 0-12.8 0-17.066666-4.266667-8.533333-8.533333-8.533333-21.333333 0-29.866667l213.333333-213.333333c8.533333-8.533333 21.333333-8.533333 29.866667 0s8.533333 21.333333 0 29.866667l-213.333334 213.333333c0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3131"></path><path d="M605.866667 657.066667c-4.266667 0-12.8 0-17.066667-4.266667l-213.333333-213.333333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866666 0l213.333334 213.333333c8.533333 8.533333 8.533333 21.333333 0 29.866667 0 4.266667-8.533333 4.266667-12.8 4.266667z" fill="#7162AD" p-id="3132"></path>
  </svg>
);
```

```js /src/props.js
const props = {
  theme: {
    type: String, //  as PropType<ToastTheme>
  },
  type: {
    type: String, // as PropType<ToastType>
  },
  closeToast: {
    type: Function, // as PropType<(e?: MouseEvent) => void>
  },
  ariaLabel: {
    type: String,
    required: false,
    default: 'close',
  },
};

export default props;
```

```js /src/main.js [active]
import { h } from 'vue';
import App from './App.vue';
import { createApp } from 'vue';
import { VNodeIcon, ComponentIcon } from './icons.jsx';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
  Vue3Toasity,
  {
    closeButton: (props) => h(ComponentIcon, props), // CloseButtonProps
    // closeButton: ComponentIcon as CloseBtnType,
    // closeButton: ({ closeToast }) => h(VNodeIcon, { onClick: closeToast }),
    autoClose: false,
    closeOnClick: false,
  }, // global options type definition --> ToastContainerOptions
).mount('#app');
```
:::

## Remove it

Sometimes you don't want to display a close button. It can be removed globally or per toast. Pass `false` to `closeButton` props:

:::tip
if you removed it globally, you can still choose to display it for a specific toast

```js
toast("hello", {
  closeButton: true, // or MyCustomCloseButton
});
```
:::
