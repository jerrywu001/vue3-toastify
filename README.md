![](https://user-images.githubusercontent.com/5574267/130804494-a9d2d69c-f170-4576-b2e1-0bb7f13dd92d.gif)

# Online demos

# Requirements

vue version >=3.2.0

# Installation

```bash
npm install --save vue3-toastify
# yarn add vue3-toastify
```

## Register Components Globally

```js
// main.ts
import Vue3Toastify, { type TransitionGroupOptions } from 'vue3-toastify';

app.use(Vue3Toastify);

// app.use(Vue3Toastify, { autoClose: 3000 } as TransitionGroupOptions);
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

# Features
