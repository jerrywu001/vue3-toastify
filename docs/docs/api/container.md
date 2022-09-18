# ToastContainer

## Props

| Props                | Type              | Default Value            | Description                                                                                  |
| -------------------- | ----------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| position             | ToastPosition     | toast.POSITION.TOP_RIGHT | One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left             |
| theme                | ToastTheme        | light                    | One of light, dark, colored                                                                  |
| autoClose            | number \| boolean | 5000                     | Delay in ms to close the toast. If set to false, the notification needs to be closed manually   |
| closeButton          | VNode \| boolean  | default icon             | Replace the default close button or `false` to hide the button                               |
| transition           | ToastTransition   \| CSSTransitionProps      | toast.TRANSITIONS.Bounce    | A reference to a valid transition animation                    |
| hideProgressBar      | boolean           | false     | Display or not the progress bar below the toast(remaining time)                                             |
| pauseOnHover         | boolean           | true      | Keep the timer running or not on hover                                                                      |
| pauseOnFocusLoss     | boolean           | true      | Pause the timer when the window loses focus                                                                 |
| rtl                  | boolean           | false     | Support right to left content                                                                               |
| closeOnClick         | boolean           | true      | Dismiss toast on click                                                                                      |
| newestOnTop          | boolean           | false     | Display newest toast on top                                                                                 |
| containerClassName   | string            | -         | Add optional classes to the container                                                                       |
| style                | CSSProperties     | -         | Add optional inline style to the container                                                                  |
| toastClassName       | string            | -         | Add optional classes to the toast                                                                           |
| bodyClassName        | string            | -         | Add optional classes to the toast body                                                                      |
| progressClassName    | string            | -         | Add optional classes to the progress bar                                                                    |
| progressStyle        | CSSProperties     | -         | Add optional inline style to the progress bar                                                               |
| containerId          | Id  | -           | Used to identify the ToastContainer when working with multiple container. Also used to set the id attribute |
| role                 | string            | alert     | Define the ARIA role for the toasts                                                                         |
| limit                | number            | -         | Used to limit the number of toast displayed on screen at the same time                                      |


## Usage

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
