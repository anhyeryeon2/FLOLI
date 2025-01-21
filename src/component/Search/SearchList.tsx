import { CiTimer } from 'react-icons/ci'
import * as S from '../Layout/Layout.module'
import { GoArrowUpLeft } from 'react-icons/go'

import { ModalFull } from '@/component'
import { useSearchModalFullStore } from '@/store/useSearchModalFullStore'
import {
  useSearchTermListStore,
  useSearchTermStore
} from '@/store/useSearchTermStore'
import { useNavigate } from 'react-router-dom'
import { IPlayList } from '@/types/playList'
import { useDebounce } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { getSearchPlayLists } from '@/apis/search/playList'
import { Profiler, ProfilerOnRenderCallback, memo, useCallback } from 'react'

// 검색한 내용을 담아냄
const SearchList = () => {
  const modalFullOpen = useSearchModalFullStore(state => state.state)
  const searchTermList = useSearchTermListStore(state => state.searchTermList)
  const setModalFull = useSearchModalFullStore(state => state.setModalState)
  const searchTerm = useSearchTermStore(state => state.searchTerm)
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)
  const addSearchTerm = useSearchTermListStore(state => state.addSearchTerm)

  const navigate = useNavigate()
  const debouncedTitle = useDebounce(searchTerm, 300)

  const handleMoalFullClose = useCallback(() => {
    setModalFull(false)
    setSearchTerm('')
  }, [setModalFull, setSearchTerm])

  const handleSearchClick = useCallback(
    (term?: string) => {
      setModalFull(false) // 모달 닫기
      const searchValue = term || searchTerm // term이 있을 경우 사용, 아니면 searchTerm 사용
      setSearchTerm(searchValue) // 선택된 검색어 설정
      addSearchTerm(searchValue) // 최근 검색어 목록에 추가
      navigate(`/search?search=${searchValue}`, { state: searchValue }) // navigate로 검색어와 함께 이동
    },
    [setModalFull, setSearchTerm, addSearchTerm]
  )

  const { data: searchs, isError } = useQuery<IPlayList[]>({
    queryKey: ['searchPlayList', debouncedTitle],
    queryFn: () => getSearchPlayLists(debouncedTitle),
    enabled: !!debouncedTitle,
    staleTime: 1000 * 60
  })

  if (isError) throw new Error('에러가 발생했습니다.')

  const onRenderCallback: ProfilerOnRenderCallback = (
    id, // 방금 커밋된 Profiler 트리의 "id"
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
    baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    commitTime // React가 해당 업데이트를 언제 커밋했는지
    // interactions,
  ) => {
    console.log('[searchList] Info]', {
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
        id="searchList">
        <ModalFull
          id={'2'}
          closeModal={handleMoalFullClose}
          isOpen={modalFullOpen}>
          {searchTerm.length > 0
            ? searchs?.map((search: IPlayList) => (
                <S.ModalfullContent
                  key={search.playlist_id}
                  onClick={() => handleSearchClick()}>
                  <S.ModalFullTop>
                    <CiTimer onClick={() => handleSearchClick()} />
                  </S.ModalFullTop>
                  <S.ModalFullMid>
                    <S.ModalSpan>{search.title}</S.ModalSpan>
                  </S.ModalFullMid>
                  <S.ModalFullBottom>
                    <GoArrowUpLeft />
                  </S.ModalFullBottom>
                </S.ModalfullContent>
              ))
            : searchTermList &&
              searchTermList?.map(search => (
                <S.ModalfullContent
                  key={search.id}
                  onClick={() => handleSearchClick(search.term)}>
                  <S.ModalFullTop>
                    <CiTimer />
                  </S.ModalFullTop>
                  <S.ModalFullMid>
                    <S.ModalSpan>{search.term}</S.ModalSpan>
                  </S.ModalFullMid>
                  <S.ModalFullBottom>
                    <GoArrowUpLeft />
                  </S.ModalFullBottom>
                </S.ModalfullContent>
              ))}
        </ModalFull>
      </Profiler>
    </>
  )
}

export default memo(SearchList)
