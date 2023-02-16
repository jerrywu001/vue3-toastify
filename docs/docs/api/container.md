# ToastContainer

## Props

| Props                | Type              | Default Value            | Description     |
| -------------------- | ----------------- | ------------------------ | --------------- |
| multiple | boolean | true | display multiple at the same time |
| limit | number | - | limit the number of toast displayed at the same time |
| newestOnTop | boolean | false | Display newest toast on top |
| containerClassName | string | - | Add optional classes to the container |
| dangerouslyHTMLString | boolean | false | render unsafe string, like html tag |
| icon | IconType | - | Used to display a custom icon. Set it to `false` to prevent |
| rtl | boolean | false | Support right to left content |
| containerId | Id | - | Used to identify the ToastContainer when working with multiple container. Also used to set the id attribute |
| position | ToastPosition | toast.POSITION.TOP_RIGHT | One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left |
| autoClose | number \| boolean | 5000 | Delay in ms to close the toast. If set to false, the notification needs to be closed manually |
| closeButton | VNode \| boolean | default icon | Replace the default close button or `false` to hide the button |
| transition | ToastTransition \| CSSTransitionProps | toast.TRANSITIONS.Bounce | A reference to a valid transition animation |
| hideProgressBar   | boolean        | false     | Display or not the progress bar below the toast(remaining time) |
| pauseOnHover      | boolean        | true      | Keep the timer running or not on hover |
| pauseOnFocusLoss  | boolean        | true      | Pause the timer when the window loses focus |
| closeOnClick      | boolean        | true      | Dismiss toast on click |
| toastClassName    | string         | -         | Add optional classes to the toast |
| bodyClassName     | string         | -         | Add optional classes to the toast body |
| style             | CSSProperties  | -         | Add optional inline style to the container |
| progressClassName | string         | -         | Add optional classes to the progress bar |
| progressStyle     | CSSProperties  | -         | Add optional inline style to the progress bar |
| role              | string         | alert     | Define the ARIA role for the toasts |
| theme             | ToastTheme     | auto | One of auto, light, dark, colored, `auto` means automatically detects system theme colors |

:::warning
By default, all toasts will inherit ToastContainer's props. Props defined on toast supersede ToastContainer's props. The demo is not exhaustive, check the doc for more!
:::

## Usage with `app.use`

```ts
import { createApp } from 'vue';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue';

const app = createApp(App);

app.use(
  Vue3Toasity,
  {
    autoClose: 2000,
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
  } as ToastContainerOptions,
);

app.mount('#app');
```

## Usage with `updateGlobalOptions` function

```ts
updateGlobalOptions({ rtl: true });

toast.success('Wow so easy!');
```
