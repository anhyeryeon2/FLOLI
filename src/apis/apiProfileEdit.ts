import supabase, { supabaseUrl } from './supabase'

interface EditProfile {
  image?: FileList | null
  nickname?: string
  intro?: string
}

export async function apiProfileEdit(editProfile: EditProfile, id: string) {
  let imagePath = null

  if (editProfile.image && editProfile.image.length > 0) {
    const imageFile = editProfile.image[0]
    const imageName = imageFile.name.replaceAll('/', '')
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
    .from('profiles')
    .update({ ...editProfile, image: imagePath || editProfile.image })
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('프로필 업데이트에 실패했습니다!')
  }

  return data
}
