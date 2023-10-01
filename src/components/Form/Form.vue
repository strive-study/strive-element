<template>
  <form class="st-form">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { formContextKey, type FormProps } from './types'
defineOptions({
  name: 'StForm'
})
const props = defineProps<FormProps>()
provide(formContextKey, props)
</script>

<style></style>
