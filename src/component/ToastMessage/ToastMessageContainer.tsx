import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import * as S from './toastMessageContainer.module'

import { ToastMessageItem } from '@/component'
const ToastMessageContainer = () => {
  const { toastMessages } = useToastMessageContext()

  return (
    <S.ToastMessageContainer role="toastMessage">
      {toastMessages.map(toastMessage => (
        <ToastMessageItem
          key={toastMessage.id}
          {...toastMessage}
        />
      ))}
    </S.ToastMessageContainer>
  )
}

export default ToastMessageContainer
