import { supabase } from '@/supabase/supabaseConfig'
import { useNavigate } from 'react-router-dom'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import styled from 'styled-components'
import { removeAuthStorage } from '@/repository/authRepository'

export default function SignOutButton() {
  const navigate = useNavigate()
  const { showToastMessage } = useToastMessageContext()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      removeAuthStorage('all')

      showToastMessage({
        message: '로그아웃 되었습니다.',
        type: 'success'
      })

      navigate('/login')
    } catch (error) {
      console.log(error)
      showToastMessage({
        message: '로그아웃에 실패하였습니다. 다시 시도해주세요.',
        type: 'error'
      })
    }
  }

  return <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
}
const StyledButton = styled.button`
  color: var(--color-input);
  font-size: var(--fs-m);
`
