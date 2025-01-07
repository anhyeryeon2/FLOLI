import styled from 'styled-components'

export const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`

export const FormContainer = styled.form``

export const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--spacing-7);
  gap: var(--spacing-6);
`
export const ContentContainer = styled.form`
  padding: var(--spacing-5) 5rem var(--spacing-5) 5rem;
`

export const Label = styled.label`
  font-size: var(--fs-2xl);
  display: block;
  margin-bottom: var(--spacing-3);
  font-weight: 500;
`

export const ContentBox = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: var(--spacing-7);
`
export const CompleteBox = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-7);
`

export const Errormsg = styled.div`
  color: var(--color-main1);
`
