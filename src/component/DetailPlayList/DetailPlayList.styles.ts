import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: var(--radius-md);
  margin: auto;
  cursor: pointer;
`

export const ImageWrapper = styled.div`
  width: 11rem;
  height: 7rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: var(--spacing-2) var(--spacing-3);
`

export const Title = styled.h4`
  font-size: var(--fs-l);
  font-weight: 700;
  color: var(--color-black);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const nickname = styled.p`
  font-size: var(--fs-m);
  color: var(--color-gray);
  margin: var(--spacing-1) 0 var(--spacing-1);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
