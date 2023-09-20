<template>
  <Select
    v-model="test"
    :options="options"
    clearable
    placeholder="选择器, 请选择"
    :renderLabel="customRender"
  />
</template>

<script setup>
import { ref, h } from 'vue'
import Select from '@/components/Select/Select.vue'
const test = ref(1)
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项2', value: 2, disabled: true }
]
const customRender = option => {
  return h('div', { className: 'xyz' }, [
    h('b', option.label),
    h('span', option.value)
  ])
}
</script>

<style></style>
