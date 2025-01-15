import FeedList from '@/component/FeedList/FeedList'
import PlayListSkeleton from '@/component/Skeleton/PlayListSkeleton'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSubscribeAllPlayLists } from '@/apis/subscribe/playList/index'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRef, useEffect } from 'react'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

const AllSubscribePlayLists = () => {
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { showToastMessage } = useToastMessageContext()

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
  useEffect(() => {
    if (isError) {
      showToastMessage({
        message: '에러가 발생하여 구독자 정보를 가져오지 못하였습니다..',
        type: 'error'
      })
    }
  }, [isError, showToastMessage])

  if (isLoading || isFetchingNextPage) return <PlayListSkeleton />

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
          likesState={playList.is_liked}
        />
      ))}
      <div ref={observerElem} />
    </>
  )
}

export default AllSubscribePlayLists
