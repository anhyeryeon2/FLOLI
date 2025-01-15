import { FeedList, PlayListSkeleton } from '@/component'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSubscribePlayLists } from '@/apis/subscribe/subscribePlayList/index'
import { useInfiniteScroll } from '@/hooks'
import { useRef, useEffect } from 'react'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

interface Props {
  userId: string
}

const SubscribePlayLists = ({ userId }: Props) => {
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { showToastMessage } = useToastMessageContext()

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
