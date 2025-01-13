import { supabase, supabaseUrl } from '../supabase/supabaseConfig'

interface EditProfile {
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

//유저정보 불러오기 함수 (추후 zustand로 유저정보 불러올 예정 )
export async function userInfoGet(userId: string | undefined) {
  const { data, error } = await supabase
    .from('userinfo')
    .select('*')
    .eq('id', userId)

  if (error) {
    console.error(error)
    throw new Error('유저 정보를 불러오지 못했습니다다')
  }

  return data
}

//좋아요 누른 플레이리스트 정보
export async function LikedPlayList(userId: string | undefined) {
  const { data: likedPlaylists, error } = await supabase
    .from('likes')
    .select('playlist_id')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    throw new Error('userId와 일치하는 row 데이터가 존재하지 않습니다.')
  }

  const playlistIds = likedPlaylists.map(item => item.playlist_id)

  const { data: playlists, error: playlistError } = await supabase
    .from('playlists')
    .select('*')
    .in('playlist_id', playlistIds)

  if (playlistError) {
    console.error(playlistError)
    throw new Error(
      '해당 playlist_id와 일치하는 row 데이터가 존재하지 않습니다.'
    )
  }

  return playlists
}

//좋아요 리스트 삭제
export async function DeleteLikeList(userId: string | undefined) {
  const { data, error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    throw new Error('좋아요 누른 플레이리스트 삭제에 실패했어요.')
  }

  return data
}

//저장된 플레이리스트 정보
export async function SavedPlayList(userId: string | undefined) {
  const { data: likedPlaylists, error } = await supabase
    .from('bookmarks')
    .select('playlist_id')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    throw new Error('userId와 일치하는 row 데이터가 존재하지 않습니다.')
  }

  const playlistIds = likedPlaylists.map(item => item.playlist_id)

  const { data: playlists, error: playlistError } = await supabase
    .from('playlists')
    .select('*')
    .in('playlist_id', playlistIds)

  if (playlistError) {
    console.error(playlistError)
    throw new Error(
      '해당 playlist_id와 일치하는 row 데이터가 존재하지 않습니다.'
    )
  }

  return playlists
}

//저장된 리스트 삭제
export async function DeleteSaveList(userId: string | undefined) {
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    throw new Error('저장된 플레이리스트 삭제에 실패했어요.')
  }

  return data
}
