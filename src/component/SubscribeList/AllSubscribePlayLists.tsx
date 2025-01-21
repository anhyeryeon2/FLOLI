import { FeedList, Loading } from '@/component'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getSubscribeAllPlayLists } from '@/apis/subscribe/playList/index'
import { useInfiniteScroll } from '@/hooks'
import { useRef, useEffect, ProfilerOnRenderCallback, Profiler } from 'react'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { IPlayListType } from '@/types/playList'

const AllSubscribePlayLists = () => {
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { showToastMessage } = useToastMessageContext()
  const queryClient = useQueryClient()

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
    queryClient.invalidateQueries({ queryKey: ['allSubscribePlayList'] })
  }, [allPlayLists])

  useEffect(() => {
    if (isError) {
      showToastMessage({
        message: '에러가 발생하여 구독자 정보를 가져오지 못하였습니다..',
        type: 'error'
      })
    }
  }, [isError, showToastMessage])

  if (isLoading) return <Loading />

  const onRenderCallback: ProfilerOnRenderCallback = (
    id, // 방금 커밋된 Profiler 트리의 "id"
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
    baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    commitTime // React가 해당 업데이트를 언제 커밋했는지
    // interactions,
  ) => {
    console.log('[AllsubscribeP] Info]', {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
      // interactions,
    })
  }

  return (
    <>
      <Profiler
        onRender={onRenderCallback}
        id="feedlist">
        {allPlayLists?.map((playList: IPlayListType) => (
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
        ))}
        {isFetchingNextPage && <Loading />}
        <div ref={observerElem} />
      </Profiler>
    </>
  )
}

export default AllSubscribePlayLists
