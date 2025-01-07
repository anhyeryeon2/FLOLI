import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'

const fetchUserData = async (userId: string) => {
  const res = await axiosInstance.get('/userinfo', {
    params: {
      id: `eq.${userId}`
    }
  })
  return res.data[0]
}

const useFetchUserData = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserData(userId),
    enabled: !!userId
  })
}

export default useFetchUserData
