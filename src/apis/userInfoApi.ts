import { supabase, supabaseUrl } from '../supabase/supabaseConfig'
import axios from 'axios'
import axiosInstance from './axiosInstance'
import { refreshAccessToken } from '@/utils/refreshAccessToken'
const PROJECT_API_KEY = import.meta.env.VITE_SUPABASE_KEY
const BASE_URL = import.meta.env.VITE_SUPABASE_URL

type EditProfile = {
  nickname?: string
  introduction?: string
}

//수정용 함수
export async function UserProfileEdit2(
  editProfile: EditProfile,
  image: string | FileList | null,
  id: string
) {
  let imagePath = null

  if (typeof image === 'string') {
    imagePath = image
  } else if (image && image.length > 0) {
    const imageFile = image[0]
    const imageName =
      imageFile.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '_') +
      Math.random()

    const { error: storageError } = await supabase.storage
      .from('avatar')
      .upload(imageName, imageFile)

    if (storageError) {
      console.error(storageError)
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`
  }

  const { data, error } = await supabase
    .from('userinfo')
    .update({
      nickname: editProfile.nickname,
      introduction: editProfile.introduction,
      profile_img: imagePath || image
    })
    .eq('id', id)

  if (error) {
    console.error(error)
  }

  return data
}

//axios로 수정하기
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
    const encodedImageName = encodeURIComponent(imageName)

    // 이미지 업로드
    const formData = new FormData()
    formData.append('file', imageFile)
    console.log(formData.get('file'))

    try {
      const response = await axios.post(
        `${BASE_URL}/storage/v1/object/avatar/${encodedImageName}`,
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
        imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${encodedImageName}`
        console.log('Uploaded image path:', imagePath) // imagePath 확인
      } else {
        console.log('파일 업로드 실패:', response.data)
        imagePath = null
      }
    } catch (error) {
      console.error('File upload error:', error)
      imagePath = null
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

//유저정보 불러오기 함수
export async function userInfoGet(userId: string | undefined) {
  const res = await axiosInstance.get('/userinfo', {
    params: {
      id: `eq.${userId}`
    }
  })
  return res.data
}

//좋아요 누른 플레이리스트 정보

interface LikedPlaylist extends EditProfile {
  playlist_id: string
  created_at: string
  user_id: string
  like_id: string
}

export async function LikedPlayList(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10
  const offset = (pageParam - 1) * PAGE_SIZE
  const limit = PAGE_SIZE

  const likedRes = await axiosInstance.get('/likes', {
    params: {
      user_id: `eq.${userId}`,
      order: 'created_at.desc'
    }
  })

  const playlistIds = likedRes.data
    .map((item: LikedPlaylist) => item.playlist_id)
    .join(',')

  const PlayRes = await axiosInstance.get('/playlists', {
    params: {
      playlist_id: `in.(${playlistIds})`,
      limit: limit,
      offset: offset
    }
  })

  const sortedLikeList = likedRes.data
    .map((cur: LikedPlaylist) => {
      const playlist = PlayRes.data.find(
        (cur2: LikedPlaylist) => cur2.playlist_id === cur.playlist_id
      )
      if (playlist) {
        return { ...playlist }
      } else {
        return null
      }
    })
    .filter((item: LikedPlaylist) => item !== null)

  return sortedLikeList
}

//좋아요 리스트 삭제

export async function DeleteLikeList(
  userId: string | undefined,
  playlistId: string | undefined
) {
  const deleteList = axiosInstance.delete('/likes', {
    params: { user_id: `eq.${userId}`, playlist_id: `eq.${playlistId}` }
  })

  return deleteList
}

//저장된 플리 조회

export async function SavedPlayList(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10
  const offset = (pageParam - 1) * PAGE_SIZE
  const limit = PAGE_SIZE

  const savedRes = await axiosInstance.get('/bookmarks', {
    params: {
      user_id: `eq.${userId}`,
      order: 'created_at.desc'
    }
  })

  const playlistIds = savedRes.data
    .map((item: LikedPlaylist) => item.playlist_id)
    .join(',')

  const PlayRes = await axiosInstance.get('/playlists', {
    params: {
      playlist_id: `in.(${playlistIds})`,
      limit: limit,
      offset: offset
    }
  })

  const sortedSavedList = savedRes.data
    .map((cur: LikedPlaylist) => {
      const playlist = PlayRes.data.find(
        (cur2: LikedPlaylist) => cur2.playlist_id === cur.playlist_id
      )
      if (playlist) {
        return { ...playlist }
      } else {
        return null
      }
    })
    .filter((item: LikedPlaylist) => item !== null)

  return sortedSavedList
}

//저장된 리스트 삭제

export async function DeleteSaveList(
  userId: string | undefined,
  playlistId: string | undefined
) {
  const deleteList = axiosInstance.delete('/bookmarks', {
    params: { user_id: `eq.${userId}`, playlist_id: `eq.${playlistId}` }
  })

  return deleteList
}

//유저 플레이리스트 불러오기

export async function userPlayListGet(
  userId: string | undefined,
  pageParam: number = 0
) {
  const PAGE_SIZE = 10
  const offset = (pageParam - 1) * PAGE_SIZE
  const limit = PAGE_SIZE

  const userPlayList = await axiosInstance.get('/playlists', {
    params: {
      user_id: `eq.${userId}`,
      limit: limit,
      offset: offset
    }
  })

  return userPlayList.data
}
