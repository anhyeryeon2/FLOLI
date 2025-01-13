import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PlayList from '../PlayList/PlayList'
import { useAuthStore } from '@/store/useAuthStore'
import { DeleteLikeList, LikedPlayList } from '@/apis/userInfoApi'
import * as S from './MypageLikes.styled'
import { useToast } from '@/hooks/useToast'

export default function MyPageLikes() {
  const { user } = useAuthStore()
  const userId = user?.id
  const { handleToastError, handleToastSuccess } = useToast()

  const { data: playlistData } = useQuery({
    queryKey: ['LikedPlayList'],
    queryFn: () => LikedPlayList(userId)
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => DeleteLikeList(user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['LikedPlayList']
      })
      handleToastSuccess(`해당 플리를 좋아요 목록에서 삭제하였습니다`)
    },
    onError: () => {
      handleToastError(`해당 플리를 좋아요 목록에서 삭제하는데 실패하였습니다`)
    }
  })

  function handleDelete() {
    mutate()
  }

  return (
    <S.LikedBox>
      {playlistData?.map(playlistData => (
        <S.ItemList>
          <PlayList
            image={playlistData.thumbnail}
            title={playlistData.title}
            date={playlistData.created_at}
            likes={playlistData.likes_count}
            comments={playlistData.comments_count}
            optionIcon="heart"
            nickname={playlistData.nickname}
            key={playlistData.playlist_id}
            onOptionClick={handleDelete}
          />
        </S.ItemList>
      ))}
    </S.LikedBox>
  )
}
