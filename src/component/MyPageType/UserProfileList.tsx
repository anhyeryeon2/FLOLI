import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import * as S from './MyPageLikes.styled'
import PlayList from '../PlayList/PlayList'
import { userPlayListGet } from '@/apis/userInfoApi'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

function UserProfileList() {
  const navigate = useNavigate()
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { userId } = useParams()

  const {
    data: playlistData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['userPlayList'],
    queryFn: ({ pageParam }) => userPlayListGet(userId, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      if (Array.isArray(lastPage)) {
        const nextPage = allPages.length + 1
        return nextPage <= lastPage.length ? nextPage : undefined
      }
      return undefined
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
            nickname={playlistData.nickname}
          />
        </S.ItemList>
      ))}
      <div ref={observerElem} />
    </S.LikedBox>
  )
}

export default UserProfileList
