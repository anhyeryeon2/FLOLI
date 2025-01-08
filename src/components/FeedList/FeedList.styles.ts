import styled from 'styled-components'
import { FaEllipsisH } from 'react-icons/fa'

export const FeedConteiner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--max-width);
  gap: 20px;
  justify-content: center;
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg1);
  box-shadow: var(--shadow-s);
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 50rem;
  min-width: 36rem;
`

export const ImageWrapper = styled.div`
  width: 100%;
  height: 16rem;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: var(--spacing-4) var(--spacing-3) 0 var(--spacing-3);
  height: 10rem;
`

export const ProfileImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-1);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Title = styled.h3`
  font-size: var(--fs-l);
  font-weight: bold;
  color: var(--color-black);
  margin: 0 0 var(--spacing-1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const nickname = styled.p`
  font-size: var(--fs-m);
  color: var(--color-gray);
  margin: var(--spacing-1) 0 0;
`
export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-5);
  color: var(--color-gray);
  margin: var(--spacing-2) 0;
`
export const Stat = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--fs-m);
  gap: var(--spacing-1);
`
export const Icon = styled.span`
  font-size: var(--fs-m);
`

export const OptionsIcon = styled(FaEllipsisH)`
  font-size: var(--fs-l);
  margin-left: auto;
  margin-bottom: var(--spacing-1);
  color: var(--color-gray);
  cursor: pointer;
`
