import { useToastMessageContext } from '@/providers/ToastMessageProvider'

/*
import { useToast } from '@/hooks/useToast';

const { handleToastError, handleToastSuccess } = useToast()

handleToastSuccess("성공메세지")
handleToastError("실패메세지")
*/

export const useToast = () => {
  const { showToastMessage } = useToastMessageContext()

  const handleToastError = (message: string) => {
    showToastMessage({
      message,
      type: 'error'
    })
  }

  const handleToastSuccess = (message: string) => {
    showToastMessage({
      message,
      type: 'success'
    })
  }

  return {
    handleToastError,
    handleToastSuccess
  }
}
