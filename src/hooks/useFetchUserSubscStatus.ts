import fetchUserSubscStatus from '@/apis/subscribe/fetchUserSubscStatus'
import { useQuery } from '@tanstack/react-query'

/**
 * @param {string} currentUserId - 현재 로그인한 유저 ID
 * @param {string} subscribedUserId - 현재 로그인한 유저가 구독한 유저 ID
 * @returns {object} data, error, isPending
 * @example const { data, error, isPending } = useFetchUserSubscStatus(currentUserId, subscribedUserId);
 */
const useFetchUserSubscStatus = (
  currentUserId: string,
  subscribedUserId: string
) => {
  return useQuery({
    queryKey: ['userSubscStatus', currentUserId, subscribedUserId],
    queryFn: () => fetchUserSubscStatus(currentUserId, subscribedUserId),
    enabled: !!currentUserId && !!subscribedUserId
  })
}

export default useFetchUserSubscStatus
