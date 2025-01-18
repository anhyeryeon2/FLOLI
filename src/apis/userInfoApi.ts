import { supabase, supabaseUrl } from '../supabase/supabaseConfig'
import axiosInstance from './axiosInstance'

type EditProfile = {
  nickname?: string
  introduction?: string
}

//수정용 함수
export async function UserProfileEdit(
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

export async function SavedPlayList(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10

  const { data: savedPlaylists, error } = await supabase
    .from('bookmarks')
    .select('playlist_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    throw new Error('userId와 일치하는 row 데이터가 존재하지 않습니다.')
  }

  const playlistIds = savedPlaylists.map(item => item.playlist_id)

  const { data: playlists, error: playlistError } = await supabase
    .from('playlists')
    .select('*')
    .in('playlist_id', playlistIds)
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1)

  if (playlistError) {
    console.error(playlistError)
    throw new Error(
      '해당 playlist_id와 일치하는 row 데이터가 존재하지 않습니다.'
    )
  }

  const sortedPlaylists = savedPlaylists
    .map(saved => {
      const playlist = playlists.find(
        playlist => playlist.playlist_id === saved.playlist_id
      )
      if (playlist) {
        return { ...playlist, bookmark_created_at: saved.created_at }
      }
      return null
    })
    .filter(item => item !== null)

  return sortedPlaylists
}

//저장된 리스트 삭제
export async function DeleteSaveList(
  userId: string | undefined,
  playlistId: string | undefined
) {
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('playlist_id', playlistId)

  if (error) {
    console.error(error)
    throw new Error('저장된 플레이리스트 삭제에 실패했어요.')
  }

  return data
}

//유저 플레이리스트 불러오기
export async function userPlayListGet(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', userId)
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1)

  if (error) {
    console.error(error)
  }

  return data
}
