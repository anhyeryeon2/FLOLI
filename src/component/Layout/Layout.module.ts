import styled from 'styled-components'

export const ModalfullContent = styled.div`
  display: flex;
  font-size: var(--fs-xl);
  gap: 3rem;
  position: relative;
  padding: var(--spacing-3);
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const ModalfullClickContent = styled.div`
  position: absolute;
  right: 0;
`

export const ModalSpan = styled.span`
  display: flex;
  overflow: hidden;
  width: 80%;
  text-overflow: ellipsis;
`
