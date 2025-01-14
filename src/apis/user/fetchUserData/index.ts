import axiosInstance from '@/apis/axiosInstance'

const fetchUserData = async (userId: string) => {
  const res = await axiosInstance.get('/userinfo', {
    params: {
      id: `eq.${userId}`
    }
  })
  return res.data[0]
}

export default fetchUserData
