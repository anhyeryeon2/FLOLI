import * as S from '@/styles/components/comment/comment-item.style'
import Profile from '../Profile/Profile'
import { useEffect, useRef, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

type ContentTextProps = {
  text: string
}

type CommentItemProps = {
  commentId: string
  userId: string
  content: string
  createAt: string
  updatedAt: string | null
  nickname: string
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
  }, [])

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
  userId,
  content,
  createAt,
  updatedAt,
  nickname
}: CommentItemProps) => {
  // todo: 지금 로그인한 유저의 Id
  const nowUserId = 'klajlsdifjqwer'

  return (
    <S.Container id={commentId}>
      <Profile
        className="profile-img"
        userId="userIdtest"
        size="3.2rem"
        imageUrl="https://cdn.pixabay.com/photo/2018/05/27/22/31/dog-3434801_1280.jpg"
      />
      <div className="comment-box">
        <div className="comment-title">
          <span className="comment-user-nickname">{nickname}</span>
          <span className="create-at">{updatedAt ? updatedAt : createAt}</span>
        </div>
        <ContentText text={content} />
        {userId === nowUserId && (
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
