import fetchUserBookmarkStatus from '@/apis/bookmark/fetchUserBookmarkStatus'
import { useQuery } from '@tanstack/react-query'

/**
 * @param {string} userId - 유저 ID
 * @param {string} playlistId - 플레이리스트 ID
 * @returns {object} data, error, isPending
 * @example const { data, error, isPending } = useFetchUserBookmarkStatus(userId, playlistId);
 */
const useFetchUserBookmarkStatus = (userId: string, playlistId: string) => {
  return useQuery({
    queryKey: ['userBookmarkStatus', userId, playlistId],
    queryFn: () => fetchUserBookmarkStatus(userId, playlistId),
    enabled: !!userId && !!playlistId
  })
}

export default useFetchUserBookmarkStatus
