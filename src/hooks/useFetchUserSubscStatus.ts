import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'

const fetchUserSubscStatus = async (
  currentUserId: string,
  subscribedUserId: string
): Promise<boolean> => {
  const res = await axiosInstance.get('/subscription', {
    params: {
      user_id: `eq.${currentUserId}`,
      subscribed_user_id: `eq.${subscribedUserId}`
    }
  })

  return res.data.length > 0 // 데이터가 없는 경우 false 반환
}

/**
 * @param {string} currentUserId - 현재 로그인한 유저 ID
 * @param {string} subscribedUserId - 현재 로그인한 유저가 구독한 유저 ID
 * @returns {object} data, error, isLoading
 * @example const { data, error, isLoading } = useFetchUserLike(userId, playlistId);
 */
const useFetchUserSubscStatus = (
  currentUserId: string,
  subscribedUserId: string
) => {
  return useQuery({
    queryKey: ['userLikeStatus', currentUserId, subscribedUserId],
    queryFn: () => fetchUserSubscStatus(currentUserId, subscribedUserId),
    enabled: !!currentUserId && !!subscribedUserId
  })
}

export default useFetchUserSubscStatus
