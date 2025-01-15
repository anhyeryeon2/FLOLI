import axiosInstance from '@/apis/axiosInstance'

const fetchUserSubscStatus = async (
  currentUserId: string,
  subscribedUserId: string
): Promise<boolean> => {
  const res = await axiosInstance.get('/subscription', {
    params: {
      user_id: `eq.${currentUserId}`,
      subscribed_user_id: `eq.${subscribedUserId}`
    }
  })

  return res.data.length > 0 // 데이터가 없는 경우 false 반환
}

export default fetchUserSubscStatus
