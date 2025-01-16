import { useNavigate } from 'react-router-dom'
import * as S from './ErrorFallback.styles'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({
  error,
  resetErrorBoundary
}: ErrorFallbackProps) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    resetErrorBoundary()
    navigate('/')
  }
  return (
    <S.ErrorContainer role="alert">
      <S.ErrorTitle>문제가 발생했습니다</S.ErrorTitle>
      <S.ErrorMessage>{error.message}</S.ErrorMessage>
      <S.ResetButton onClick={handleGoHome}>홈으로 이동</S.ResetButton>
    </S.ErrorContainer>
  )
}
