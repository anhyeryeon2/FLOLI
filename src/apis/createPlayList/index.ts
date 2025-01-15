import axiosInstance from '@/apis/axiosInstance'
import { CreatePlaylistPayload } from '@/types/playListCreate'

export const createPlaylist = async (payload: CreatePlaylistPayload) => {
  const response = await axiosInstance.post('/rpc/create_playlist', payload)
  return response.data
}
