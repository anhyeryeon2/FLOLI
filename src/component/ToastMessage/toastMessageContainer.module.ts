import styled from 'styled-components'
export const ToastMessageContainer = styled.div`
  position: fixed;
  bottom: 7.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: var(--max-width);
  padding-left: 0.4rem;
  padding-right: 0.4rem;
`
