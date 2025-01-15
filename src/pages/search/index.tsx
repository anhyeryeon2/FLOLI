import { getSearchPlayLists } from '@/apis/search/playList/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import * as S from '@/component/FeedList/FeedList.style'
import { FeedList, PlayListSkeleton } from '@/component'
import { IPlayListType } from '@/types/playList'
import { useInfiniteScroll } from '@/hooks'
import { useLocation } from 'react-router-dom'

export const SearchPage = () => {
  const location = useLocation()

  const searchTerm = location.state

  const observerElem = useRef<HTMLDivElement | null>(null)
  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['playListSearch', searchTerm],
    queryFn: ({ pageParam }) =>
      getSearchPlayLists(searchTerm, pageParam as number),

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

  if (isError)
    return (
      <p className="text-center">플레이 리스트 정보를 불러오지 못했습니다.</p>
    )
  if (isLoading || isFetchingNextPage) {
    return <PlayListSkeleton />
  }

  return (
    <S.FeedConteiner>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((playList: IPlayListType) => (
          <FeedList
            image={playList.thumbnail}
            profileImage={playList.profile_img_path}
            nickname={playList.nickname}
            likes={playList.likes_count}
            track={playList.video_count}
            date={playList.created_at}
            title={playList.title}
            comments={playList.comments_count}
            key={playList.playlist_id}
            id={playList.playlist_id}
            likesState={playList.is_liked}
            playlist_user_id={playList.playlist_user_id}
            is_public={playList.is_public}
          />
        ))
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
          데이터가 없습니다.
        </div>
      )}

      <div ref={observerElem} />
    </S.FeedConteiner>
  )
}
