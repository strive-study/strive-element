<template>
  <Transition
    :name="transitionName"
    @enter="updateHeight"
    @after-leave="destroyComponent"
  >
    <div
      class="st-message"
      v-show="visible"
      :class="{
        [`st-message--${type}`]: type,
        'is-close': showClose
      }"
      :style="cssStyle"
      role="alert"
      ref="messageRef"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="st-message__content">
        <slot>
          <RenderNode :v-node="message" v-if="message" />
        </slot>
      </div>
      <div class="st-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div></div
  ></Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { MessageProps } from './types'
import RenderNode from '../Common/RenderVnode'
import { getLastBottomOffset } from './method'
import useEventListener from '../../hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
  transitionName: 'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0) // div 偏移高度
const lastOffset = computed(() => getLastBottomOffset(props.id)) // 上一个实例底部举例视口顶部的举例
const topOffset = computed(() => props.offset + lastOffset.value) // 当前元素的top
const bottomOffset = computed(() => height.value + topOffset.value) // 为下一个元素预留的offset
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))
let timer: any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
onMounted(async () => {
  visible.value = true
  startTimer()
})
function keydownHandler(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydownHandler)

function destroyComponent() {
  props.onDestroy()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>

<style></style>
