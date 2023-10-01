<template>
  <div class="st-form-item">
    <label for="" class="st-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="st-form-item__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { isNil } from 'lodash-es'
import { type FormItemProps, formContextKey } from './types'
defineOptions({
  name: 'StFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)
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
</script>

<style></style>
