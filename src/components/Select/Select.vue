<template>
  <div
    class="st-select"
    :class="{
      'is-disabled': disabled
    }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="controlDropdown(false)"
    >
      <Input
        v-model="states.inputValue"
        :placeholder="filteredPlaceholder"
        :disabled="disabled"
        :readonly="!filterable || !isDropdownShow"
        @input="onFilter"
        ref="inputRef"
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="circle-xmark"
            class="st-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <template #content>
        <ul class="st-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="st-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode
                :v-node="renderLabel ? renderLabel(item) : item.label"
              />
            </li>
          </template>
        </ul> </template
    ></Tooltip>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref, reactive, computed, watch } from 'vue'
import { isFunction } from 'lodash-es'
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectStates
} from './types'
import type { TooltipInstance } from '../Tooltip/types'
import type { InputInstance } from '../Input/types'
import Tooltip from '../Tooltip/Tooltip.vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import RenderVNode from '../Common/RenderVnode'

const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value)
  return option ? option : null
}
defineOptions({
  name: 'StSelect'
})
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const isDropdownShow = ref(false)
const inputRef = ref() as Ref<InputInstance>
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false
})
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
const filteredOptions = ref(props.options)
watch(
  () => props.options,
  newOptions => {
    filteredOptions.value = newOptions
  }
)
// 可过滤
const generateFilterOptions = (searchValue: string) => {
  if (!props.filterable) return
  // 自定义过滤逻辑
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else {
    filteredOptions.value = props.options.filter(option =>
      option.label.includes(searchValue)
    )
  }
}

const onFilter = () => {
  generateFilterOptions(states.inputValue)
}

const showClearIcon = computed(() => {
  return (
    props.clearable &&
    states.mouseHover &&
    states.inputValue.trim() &&
    states.selectedOption
  )
})
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder
})
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter模式 && 已经选择过某个值, 再次点击清空值
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if (props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    // blur 值回灌
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : ''
    }
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}

const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}

const NOOP = () => {}
</script>

<style></style>
