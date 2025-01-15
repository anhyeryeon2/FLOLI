import styled from 'styled-components'

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  padding: var(--spacing-5);
  text-align: center;
`

export const ErrorTitle = styled.h2`
  color: var(--color-red);
  margin-bottom: var(--spacing-4);
  font-size: var(--fs-xl);
  font-weight: 700;
`

export const ErrorMessage = styled.p`
  color: var(--color-gray);
  margin-bottom: var(--spacing-6);
  font-size: var(--fs-l);
`

export const ResetButton = styled.button`
  background-color: var(--color-red);
  color: var(--color-white);
  border: none;
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--radius-md);
  font-size: var(--fs-l);
  transition: background-color 0.2s;
`
