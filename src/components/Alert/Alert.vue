<template>
  <Transition name="st-alert-fade">
    <div
      class="st-alert"
      v-if="visible"
      :class="{
        [`st-alert--${type}`]: type,
        [`st-alert--${effect}`]: effect
      }"
    >
      <div class="st-alert__content">
        <span>
          <slot>{{ content }}</slot>
        </span>
      </div>
      <div class="st-alert__close" v-if="closable">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps, AlertEmits } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'StAlert'
})
withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true,
  type: 'info'
})

const emits = defineEmits<AlertEmits>()
const visible = ref(true)

const close = () => {
  visible.value = false
  emits('close')
}

defineExpose({
  close: () => close()
})
</script>
