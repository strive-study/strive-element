<template>
  <div
    class="st-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.state === 'loading'
    }"
  >
    <label for="" class="st-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="st-form-item__content">
      <slot />
      <div
        class="st-form-item__error-msg"
        v-if="validateStatus.state === 'error'"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
    <button @click.prevent="validate">Validate</button>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, reactive } from 'vue'
import { isNil } from 'lodash-es'
import {
  type FormItemProps,
  formContextKey,
  FormValidateFailure
} from './types'
import Schema from 'async-validator'
defineOptions({
  name: 'StFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)
const validateStatus = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
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
const validate = () => {
  const modelName = props.prop
  if (modelName) {
    const validator = new Schema({
      [modelName]: itemRules.value
    })
    validateStatus.loading = true
    validator
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
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}
</script>

<style></style>
