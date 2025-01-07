import { useEffect } from 'react'
import { supabase } from '../../supabaseConfig'

export function checkLoginStatus() {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('세션 정보를 가져오는 중 오류 발생:', error.message)
        return
      }

      if (data.session) {
        console.log('✅ 로그인 상태:', data.session.user)
      } else {
        console.log('❌ 로그아웃 상태')
      }
    }

    checkLoginStatus()
  }, [])
}
