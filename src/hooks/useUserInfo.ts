import { userInfoGet } from '@/apis/userInfoApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'

export function useUserInfo() {
  const { user } = useAuthStore()

  const { data: userinfo } = useQuery({
    queryKey: ['userInfo', user?.id],
    queryFn: () => userInfoGet(user?.id),
    enabled: !!user?.id
  })
  return { userinfo }
}

// 지금 로그인한 유저의 id에 대한 정보가 담겨있는 훅입니다.
// 유사배열객체로 담겨있어 필요시 userinfo[0].@ 로 사용해주세요!
