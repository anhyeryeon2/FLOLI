import { styled, css } from 'styled-components'

export const Container = styled.div`
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: 3rem;
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

export const ToggleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: var(--spacing-2);
  font-size: var(--fs-lg);
  text-align: center;
  border: 1px solid var(--color-border);
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--color-main2)' : 'var(--color-bg1)'};
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
  padding-top: var(--spacing-2);
  width: 100%;
`

export const ThumbnailPreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-2);
  margin-top: var(--spacing-1);
  background-color: var(--color-bg2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 120px; /* 부모 컨테이너 높이 고정 */
  width: 100%;
`
export const EmptyThumbnail = styled.div`
  width: 160px;
  height: 120px;
  background-color: var(--color-bg1);
  border: 1px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-xl);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
`

export const ThumbnailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  min-width: 0;
`
export const ThumbnailImage = styled.img`
  width: 160px;
  height: 120px;
  object-fit: cover;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  position: relative;
  flex-shrink: 0;
`
export const TextEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
export const ThumbnailTitle = styled.p`
  font-size: var(--fs-l);
  font-weight: 600;
  color: var(--color-black);
  ${TextEllipsis}
`
export const ThumbnailMaker = styled.p`
  font-size: var(--fs-m);
  font-weight: 500;
  color: var(--color-black);
  ${TextEllipsis}
`
export const TrackTag = styled.div`
  position: absolute;
  bottom: var(--spacing-2);
  right: var(--spacing-2);
  background-color: rgba(70, 70, 70, 0.6);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--fs-s);
  border-radius: var(--radius-base);
  z-index: 2;
`
