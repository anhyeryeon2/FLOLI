import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'

const fetchPlaylistComments = async (playlistId: string) => {
  const res = await axiosInstance.get('/comments', {
    params: {
      playlist_id: `eq.${playlistId}`
    }
  })

  if (!res.data) {
    // 댓글이 없는 경우
    return null
  }

  return res.data
}

/**
 * @param {string} userId - 유저 ID
 * @param {string} playlistId - 플레이리스트 ID
 * @returns {object} data, error, isPending
 * @example const { data, error, isPending } = useFetchPlaylistComments(playlistId);
 */
const useFetchPlaylistComments = (playlistId: string) => {
  return useQuery({
    queryKey: ['playlistComments', playlistId],
    queryFn: () => fetchPlaylistComments(playlistId),
    enabled: !!playlistId
  })
}

export default useFetchPlaylistComments
