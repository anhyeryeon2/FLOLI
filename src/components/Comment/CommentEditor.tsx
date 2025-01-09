import * as S from '@/styles/components/comment/comment-editor.style'
import Profile from '../Profile/Profile'
import { LuSendHorizontal } from 'react-icons/lu'
import { ChangeEvent, useState } from 'react'

const CommentEditor = () => {
  const [comment, setComment] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      // todo: 여기에 코멘트 보내는 코드 추가
      setComment('')
    } catch (err) {
      console.error('comment submit error:', err)
      // todo: 유저에게 알럿도 띄워주기
    }
  }

  return (
    <S.Container>
      <Profile
        className="profile-img"
        size="2.4rem"
        userId="userIdtest"
        imageUrl="https://cdn.pixabay.com/photo/2023/03/11/20/24/animal-7845217_1280.jpg"
      />

      <S.StyledTextarea
        height="auto"
        placeholder="여기에 댓글을 작성해 주세요"
        value={comment}
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
