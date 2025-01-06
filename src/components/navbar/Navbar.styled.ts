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
  max-width: var(--max-width);
  background-color: var(--color-white);
  box-shadow: var(--shadow-s);
  z-index: var(--header-index);
`
export const Menu = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-white);
`

export const MenuItem = styled(Link)<{ $isCenter?: boolean }>`
  align-items: center;
  cursor: pointer;
  text-align: center;
  flex: ${props => (props.$isCenter ? '0 0 20%' : '1')};
  span {
    font-size: var(--fs-m);
    color: #333;
  }
`

export const Icon = styled.div<IconProps>`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`
