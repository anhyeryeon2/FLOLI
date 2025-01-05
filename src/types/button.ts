export type TButtonProps = {
  className?: string
  color?: string
  padding?: string
  onClick?: () => void
  children?: React.ReactNode
  disabled?: boolean
  fontSize?: string
  width?: string
  type?: string
  bordertype: '구독' | '기본'
}
