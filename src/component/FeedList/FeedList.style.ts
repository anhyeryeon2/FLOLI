import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const FeedConteiner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--max-width);
  gap: 20px;
  justify-content: center;
  transition: opacity 0.3s ease-in-out;
`

export const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
`

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  height: 0;

  img {
    position: absolute;
    top: 0;
    left: 0;
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
  padding: var(--spacing-3) var(--spacing-3) 2rem;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  margin-left: 1rem;
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
  margin: var(--spacing-1) 0 0;
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

export const OptionButton = styled.button`
  margin-left: auto;
  padding: 0.4rem;
  line-height: 0;
  cursor: pointer;
`
export const ModalWrapper = styled.div`
  display: flex;
  padding: var(--spacing-4);
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-direction: column;
`

export const ModalContentContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
  font-size: var(--fs-xl);
`
