import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from 'react-router-dom'
import { IPlayListType } from '@/types/playList'
import { deletePlaylist, fetchMyPlaylists } from '@/apis/myPlayList'

export const useMyPlayList = () => {
  const user = useAuthStore(state => state.user)
  const { handleToastError, handleToastSuccess } = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    data: playlists = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['myPlaylists', user?.id],
    queryFn: () => fetchMyPlaylists(user!.id),
    enabled: !!user?.id,
    retry: 2
  })

  const deleteMutation = useMutation({
    mutationFn: deletePlaylist,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(
        ['myPlaylists', user?.id],
        (old: IPlayListType[] | undefined) =>
          old?.filter(playlist => playlist.playlist_id !== deletedId)
      )
      queryClient.invalidateQueries({ queryKey: ['playList'] })
      handleToastSuccess('플레이리스트가 삭제되었습니다.')
      navigate('/', { state: { refetch: true } })
    },
    onError: () => {
      handleToastError('플레이리스트 삭제에 실패했습니다.')
    }
  })

  const handleDeletePlayList = (deletedId: string) => {
    deleteMutation.mutate(deletedId)
  }

  const handleDetailPage = (playlistId: string) => {
    navigate(`/view/${playlistId}`)
  }

  return {
    playlists,
    isLoading,
    error,
    handleDeletePlayList,
    handleDetailPage,
    user
  }
}
