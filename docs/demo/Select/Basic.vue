<template>
  <Select v-model="test" :options="options" placeholder="选择器, 请选择" />
</template>

<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'
const test = ref(1)
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项2', value: 2, disabled: true }
]
</script>
