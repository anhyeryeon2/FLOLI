import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--header-index);
  width: 100%;
  height: var(--header-height);
  box-sizing: border-box;
`

export const Logo = styled.img`
  width: 90px;
  color: var(--color-black);
`

export const SearchIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`
