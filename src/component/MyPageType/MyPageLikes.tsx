import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import PlayList from '../PlayList/PlayList'
import { useAuthStore } from '@/store/useAuthStore'
import { DeleteLikeList, LikedPlayList } from '@/apis/userInfoApi'
import * as S from './MyPageLikes.styled'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'

export default function MyPageLikes() {
  const navigate = useNavigate()
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { user } = useAuthStore()
  const userId = user?.id
  const { handleToastError, handleToastSuccess } = useToast()
  const queryClient = useQueryClient()

  const {
    data: playlistData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['LikedPlayList'],
    queryFn: ({ pageParam }) => LikedPlayList(userId, pageParam as number),
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

  const { mutate } = useMutation({
    mutationFn: () => DeleteLikeList(userId),
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
            optionIcon="heart"
            nickname={playlistData.nickname}
            onOptionClick={() => handleDelete()}
          />
        </S.ItemList>
      ))}
      <div ref={observerElem} />
    </S.LikedBox>
  )
}
