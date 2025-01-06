import * as S from './Feedlist.styles'
import { FaHeart } from 'react-icons/fa'
import { BiConversation } from 'react-icons/bi'

export const FeedFooter = ({
  likes,
  comments,
  date
}: {
  likes: number
  comments: number
  date: string
}) => (
  <S.Footer>
    <S.Stat>
      <S.Icon>
        <FaHeart />
      </S.Icon>
      {likes}
    </S.Stat>
    <S.Stat>
      <S.Icon>
        <BiConversation />
      </S.Icon>
      {comments}
    </S.Stat>
    <S.Stat>{date}</S.Stat>
    <S.OptionsIcon />
  </S.Footer>
)
