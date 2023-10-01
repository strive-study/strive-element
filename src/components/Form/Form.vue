<template>
  <form class="st-form">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { formContextKey } from './types'
import type {
  FormContext,
  FormItemContext,
  FormProps,
  FormValidateFailure,
  FormInstance
} from './types'
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
  name: 'StForm'
})

const props = defineProps<FormProps>()
const fields: FormItemContext[] = []

const addField: FormContext['addField'] = field => {
  fields.push(field)
}

const removeField: FormContext['removeField'] = field => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}

const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (!Object.keys.length) {
    return true
  } else {
    return Promise.reject(validationErrors)
  }
}

provide(formContextKey, {
  ...props,
  addField,
  removeField
})

defineExpose<FormInstance>({
  validate
})
</script>

<style></style>
