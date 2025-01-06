import styled, { keyframes } from 'styled-components'

const pluse = keyframes`
pulse {
  opacity:0.5;
}
`

export const Container = styled.div`
  width: 360px;

  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const ItemContainer = styled.div`
  height: 360px;
  border-radius: 0.75rem;
  background-color: rgba(243, 243, 243, 0.3);
  animation: ${pluse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const Thumbnail = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  border-radius: 0.75rem;
  height: 250px;
  width: 360px;
`

export const SkeletonAvatar = styled.div`
  width: 50px; /* 아바타 크기 */
  height: 50px; /* 아바타 크기 */
  border-radius: 50%; /* 원형 */
  background-color: #d6d6d6; /* 스켈레톤 바탕색 */
`

export const ItemContiner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
export const ItemAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto; /* 증가너비 감소너비 기본너비 */
  width: 100px;
`

export const ItemContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

export const ItemTop = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  border-radius: 0.75rem;
  height: 40px;
  margin-bottom: 1.2rem;
  width: 80%;
`

export const ItemMid = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  height: 30px;
  width: 80%;
  margin-bottom: 1.2rem;
  border-radius: 0.75rem;
`
