import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../header/header-main/Header'
import Navbar from '../navbar/Navbar'

export const Container = styled.div`
  max-width: var(--max-width);
  min-height: 100vh;
  margin: 0 auto;
  background: var(--color-white);
`

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <Navbar />
    </Container>
  )
}

export default Layout
