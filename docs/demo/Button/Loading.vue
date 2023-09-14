<template>
  <div class="container">
    <div>
      <Button loading type="primary">Loading</Button>
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
