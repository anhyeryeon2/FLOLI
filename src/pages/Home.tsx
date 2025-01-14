import { FeedList, PlayListSkeleton } from '@/component'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPlayList } from '@/apis/feed'
import { IPlayListType } from '@/types/playList'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useInfiniteScroll } from '@/hooks'

export function Home() {
  const location = useLocation()
  const observerElem = useRef<HTMLDivElement | null>(null)
  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfiniteQuery({
    queryKey: ['playList'],
    queryFn: ({ pageParam }) => getPlayList(pageParam as number),

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

  useEffect(() => {
    if (location.state?.refetch) {
      refetch()
    }
  }, [location.state, refetch])

  useInfiniteScroll({
    observerElem,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  if (isLoading || isFetchingNextPage) {
    return <PlayListSkeleton />
  }

  if (isError) <div>예상치 못한 에러가 발생했습니다.</div>
  return (
    <>
      {data?.map((playList: IPlayListType) => (
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
        />
      ))}
      <div ref={observerElem} />
    </>
  )
}

export default Home
