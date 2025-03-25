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

## Sponsorship Support
Maintaining an open-source project requires significant time and resources. Your sponsorship will directly support:

- 🛠️ Continuous development and updates

- 🐛 Swift bug fixes and issue resolution

- 📚 Documentation improvements and expanded examples

### Ways to contribute:

- GitHub Sponsors
  
[GitHub Sponsors](https://github.com/sponsors/jerrywu001) (Recommended · Zero fees)

- Alipay/Wechat
  
<table style="display: flex; width: 500px;">
  <tr>
    <td style="margin-right: 16px;">
      <img style="width: 150px;" src="https://www.js-bridge.com/alipay.jpg" />
    </td>
    <td style="margin-right: 16px;">
      <img style="width: 150px;" src="https://www.js-bridge.com/wechat.jpg" />
    </td>
  </tr>
</table>

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
