import { FeedList, Loading } from '@/component'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getSubscribePlayLists } from '@/apis/subscribe/subscribePlayList/index'
import { useInfiniteScroll } from '@/hooks'
import { useRef, useEffect } from 'react'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { IPlayListType } from '@/types/playList'
import useFetchSubscribePlayList from '@/hooks/useFetchSubscribePlayList'

interface Props {
  userId: string
}

const SubscribePlayLists = ({ userId }: Props) => {
  const observerElem = useRef<HTMLDivElement | null>(null)
  const { showToastMessage } = useToastMessageContext()
  const queryClient = useQueryClient()

  const {
    data: subscribePlayLists,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useFetchSubscribePlayList(userId)

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

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['subscribePlayList'] })
  }, [subscribePlayLists])

  if (isLoading) return <Loading />

  return (
    <>
      {subscribePlayLists?.map((playList: IPlayListType) => (
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

export default SubscribePlayLists
