<template>
  <div class="st-tooltip" v-on="events">
    <div class="st-tooltip__trigger" ref="triggerNode">
      <slot />
    </div>
    <div v-if="isOpen" class="st-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import type { TooltipProps, TooltipEmits } from './types'
import type { Instance } from '@popperjs/core'
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover'
})
let events: Record<string, any> = reactive({})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}
const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    events['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
attachEvents()
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {}
      attachEvents()
    }
  }
)
watch(
  isOpen,
  newVal => {
    if (newVal) {
      if (popperNode.value && triggerNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement
        })
      }
    } else {
      popperInstance?.destroy()
    }
  },
  {
    flush: 'post'
  }
)
</script>

<style></style>
