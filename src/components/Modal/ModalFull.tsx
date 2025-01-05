import ReactDOM from 'react-dom'
import * as S from './modalfull.style'
import { useScrollLock } from '@/hooks/useScrollLock'
import { IModalDefaultProps } from '@/types/modal'
import { MouseEvent, useCallback, useEffect } from 'react'
import HeaderSub from '../header/header-sub/HeaderSub'
import { useLocation, useNavigate } from 'react-router-dom'

const ModalFull = ({
  id,
  className,
  isOpen,
  children,
  pageTitle,
  closeModal
}: IModalDefaultProps) => {
  const modalRoot = document.getElementById('modal-container')

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useScrollLock({ isOpen })

  const handleModalClose = useCallback(() => {
    navigate(-1)
    closeModal()
  }, [navigate, closeModal])

  const handlePopState = useCallback(() => {
    closeModal()
  }, [closeModal])

  useEffect(() => {
    if (isOpen) {
      navigate(`${pathname}?modal=${id}`)

      window.addEventListener('popstate', handlePopState)

      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [isOpen, navigate, pathname, id, handlePopState])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <S.ModalOverlay>
      <S.ModalContainer
        id={id}
        className={className}
        onClick={handleClick}>
        <HeaderSub onClick={handleModalClose}>{pageTitle}</HeaderSub>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>,

    modalRoot as HTMLElement
  )
}

export default ModalFull
