import * as S from './SignUp.styles'
import { useState } from 'react'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'

export default function StepNickname() {
  const [error, setError] = useState('')

  const [nickname, setNickname] = useState('')
  const { email, password } = useSignupStore()

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value) // 로컬 상태 업데이트
  }
  console.log('@Zustand 상태 확인:', { email, password })

  const handleSubmit = async () => {
    if (nickname.trim() === '') {
      setError('닉네임을 입력해주세요.')
      return
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
