# How to style

## Override css variables

Below the list of the css variables that are exposed by the library. You can accomplish a lot by overriding some of them.

```css
:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: #e74c3c;
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-toast-width: 320px;
  --toastify-toast-background: #fff;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;

  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  //Used only for colored theme
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;

  // Used when no type is provided
  // toast("**hello**")
  --toastify-color-progress-light: linear-gradient(
    to right,
    #4cd964,
    #5ac8fa,
    #007aff,
    #34aadc,
    #5856d6,
    #ff2d55
  );
  // Used when no type is provided
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
}
```

## Override existing css classes

If overriding the css variables is not enough for you, you can override the existing CSS classes. Below, a list of the CSS classes used(classes used for animation and media query are omitted)

```css
/** Used to define container behavior: width, position: fixed etc... **/
.Toastify__toast-container {
}

/** Used to define the position of the ToastContainer **/
.Toastify__toast-container--top-left {
}
.Toastify__toast-container--top-center {
}
.Toastify__toast-container--top-right {
}
.Toastify__toast-container--bottom-left {
}
.Toastify__toast-container--bottom-center {
}
.Toastify__toast-container--bottom-right {
}

/** Classes for the displayed toast **/
.Toastify__toast {
}
.Toastify__toast--rtl {
}
.Toastify__toast-body {
}

/** Used to position the icon **/
.Toastify__toast-icon {
}

/** handle the notificaiton color and the text color based on the theme **/
.Toastify__toast-theme--dark {
}
.Toastify__toast-theme--light {
}
.Toastify__toast-theme--colored.Toastify__toast--default {
}
.Toastify__toast-theme--colored.Toastify__toast--info {
}
.Toastify__toast-theme--colored.Toastify__toast--success {
}
.Toastify__toast-theme--colored.Toastify__toast--warning {
}
.Toastify__toast-theme--colored.Toastify__toast--error {
}

.Toastify__progress-bar {
}
.Toastify__progress-bar--rtl {
}
.Toastify__progress-bar-theme--light {
}
.Toastify__progress-bar-theme--dark {
}
.Toastify__progress-bar--info {
}
.Toastify__progress-bar--success {
}
.Toastify__progress-bar--warning {
}
.Toastify__progress-bar--error {
}
/** colored notifications share the same progress bar color **/
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
}

/** Classes for the close button. Better use your own closeButton **/
.Toastify__close-button {
}
.Toastify__close-button--default {
}
.Toastify__close-button > svg {
}
.Toastify__close-button:hover, .Toastify__close-button:focus {
}

```

## Build your own style using the scss files

Grab the [scss directory](https://github.com/jerrywu001/jerry-todo/tree/main/src/styles) of the repository and build your own stylesheet. If you just want to changes some colors most of them are defined inside the _variables.scss file.


```md
scss
├── _closeButton.scss
├── _progressBar.scss
├── _toast.scss
├── _toastContainer.scss
├── _variables.scss
├── ...
├── 📁 animations
│  ├── _bounce.scss
│  ├── _flip.scss
│  ├── _slide.scss
│  └── _zoom.scss
└── main.scss
```

## Passing css classes to component

The `GlobalProps` accept the following props for styling:

- `style`: inline style applied to the container
- `containerClassName`: applied to the container
- `toastClassName`: applied on the toast wrapper
- `bodyClassName`: applied on the toast body
- `progressClassName`: applied on the progress bar

```ts
import { createApp } from 'vue';
import Vue3Toasity, { type ToastContainerOptions } from 'jerry-todo';
import App from './App.vue';

const app = createApp(App);

app.use(
  Vue3Toasity,
  {
    containerClassName: 'container-classsssssss',
    toastClassName: 'toast-classssssss',
    bodyClassName: 'toast-body-Ccccct-size',
    progressClassName: 'fancy-progress-bar',
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
  } as ToastContainerOptions,
);

app.mount('#app');

```

When displaying a notification you can also set some css classes:

- `toastClassName`: applied on the toast wrapper (this override `toastClassName` is set by the container )
- `bodyClassName`: applied on the toast body (this override `bodyClassName` is set by the container )
- `progressClassName`: applied on the progress bar (this override `progressClassName` is set by the container )
- `toastStyle`: inline style applied to the toast

```ts
toast('Custom style', {
  toastClassName: 'toast-classssssss2222',
  bodyClassName: 'toast-body-Ccccct-size222',
  progressClassName: 'fancy-progress-bar222',
  toastStyle: {
    fontSize: '14px',
  },
});
```
