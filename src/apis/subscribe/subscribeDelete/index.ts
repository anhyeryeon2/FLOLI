import { supabase } from '../../../supabase/supabaseConfig'
import axiosInstance from '../../axiosInstance'

const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error getting user:', error)
    return null
  }

  if (data && data.user) {
    return data.user.id
  }

  return null
}

export const deleteSubscribe = async (
  subscrbie_id: string,
  userId?: string
) => {
  try {
    const currentUserId = userId || (await getCurrentUser())

    if (!currentUserId) {
      throw new Error('사용자가 로그인되지 않았습니다.')
    }
    const subscribeData = await axiosInstance.post('rpc/delete_subscription', {
      input_subscribed_user_id: subscrbie_id,
      input_user_id: currentUserId
    })
    return subscribeData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}
