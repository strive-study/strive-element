<template>
  <div class="st-collapse"><slot></slot></div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { collapseContextKey, type NameType } from './types'
defineOptions({
  name: 'StCollapse'
})
const activeNames = ref<NameType[]>([])
const handleItemClick = (item: NameType) => {
  const index = activeNames.value.indexOf(item)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(item)
  }
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style></style>
