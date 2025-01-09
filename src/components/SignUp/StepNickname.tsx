import * as S from './SignUp.styles'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../Button/Button'
import { useSignupStore } from '@/store/signupStore'
import { supabase } from '@/supabase/supabaseConfig'
import { useNavigate } from 'react-router-dom'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'

export default function StepNickname() {
  const navigate = useNavigate()
  const { email, password } = useSignupStore()
  const [nickname, setNickname] = useState('')
  const [isValid, setIsValid] = useState(false)
  const { showToastMessage } = useToastMessageContext()
  const { open, ModalComponent } = useModal()

  useEffect(() => {
    if (!email || !password) {
      showToastMessage({
        message: `이메일과 비밀번호 정보가 없습니다. `,
        type: 'error'
      })
      navigate('/signup/email')
    }
  }, [email, password, navigate, showToastMessage])

  useEffect(() => {
    setIsValid(nickname.trim().length > 0)
  }, [nickname])

  const handleSignup = async () => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname
          }
        }
      })

      if (error) {
        showToastMessage({
          message: `회원가입 요청에 실패하였습니다 `,
          type: 'error'
        })
        return
      }

      if (signUpData.user) {
        await supabase.auth.signOut()
        showToastMessage({
          message: '회원가입 성공하였습니다 ',
          type: 'success'
        })
        navigate('/login')
      }
    } catch (error) {
      showToastMessage({
        message: `오류가 발생했습니다. `,
        type: 'error'
      })
    }
  }
  const showModal = () => {
    open({
      title: '회원가입 하시겠습니까?',
      description: `"${nickname}"으로 이용할 수 있습니다.`,
      confirmText: '가입',
      cancelText: '취소',
      onConfirm: () => handleSignup()
    })
  }
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        showModal()
      }}>
      <S.Container>
        <S.TopSection>
          <S.Logo src={MainLogo} />
          <S.Title>닉네임을 입력해주세요</S.Title>
          <S.InputWrapper>
            <Input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </S.InputWrapper>
        </S.TopSection>

        <S.BottomSection>
          <Button
            width="100%"
            bordertype={'기본'}
            type="submit"
            disabled={!isValid}>
            회원가입
          </Button>
          {ModalComponent}
        </S.BottomSection>
      </S.Container>
    </form>
  )
}
