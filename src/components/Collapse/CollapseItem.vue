<template>
  <div
    class="st-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div class="st-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="st-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { collapseContextKey, type CollapseItemProps } from './types'
const props = defineProps<CollapseItemProps>()
defineOptions({
  name: 'StCollapseItem'
})
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}
</script>

<style>
.st-collapse-item__header {
  font-size: 30px;
}
</style>
