import { getSearchPlayLists } from '@/apis/search/playList/index'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import {
  Profiler,
  ProfilerOnRenderCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import * as S from '@/component/FeedList/FeedList.style'
import { FeedList, Loading } from '@/component'
import { IPlayListType } from '@/types/playList'
import { useInfiniteScroll } from '@/hooks'
import { useLocation } from 'react-router-dom'

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
  } = useInfiniteQuery({
    queryKey: ['playListSearch', searchTerm],
    queryFn: ({ pageParam }) =>
      getSearchPlayLists(searchTerm, pageParam as number),

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
  const onRenderCallback: ProfilerOnRenderCallback = (
    id, // 방금 커밋된 Profiler 트리의 "id"
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
    baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    commitTime // React가 해당 업데이트를 언제 커밋했는지
    // interactions,
  ) => {
    console.log('[search] Info]', {
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
        id="search">
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
      </Profiler>
    </>
  )
}
