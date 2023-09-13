<template>
  <div
    class="st-switch"
    :class="{
      [`st-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue"
  >
    <input
      class="st-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="st-switch__core">
      <div class="st-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="st-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="st-switch__core-action"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { SwitchEmits, SwitchProps } from './types'
defineOptions({
  name: 'StSwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()
const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value === props.activeValue)
const inputRef = ref<HTMLInputElement>()
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}
onMounted(() => {
  inputRef.value!.checked = checked.value
})
watch(checked, val => {
  inputRef.value!.checked = val
})
watch(
  () => props.modelValue,
  val => {
    innerValue.value = val
  }
)
</script>

<style></style>
