import FeedList from '@/components/FeedList/FeedList'
import PlayListSkeleton from '@/components/Skeleton/PlayListSkeleton'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSubscribeAllPlayLists } from '@/apis/subscribe/playList/index'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRef } from 'react'

const AllSubscribePlayLists = () => {
  const observerElem = useRef<HTMLDivElement | null>(null)

  const {
    data: allPlayLists,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['allSubscribePlayList'],
    queryFn: ({ pageParam }) =>
      getSubscribeAllPlayLists(undefined, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.length ? nextPage : undefined
    },
    select: data => data.pages.flat(),
    initialPageParam: 1,
    staleTime: 1000 * 60
  })

  useInfiniteScroll({
    observerElem,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  if (isLoading || isFetchingNextPage) return <PlayListSkeleton />

  if (isError) return <div>불러오다가 에러가 발생했습니다.</div>

  return (
    <>
      {allPlayLists?.map(playList => (
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

export default AllSubscribePlayLists
