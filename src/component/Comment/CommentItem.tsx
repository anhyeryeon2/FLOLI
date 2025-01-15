import * as S from './CommentItem.style'
import Profile from '../Profile/Profile'
import { useEffect, useRef, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useAuthStore } from '@/store/useAuthStore'
import useFetchUserData from '@/hooks/useFetchUserData'
import Loading from '../LoadingSpinner/Loading'
import getTimeAgo from '@/utils/getTimeAgo'
import LogoAsset from '@/assets/img/logo/floli_o.svg'
import useDeleteComment from '@/hooks/useDeleteComment'
import { useModal } from '@/hooks/useModal'
import CommentModifier from './CommentModifier'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

type ContentTextProps = {
  text: string
}

type CommentItemProps = {
  commentId: string
  commentUserId: string
  content: string
  createAt: string
  updatedAt: string | null
  playlistId: string
}

// 댓글 내용 '자세히 보기' 버튼
const ContentText = ({ text }: ContentTextProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setIsOverflow(textRef.current.scrollHeight > textRef.current.clientHeight)
    }
  }, [text])

  return (
    <div onClick={() => setIsOpen(prev => !prev)}>
      <div
        className={`comment-content ${isOpen ? 'open' : ''}`}
        ref={textRef}>
        {text}
      </div>
      {isOverflow && (
        <span className="comment-toggle-text">
          {isOpen ? '접기' : '...자세히 보기'}
        </span>
      )}
    </div>
  )
}

const CommentItem = ({
  commentId,
  commentUserId,
  content,
  createAt,
  updatedAt,
  playlistId
}: CommentItemProps) => {
  const [isModifier, setIsModifier] = useState(false)

  const { showToastMessage } = useToastMessageContext()

  const { user: currentUser } = useAuthStore()
  const currentUserId = currentUser?.id

  const { open, ModalComponent } = useModal()

  const {
    data: commentUserData,
    error: commentUserDataError,
    isPending: iscommentUserDataPending
  } = useFetchUserData(commentUserId)

  const { mutate: deleteCommentMutate, isPending: isDeleteCommentPending } =
    useDeleteComment()

  if (iscommentUserDataPending) {
    return <Loading />
  }

  if (commentUserDataError) {
    throw new Error('댓글 정보를 가져오는 데 실패하였습니다.')
  }

  const { nickname, profile_img } = commentUserData

  const showModal = () => {
    open({
      title: '댓글을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        const props = { commentId, playlistId }
        deleteCommentMutate(props, {
          onError: () => {
            showToastMessage({
              message:
                '댓글 삭제에 실패하였습니다. 새로고침 이후에도 문제가 지속될 경우 관리자에 문의해 주세요.',
              type: 'error',
              delay: 10000
            })
            throw new Error('댓글 삭제에 실패하였습니다.')
          }
        })
      }
    })
  }

  const handleModifyClick = () => {
    setIsModifier(true)
  }

  const handleDeleteClick = () => {
    showModal()
  }

  return (
    <S.Container id={commentId}>
      <Profile
        className="profile-img"
        userId={commentUserId}
        size="3.2rem"
        imageUrl={profile_img}
      />
      <div className="comment-box">
        <div className="comment-title">
          <span className="comment-user-nickname">{nickname}</span>
          {commentUserId === currentUserId && (
            <img
              className="is-creator-nickname"
              src={LogoAsset}
              alt="플레이리스트 제작자 표시"
            />
          )}
          <span className="create-at">
            {updatedAt !== createAt
              ? `${getTimeAgo(updatedAt!)} (수정됨)`
              : getTimeAgo(createAt)}
          </span>
        </div>
        {isModifier ? (
          <CommentModifier
            commentId={commentId}
            playlistId={playlistId}
            text={content}
            setIsModifier={setIsModifier}
          />
        ) : (
          <ContentText text={content} />
        )}
        {commentUserId === currentUserId && !isModifier && (
          <S.CommentEditButtonBox>
            <button
              type="button"
              onClick={handleModifyClick}>
              <span>수정</span>
              <AiFillEdit />
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              disabled={isDeleteCommentPending}>
              <span>삭제</span>
              <MdDelete />
            </button>
          </S.CommentEditButtonBox>
        )}
      </div>
      {ModalComponent}
    </S.Container>
  )
}

export default CommentItem
