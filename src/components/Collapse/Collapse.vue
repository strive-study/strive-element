<template>
  <div class="st-collapse"><slot></slot></div>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from 'vue'
import { collapseContextKey, type NameType, type CollapseProp, type CollapseEmits } from './types'
defineOptions({
  name: 'StCollapse'
})
const props = defineProps<CollapseProp>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('手风琴特效只能激活一个元素')
}
const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
    // if (activeNames.value[0] === item) {
    //   activeNames.value.pop()
    //   activeNames.value.push('')
    // } else {
    //   activeNames.value.pop()
    //   activeNames.value.push(item)
    // }
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }

  emits('update:modelVale', _activeNames)
  emits('change', _activeNames)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style></style>
