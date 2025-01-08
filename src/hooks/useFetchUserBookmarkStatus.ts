import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'

const fetchUserBookmarkStatus = async (
  userId: string,
  playlistId: string
): Promise<boolean> => {
  const res = await axiosInstance.get('/bookmarks', {
    params: {
      user_id: `eq.${userId}`,
      playlist_id: `eq.${playlistId}`
    }
  })

  return res.data.length > 0 // 데이터가 없는 경우 false 반환
}

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
