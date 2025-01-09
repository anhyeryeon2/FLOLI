import styled from 'styled-components'

export const Container = styled.div`
  margin: var(--spacing-5) var(--spacing-7) var(--spacing-5) var(--spacing-7);
`
export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ProfileBox = styled.div`
  display: flex;
  gap: var(--spacing-5);
`

export const ProfileDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`
export const UserName = styled.div`
  font-size: var(--fs-xl);
  font-weight: 500;
`
export const SubscribeCount = styled.div`
  font-size: var(--fs-l);
  font-weight: 500;
`

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-5);
`

export const IntruductionBox = styled.div`
  padding: var(--spacing-6);
  font-size: var(--fs-l);
`

export const SeparatingBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10rem;
  border-bottom: 0.2rem solid var(--color-border);
  position: relative;
`
export const ShowTypes = styled.button`
  font-size: var(--fs-xl);
  font-weight: 500;
  cursor: pointer;
  padding-bottom: var(--spacing-5);
  position: relative;

  /* ::after 가상 요소 추가 */
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.2rem;
    left: 0;
    width: 100%;
    height: 0.3rem;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }

  &:active::after {
    background-color: var(--color-main1);
  }
`
export const PlayListsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
`
