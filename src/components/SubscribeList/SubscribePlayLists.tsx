import FeedList from '@/components/FeedList/FeedList'
import PlayListSkeleton from '@/components/Skeleton/PlayListSkeleton'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSubscribePlayLists } from '@/apis/subscribe/subscribePlayList/index'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRef } from 'react'

interface Props {
  userId: string
}

const SubscribePlayLists = ({ userId }: Props) => {
  const observerElem = useRef<HTMLDivElement | null>(null)

  const {
    data: subscribePlayLists,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['subscribePlayList', userId],
    queryFn: ({ pageParam }) =>
      getSubscribePlayLists(userId, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.length ? nextPage : undefined
    },
    select: data => data.pages.flat(),
    enabled: !!userId,
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
      {subscribePlayLists?.map(playList => (
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

export default SubscribePlayLists
