import styled from 'styled-components'

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

// 섹션
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// 텍스트 영역//TODO: input컴포넌트 textarea로
export const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1.6rem;
`

// 공개/비공개 토글 버튼
export const ToggleContainer = styled.div`
  display: flex;
`

export const ToggleButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0.8rem;
  font-size: 1.4rem;
  text-align: center;
  border-radius: none;
  border: 1px solid var(--color-border);
  background-color: ${({ isActive }) =>
    isActive ? 'var(--color-main2)' : 'var(--color-bg1)'};
  color: var(--color-black);
  font-weight: 500;
`
//TODO: input 공컴으로
export const VideoLinkInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const AddButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 3rem;
  color: var(--color-black);
  border-radius: var(--radius-md);
  cursor: pointer;
`

export const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 1px solid var(--color-border);
  padding: 0.8rem;
`

export const Thumbnail = styled.img`
  width: 100px;
  height: auto;
  background: var(--color-bg2);
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
    word-break: break-word;
  }
  p {
    font-size: 1.2rem;
  }
`

export const RemoveButton = styled.button`
  font-size: 1.4rem;
  color: var(--color-gray);
  cursor: pointer;
`

export const UploadIcon = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

export const UploadText = styled.div`
  font-size: 1.2rem;
  color: var(--color-gray);
`
export const ThumbnailContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
`

// 왼쪽: 썸네일 업로드 영역
export const ThumbnailUpload = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 1.2rem;
  background: var(--color-bg1);
  text-align: center;
  width: 280px; /* 너비 조정 */
  height: 120px; /* 높이 조정 */
  border-radius: var(--radius-md);
`

// 오른쪽: 제목 및 더보기 영역
export const ThumbnailInfo = styled.div`
  flex: 1.5;
  background: var(--color-bg2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem;
  gap: 0.4rem;
`

// 제목 (최대 2줄)
export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-black);
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`

// 더보기 아이콘
export const MoreIcon = styled.div`
  font-size: 1.8rem;
  text-align: right;
  color: var(--color-gray);
  cursor: pointer;
`
