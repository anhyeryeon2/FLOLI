import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { supabase } from '@/supabase/supabaseConfig'
import PlayList from '@/components/PlayList/PlayList'
import styled from 'styled-components'
import Loading from '@/components/LoadingSpinner/Loading'
import { IPlayListType } from '@/types/playList'

export const MyPlayLists = () => {
  const user = useAuthStore(state => state.user)
  const [playlists, setPlaylists] = useState<IPlayListType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMyPlaylists() {
      if (!user?.id) return
      try {
        const { data, error } = await supabase
          .from('playlists')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setPlaylists(data || [])
      } catch (err) {
        console.error('Error fetching playlists:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyPlaylists()
  }, [user?.id])

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
          isLocked={playlist.is_public === false}
          optionIcon="option"
          nickname={playlist.description} // 설명을 닉네임처럼 표시 (필요시 수정 가능)
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
