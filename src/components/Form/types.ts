import type { InjectionKey } from 'vue'
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator'

export interface FormItemProps {
  label?: string
  prop?: string
}

export type FormRules = Record<string, RuleItem[]>

export interface FormProps {
  model: FormRules
  rules: FormRules
}

export interface FormContext extends FormProps {}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
