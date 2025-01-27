import { IPlayListType } from '@/types/playList'
import axiosInstance from '../axiosInstance'

export const fetchMyPlaylists = async (
  userId: string
): Promise<IPlayListType[]> => {
  const { data } = await axiosInstance.get('/playlists', {
    params: {
      user_id: `eq.${userId}`,
      order: 'created_at.desc'
    }
  })
  return data || []
}

export const deletePlaylist = async (playlistId: string): Promise<void> => {
  await axiosInstance.delete('/playlists', {
    params: {
      playlist_id: `eq.${playlistId}`
    }
  })
}
