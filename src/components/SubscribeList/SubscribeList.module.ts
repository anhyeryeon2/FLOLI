import styled from 'styled-components'

export const SubscribeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const SubscribeListContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  align-items: center;
  margin-right: auto;
  flex-grow: 1;
  margin-left: 4rem;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const SubscribeListItem = styled.div`
  display: flex;
  justify-content: space-around;
  padding: var(--spacing-2);
  width: 100px;
`

export const SubscribeItem = styled.div`
  width: 100px;
`

export const SubscribeAvatar = styled.img`
  width: 61px;
  height: 59px;
  border-radius: 999px;
  object-fit: cover;
`
export const SubscribeAllList = styled.button`
  display: flex;
  justify-content: center;
  width: 0; /* 초기 width는 0 */
  flex-shrink: 0; /* 크기가 줄어들지 않도록 설정 */
  flex-basis: 14%;
`
