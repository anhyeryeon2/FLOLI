import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { supabase } from '@/supabase/supabaseConfig'
import PlayList from '@/components/PlayList/PlayList'
import styled from 'styled-components'
import Loading from '@/components/LoadingSpinner/Loading'
import { IPlayListType } from '@/types/playList'
import { useToast } from '@/hooks/useToast'

export const MyPlayLists = () => {
  const user = useAuthStore(state => state.user)
  const [playlists, setPlaylists] = useState<IPlayListType[]>([])
  const [loading, setLoading] = useState(true)
  const { handleToastError, handleToastSuccess } = useToast()

  useEffect(() => {
    async function fetchMyPlaylists() {
      if (!user?.id) return
      try {
        const { data, error } = await supabase.rpc('get_my_playlists', {
          p_user_id: user.id
        })

        if (error) throw error

        setPlaylists(data || [])
      } catch (err) {
        handleToastError('내 플레이리스트를 불러오는데 실패했습니다')
      } finally {
        setLoading(false)
      }
    }

    fetchMyPlaylists()
  }, [user?.id])

  const handleDeletePlayList = async (deletedId: string) => {
    try {
      const { error } = await supabase.rpc('delete_playlist', {
        p_playlist_id: deletedId
      })

      if (error) throw error
      setPlaylists(prev =>
        prev.filter(playlist => playlist.playlist_id !== deletedId)
      )
      handleToastSuccess('플레이리스트가 삭제되었습니다.')
    } catch (error) {
      handleToastError('플레이리스트 삭제에 실패했습니다.')
    }
  }

  if (loading)
    return (
      <>
        <Loading />
      </>
    )

  if (playlists.length === 0) {
    return <div>내 플레이리스트가 없습니다</div>
  }

  return (
    <PlayListsContainer>
      <Title>{user?.nickname}의 플레이리스트</Title>
      {playlists.map(playlist => (
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
        />
      ))}
    </PlayListsContainer>
  )
}

export const PlayListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`
const Title = styled.p`
  font-size: 20px;
`
