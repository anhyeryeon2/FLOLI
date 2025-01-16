import styled from 'styled-components'

export const Container = styled.div`
  margin: var(--spacing-5) var(--spacing-7);
`

export const HeaderBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--spacing-4);
`

export const HeaderBoxForOther = styled.div`
  align-items: center;
`

export const logout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  min-width: 10rem;
  margin-bottom: var(--spacing-3);
`

export const ProfileDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
`
export const UserName = styled.div`
  font-size: var(--fs-xl);
  font-weight: 500;
  padding: 0 var(--spacing-7);
`
export const SubscribeCount = styled.div`
  padding: var(--spacing-1) 0;
  font-size: var(--fs-m);
  font-weight: 500;
`

export const SubscribeCountForOthers = styled.div`
  padding: var(--spacing-1) 0 var(--spacing-6) 0;
  font-size: var(--fs-m);
  font-weight: 500;
`

export const ButtonBox = styled.div`
  margin-bottom: var(--spacing-6);
`

export const IntruductionBox = styled.div`
  padding: var(--spacing-2) 0;
  font-size: var(--fs-l);
  text-align: center;
`

export const SeparatingBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10rem;
  position: relative;
  border-bottom: 1px solid var(--color-border);
`
export const ShowTypes = styled.button<{ isActive?: boolean }>`
  font-size: var(--fs-xl);
  font-weight: 500;
  cursor: pointer;
  padding-bottom: var(--spacing-5);

  ${props =>
    props.isActive &&
    `
    border-bottom: 0.2rem solid var(--color-main1);
  `}
`
export const PlayListsBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-3);
`

export const NotFound = styled.div`
  margin: 0 auto;
  font-size: var(--fs-xl);
  font-weight: 700;
`
