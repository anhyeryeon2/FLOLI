import * as S from '@/styles/components/comment/comment-editor.style'
import Profile from '../Profile/Profile'
import { LuSendHorizontal } from 'react-icons/lu'
import { ChangeEvent, useState } from 'react'
import useSubmitComment from '@/hooks/useSubmitComment'
import { useAuthStore } from '@/store/useAuthStore'
import { CommentEditorProps } from '@/types/comments'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

const CommentEditor = ({ playlistId }: CommentEditorProps) => {
  const { user: currentUser } = useAuthStore()
  const { id: currentUserId, profile_img } = currentUser!

  const { showToastMessage } = useToastMessageContext()

  const [commentContent, setCommentContent] = useState('')

  const { mutate: submitComment, isPending, error } = useSubmitComment()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value)
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

    const props = { userId: currentUserId, playlistId, content: commentContent }
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
            '댓글 작성에 오류가 발생하였습니다. 새로고침 후에도 오류가 지속될 경우 관리자에 문의 부탁드립니다.',
          type: 'error',
          delay: 10000
        })
      }
    })
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
        onClick={handleSubmit}>
        <LuSendHorizontal size="18" />
      </S.CommentSendButton>
    </S.Container>
  )
}

export default CommentEditor
