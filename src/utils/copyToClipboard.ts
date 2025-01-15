import { ToastMessageContextType } from '@/types/ToastMessage'

interface CopyToClipboardProps {
  url: string
  showToastMessage: ToastMessageContextType['showToastMessage'] // 함수 타입으로 정의
}

const copyToClipboard = ({ url, showToastMessage }: CopyToClipboardProps) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      showToastMessage({
        message: '링크가 클립보드에 복사되었습니다.',
        type: 'info'
      })
    })
    .catch(err => {
      console.error('링크 복사 중 에러 발생:', err)
      showToastMessage({
        message: '링크 복사 중 에러가 발생하였습니다.',
        type: 'error'
      })
    })
}

export default copyToClipboard
