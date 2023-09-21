import type { VNode } from 'vue'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

// 自定义渲染option
export type RenderLabelFunc = (option: SelectOption) => VNode
// 自定义过滤
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomFilterRemoteFunc = (value: string) => SelectOption[]
export interface SelectProps {
  modelValue: string
  options?: SelectOption[]
  placeholder: string
  disabled?: boolean
  clearable?: boolean
  renderLabel?: RenderLabelFunc
  filterable?: boolean
  filterMethod?: CustomFilterFunc
  remote?: boolean
  remoteMethod?: CustomFilterRemoteFunc
}

export interface SelectStates {
  inputValue: string
  selectedOption: null | SelectOption
  mouseHover: boolean
  loading: boolean
}

export interface SelectEmits {
  (e: 'change', value: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
