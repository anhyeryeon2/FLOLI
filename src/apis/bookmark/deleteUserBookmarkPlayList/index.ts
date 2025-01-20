import axiosInstance from '@/apis/axiosInstance'
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
