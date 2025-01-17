import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../header/header-main/Header'
import { ROUTER_PATH, ROUTER_PATH_REGEX } from '@/constants/constant'
import HeaderSub from '../header/header-sub/HeaderSub'

import { Navbar } from '@/component'
import SearchList from '../Search/SearchList'

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
    ROUTER_PATH.SIGNUP_NICKNAME,
    ROUTER_PATH.END_SIGNUP
  ]
  const noNavbarPaths = [
    ROUTER_PATH.LOGIN,
    ROUTER_PATH.SIGNUP_EMAIL,
    ROUTER_PATH.SIGNUP_PASSWORD,
    ROUTER_PATH.SIGNUP_NICKNAME,
    ROUTER_PATH.END_SIGNUP,
    ROUTER_PATH.VIEW
  ]
  const backHeaderPaths = ROUTER_PATH_REGEX.VIEW.test(location.pathname)
  const secondBackHeaderPaths = ROUTER_PATH_REGEX.USERPROFILE.test(
    location.pathname
  )

  const isNoHeaderPaths = noHeaderPaths.includes(location.pathname)
  const isBackHeaderPaths = backHeaderPaths
  const isSecondBackHeaderPaths = secondBackHeaderPaths
  const isNoNavbarPaths =
    noNavbarPaths.includes(location.pathname) ||
    ROUTER_PATH_REGEX.VIEW.test(location.pathname)

  const isSubHeaderPaths = ''

  const renderHeader = () => {
    if (isSubHeaderPaths) {
      return <HeaderSub />
    } else if (isBackHeaderPaths) {
      return <Header isBack={true} />
    } else if (isSecondBackHeaderPaths) {
      return <Header isBack={true} />
    } else if (isNoHeaderPaths) {
      return null
    } else {
      return <Header />
    }
  }

  return (
    <>
      <Container className={!isNoNavbarPaths ? 'is-navbar' : ''}>
        {renderHeader()}
        <Outlet />
        {!isNoNavbarPaths && <Navbar />}
      </Container>
      <SearchList />
    </>
  )
}

export default Layout
