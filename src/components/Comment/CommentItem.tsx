import * as S from '@/styles/components/comment/comment-item.style'
import Profile from '../Profile/Profile'
import { useEffect, useRef, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useAuthStore } from '@/store/useAuthStore'
import useFetchUserData from '@/hooks/useFetchUserData'
import Loading from '../LoadingSpinner/Loading'
import { NotFound } from '@/pages'
import getTimeAgo from '@/utils/getTimeAgo'
import LogoAsset from '@/assets/img/logo/floli_o.svg'

type ContentTextProps = {
  text: string
}

type CommentItemProps = {
  commentId: string
  commentUserId: string
  content: string
  createAt: string
  updatedAt: string | null
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
  updatedAt
}: CommentItemProps) => {
  const { user: currentUser } = useAuthStore()

  const currentUserId = currentUser?.id

  const {
    data: commentUserData,
    error: commentUserDataError,
    isPending: iscommentUserDataPending
  } = useFetchUserData(commentUserId)

  if (iscommentUserDataPending) {
    return <Loading />
  }

  if (commentUserDataError) {
    return <NotFound />
  }

  const { nickname, profile_img } = commentUserData

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
            {updatedAt ? getTimeAgo(updatedAt) : getTimeAgo(createAt)}
          </span>
        </div>
        <ContentText text={content} />
        {commentUserId === currentUserId && (
          <S.CommentEditButtonBox>
            <button type="button">
              <span>수정</span>
              <AiFillEdit />
            </button>
            <button type="button">
              <span>삭제</span>
              <MdDelete />
            </button>
          </S.CommentEditButtonBox>
        )}
      </div>
    </S.Container>
  )
}

export default CommentItem
