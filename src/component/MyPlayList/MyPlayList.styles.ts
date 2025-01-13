import styled from 'styled-components'

export const PlayListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
  padding: var(--spacing-5);
`
export const Title = styled.p`
  font-size: var(--fs-xl);
  text-align: left;
  color: var(--color-black);
`
export const PlayListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
  align-items: center;
`
export const EmptyState = styled.div`
  font-size: var(--fs-l);
  color: var(--color-gray);
  text-align: center;
  padding: var(--spacing-7);
`
