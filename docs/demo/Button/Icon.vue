<template>
  <div class="container">
    <div>
      <Button icon="magnifying-glass">搜索</Button>
      <Button icon="pen-to-square" type="primary">编辑</Button>
      <Button icon="check" type="success">提交</Button>
      <Button icon="envelope" type="info">邮箱</Button>
      <Button icon="star" type="warning">标星</Button>
      <Button icon="trash-can" type="danger">删除</Button>
    </div>
  </div>
</template>
<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
