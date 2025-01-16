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
export async function LikedPlayList(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10
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
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1)

  if (playlistError) {
    console.error(playlistError)
    throw new Error(
      '해당 playlist_id와 일치하는 row 데이터가 존재하지 않습니다.'
    )
  }

  return playlists
}

//좋아요 리스트 삭제
export async function DeleteLikeList(
  userId: string | undefined,
  playlistId: string | undefined
) {
  const { data, error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('playlist_id', playlistId)

  if (error) {
    console.error(error)
    throw new Error('좋아요 누른 플레이리스트 삭제에 실패했어요.')
  }

  return data
}

export async function SavedPlayList(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10

  // 북마크 테이블에서 해당 사용자의 playlist_id를 가져옵니다.
  const { data: savedPlaylists, error } = await supabase
    .from('bookmarks')
    .select('playlist_id, created_at') // 북마크 생성 시점도 가져옵니다.
    .eq('user_id', userId)
    .order('created_at', { ascending: false }) // 북마크 생성 시점 기준 내림차순 정렬

  if (error) {
    console.error(error)
    throw new Error('userId와 일치하는 row 데이터가 존재하지 않습니다.')
  }

  const playlistIds = savedPlaylists.map(item => item.playlist_id)

  // playlists 테이블에서 playlist_id를 기반으로 플레이리스트 정보를 가져옵니다.
  // 추가적으로 playlist의 created_at 기준으로 내림차순 정렬
  const { data: playlists, error: playlistError } = await supabase
    .from('playlists')
    .select('*')
    .in('playlist_id', playlistIds)
    .order('created_at', { ascending: false }) // 플레이리스트 생성 시점 기준 내림차순 정렬
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1) // 페이지네이션 처리

  if (playlistError) {
    console.error(playlistError)
    throw new Error(
      '해당 playlist_id와 일치하는 row 데이터가 존재하지 않습니다.'
    )
  }

  return playlists
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
