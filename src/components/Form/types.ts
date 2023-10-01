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
export interface FormItemRule extends RuleItem {
  trigger?: string
}
export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: FormRules
  rules: FormRules
}

export interface FormContext extends FormProps {}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export interface FormItemContext {
  validate: (trigger?: string) => any
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
