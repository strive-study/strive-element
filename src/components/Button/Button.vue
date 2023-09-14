<template>
  <button
    class="st-button"
    :class="{
      [`st-button--${type}`]: type,
      [`st-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    ref="_ref"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span :style="textStyle" ref="textRef">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

defineOptions({
  name: 'StButton'
})

const _ref = ref<HTMLButtonElement>()
const textRef = ref<HTMLElement>()
const textStyle = computed(() => {
  if (!textRef.value?.textContent) {
    return {
      marginLeft: '0'
    }
  }
  return {}
})
defineExpose({
  ref: _ref
})
</script>

<style scoped></style>
