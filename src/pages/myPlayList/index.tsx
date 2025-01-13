import { useAuthStore } from '../../store/useAuthStore'
import { supabase } from '@/supabase/supabaseConfig'
import { useToast } from '@/hooks/useToast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import PlayList from '@/components/PlayList/PlayList'
import Loading from '@/components/LoadingSpinner/Loading'
import * as S from '@/components/MyPlayList/MyPlayList.styles'
import { IPlayListType } from '@/types/playList'

const fetchMyPlaylists = async (userId: string): Promise<IPlayListType[]> => {
  const { data, error } = await supabase.rpc('get_my_playlists', {
    p_user_id: userId
  })
  if (error) throw new Error('나의 플레이리스트를 불러오는데 실패했습니다')
  return data || []
}

const deletePlaylist = async (playlistId: string) => {
  const { error } = await supabase.rpc('delete_playlist', {
    p_playlist_id: playlistId
  })
  if (error) throw new Error('플레이리스트 삭제에 실패했습니다.')
}

export const MyPlayLists = () => {
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
    queryFn: async () => {
      if (!user?.id) return []
      return await fetchMyPlaylists(String(user?.id))
    },
    enabled: !!user?.id,
    retry: 2
  })

  if (error) {
    handleToastError(
      (error as Error).message || '나의 플레이리스트를 불러오는데 실패했습니다.'
    )
  }

  const deleteMutation = useMutation({
    mutationFn: async (deletedId: string) => {
      await deletePlaylist(deletedId)
      return deletedId
    },
    onSuccess: deletedId => {
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

  if (isLoading) {
    return <Loading />
  }
  const handleDetailPage = (playlistId: string) => {
    navigate(`/view/${playlistId}`)
  }

  return (
    <S.PlayListsContainer>
      <S.Title>{user?.nickname}의 플레이리스트</S.Title>
      {playlists.length === 0 ? (
        <S.EmptyState>나의 플레이리스트가 없습니다</S.EmptyState>
      ) : (
        <S.PlayListWrapper>
          {playlists.map((playlist: IPlayListType) => (
            <PlayList
              key={playlist.playlist_id}
              image={playlist.thumbnail}
              title={playlist.title}
              date={new Date(playlist.created_at).toLocaleDateString()}
              likes={playlist.likes_count}
              comments={playlist.comments_count}
              isLocked={playlist.is_public}
              optionIcon="option"
              playlistId={playlist.playlist_id}
              onDelete={handleDeletePlayList}
              onClick={() => handleDetailPage(playlist.playlist_id)}
            />
          ))}
        </S.PlayListWrapper>
      )}
    </S.PlayListsContainer>
  )
}
