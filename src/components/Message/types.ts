import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
  onDestroy: () => void
  offset?: number
  id: string
  zIndex: number
  transitionName?: string
}
export type CreateMessageProps = Omit<
  MessageProps,
  'onDestroy' | 'id' | 'zIndex'
>
export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  destroy: () => void
}
