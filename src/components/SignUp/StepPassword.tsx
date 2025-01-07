import * as S from './SignUp.styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'

export default function StepPassword() {
  const [error] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const navigate = useNavigate()
  const { password, setPassword } = useSignupStore()

  const handleNext = () => {
    navigate('/signup/nickname')
  }

  return (
    <S.Container>
      <S.TopSection>
        <S.Logo src={MainLogo} />
        <S.Title>비밀번호를 입력해주세요 </S.Title>
        <S.InputWrapper>
          <Input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.InputWrapper>
        <S.Title>비밀번호를 다시 입력해주세요</S.Title>
        <S.InputWrapper>
          <Input
            type="text"
            value={confirmPassword}
            onChange={e => setconfirmPassword(e.target.value)}
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.InputWrapper>
      </S.TopSection>

      <S.BottomSection>
        <Button
          width="100%"
          bordertype={'기본'}
          type="button"
          onClick={handleNext}>
          다음
        </Button>
      </S.BottomSection>
    </S.Container>
  )
}
