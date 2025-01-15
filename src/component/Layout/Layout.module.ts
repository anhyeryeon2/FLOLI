import styled from 'styled-components'

export const ModalfullContent = styled.div`
  display: flex;
  font-size: var(--fs-xl);
  gap: 3rem;
  position: relative;
  padding: var(--spacing-3);
  align-items: center;
`

export const ModalFullTop = styled.div`
  flex: 0;
`

export const ModalFullMid = styled.div`
  flex: 1;
  width: 100%;
`

export const ModalFullBottom = styled.div`
  flex: 0;
`

export const ModalSpan = styled.span`
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
