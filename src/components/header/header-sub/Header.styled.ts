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
