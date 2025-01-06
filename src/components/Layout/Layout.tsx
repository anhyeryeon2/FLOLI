import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../header/header-main/Header'
import Navbar from '../navbar/Navbar'
import { ROUTER_PATH, ROUTER_PATH_REGEX } from '@/constants/constant'
import HeaderSub from '../header/header-sub/HeaderSub'

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
  const noHeaderPaths = [ROUTER_PATH.LOGIN, ROUTER_PATH.SIGNUP]
  const noNavbarPaths = [
    ROUTER_PATH.LOGIN,
    ROUTER_PATH.SIGNUP,
    ROUTER_PATH.VIEW
  ]

  const isNoHeaderPaths =
    noHeaderPaths.includes(location.pathname) ||
    ROUTER_PATH_REGEX.VIEW.test(location.pathname)
  const isNoNavbarPaths =
    noNavbarPaths.includes(location.pathname) ||
    ROUTER_PATH_REGEX.VIEW.test(location.pathname)

  const isSubHeaderPaths = ROUTER_PATH_REGEX.VIEW.test(location.pathname)

  return (
    <Container className={!isNoNavbarPaths ? 'is-navbar' : ''}>
      {!isNoHeaderPaths && <Header />}
      {isSubHeaderPaths && <HeaderSub />}
      <Outlet />
      {!isNoNavbarPaths && <Navbar />}
    </Container>
  )
}

export default Layout
