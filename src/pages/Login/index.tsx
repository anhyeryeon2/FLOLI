import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormInputs } from '@/schema/loginSchema'
import { useAuthStore } from '@/store/useAuthStore'
import Input from '@/component/Input/Input'
import { Button } from '@/component/Button/Button'
import Loading from '@/component/LoadingSpinner/Loading'
import { supabase } from '@/supabase/supabaseConfig'
import * as S from './login.styles'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import MainLogo from '@/assets/img/logo/floli.svg'
import GoogleLogo from '@/assets/img/login/google.svg'
import KakaoLogo from '@/assets/img/login/kakao.svg'
import { UserData } from '@/types/user'

type SocialProvider = 'kakao' | 'google'
const REDIRECT_URL = 'http://localhost:5173/login'

export function Login() {
  const { setUser, user } = useAuthStore()
  const navigate = useNavigate()
  const { showToastMessage } = useToastMessageContext()
  const [socialLoading, setSocialLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) })

  const handleAuthSuccess = (userData: UserData) => {
    setUser(userData) //zustand 업데이트
    showToastMessage({
      message: '로그인 성공하였습니다',
      type: 'success'
    })
    navigate('/')
  }

  const handleToastError = (message: string) => {
    showToastMessage({
      message,
      type: 'error'
    })
  }

  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const checkSession = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData?.session?.user

      if (user && sessionData.session) {
        const userData: UserData = {
          id: user.id,
          email: user.email || '',
          nickname:
            user.user_metadata?.name ||
            user.user_metadata?.user_name ||
            user.user_metadata?.nickname,
          profile_img: user.user_metadata?.avatar_url || '',
          introduction: user.user_metadata?.introduction || '',
          subsc_count: user.user_metadata?.subsc_count || 0
        }
        saveTokens(
          sessionData.session.access_token,
          sessionData.session.refresh_token
        )
        handleAuthSuccess(userData)
      }
    } catch (error) {
      handleToastError('세션 확인 중 문제가 발생했습니다. 다시 시도해주세요.')
      console.log(error)
      localStorage.clear()
      navigate('/login')
    }
  }

  const handleSocialLogin = async (provider: SocialProvider) => {
    setSocialLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: REDIRECT_URL }
      })
      checkSession()
      if (error) {
        const providerName = provider === 'kakao' ? '카카오' : '구글'
        handleToastError(`${providerName} 로그인 실패하였습니다`)
        console.error(`${provider} Login error:`, error)
      } else {
        await checkSession()
      }
    } catch (error) {
      const providerName = provider === 'kakao' ? '카카오' : '구글'
      handleToastError(`${providerName} 로그인 중 오류가 발생했습니다`)
      console.error(`${provider} Login error:`, error)
    } finally {
      setSocialLoading(false)
    }
  }
  useEffect(() => {
    if (user) {
      console.log('🟢  Zustand 상태:', user)
    }
  }, [user]) // 개발용

  const fetchUserInfo = async (userId: string): Promise<UserData> => {
    const { data: userInfo, error } = await supabase
      .from('userinfo')
      .select('id, email, nickname, profile_img, introduction, subsc_count')
      .eq('id', userId)
      .single()

    if (error) throw new Error('유저 정보를 가져오는 데 실패했습니다.')
    return userInfo
  }

  const handleEmailLogin: SubmitHandler<LoginFormInputs> = async data => {
    const { email, password } = data
    try {
      const { data: sessionData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (error) throw new Error('로그인 실패하였습니다')
      if (sessionData.session) {
        saveTokens(
          sessionData.session.access_token,
          sessionData.session.refresh_token
        )
        const userInfo = await fetchUserInfo(sessionData.user.id)
        handleAuthSuccess(userInfo)
      }
    } catch (error) {
      handleToastError(
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      )
    }
  }
  useEffect(() => {
    if (location.pathname === '/login') {
      checkSession()
    }
  }, [location.pathname])

  return (
    <S.Container>
      <S.Logo src={MainLogo} />

      <S.Form onSubmit={handleSubmit(handleEmailLogin)}>
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
        {socialLoading ? (
          <Loading />
        ) : (
          <Button
            width="100%"
            fontSize="1.8rem"
            disabled={isSubmitting || socialLoading}
            bordertype={'기본'}
            type="submit">
            로그인
          </Button>
        )}

        <S.Divider />
        <S.ButtonContainer>
          <Button
            width="100%"
            color="var(--color-black)"
            backgroundColor="var(--color-main2)"
            onClick={() => handleSocialLogin('google')}
            disabled={isSubmitting || socialLoading}
            bordertype={'기본'}>
            <S.LoginLogo src={GoogleLogo} />
            구글 로그인
          </Button>

          <Button
            width="100%"
            color="var(--color-black)"
            backgroundColor="var(--color-main2)"
            onClick={() => handleSocialLogin('kakao')}
            disabled={isSubmitting}
            bordertype={'기본'}>
            <S.LoginLogo src={KakaoLogo} />
            카카오 로그인
          </Button>
        </S.ButtonContainer>
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
