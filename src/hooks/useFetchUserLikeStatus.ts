import fetchUserLikeStatus from '@/apis/like/fetchUserLikeStatus'
import { useQuery } from '@tanstack/react-query'

/**
 * @param {string} userId - 유저 ID
 * @param {string} playlistId - 플레이리스트 ID
 * @returns {object} data, error, isPending
 * @example const { data, error, isPending } = useFetchUserLikeStatus(userId, playlistId);
 */
const useFetchUserLikeStatus = (userId: string, playlistId: string) => {
  return useQuery({
    queryKey: ['userLikeStatus', userId, playlistId],
    queryFn: () => fetchUserLikeStatus(userId, playlistId),
    enabled: !!userId && !!playlistId
  })
}

export default useFetchUserLikeStatus
