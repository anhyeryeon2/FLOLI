import { useAuthStore } from '@/store/useAuthStore'
import * as S from './MypageLikes.styled'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteSaveList, SavedPlayList } from '@/apis/userInfoApi'
import PlayList from '../PlayList/PlayList'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

function MyPageSave() {
  const { user } = useAuthStore()
  const { showToastMessage } = useToastMessageContext()

  const { data: playlistData } = useQuery({
    queryKey: ['SavedPlayList'],
    queryFn: () => SavedPlayList(user?.id)
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => DeleteSaveList(user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['SavedPlayList'] })
      showToastMessage({
        message: '해당 플리를 저장목록에서 삭제 하였습니다',
        type: 'success'
      })
    },
    onError: () =>
      showToastMessage({
        message: `해당 플리를 저장목록에서 삭제하는데 실패하였습니다. `,
        type: 'error'
      })
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
            optionIcon="bookmark"
            nickname={playlistData.nickname}
            key={playlistData.playlist_id}
            onOptionClick={handleDelete}
          />
        </S.ItemList>
      ))}
    </S.LikedBox>
  )
}

export default MyPageSave
