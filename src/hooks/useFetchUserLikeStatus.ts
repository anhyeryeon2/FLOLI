import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'

const fetchUserLikeStatus = async (
  userId: string,
  playlistId: string
): Promise<boolean> => {
  const res = await axiosInstance.get('/likes', {
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
 * @returns {object} data, error, isLoading
 * @example const { data, error, isLoading } = useFetchUserLike(userId, playlistId);
 */
const useFetchUserLike = (userId: string, playlistId: string) => {
  return useQuery({
    queryKey: ['userLikeStatus', userId, playlistId],
    queryFn: () => fetchUserLikeStatus(userId, playlistId),
    enabled: !!userId && !!playlistId
  })
}

export default useFetchUserLike
