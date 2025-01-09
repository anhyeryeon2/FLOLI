import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Wrapper = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
`

export const InnerCircle = styled.div`
  position: absolute;
  top: 0;
  border: 0;
  width: 100%;
  height: 100%;
  border-width: 4px;
  border-color: rgba(90, 74, 244, 0.5);
  border-top-color: transparent;
  border-style: solid;
  border-radius: 9999px;
  animation: ${spin} 1s linear infinite;
`
