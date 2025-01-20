import { FeedList, Loading } from '@/component'
import { useQueryClient } from '@tanstack/react-query'
import { IPlayListType } from '@/types/playList'
import { useEffect, useRef } from 'react'
import { useInfiniteScroll } from '@/hooks'
import { useLocation } from 'react-router-dom'
import useFetchPlayList from '@/hooks/useFetchPlayList'

export function Home() {
  const location = useLocation()
  const isMainPage = location.pathname === '/'

  const observerElem = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()
  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useFetchPlayList({ isMainPage })

  useInfiniteScroll({
    observerElem,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['playList'] })
  }, [data])

  if (isLoading) {
    return <Loading />
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

export default Home
