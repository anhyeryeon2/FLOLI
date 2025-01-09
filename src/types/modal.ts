export interface IModalDefaultProps {
  id: string
  className?: string
  isOpen: boolean
  children: React.ReactNode
  pageTitle?: string
  closeModal: () => void
}

export interface IModalExtendsProps extends IModalDefaultProps {
  height?: string
  isBg?: boolean
}

export interface ConfirmModalProps {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}
