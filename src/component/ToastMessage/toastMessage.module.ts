import { ToastMessageType } from '@/types/ToastMessage'
import styled, { css, keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const ToastItemContainer = styled.div<{ type: ToastMessageType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-3);
  box-shadow: var(--shadow-s);
  border-radius: var(--radius-base);
  animation: ${slideIn} 0.3s ease-in-out;
  ${props =>
    props.type === 'error' &&
    css`
      background-color: #ff4d4f; /* bg-error-500 */
      color: #fff;
    `}
  ${props =>
    props.type === 'success' &&
    css`
      background-color: #52c41a; /* bg-success-500 */
      color: #fff;
    `}
  ${props =>
    props.type === 'info' &&
    css`
      background-color: #1890ff; /* bg-info-500 */
      color: #fff;
    `}

  span {
    font-size: 1rem;
    font-weight: 500;
    margin-right: 1rem;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5; /* hover:bg-black-200 */
    }
  }
`
