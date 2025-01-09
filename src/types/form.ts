/*eslint-disable*/
import { ChangeEvent, ComponentPropsWithRef } from 'react'

// -------- input -------- //
type InputValueType = string | number | string[] | undefined

export interface IInputProps extends ComponentPropsWithRef<'input'> {
  type?: string
  value?: InputValueType
  isCustom?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
// -------- /input -------- //

// -------- textarea -------- //
type TextareaStyleType = {
  width?: string
  height?: string
}

export interface ITextareaProps
  extends ComponentPropsWithRef<'textarea'>,
    TextareaStyleType {
  value?: string | undefined
  isCustom?: boolean
}
// -------- /textarea -------- //
