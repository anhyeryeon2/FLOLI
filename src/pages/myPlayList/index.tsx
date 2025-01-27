import { useToast } from '@/hooks/useToast'
import { PlayList, Loading } from '@/component'
import * as S from '@/component/MyPlayList/MyPlayList.styles'
import { IPlayListType } from '@/types/playList'
import { useMyPlayList } from '@/hooks/useMyPlayList'

export const MyPlayLists = () => {
  const {
    playlists,
    isLoading,
    error,
    handleDeletePlayList,
    handleDetailPage,
    user
  } = useMyPlayList()
  const { handleToastError } = useToast()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    handleToastError(
      (error as Error).message || '나의 플레이리스트를 불러오는데 실패했습니다.'
    )
  }

  return (
    <S.PlayListsContainer>
      <S.Title>
        <span>{user?.nickname}</span>의 플레이리스트
      </S.Title>
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
              ispublic={playlist.is_public}
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
