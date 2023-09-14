<template>
  <div class="container">
    <div>
      <Button disabled>Default</Button>
      <Button disabled type="primary">Primary</Button>
      <Button disabled type="success">Success</Button>
      <Button disabled type="info">Info</Button>
      <Button disabled type="warning">Warning</Button>
      <Button disabled type="danger">Danger</Button>
    </div>
    <div>
      <Button disabled plain>Plain</Button>
      <Button disabled plain type="primary">Primary</Button>
      <Button disabled plain type="success">Success</Button>
      <Button disabled plain type="info">Info</Button>
      <Button disabled plain type="warning">Warning</Button>
      <Button disabled plain type="danger">Danger</Button>
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
