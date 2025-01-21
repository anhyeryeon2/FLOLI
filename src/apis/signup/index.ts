import axiosInstance from '../axiosInstance'

// 이메일 중복 확인
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const { data } = await axiosInstance.get('/userinfo', {
    params: { email: `eq.${email}` }
  })
  return data.length > 0
}

// 회원가입 요청
export const createUserInfo = async (
  userId: string,
  email: string,
  nickname: string
): Promise<void> => {
  await axiosInstance.post('/userinfo', {
    id: userId,
    email,
    nickname,
    profile_img: '',
    introduction: '',
    subsc_count: 0
  })
}
