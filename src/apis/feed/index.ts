import axiosInstance from '../axiosInstance'
import { supabase } from '../../supabase/supabaseConfig'

const ITEM_COUNT = 3

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

export const getPlayList = async (
  userId?: string,
  page: number = 1,
  item: number = ITEM_COUNT
) => {
  try {
    const currentUserId = userId || (await getCurrentUser())

    if (!currentUserId) {
      throw new Error('사용자가 로그인되지 않았습니다.')
    }
    const playListData = await axiosInstance.get('rpc/get_user_and_playlists', {
      params: {
        current_user_id: currentUserId,
        page: page,
        item: item
      }
    })
    return playListData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}
