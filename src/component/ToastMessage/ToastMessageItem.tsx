import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { type ToastMessageProps } from '@/types/ToastMessage'
import * as S from './toastMessage.module'

export const ToastMessageItem = ({ id, message, type }: ToastMessageProps) => {
  const { removeToastMessage } = useToastMessageContext()
  return (
    <S.ToastItemContainer
      role="toastMessage"
      type={type}>
      <span>{message}</span>
      <button onClick={() => removeToastMessage(id)} />
    </S.ToastItemContainer>
  )
}
