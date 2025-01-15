import { supabase } from '@/supabase/supabaseConfig'
import axiosInstance from '../axiosInstance'

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
export const updateLike = async (id: string, userId?: string) => {
  try {
    const currentUserId = userId || (await getCurrentUser())

    if (!currentUserId) {
      throw new Error('사용자가 로그인되지 않았습니다.')
    }
    const playListData = await axiosInstance.post('rpc/update_likes_count', {
      input_playlist_id: id,
      input_user_id: currentUserId
    })
    return playListData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}
