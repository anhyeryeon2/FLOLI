import * as S from './Button.styles'
import { TButtonProps } from '@/types/button'

// 해당 속성들 필요시 커스텀해서 사용하시면되고,
// border-radius의 경우 구독버튼과 대응하기위해
// bordertype='구독' 또는 bordertype='기본' 으로 지정해서 쓰시면됩니다

export function Button({
  className = '',
  color,
  padding,
  onClick,
  children,
  fontSize,
  width,
  type = 'button',
  bordertype,
  disabled = false
}: TButtonProps) {
  return (
    <S.StyledButton
      className={className}
      $color={color}
      $padding={padding}
      onClick={onClick}
      $fontSize={fontSize}
      width={width}
      type={type}
      bordertype={bordertype}
      disabled={disabled}>
      {children}
    </S.StyledButton>
  )
}
