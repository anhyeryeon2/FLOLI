import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-4);
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--header-index);
  height: var(--header-height);
`

export const Logo = styled.img`
  width: 6rem;
`

export const SearchIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`
