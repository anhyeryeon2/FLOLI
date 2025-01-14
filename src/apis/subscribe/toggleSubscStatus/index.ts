import axiosInstance from '@/apis/axiosInstance'
import { IToggleSubscParams } from '@/types/toggleSubsc'

const toggleSubscStatus = async (
  props: IToggleSubscParams
): Promise<boolean> => {
  const res = await axiosInstance.get('/subscription', {
    params: {
      user_id: `eq.${props.currentUserId}`,
      subscribed_user_id: `eq.${props.subscribedUserId}`
    }
  })

  if (res.data.length > 0) {
    await axiosInstance.delete('/subscription', {
      params: {
        user_id: `eq.${props.currentUserId}`,
        subscribed_user_id: `eq.${props.subscribedUserId}`
      }
    })
    return false
  } else {
    await axiosInstance.post('/subscription', {
      user_id: props.currentUserId,
      subscribed_user_id: props.subscribedUserId
    })
    return true
  }
}

export default toggleSubscStatus
