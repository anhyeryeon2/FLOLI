import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal'
import { ConfirmModalProps } from '@/types/modal'
import * as S from '@/components/ConfirmModal/ConfirmModal.styles'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalProps, setModalProps] = useState<ConfirmModalProps | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const open = (props: ConfirmModalProps) => {
    setModalProps(props)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setModalProps(null)
  }

  const handleDimmedClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target === modalRef.current) {
      modalProps?.onCancel?.()
      close()
    }
  }

  const ModalComponent =
    isOpen && modalProps
      ? createPortal(
          <S.Dimmed
            ref={modalRef}
            onClick={handleDimmedClick}>
            <ConfirmModal
              {...modalProps}
              onConfirm={() => {
                modalProps?.onConfirm?.()
                close()
              }}
              onCancel={() => {
                modalProps?.onCancel?.()
                close()
              }}
            />
          </S.Dimmed>,
          document.getElementById('modal-root') as HTMLElement
        )
      : null

  return { open, close, ModalComponent }
}
