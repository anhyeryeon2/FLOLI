import * as S from './SignUp.styles'
import { useNavigate } from 'react-router-dom'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'
import { PasswordForm, passwordSchema } from '@/schema/signupSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useEffect } from 'react'

export default function StepPassword() {
  const navigate = useNavigate()
  const { email, setPassword } = useSignupStore()
  const { showToastMessage } = useToastMessageContext()

  useEffect(() => {
    if (!email) {
      showToastMessage({
        message: `이메일 정보가 없습니다. `,
        type: 'error'
      })
      navigate('/signup/email')
    }
  }, [email, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange'
  })

  const handleNext = (data: PasswordForm) => {
    setPassword(data.password)
    navigate('/signup/nickname')
  }
  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <S.Container>
        <S.TopSection>
          <S.Logo src={MainLogo} />
          <S.Title>비밀번호를 입력해주세요 </S.Title>
          <S.InputWrapper>
            <Input
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
            )}
          </S.InputWrapper>
          <S.Title>비밀번호를 다시 입력해주세요</S.Title>
          <S.InputWrapper>
            <Input
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>
            )}
          </S.InputWrapper>
        </S.TopSection>

        <S.BottomSection>
          <Button
            width="100%"
            bordertype={'기본'}
            type="submit"
            disabled={!isValid}>
            다음
          </Button>
        </S.BottomSection>
      </S.Container>
    </form>
  )
}
