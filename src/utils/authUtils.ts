import { supabase } from '../../supabaseConfig'

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')

  if (!refreshToken) {
    console.error('리프레시 토큰이 없습니다. 다시 로그인하세요.')
    return null
  }

  const { data: sessionData, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken
  })

  if (error) {
    console.error('토큰 갱신 실패:', error)
    return null
  }

  if (sessionData.session) {
    const { access_token, refresh_token } = sessionData.session
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('refreshToken', refresh_token)
    console.log('토큰 갱신 성공')
    return access_token
  }

  return null
}
