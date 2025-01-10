import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Header from '../header/header-main/Header'
import Navbar from '../navbar/Navbar'
import { ROUTER_PATH, ROUTER_PATH_REGEX } from '@/constants/constant'
import HeaderSub from '../header/header-sub/HeaderSub'
import ModalFull from '../Modal/ModalFull'
import { useModalFullStore } from '@/store/useModalFullStore'

import { CiTimer } from 'react-icons/ci'
import * as S from './Layout.module'
import { GoArrowUpLeft } from 'react-icons/go'
import { getSearch } from '@/apis/search'

import {
  useSearchTermListStore,
  useSearchTermStore
} from '@/store/useSearchTermStore'
import Loading from '../LoadingSpinner/Loading'
import { IPlayList } from '@/types/playList'

const Container = styled.div`
  max-width: var(--max-width);
  min-height: 100vh;
  margin: 0 auto;
  background: var(--color-white);
  &.is-navbar {
    padding-bottom: var(--navbar-height);
  }
`

const Layout = () => {
  const location = useLocation()
  const noHeaderPaths = [
    ROUTER_PATH.LOGIN,
    ROUTER_PATH.SIGNUP_EMAIL,
    ROUTER_PATH.SIGNUP_PASSWORD,
    ROUTER_PATH.SIGNUP_NICKNAME
  ]
  const noNavbarPaths = [
    ROUTER_PATH.LOGIN,
    ROUTER_PATH.SIGNUP_EMAIL,
    ROUTER_PATH.SIGNUP_PASSWORD,
    ROUTER_PATH.SIGNUP_NICKNAME,
    ROUTER_PATH.VIEW
  ]
  const backHeaderPaths = ROUTER_PATH_REGEX.VIEW.test(location.pathname)

  const isNoHeaderPaths = noHeaderPaths.includes(location.pathname)
  const isBackHeaderPaths = backHeaderPaths
  const isNoNavbarPaths =
    noNavbarPaths.includes(location.pathname) ||
    ROUTER_PATH_REGEX.VIEW.test(location.pathname)

  const isSubHeaderPaths = ''

  const modalFullOpen = useModalFullStore(state => state.state)
  const setModalFull = useModalFullStore(state => state.setModalState)
  const searchTerm = useSearchTermStore(state => state.searchTerm)
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)
  const addSearchTerm = useSearchTermListStore(state => state.addSearchTerm)
  const searchTermList = useSearchTermListStore(state => state.searchTermList)
  const navigate = useNavigate()
  const renderHeader = () => {
    if (isSubHeaderPaths) {
      return <HeaderSub />
    } else if (isBackHeaderPaths) {
      return <Header isBack={true} />
    } else if (isNoHeaderPaths) {
      return null
    } else {
      return <Header />
    }
  }

  const {
    data: searchs,
    isError,
    isLoading
  } = useQuery<IPlayList[]>({
    queryKey: ['searchPlayList', searchTerm],
    queryFn: () => getSearch(searchTerm),
    enabled: !!searchTerm,
    staleTime: 1000 * 60
  })

  const handleMoalFullClose = () => {
    setModalFull(false)
    setSearchTerm('')
  }

  const handleSearchClick = (term?: string) => {
    setModalFull(false) // 모달 닫기
    const searchValue = term || searchTerm // term이 있을 경우 사용, 아니면 searchTerm 사용
    setSearchTerm(searchValue) // 선택된 검색어 설정
    addSearchTerm(searchValue) // 최근 검색어 목록에 추가
    navigate(`/search?search=${searchValue}`, { state: searchValue }) // navigate로 검색어와 함께 이동
  }

  if (isLoading) <Loading />

  if (isError) <div>에러가 났습니다. 다시 시도 해주세요</div>

  return (
    <>
      <Container className={!isNoNavbarPaths ? 'is-navbar' : ''}>
        {renderHeader()}
        <Outlet />
        {!isNoNavbarPaths && <Navbar />}
      </Container>
      <ModalFull
        id={'2'}
        closeModal={handleMoalFullClose}
        isOpen={modalFullOpen}>
        {searchTerm.length > 0
          ? searchs?.map((search: IPlayList) => (
              <S.ModalfullContent
                key={search.playlist_id}
                onClick={() => handleSearchClick()}>
                <CiTimer />
                <S.ModalSpan>{search.title}</S.ModalSpan>
                <S.ModalfullClickContent>
                  <GoArrowUpLeft />
                </S.ModalfullClickContent>
              </S.ModalfullContent>
            ))
          : searchTermList &&
            searchTermList?.map(search => (
              <S.ModalfullContent
                key={search.id}
                onClick={() => handleSearchClick(search.term)}>
                <CiTimer />
                <S.ModalSpan>{search.term}</S.ModalSpan>
                <S.ModalfullClickContent>
                  <GoArrowUpLeft />
                </S.ModalfullClickContent>
              </S.ModalfullContent>
            ))}
      </ModalFull>
    </>
  )
}

export default Layout
