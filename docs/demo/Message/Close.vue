<template>
  <div class="basic block">
    <Button @click="open"> 可关闭消息 </Button>
  </div>
</template>

<script setup>
import { createMessage } from '@/components/Message/method'
import Button from '@/components/Button/Button.vue'
const open = () => {
  createMessage({ message: 'hello world', showClose: true, duration: 0 })
}
</script>
