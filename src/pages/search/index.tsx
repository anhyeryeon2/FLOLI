import { getSearchPlayLists } from '@/apis/search/playList/index'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import * as S from '@/component/FeedList/FeedList.style'
import { FeedList, Loading } from '@/component'
import { IPlayListType } from '@/types/playList'
import { useInfiniteScroll } from '@/hooks'
import { useLocation } from 'react-router-dom'
import useFetchSearchPlayLists from '@/hooks/useFetchSearchPlayList'

export const SearchPage = () => {
  const location = useLocation()

  const searchUrl = location.state

  const [searchTerm, setSearchTerm] = useState<string>(searchUrl)
  const observerElem = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()

  const {
    data,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useFetchSearchPlayLists(searchTerm)

  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm)
    }
  }, [location.state])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['playListSearch'] })
  }, [data])

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
  if (isLoading) {
    return <Loading />
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          검색한 내용이 없습니다.
        </div>
      )}
      {isFetchingNextPage && <Loading />}
      <div ref={observerElem} />
    </S.FeedConteiner>
  )
}
