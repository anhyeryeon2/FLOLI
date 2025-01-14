import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: var(--color-white);
  text-align: center;
  gap: var(--spacing-8);
  padding-top: 25rem;
`

export const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: var(--spacing-6);
`

export const Message = styled.div`
  margin: var(--spacing-6);

  h1 {
    font-size: var(--fs-xl);
    font-weight: 700;
    margin-bottom: var(--spacing-4);
  }

  p {
    font-size: var(--fs-l);
    color: var(--color-gray);
    margin-bottom: var(--spacing-4);
  }
`
