

<p align="center"><img src="./public/icon.svg" alt="logo" width="100"></p>
<h1 align="center">Vue3 Text-Clamp</h1>

***Vue3** component which allows you to ellipsis your multiline text*, see more 👉 [homepage](https://sherwinshen.github.io/vue3-text-clamp/#/).

## Features

- Clamps text with max lines and/or max height. No need to specify line height.
- Place elllipsis at the end/middle/start of the clamped text and customize elllipsis string.
- Automatically updates upon layout change.
- The clamped text can be expanded/collapsed.
- Customizable and responsive content before/after clamped text.

## Install and Usage

```shell
$ npm install --save vue3-text-clamp
```

 ↓ Full import

```typescript
import { createApp } from 'vue';
import TextClamp from 'vue3-text-clamp';
import App from './App.vue';

createApp(App).use(TextClamp).mount('#app');
```

↓ Manually import

```vue
<template>
  <text-clamp text='hello world' :max-lines='2' />
</template>

<script lang='ts' setup>
import TextClamp from 'vue3-text-clamp';
</script>
```

## Links

- [Home page](https://sherwinshen.github.io/vue3-text-clamp/#/)
- [Vue2 version](https://vue-clamp.vercel.app/)


## License

MIT License (MIT). Please see [License File](./LICENSE) for more information.
