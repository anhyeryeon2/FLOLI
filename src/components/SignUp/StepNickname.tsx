import * as S from './SignUp.styles'
import { useState } from 'react'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'
import { supabase } from '../../../supabaseConfig'
import { useNavigate } from 'react-router-dom'

export default function StepNickname() {
  const [error, setError] = useState('')
  const [nickname, setNickname] = useState('')
  const { email, password } = useSignupStore()
  const navigate = useNavigate()

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }
  console.log('@Zustand 상태 확인:', { email, password })

  const handleSubmit = async () => {
    try {
      if (nickname.trim() === '') {
        setError('닉네임을 입력해주세요.')
        return
      }

      if (!email || !password) {
        setError('이메일/비밀번호가 없습니다. 이전 단계를 다시 확인해주세요.')
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname
          }
        }
      })

      if (error) {
        console.error('Supabase signUp Error:', error)
        setError(error.message)
        return
      }

      if (data.user) {
        console.log('회원가입 성공:', data.user)
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      setError('알 수 없는 오류가 발생했습니다.')
    }
  }

  return (
    <S.Container>
      <S.TopSection>
        <S.Logo src={MainLogo} />
        <S.Title>닉네임을 입력해주세요</S.Title>
        <S.InputWrapper>
          <Input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="example@test.com"
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.InputWrapper>
      </S.TopSection>

      <S.BottomSection>
        <Button
          width="100%"
          bordertype={'기본'}
          type="button"
          onClick={handleSubmit}>
          다음
        </Button>
      </S.BottomSection>
    </S.Container>
  )
}
