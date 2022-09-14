![](https://user-images.githubusercontent.com/5574267/130804494-a9d2d69c-f170-4576-b2e1-0bb7f13dd92d.gif)

# Online demos

# Requirements

vue version >=3.2.0

# Installation

```bash
npm install --save jerry-todo
# yarn add jerry-todo
```

## Register Components Globally

```js
// main.ts
import Vue3Toastify, { type ToastContainerOptions } from 'jerry-todo';

app.use(Vue3Toastify);

// app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions);
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "jerry-todo/global"
    ]
  }
}
```

# Features
