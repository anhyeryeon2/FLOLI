import * as S from './SignUp.styles'
import { useNavigate } from 'react-router-dom'
import MainLogo from '@/assets/img/logo/floli.svg'
import { Input, Loading } from '@/component'
import { Button } from '../Button/Button'
import { useSignupStore } from '@/store/signupStore'
import { EmailForm, emailSchema } from '@/schema/signupSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEmailCheck } from '@/hooks/useEmailCheck'

export default function StepEmail() {
  const navigate = useNavigate()
  const { setEmail } = useSignupStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    watch
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange'
  })
  const email = watch('email')
  const { isLoading, isError, checkEmail } = useEmailCheck(email)

  const handleNext = async (data: EmailForm) => {
    try {
      if (!email) return
      const isEmailExists = await checkEmail()
      if (isEmailExists) {
        setError('email', { message: '이미 사용 중인 이메일입니다.' })
        return
      }

      clearErrors('email')
      setEmail(data.email)
      navigate('/signup/password')
    } catch (error) {
      setError('email', { message: '중복 확인 중 오류가 발생했습니다.' })
    }
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
            {isLoading && <Loading />}
            {isError && <S.ErrorMessage>오류가 발생했습니다.</S.ErrorMessage>}
          </S.InputWrapper>
        </S.TopSection>

        <S.BottomSection>
          <Button
            width="100%"
            bordertype={'기본'}
            type="submit"
            disabled={!isValid || isLoading}>
            다음
          </Button>
        </S.BottomSection>
      </S.Container>
    </form>
  )
}
