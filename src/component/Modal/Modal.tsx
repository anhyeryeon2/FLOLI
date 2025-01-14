import ReactDOM from 'react-dom'
import * as S from './modal.style'
import { useScrollLock } from '@/hooks/useScrollLock'
import { IModalExtendsProps } from '@/types/modal'
import { MouseEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * @param isBg - true일 때 모달 bg 생김
 */

const Modal = ({
  id,
  className,
  isOpen,
  children,
  height,
  closeModal,
  isBg
}: IModalExtendsProps) => {
  const modalRoot = document.getElementById('modal-container')
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  useScrollLock({ isOpen })

  useEffect(() => {
    if (isOpen && !search.includes(`modal=${id}`)) {
      navigate(`${pathname}?modal=${id}`, { replace: true })
    }
  }, [isOpen, id, pathname])

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        closeModal()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [closeModal, isOpen])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <S.ModalOverlay
      $isBg={isBg}
      onClick={closeModal}
      className={className}
      id={id}>
      <S.ModalContainer
        $height={height}
        onClick={handleClick}>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>,

    modalRoot as HTMLElement
  )
}

export default Modal
