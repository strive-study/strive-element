export interface SwitchProps {
  modelValue: SwitchValueType
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  name?: string
  id?: string
  size?: 'small' | 'large'
  activeValue?: SwitchValueType
  inactiveValue?: SwitchValueType
}

export type SwitchValueType = boolean | string | number

export interface SwitchEmits {
  (e: 'change', value: SwitchValueType): void
  (e: 'update:modelValue', value: SwitchValueType): void
}
