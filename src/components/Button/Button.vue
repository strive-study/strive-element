<template>
  <button
    class="st-button"
    :class="{
      [`st-button--${type}`]: type,
      [`st-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from './types'
defineProps<ButtonProps>()
</script>

<style scoped></style>
