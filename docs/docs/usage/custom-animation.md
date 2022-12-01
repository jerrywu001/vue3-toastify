# Define a custom enter and exit animation

## Define a custom enter and exit animation

You can write your own using the power of css or use any css animation library like [animate.css](https://animate.style/).

All you need to do is to define your enter and exit classes.

```ts
const customAnimation = {
  enter: "animate__animated animate__lightSpeedInRight",
  exit: "animate__animated animate__lightSpeedOutRight",
  // appendPosition: true, // default to false
} as CSSTransitionProps;

// TIPS !!!!!!!!!!!!!!!!
// if add prop --> appendPosition: true
// - className to be: "animate__animated animate__lightSpeedInRight--top-right"
// - enter or exit animation will not trigger,
// - because there has no className "animate__lightSpeedInRight--top-right"
// - so, make sure "animate__lightSpeedInRight--top-right" is enable
```

:::tip
Don't forget to add the position as well when you write your css animations. If you pass multiple classes, the position will be appended only to the last one.
:::

::: sandbox
```vue App.vue
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'animate.css';

const customAnimation = {
  enter: "animate__animated animate__lightSpeedInRight",
  exit: "animate__animated animate__lightSpeedOutRight",
  // appendPosition: true,
}; // as CSSTransitionProps

// TIPS !!!!!!!!!!!!!!!!
// if add prop --> appendPosition: true
// - className to be: "animate__animated animate__lightSpeedInRight--top-right"
// - enter or exit animation will not trigger,
// - because there has no className "animate__lightSpeedInRight--top-right"

const notify = () => {
  toast('Wow so easy !', {
    transition: customAnimation,
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::

## Prevent the toast from collapsing after the exit animation

By default, the remaining toast will collapse smoothly

This can be disabled as well:


::: sandbox
```vue App.vue
<script setup>
import { toast, Bounce } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const customAnimation = {
  ...Bounce,
  collapse: false,
  collapseDuration: 2000,
}; // as CSSTransitionProps

const notify = () => {
  toast('Wow so easy !', {
    transition: customAnimation,
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::

## Tweak collapse duration

The default duration is 300ms. This is also easy to change 💪


::: sandbox
```vue App.vue
<script setup>
import { toast, Bounce } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const customAnimation = {
  ...Bounce,
  collapseDuration: 2000,
}; // as CSSTransitionProps

const notify = () => {
  toast('Wow so easy !', {
    transition: customAnimation,
  });
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
:::
