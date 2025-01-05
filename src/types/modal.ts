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
