import { supabase } from '@/supabase/supabaseConfig'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { removeAuthStorage } from '@/repository/authRepository'
import { useAuthStore } from '@/store/useAuthStore'
import { useToast } from '@/hooks/useToast'

export default function SignOutButton() {
  const navigate = useNavigate()
  const { handleToastError, handleToastSuccess } = useToast()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      removeAuthStorage('all')
      useAuthStore.getState().clearUser()

      handleToastSuccess('로그아웃 되었습니다.')

      navigate('/login')
    } catch (error) {
      console.log(error)
      handleToastError('로그아웃에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  return <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
}
const StyledButton = styled.button`
  color: var(--color-input);
  font-size: var(--fs-l);
`
