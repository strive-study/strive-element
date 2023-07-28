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
    :autofocus="autofocus"
    :type="nativeType"
    ref="_ref"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from './types'
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

defineOptions({
  name: 'StButton'
})

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<style scoped>
.st-button {
  --main-bg-color: yellow;
  background-color: var(--main-bg-color);
}
</style>
