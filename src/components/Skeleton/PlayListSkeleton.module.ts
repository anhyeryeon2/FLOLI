import styled, { keyframes } from 'styled-components'

const pluse = keyframes`
pulse {
  opacity:0.5;
}
`

export const Container = styled.div`
  border-radius: 20px;

  width: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`

export const ItemContainer = styled.div`
  border-radius: 0.75rem;
  background-color: rgba(243, 243, 243, 0.3);
  animation: ${pluse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(var(--max-width) * 9 / 16);
`

export const Thumbnail = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  border-radius: 0.75rem;
  width: 100%;
`

export const SkeletonAvatar = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: var(--radius-full);
  background-color: rgba(243, 243, 243, 0.8);
`

export const ItemContiner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

export const ItemAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
`

export const ItemContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

export const ItemTop = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  border-radius: 0.75rem;
  height: 40px;
  margin-bottom: 1.2rem;
  width: 100%;
`

export const ItemMid = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  height: 30px;
  width: 100%;
  margin-bottom: 1.2rem;
  border-radius: 0.75rem;
`
