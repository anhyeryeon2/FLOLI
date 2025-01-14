import { useNavigate } from 'react-router-dom'
import MainLogo from '@/assets/img/logo/floli.svg'
import { Button } from '@/component/Button/Button'
import * as S from './EndSignUp.styles'

export default function EndSignUp() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <S.Container>
      <S.Logo
        src={MainLogo}
        alt="Main Logo"
      />

      <S.Message>
        <h1>회원가입이 완료되었습니다!</h1>
        <p>이제 로그인하여 서비스를 이용해 보세요.</p>
      </S.Message>

      <Button
        onClick={handleLoginClick}
        width="20rem"
        bordertype={'구독'}>
        로그인 하러 가기
      </Button>
    </S.Container>
  )
}
