import { ProfileButtonSize } from '@/types/profile'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ProfileButtonWrapper = styled(Link)<{ size?: ProfileButtonSize }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: ${({ size }) => {
    if (size === 'small') return '6rem'
    if (size === 'medium') return '10rem'
    if (size === 'large') return '30rem'
    return size || '10rem'
  }};
  height: ${({ size }) => {
    if (size === 'small') return '6rem'
    if (size === 'medium') return '10rem'
    if (size === 'large') return '30rem'
    return size || '10rem'
  }};
  border-radius: var(--radius-xl);
  overflow: hidden;
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
