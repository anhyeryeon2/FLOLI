import axiosInstance from '@/apis/axiosInstance'

export async function DeleteLikeList(
  userId: string | undefined,
  playlistId: string | undefined
) {
  const deleteList = axiosInstance.delete('/likes', {
    params: { user_id: `eq.${userId}`, playlist_id: `eq.${playlistId}` }
  })

  return deleteList
}
