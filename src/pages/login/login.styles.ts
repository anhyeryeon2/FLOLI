import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const Logo = styled.img`
  width: 120px;
  margin-bottom: var(--spacing-7);
`

export const Form = styled.form`
  margin-top: var(--spacing-3);
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: var(--max-width);
`

export const InputWrapper = styled.div`
  margin-bottom: var(--spacing-5);
`

export const Divider = styled.hr`
  margin: var(--spacing-5) 0;
  border-top: 1px solid var(--color-border);
`
export const SignupText = styled.p`
  margin-top: var(--spacing-5);
  font-size: var(--fs-m);
  color: var(--color-gray);
  text-align: center;
`

export const SignupLink = styled.span`
  color: var(--color-main1);
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`
export const ErrorMessage = styled.p`
  font-size: var(--fs-s);
  color: red;
  margin-top: var(--spacing-2);
`
