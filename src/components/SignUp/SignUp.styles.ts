import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: var(--color-white);
  padding: var(--spacing-6);
`

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 10rem;
`

export const Logo = styled.img`
  width: 120px;
  margin-bottom: var(--spacing-7);
`

export const Title = styled.h2`
  font-size: var(--fs-xl);
  color: var(--color-black);
  margin: var(--spacing-5) 0;
  text-align: left;
  width: 100%;
  max-width: var(--max-width);
`

export const InputWrapper = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin-bottom: var(--spacing-4);
`

export const ErrorMessage = styled.p`
  font-size: var(--fs-l);
  color: var(--color-red);
  margin-top: var(--spacing-2);
`

export const BottomSection = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin-bottom: var(--spacing-5);
`

export const LoadingMessage = styled.p`
  font-size: var(--fs-l);
  color: var(--color-gray);
  margin-top: var(--spacing-2);
  text-align: center;
`
