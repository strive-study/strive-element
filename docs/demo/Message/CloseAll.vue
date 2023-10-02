<template>
  <div class="basic block">
    <Button @click="open"> 创建三条消息 </Button>
    <Button @click="close"> 全部关闭 </Button>
  </div>
</template>

<script setup>
import { createMessage, closeAll } from '@/components/Message/method'
import Button from '@/components/Button/Button.vue'
const open = () => {
  createMessage({ message: 'hello world1', duration: 0 })
  createMessage({ message: 'hello world2', duration: 0 })
  createMessage({ message: 'hello world3', duration: 0 })
}

const close = () => {
  closeAll()
}
</script>
