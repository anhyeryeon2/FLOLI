import * as S from './SignUp.styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MainLogo from '@/assets/img/logo/floli.svg'
import Input from '../Input/Input'
import { Button } from '../button/Button'
import { useSignupStore } from '@/store/signupStore'

export default function StepEmail() {
  const [error] = useState('')
  const navigate = useNavigate()
  const { email, setEmail } = useSignupStore()
  const handleNext = () => {
    navigate('/signup/password')
  }

  return (
    <S.Container>
      <S.TopSection>
        <S.Logo src={MainLogo} />
        <S.Title>이메일을 입력해주세요</S.Title>
        <S.InputWrapper>
          <Input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          onClick={handleNext}>
          다음
        </Button>
      </S.BottomSection>
    </S.Container>
  )
}
