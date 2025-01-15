import * as S from './ErrorFallback.styles'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({
  error,
  resetErrorBoundary
}: ErrorFallbackProps) {
  return (
    <S.ErrorContainer role="alert">
      <S.ErrorTitle>문제가 발생했습니다</S.ErrorTitle>
      <S.ErrorMessage>{error.message}</S.ErrorMessage>
      <S.ResetButton onClick={resetErrorBoundary}>다시 시도하기</S.ResetButton>
    </S.ErrorContainer>
  )
}
