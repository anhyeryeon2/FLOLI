import { useQuery } from '@tanstack/react-query'
import PlayList from '../PlayList/PlayList'
import DetailPlayList from '../DetailPlayList/DetailPlayList'
import { useAuthStore } from '@/store/useAuthStore'
import { LikedPlayList } from '@/apis/userInfoApi'
import * as S from './MypageLikes.styled'

export default function MyPageLikes() {
  const { user } = useAuthStore()
  const userId = user?.id

  const { data: playlistData } = useQuery({
    queryKey: ['LikedPlayList'],
    queryFn: () => LikedPlayList(userId)
  })

  return (
    <S.LikedBox>
      {playlistData?.map(playlistData => (
        <PlayList
          image={playlistData.thumbnail}
          title={playlistData.title}
          date={playlistData.created_at}
          likes={playlistData.likes_count}
          comments={playlistData.comments_count}
          optionIcon="heart"
          nickname={playlistData.nickname}
          key={playlistData.playlist_id}
        />
      ))}
    </S.LikedBox>
  )
}
