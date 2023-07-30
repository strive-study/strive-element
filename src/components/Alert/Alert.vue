<template>
  <div
    class="st-alert"
    :class="{
      [`st-alert--${type}`]: type,
      'is-dark': effect === 'dark'
    }"
    ref="deleteRef"
  >
    <Icon :icon="['fas', 'xmark']" class="delete-icon" @click="close" />
    <div class="content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { AlertProps, AlertEvent } from './types'

defineProps<AlertProps>()
const emits = defineEmits<AlertEvent>()
const deleteRef = ref<HTMLDivElement | null>()
const close = () => {
  if (deleteRef.value) {
    deleteRef.value.style.display = 'none'
    emits('close')
  }
}
defineExpose({
  close
})
</script>

<style></style>
