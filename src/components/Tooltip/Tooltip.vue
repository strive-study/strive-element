<template>
  <div class="st-tooltip" v-on="events" ref="popperContainerNode">
    <div class="st-tooltip__trigger" ref="triggerNode">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="st-tooltip__popper" ref="popperNode">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import type { Instance } from '@popperjs/core'
import useClickOutSide from '../../hooks/useClickOutside'
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
let events: Record<string, any> = reactive({})
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null
useClickOutSide(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})
onUnmounted(() => {
  popperInstance?.destroy()
})
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
const open = () => {
  setTimeout(() => {
    isOpen.value = true
    emits('visible-change', true)
  }, props.openDelay)
}

const close = () => {
  setTimeout(() => {
    isOpen.value = false
    emits('visible-change', false)
  }, props.closeDelay)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    events['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
watch(
  () => props.manual,
  isManual => {
    if (isManual) {
      events = {}
    } else {
      attachEvents()
    }
  }
)
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
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        )
      } else {
        popperInstance?.destroy()
      }
    }
  },
  {
    flush: 'post'
  }
)
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<style></style>
