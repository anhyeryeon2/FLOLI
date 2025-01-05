import styled from 'styled-components'

export const StyledButton = styled.button<{
  $padding?: string
  $color?: string
  $fontSize?: string
  width?: string
  bordertype: '구독' | '기본'
  type: string
}>`
  padding: ${props => props.$padding || 'var(--spacing-3) var(--spacing-6)'};
  color: ${props => props.$color || 'var(--color-white)'};
  border-radius: ${({ bordertype }) =>
    bordertype === '구독' ? 'var(--radius-xl)' : 'var(--radius-lg)'};
  background-color: var(--color-main3);
  font-size: ${props => props.$fontSize || '1.6rem'};
  font-weight: 500;
  width: ${props => props.width || '8rem'};

  transition: all 0.3s;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    color: var(--color-white);
    border: 2px solid var(--color-main3);
    background-color: var(--color-main3);
    &:hover {
      background-color: var(--color-main1);
    }
  }
`
