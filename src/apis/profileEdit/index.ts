import { supabaseUrl } from '@/supabase/supabaseConfig'
import axios from 'axios'
import axiosInstance from '../axiosInstance'
import { refreshAccessToken } from '@/utils/refreshAccessToken'
const PROJECT_API_KEY = import.meta.env.VITE_SUPABASE_KEY
const BASE_URL = import.meta.env.VITE_SUPABASE_URL

type EditProfile = {
  nickname?: string
  introduction?: string
}

export async function UserProfileEdit(
  editProfile: EditProfile,
  image: string | FileList | null,
  id: string
) {
  const accessToken = await refreshAccessToken()

  let imagePath = null

  // 이미지가 문자열이면 그대로 사용
  if (typeof image === 'string') {
    imagePath = image
  } else if (image && image.length > 0) {
    const imageFile = image[0]
    const imageName =
      imageFile.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '_') +
      Math.random()

    // 이미지 업로드
    const formData = new FormData()
    formData.append(imageName, imageFile)

    try {
      const response = await axios.post(
        `${BASE_URL}/storage/v1/object/avatar/${imageName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
            apikey: PROJECT_API_KEY
          }
        }
      )
      if (response.status === 200) {
        imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`
      }
    } catch (error) {
      console.error('File upload error:', error)
    }
  }

  // 사용자 정보 업데이트
  try {
    const res = await axiosInstance.patch(
      '/userinfo',
      {
        nickname: editProfile.nickname,
        introduction: editProfile.introduction,
        profile_img: imagePath
      },
      {
        params: {
          id: `eq.${id}`
        }
      }
    )

    return res.data
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
