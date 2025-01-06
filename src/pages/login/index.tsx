import { supabase } from '../../../supabaseConfig'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/Input/Input'
import { Button } from '@/components/button/Button'
import * as S from './login.styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormInputs } from '@/schema/loginSchema'
import MainLogo from '@/assets/img/logo/floli.svg'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useAuthStore } from '@/store/useAuthStore'
import { DEFAULT_PROFILE_IMAGE } from '@/constants/constant'

export function Login() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()
  const { showToastMessage } = useToastMessageContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) })

  const handleLogin: SubmitHandler<LoginFormInputs> = async data => {
    const { email, password } = data

    const { data: sessionData, error } = await supabase.auth.signInWithPassword(
      {
        email,
        password
      }
    )

    if (error) {
      showToastMessage({
        message: `로그인 실패하였습니다 `,
        type: 'error'
      })
    } else {
      if (sessionData.session) {
        const { access_token, refresh_token } = sessionData.session
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)
      }
      if (sessionData?.user) {
        setUser({
          id: sessionData.user.id,
          email: sessionData.user.email || '',
          nickname: sessionData.user.user_metadata?.nickname,
          profileImage:
            sessionData.user.user_metadata?.profileImage ||
            DEFAULT_PROFILE_IMAGE
        })
        console.log(' Zustand User State:', sessionData.user)
      }

      showToastMessage({
        message: '로그인 성공하였습니다 ',
        type: 'success'
      })
      navigate('/')
    }
  }

  return (
    <S.Container>
      <S.Logo src={MainLogo} />

      <S.Form onSubmit={handleSubmit(handleLogin)}>
        <S.InputWrapper>
          <Input
            {...register('email')}
            placeholder="example@test.com"
          />
          {errors.email && (
            <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
          )}
        </S.InputWrapper>
        <S.InputWrapper>
          <Input
            type="password"
            {...register('password')}
            placeholder="비밀번호"
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
          )}
        </S.InputWrapper>

        <Button
          width="100%"
          fontSize="1.8rem"
          disabled={isSubmitting}
          bordertype={'기본'}
          type="submit">
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>

        <S.Divider />
        <Button
          width="100%"
          fontSize="1.8rem"
          backgroundColor="var(--color-border)"
          onClick={() => alert('구글 로그인')}
          disabled={isSubmitting}
          bordertype={'기본'}>
          구글로 로그인
        </Button>
      </S.Form>

      <S.SignupText>
        계정이 없으신가요?{' '}
        <S.SignupLink onClick={() => navigate('/signup')}>
          회원가입하기
        </S.SignupLink>
      </S.SignupText>
    </S.Container>
  )
}
