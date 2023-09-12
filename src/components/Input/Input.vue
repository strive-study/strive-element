<template>
  <div
    class="st-input"
    :class="{
      [`st-input--${type}`]: type,
      [`st-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="st-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="st-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="st-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          class="st-input__inner"
          v-model="innerValue"
          @input="handleInput"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
        />
        <!-- prefix suffix -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="st-input__suffix"
        >
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            @click="clear"
            class="st-input__clear"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="st-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="st-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="st-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="st-textarea__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { InputEmits, InputProps } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'StInput'
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
)
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}

const handleChange = () => {
  emits('change', innerValue.value)
}

const handleFocus = (evt: FocusEvent) => {
  isFocus.value = true
  emits('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  isFocus.value = false
  emits('blur', evt)
}

const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}

watch(
  () => props.modelValue,
  val => {
    innerValue.value = val
  }
)
</script>

<style></style>
