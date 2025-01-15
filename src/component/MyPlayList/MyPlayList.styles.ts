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
  font-weight: 500;
  color: var(--color-black);
  padding: var(--spacing-4) 0;
  display: flex;
  align-items: start;

  span {
    font-size: var(--fs-xl);
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
