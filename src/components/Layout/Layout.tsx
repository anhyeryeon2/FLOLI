import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '../header/header-main/Header'
import Navbar from '../navbar/Navbar'
import { ROUTER_PATH, ROUTER_PATH_REGEX } from '@/constants/constant'
import HeaderSub from '../header/header-sub/HeaderSub'
import ModalFull from '../Modal/ModalFull'
import { useModalFullStore } from '@/store/useModalFullStore'
// import { getSearchPlayLists } from '@/apis/search'
// import { useEffect } from 'react'
import { CiTimer } from 'react-icons/ci'
import * as S from './Layout.module'
import { GoArrowUpLeft } from 'react-icons/go'

const mock = [
  { id: 1, name: '제목1' },
  { id: 2, name: '제목2' },
  { id: 3, name: '제목3' },
  { id: 4, name: '제목4' },
  { id: 5, name: '제목5' },
  { id: 6, name: '제목6' }
]

const queryClient = new QueryClient()

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
  const handleMoalFullClose = () => {
    setModalFull(false)
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Container className={!isNoNavbarPaths ? 'is-navbar' : ''}>
        {renderHeader()}
        <Outlet />
        {!isNoNavbarPaths && <Navbar />}
      </Container>
      <ModalFull
        id={'2'}
        closeModal={handleMoalFullClose}
        isOpen={modalFullOpen}>
        {mock.map(mock => (
          <S.ModalfullContent key={mock.id}>
            <CiTimer />
            {mock.name}
            <S.ModalfullClickContent>
              <GoArrowUpLeft />
            </S.ModalfullClickContent>
          </S.ModalfullContent>
        ))}
      </ModalFull>
    </QueryClientProvider>
  )
}
export default Layout
