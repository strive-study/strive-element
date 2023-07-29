<template>
  <i class="st-icon">
    <font-awesome-icon v-bind="$props" />
  </i>
</template>

<script lang="ts" setup>
import {} from 'vue'
import { type FontAwesomeIconProps } from './types'
defineOptions({
  name: 'StIcon',
  inheritAttrs: false
})
defineProps<FontAwesomeIconProps>()
</script>

<style></style>
