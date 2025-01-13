import styled, { keyframes } from 'styled-components'

export const slideUp = keyframes`
  from {
    transform: translateY(20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 35rem;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  text-align: center;
  padding: var(--spacing-6) var(--spacing-6);
  box-shadow: var(--shadow-l);
  animation: ${slideUp} 0.2s ease-out;
  box-sizing: border-box;
`

export const Title = styled.h2`
  font-size: var(--fs-xl);
  font-weight: 700;
  color: var(--color-black);
  margin-bottom: var(--spacing-4);
  margin-top: var(--spacing-4);
`

export const Description = styled.p`
  font-size: var(--fs-l);
  color: var(--color-gray);
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-5);
  margin-top: var(--spacing-6);
`

export const Button = styled.button<{ $type: 'confirm' | 'cancel' }>`
  flex: 1;
  padding: var(--spacing-2) 0;
  font-size: var(--fs-l);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  ${({ $type }) =>
    $type === 'cancel'
      ? `
        background: var(--color-bg2);
        color: var(--color-gray);
        border: none;
      `
      : `
        background: var(--color-main1);
        color: var(--color-white);
        border: none;
      `}
`
