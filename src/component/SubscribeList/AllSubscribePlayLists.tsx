import { FeedList, Loading } from '@/component'
import { useQueryClient } from '@tanstack/react-query'
import { useInfiniteScroll } from '@/hooks'
import { useRef, useEffect } from 'react'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { IPlayListType } from '@/types/playList'
import useFetchAllSubscribePlayList from '@/hooks/useFetchAllSubscribePlayList'

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
  } = useFetchAllSubscribePlayList()
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

  return (
    <>
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
    </>
  )
}

export default AllSubscribePlayLists
