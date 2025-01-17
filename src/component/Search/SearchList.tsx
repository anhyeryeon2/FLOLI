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

// 검색한 내용을 담아냄
const SearchList = () => {
  const modalFullOpen = useSearchModalFullStore(state => state.state)
  const searchTermList = useSearchTermListStore(state => state.searchTermList)
  const setModalFull = useSearchModalFullStore(state => state.setModalState)
  const searchTerm = useSearchTermStore(state => state.searchTerm)
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)
  const addSearchTerm = useSearchTermListStore(state => state.addSearchTerm)

  const navigate = useNavigate()
  const searchPersist = localStorage.getItem('searchTermList')
  const parsedData = JSON.parse(searchPersist || '')
  const debouncedTitle = useDebounce(searchTerm, 300)
  // const path = window.location.pathname

  const handleMoalFullClose = () => {
    setModalFull(false)
    setSearchTerm('')
    navigate(`/search?search=${parsedData}`)
  }

  const handleSearchClick = (term?: string) => {
    setModalFull(false) // 모달 닫기
    const searchValue = term || searchTerm // term이 있을 경우 사용, 아니면 searchTerm 사용
    setSearchTerm(searchValue) // 선택된 검색어 설정
    addSearchTerm(searchValue) // 최근 검색어 목록에 추가
    navigate(`/search?search=${searchValue}`, { state: searchValue }) // navigate로 검색어와 함께 이동
  }

  const { data: searchs, isError } = useQuery<IPlayList[]>({
    queryKey: ['searchPlayList', debouncedTitle],
    queryFn: () => getSearchPlayLists(debouncedTitle),
    enabled: !!debouncedTitle,
    staleTime: 1000 * 60
  })

  if (isError) throw new Error('에러가 발생했습니다.')

  return (
    <>
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
    </>
  )
}

export default SearchList
