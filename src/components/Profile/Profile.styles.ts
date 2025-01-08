import { ProfileButtonSize } from '@/types/profile'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface ProfileButtonWrapperProps {
  size?: ProfileButtonSize
  radius?: string
}

export const ProfileButtonWrapper = styled(Link)<ProfileButtonWrapperProps>`
  background: none;
  border: none;
  display: inline-block;
  border-radius: ${({ radius }) => radius || 'var(--radius-full)'};
  padding: 0;
  cursor: pointer;
  width: ${({ size }) => {
    if (size === 'xsmall') return '3rem'
    if (size === 'small') return '6rem'
    if (size === 'medium') return '10rem'
    if (size === 'large') return '30rem'
    return size || '10rem'
  }};
  height: ${({ size }) => {
    if (size === 'xsmall') return '3rem'
    if (size === 'small') return '6rem'
    if (size === 'medium') return '10rem'
    if (size === 'large') return '30rem'
    return size || '10rem'
  }};
  overflow: hidden;
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
