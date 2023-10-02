export interface AlertProps {
  content?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  effect?: 'light' | 'dark'
  closable: boolean
}

export interface AlertEmits {
  (e: 'close'): void
}

export interface AlertInstance {
  close: () => void
}
