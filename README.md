# Vue3 toastify

![](https://user-images.githubusercontent.com/5574267/130804494-a9d2d69c-f170-4576-b2e1-0bb7f13dd92d.gif)

## Documentation

Check the [documentation](https://vue3-toastify.js-bridge.com/get-started/introduction.html) to get you started!

## Demo

Wanna try it out? Check out the [live demo](https://vue3-toastify.js-bridge.com)!

## Installation

### Using npm

```bash
npm install vue3-toastify
```

### Using yarn

```bash
yarn add vue3-toastify
```

### Using pnpm

```bash
pnpm add vue3-toastify
```

# Basic Usage

```html
<template>
  <button @click="notify">Notify !</button>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
  }); // ToastOptions
}
</script>
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
