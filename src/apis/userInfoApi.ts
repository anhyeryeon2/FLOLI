import { supabase, supabaseUrl } from '@/supabase/supabaseConfig'

interface EditProfile {
  image?: FileList | null
  nickname?: string
  introduction?: string
}

//수정용 함수
export async function UserProfileEdit(editProfile: EditProfile, id: string) {
  let imagePath = null

  if (editProfile.image && editProfile.image.length > 0) {
    const imageFile = editProfile.image[0]
    const imageName =
      imageFile.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '_') +
      Math.random()
    const { error: storageError } = await supabase.storage
      .from('avatar')
      .upload(imageName, imageFile)

    if (storageError) {
      console.error(storageError)
      throw new Error('프로필필 업로드에 실패했습니다!')
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`
  }

  const { data, error } = await supabase
    .from('userinfo')
    .update({
      nickname: editProfile.nickname,
      introduction: editProfile.introduction,
      profile_img: imagePath || editProfile.image
    })
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('프로필 업데이트에 실패했습니다!')
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
