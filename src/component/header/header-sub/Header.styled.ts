import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-4);
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--header-index);
  height: var(--header-height);
`

export const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: var(--layout-padding);
  transform: translateY(-50%);
  line-height: 0;
`

export const Content = styled.span`
  font-size: 2rem;
`

export const Headeritem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const HeaderInput = styled.input`
  width: 90%;

  padding: 5px 20px 5px 5px;
  border: 1px solid #ccc;
  border-radius: var(--radius-xl);
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  color: #888;
`
