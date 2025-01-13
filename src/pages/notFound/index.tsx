import { Link } from 'react-router-dom'
import styled from 'styled-components'

export function NotFound() {
  return (
    <Container>
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
      <HomeLink to="/">홈으로 이동</HomeLink>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-white);
  text-align: center;
  color: var(--color-black);
`

const ErrorTitle = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  margin-bottom: var(--spacing-4);
  color: var(--color-coral-dark);
`

const ErrorMessage = styled.p`
  font-size: var(--fs-xl);
  margin-bottom: var(--spacing-5);
  color: var(--color-gray);
`

const HomeLink = styled(Link)`
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--fs-l);
  font-weight: 700;
  color: var(--color-main1);
  text-decoration: underline;
`
