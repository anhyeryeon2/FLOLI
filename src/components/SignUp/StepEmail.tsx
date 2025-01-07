import * as S from './SignUp.styles'
import { useNavigate } from 'react-router-dom'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'
import { EmailForm, emailSchema } from '@/schema/signupSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function StepEmail() {
  const navigate = useNavigate()
  const { setEmail } = useSignupStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange'
  })
  const handleNext = (data: EmailForm) => {
    setEmail(data.email)
    navigate('/signup/password')
  }

  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <S.Container>
        <S.TopSection>
          <S.Logo src={MainLogo} />
          <S.Title>이메일을 입력해주세요</S.Title>
          <S.InputWrapper>
            <Input
              {...register('email')}
              placeholder="example@test.com"
            />
            {errors.email && (
              <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
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
