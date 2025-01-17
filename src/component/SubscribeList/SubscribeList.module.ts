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
  width: 40px;
  height: 38px;
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

export const ModalfullContent = styled.div`
  display: flex;
  font-size: var(--fs-mg);
  gap: 3rem;
  position: relative;
  padding: var(--spacing-3);
  align-items: center;
`

export const ModalfullClickContent = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`

export const SubscribeAllLength = styled.p`
  margin-left: 1.5rem;
  margin-bottom: 2rem;
`

export const NickNameSpan = styled.span`
  white-space: nowrap;
  width: 66%;
  overflow: hidden;
  text-overflow: ellipsis;
`
