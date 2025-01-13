import styled from 'styled-components'
import { MdOutlinePlaylistAdd } from 'react-icons/md'

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-s);
  max-width: 50rem;
  width: 100%;
`

export const ImageWrapper = styled.div`
  width: 8rem;
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
  font-weight: bold;
  color: var(--color-black);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-gray);
  margin-top: var(--spacing-2);
`

export const Stat = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--fs-m);
  gap: var(--spacing-1);
`

export const Options = styled.div`
  font-size: var(--fs-l);
  margin: 0 var(--spacing-4) 0 var(--spacing-2);
  cursor: pointer;
`

export const Icon = styled.span`
  font-size: var(--fs-s);
`

export const PlayListSaveIcon = styled(MdOutlinePlaylistAdd)`
  font-size: var(--fs-xl);
`
export const ModalWrapper = styled.div`
  display: flex;
  font-size: var(--fs-xl);
  padding: var(--spacing-4);
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
`
