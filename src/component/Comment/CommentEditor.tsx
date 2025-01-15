import { Profile } from '@/component'
import * as S from './CommentEditor.style'
import { LuSendHorizontal } from 'react-icons/lu'
import { ChangeEvent, useState } from 'react'
import useSubmitComment from '@/hooks/useSubmitComment'
import { useAuthStore } from '@/store/useAuthStore'
import { CommentEditorProps } from '@/types/comments'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useModal } from '@/hooks/useModal'

const CommentEditor = ({ playlistId }: CommentEditorProps) => {
  const { user: currentUser } = useAuthStore()
  const { id: currentUserId, profile_img } = currentUser!

  const { open, ModalComponent } = useModal()

  const { showToastMessage } = useToastMessageContext()

  const [commentContent, setCommentContent] = useState('')

  const { mutate: submitComment, isPending } = useSubmitComment()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value)
  }

  const showModal = () => {
    open({
      title: '댓글을 작성하시겠습니까?',
      confirmText: '작성',
      cancelText: '취소',
      onConfirm: () => {
        const props = {
          userId: currentUserId,
          playlistId,
          content: commentContent
        }
        submitComment(props, {
          onSuccess: () => {
            showToastMessage({
              message: '댓글이 작성되었습니다.',
              type: 'success'
            })
            setCommentContent('')
          },
          onError: err => {
            console.error('댓글 전송 오류:', err)
            showToastMessage({
              message:
                '댓글 작성에 실패하였습니다. 새로고침 이후에도 문제가 지속될 경우 관리자에 문의해 주세요.',
              type: 'error',
              delay: 10000
            })
          }
        })
      }
    })
  }

  const handleSubmit = async () => {
    if (!commentContent) {
      // 댓글 작성이 안 되어있을 경우
      showToastMessage({
        message: '댓글 내용을 작성해 주세요.',
        type: 'error'
      })

      return false
    }

    showModal()
  }

  return (
    <S.Container>
      <Profile
        className="profile-img"
        size="2.4rem"
        userId={currentUserId}
        imageUrl={profile_img}
      />

      <S.StyledTextarea
        height="auto"
        placeholder="여기에 댓글을 작성해 주세요"
        value={commentContent}
        onChange={handleChange}
      />
      <S.CommentSendButton
        type="button"
        disabled={isPending}
        onClick={handleSubmit}>
        <LuSendHorizontal size="18" />
      </S.CommentSendButton>
      {ModalComponent}
    </S.Container>
  )
}

export default CommentEditor
