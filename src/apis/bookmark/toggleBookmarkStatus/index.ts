import axiosInstance from '@/apis/axiosInstance'
import { IToggleBookmarkParams } from '@/types/toggleBookmark'

const toggleBookmarkStatus = async (
  props: IToggleBookmarkParams
): Promise<boolean> => {
  const res = await axiosInstance.get('/bookmarks', {
    params: {
      user_id: `eq.${props.userId}`,
      playlist_id: `eq.${props.playlistId}`
    }
  })

  if (res.data.length > 0) {
    await axiosInstance.delete('/bookmarks', {
      params: {
        user_id: `eq.${props.userId}`,
        playlist_id: `eq.${props.playlistId}`
      }
    })
    return false
  } else {
    await axiosInstance.post('/bookmarks', {
      user_id: props.userId,
      playlist_id: props.playlistId
    })
    return true
  }
}

export default toggleBookmarkStatus
