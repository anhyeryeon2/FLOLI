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

export default fetchUserBookmarkStatus
