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
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          class="st-input__inner"
          v-model="innerValue"
          @input="handleInput"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          @click="keepFocus"
          class="st-input__suffix"
        >
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            @click="clear"
            @mousedown.prevent="NOOP"
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
        inputRef
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
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
import { ref, watch, computed, useAttrs, type Ref, nextTick, inject } from 'vue'
import type { InputEmits, InputProps } from './types'
import Icon from '../Icon/Icon.vue'
import { formItemContextKey } from '../Form/types'
defineOptions({
  name: 'StInput',
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>
const formItemContext = inject(formItemContextKey)
const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
)

const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch(e => console.log(e.errors))
}

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidation('input')
}

const handleChange = () => {
  emits('change', innerValue.value)
  runValidation('change')
}

const handleFocus = (evt: FocusEvent) => {
  isFocus.value = true
  emits('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  isFocus.value = false
  emits('blur', evt)
  runValidation('blur')
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

const NOOP = () => {}

defineExpose({
  ref: inputRef
})
</script>

<style></style>
