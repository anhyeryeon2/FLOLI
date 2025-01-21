import axiosInstance from '@/apis/axiosInstance'

//유저정보 불러오기 함수
export async function userInfoGet(userId: string | undefined) {
  const res = await axiosInstance.get('/userinfo', {
    params: {
      id: `eq.${userId}`
    }
  })
  return res.data
}
