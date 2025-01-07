import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px;
`

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 10rem;
`

export const Logo = styled.img`
  width: 120px;
  margin-bottom: 30px;
`

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin: 15px 0;
  text-align: left;
  width: 100%;
  max-width: 400px;
`

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`

export const ErrorMessage = styled.p`
  font-size: 0.9rem;
  color: red;
  margin-top: 8px;
`

export const BottomSection = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 30px;
`
