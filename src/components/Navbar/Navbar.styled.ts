import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface IconProps {
  active?: boolean
  size?: number
}

export const NavbarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: var(--navbar-height);
  max-width: var(--max-width);
  background-color: var(--color-white);
  box-shadow: var(--shadow-s);
  z-index: var(--header-index);
`
export const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`

export const MenuItem = styled(Link)<{ $isCenter?: boolean }>`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  span {
    font-size: var(--fs-m);
    color: var(--color-black);
  }
`

export const Icon = styled.div<IconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 2.4rem;
  }
  .profile-img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`
