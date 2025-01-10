import { ChangeEvent, useState } from 'react'
import * as S from './commentModifier.style'
import { CommentModifierProps } from '@/types/comments'
import useModifyComment from '@/hooks/useModifyComment'
import { Button } from '../Button/Button'
import { useModal } from '@/hooks/useModal'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

const CommentModifier = ({
  commentId,
  playlistId,
  text,
  setIsModifier
}: CommentModifierProps) => {
  const [modifiedContent, setModifiedContent] = useState(text)

  const { open, ModalComponent } = useModal()

  const { showToastMessage } = useToastMessageContext()

  const { mutate: modifyCommentMutate, isPending, error } = useModifyComment()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setModifiedContent(e.target.value)
  }

  const handleCancelClick = () => {
    if (text !== modifiedContent) {
      // 수정된 내용이 있을 때
      open({
        title: '취소하시겠습니까?',
        confirmText: '네',
        cancelText: '아니오',
        onConfirm: () => {
          setIsModifier(false)
        }
      })
    } else {
      setIsModifier(false)
    }
  }

  const handleModifyClick = () => {
    if (text === modifiedContent) {
      // 수정된 내용이 없을 때
      showToastMessage({
        message: '수정된 내용이 없습니다.',
        type: 'info'
      })

      return false
    }

    open({
      title: '댓글을 수정하시겠습니까?',
      confirmText: '수정',
      cancelText: '취소',
      onConfirm: () => {
        const props = { commentId, playlistId, content: modifiedContent }
        modifyCommentMutate(props, {
          onSuccess: () => {
            showToastMessage({
              message: '댓글이 수정되었습니다.',
              type: 'success'
            })
          }
        })
        setIsModifier(false)
      }
    })
  }

  return (
    <S.Container>
      <S.StyledTextarea
        height="auto"
        placeholder="여기에 댓글을 작성해 주세요"
        value={modifiedContent}
        onChange={handleChange}
      />
      <S.ModifyButtonBox>
        <Button
          className="cancel"
          color="var(--color-main3)"
          onClick={handleCancelClick}>
          취소
        </Button>
        <Button
          onClick={handleModifyClick}
          disabled={isPending}>
          수정 완료
        </Button>
      </S.ModifyButtonBox>
      {ModalComponent}
    </S.Container>
  )
}

export default CommentModifier
