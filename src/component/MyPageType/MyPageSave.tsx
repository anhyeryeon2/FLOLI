import { useAuthStore } from '@/store/useAuthStore'
import * as S from './MyPageLikes.styled'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { DeleteSaveList, SavedPlayList } from '@/apis/userInfoApi'
import { PlayList } from '@/component'
import { useInfiniteScroll, useToast } from '@/hooks'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function MyPageSave() {
  const navigate = useNavigate()
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { user } = useAuthStore()
  const { handleToastError, handleToastSuccess } = useToast()

  const {
    data: playlistData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['SavedPlayList'],
    queryFn: ({ pageParam }) => SavedPlayList(user?.id, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1

      return nextPage <= lastPage.length ? nextPage : undefined
    },
    select: data => {
      return data.pages.flat()
    },
    initialPageParam: 1,

    staleTime: 1000 * 60
  })

  useInfiniteScroll({
    observerElem,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (PlayListId: string) => DeleteSaveList(user?.id, PlayListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['SavedPlayList'] })
      handleToastSuccess('해당 플리를 저장목록에서 삭제 하였습니다')
    },
    onError: () =>
      handleToastError(`해당 플리를 저장목록에서 삭제하는데 실패하였습니다. `)
  })

  function handleDelete(PlayListId: string) {
    mutate(PlayListId)
  }

  if (!playlistData || playlistData.length === 0) {
    return <S.NoData>플레이리스트가 존재하지 않습니다.</S.NoData>
  }

  const handleDetailPage = (playlistId: string) => {
    navigate(`/view/${playlistId}`)
  }

  return (
    <S.LikedBox>
      {playlistData?.map(playlistData => (
        <S.ItemList
          key={playlistData.playlist_id}
          onClick={() => handleDetailPage(playlistData.playlist_id)}>
          <PlayList
            image={playlistData.thumbnail}
            title={playlistData.title}
            date={new Date(playlistData.created_at).toLocaleDateString()}
            likes={playlistData.likes_count}
            comments={playlistData.comments_count}
            optionIcon="removeBookmark"
            nickname={playlistData.nickname}
            onOptionClick={() => handleDelete(playlistData.playlist_id)}
          />
        </S.ItemList>
      ))}
      <div ref={observerElem} />
    </S.LikedBox>
  )
}

export default MyPageSave
