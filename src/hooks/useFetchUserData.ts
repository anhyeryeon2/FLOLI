import fetchUserData from '@/apis/user/fetchUserData'
import { useQuery } from '@tanstack/react-query'

const useFetchUserData = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserData(userId),
    enabled: !!userId
  })
}

export default useFetchUserData
