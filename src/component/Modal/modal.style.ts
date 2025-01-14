import styled, { keyframes } from 'styled-components'

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

export const ModalOverlay = styled.div<{ $isBg?: boolean }>`
  position: fixed;
  z-index: var(--modal-index);
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: var(--max-width);
  transform: translateX(-50%);
  height: ${props => (props.$isBg ? '100%' : 'auto')};
  background: ${props => (props.$isBg ? 'rgba(0, 0, 0, 0.5)' : 'none')};
`

export const ModalContainer = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${props => (props.$height ? props.$height : 'auto')};
  max-height: 100%;
  background: var(--color-white);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s forwards;
`

export const ModalContent = styled.div`
  flex: 1 1 auto;
  padding: 0 var(--layout-padding);
`
