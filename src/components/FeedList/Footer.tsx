import * as S from './FeedList.style'
import { FaHeart } from 'react-icons/fa'
import { BiConversation } from 'react-icons/bi'

export const FeedFooter = ({
  likes,
  comments,
  date,
  onClick
}: {
  likes: number
  comments: number
  date: string
  onClick: () => void
}) => (
  <>
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
      <S.OptionsIcon onClick={onClick} />
    </S.Footer>
  </>
)
