import { useQuery } from '@tanstack/react-query'
import { SubscribeType } from '@/types/subscribe'
import axiosInstance from '../apis/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'

export const getSubscribe = async () => {
  try {
    const currentUserId = useAuthStore.getState().user?.id
    const subscribeData = await axiosInstance.get(
      'rpc/get_user_subscription_info',
      {
        params: {
          input_user_id: currentUserId
        }
      }
    )
    return subscribeData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

const useFetchSubscribeList = () => {
  return useQuery<SubscribeType[]>({
    queryKey: ['subscribeList'],
    queryFn: () => getSubscribe(),
    staleTime: 1000 * 60
  })
}

export default useFetchSubscribeList
