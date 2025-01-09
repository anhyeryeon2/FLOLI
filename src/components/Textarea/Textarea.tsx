import { ITextareaProps } from '@/types/form'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

/**
 * 커스텀 attr 참고
 * @param {string} [width]
 * @param {string} [height]
 */
const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ width, height, value, isCustom, onChange, ...props }, ref) => {
    return (
      <StyledTextarea
        width={width}
        height={height}
        ref={ref}
        value={value}
        isCustom={isCustom}
        onChange={onChange}
        {...props}
      />
    )
  }
)

const mainStyle = css`
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--fs-l);
  font-weight: 500;
  border-radius: var(--radius-base);
  border: 1px solid var(--color-border);

  &:focus,
  &:focus-visible {
    border: 1px solid var(--color-main1);
  }
`

const StyledTextarea = styled.textarea<
  Pick<ITextareaProps, 'width' | 'height' | 'isCustom'>
>`
  resize: none;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '11.2rem'};
  ${props => !props.isCustom && mainStyle};
`

export default Textarea
