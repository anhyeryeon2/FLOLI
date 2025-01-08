import * as S from './SignUp.styles'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'
import { supabase } from '../../../supabaseConfig'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { NicknameForm, nicknameSchema } from '@/schema/signupSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useEffect } from 'react'

export default function StepNickname() {
  const { email, password } = useSignupStore()
  const navigate = useNavigate()
  const { showToastMessage } = useToastMessageContext()

  useEffect(() => {
    if (!email || !password) {
      showToastMessage({
        message: `이메일과 비밀번호 정보가 없습니다. `,
        type: 'error'
      })
      navigate('/signup/email')
    }
  }, [email, password, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<NicknameForm>({
    resolver: zodResolver(nicknameSchema)
  })

  const onSubmit = async (data: NicknameForm) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname: data.nickname
          }
        }
      })

      if (error) {
        console.error('Supabase signUp Error:', error)
        showToastMessage({
          message: `회원가입 요청에 실패하였습니다 `,
          type: 'error'
        })
        return
      }

      if (signUpData.user) {
        console.log('회원가입 성공:', signUpData.user)
        showToastMessage({
          message: '회원가입 성공하였습니다 ',
          type: 'success'
        })
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      showToastMessage({
        message: `오류가 발생했습니다. `,
        type: 'error'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Container>
        <S.TopSection>
          <S.Logo src={MainLogo} />
          <S.Title>닉네임을 입력해주세요</S.Title>
          <S.InputWrapper>
            <Input
              type="text"
              {...register('nickname')}
              placeholder="닉네임"
            />
            {errors.nickname && (
              <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>
            )}
          </S.InputWrapper>
        </S.TopSection>

        <S.BottomSection>
          <Button
            width="100%"
            bordertype={'기본'}
            disabled={!isValid || !watch('nickname')}>
            다음
          </Button>
        </S.BottomSection>
      </S.Container>
    </form>
  )
}
