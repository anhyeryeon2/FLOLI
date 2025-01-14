import { ConfirmModalProps } from '@/types/modal'
import * as S from './ConfirmModal.styles'
import { Button } from '../Button/Button'

/**
 * @example
 * const { open, ModalComponent } = useModal()
 * const navigate = useNavigate();
 *
 * const showModal = () => {
 *   open({
 *     title: '모달 제목',
 *     description: '모달 설명',
 *     confirmText: '확인',
 *     cancelText: '취소',
 *     onConfirm: () => navigate('/page'), // 생략 가능
 *     onCancel: () => console.log('취소됨'), // 생략 가능
 *   });
 * };
 *
 * return
 * <button onClick={showModal}>모달 열기</button>
 * {ModalComponent};
 */

export function ConfirmModal({
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  return (
    <S.ModalContainer>
      <S.Title>{title}</S.Title>
      {description && <S.Description>{description}</S.Description>}
      <S.ButtonContainer>
        <Button
          onClick={onCancel}
          bordertype="기본"
          color="var(--color-white)"
          backgroundColor="var(--color-input)"
          fontSize="1.6rem"
          width="45%">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          bordertype="기본"
          color="var(--color-white)"
          fontSize="1.6rem"
          width="45%">
          {confirmText}
        </Button>
      </S.ButtonContainer>
    </S.ModalContainer>
  )
}
