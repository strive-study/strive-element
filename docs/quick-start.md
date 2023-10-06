# 快速开始

## 安装

```bash
npm i strive-element -S
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import StElement from 'strive-element'
// 引入样式
import 'strive-element/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(StElement).mount('#app')
```

```vue
<template>
  <st-button>我是 StButton</st-button>
</template>
```

**单个导入**

StElement 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <Button>我是 StButton</Button>
</template>
<script>
import { Button } from 'strive-element'
export default {
  components: { Button }
}
</script>
```
