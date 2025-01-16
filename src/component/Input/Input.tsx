import { IInputProps } from '@/types/form'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

/**
 * 커스텀 attr 참고
 * @param {string} [width]
 * @param {string} [height]
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    { width, height, type = 'text', value, isCustom, onChange, ...props },
    ref
  ) => {
    return (
      <>
        <StyledInput
          width={width}
          height={height}
          type={type}
          ref={ref}
          value={value}
          isCustom={isCustom}
          onChange={onChange}
          {...props}
        />
      </>
    )
  }
)

const mainStyle = css`
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--fs-l);
  border-radius: var(--radius-base);
  border: 1px solid var(--color-border);

  &:focus,
  &:focus-visible {
    border: 1px solid var(--color-main1);
  }
`

const StyledInput = styled.input<
  Pick<IInputProps, 'width' | 'height' | 'isCustom'>
>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  ${props => !props.isCustom && mainStyle};

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    box-shadow: 0 0 0 1000px #fff inset !important;
  }
`
