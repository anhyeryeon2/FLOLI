import styled from 'styled-components'

export const OptionPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 99;
  background-color: white;
  position: absolute;
  bottom: -45px;
  padding: var(--spacing-3);
  right: -60px;
  align-items: center;
  gap: 20px;
  background-color: red;
`

export const OptionPopupItem = styled.div`
  font-size: var(--fs-m);
  display: flex;
  width: 100%;
  gap: 5px;
`
