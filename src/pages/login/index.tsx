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
import { AuthResponse } from '@supabase/supabase-js'

export function Login() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()
  const { showToastMessage } = useToastMessageContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) })

  // Kakao 로그인 처리 함수
  const handleKakaoLogin = async () => {
    try {
      const { data: sessionData, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo:
            'https://vpxgcvxodypztnxelmqx.supabase.co/auth/v1/callback'
        }
      })

      if (error) {
        showToastMessage({
          message: '카카오 로그인 실패하였습니다',
          type: 'error'
        })
        console.error('Kakao Login error:', error)
        return
      }
      const { data: session } = await supabase.auth.getSession()
      if (session?.session?.user) {
        setUser({
          id: session.session.user.id,
          email: session.session.user.email || '',
          nickname: session.session.user.user_metadata?.name || '',
          profile_img: session.session.user.user_metadata?.avatar_url || ''
        })
        console.log('Zustand User State (Kakao):', session.session.user)

        showToastMessage({
          message: '카카오 로그인 성공하였습니다',
          type: 'success'
        })
        navigate('/')
      }
    } catch (error) {
      showToastMessage({
        message: '카카오 로그인 중 오류가 발생했습니다',
        type: 'error'
      })
      console.error('Kakao Login error:', error)
    }
  }
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
          profile_img: sessionData.user.user_metadata?.profile_img
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
            placeholder=""
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
          onClick={handleKakaoLogin}
          disabled={isSubmitting}
          bordertype={'기본'}>
          구글로 로그인
        </Button>
      </S.Form>

      <S.SignupText>
        계정이 없으신가요?{' '}
        <S.SignupLink onClick={() => navigate('/signup/email')}>
          회원가입하기
        </S.SignupLink>
      </S.SignupText>
    </S.Container>
  )
}
