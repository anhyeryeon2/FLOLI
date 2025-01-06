import styled from 'styled-components'

export const Container = styled.div`
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: 6rem;
  overflow-y: auto;
`

export const Label = styled.label`
  font-size: var(--fs-lg);
  font-weight: 500;
  margin-bottom: var(--spacing-2);
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
`

export const ToggleContainer = styled.div`
  display: flex;
`

export const ToggleButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: var(--spacing-2);
  font-size: var(--fs-lg);
  text-align: center;
  border: 1px solid var(--color-border);
  background-color: ${({ isActive }) =>
    isActive ? 'var(--color-main2)' : 'var(--color-bg1)'};
  color: var(--color-black);
  font-weight: 500;
`
export const VideoLinkInput = styled.div`
  display: flex;
  gap: var(--spacing-) 1;
  align-items: center;
`

export const AddButton = styled.button`
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--fs-2xl);
  color: var(--color-black);
  border-radius: var(--radius-md);
  cursor: pointer;
`

export const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-2);
`

export const Thumbnail = styled.img`
  width: 100px;
  height: auto;
  border-radius: var(--radius-sm);
`

export const VideoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: var(--fs-m);
  }
`

export const RemoveButton = styled.button`
  font-size: var(--fs-lg);
  color: var(--color-gray);
`
export const ButtonContainer = styled.div`
  position: sticky;
  width: 100%;
`
