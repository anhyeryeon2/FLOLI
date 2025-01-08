import axiosInstance from '@/apis/axiosInstance'
import { IToggleLikeParams } from '@/types/toggleLike'

const toggleLikeStatus = async (props: IToggleLikeParams): Promise<boolean> => {
  const res = await axiosInstance.get('/likes', {
    params: {
      user_id: `eq.${props.userId}`,
      playlist_id: `eq.${props.playlistId}`
    }
  })

  if (res.data.length > 0) {
    await axiosInstance.delete('/likes', {
      params: {
        user_id: `eq.${props.userId}`,
        playlist_id: `eq.${props.playlistId}`
      }
    })
    return false
  } else {
    await axiosInstance.post('/likes', {
      user_id: props.userId,
      playlist_id: props.playlistId
    })
    return true
  }
}

export default toggleLikeStatus
