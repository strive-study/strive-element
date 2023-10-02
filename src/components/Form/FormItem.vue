<template>
  <div
    class="st-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.state === 'loading',
      'is-required': isRequired
    }"
  >
    <label for="" class="st-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="st-form-item__content">
      <slot :validate="validate" />
      <div
        class="st-form-item__error-msg"
        v-if="validateStatus.state === 'error'"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  inject,
  computed,
  reactive,
  provide,
  onMounted,
  onUnmounted
} from 'vue'
import { isNil } from 'lodash-es'
import {
  type FormItemProps,
  type FormValidateFailure,
  type FormItemContext,
  type ValidateStatusProp,
  type FormItemInstance,
  formContextKey,
  formItemContextKey
} from './types'
import Schema from 'async-validator'
defineOptions({
  name: 'StFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)
const validateStatus = reactive<ValidateStatusProp>({
  state: 'init',
  errorMsg: '',
  loading: false
})
let initialValue: any = null

const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})

const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter(rule => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger === trigger
    })
  } else {
    return []
  }
}

const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggerRules = getTriggerRules(trigger)
  if (!triggerRules.length) return true
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggerRules
    })
    validateStatus.loading = true
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg =
          errors && errors.length ? errors[0].message || '' : ''
        console.log(e.errors)
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}

const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})

onUnmounted(() => {
  formContext?.removeField(context)
})

defineExpose<FormItemInstance>({
  validateStatus,
  clearValidate,
  resetField,
  validate
})
</script>

<style></style>
