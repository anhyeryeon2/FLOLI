import * as S from './FeedList.style'
import { FaHeart } from 'react-icons/fa'
import { BiConversation } from 'react-icons/bi'
import styled from 'styled-components'

interface HeartIconProps {
  liked: boolean // 아이콘 색상을 조건부로 설정할 때 사용하는 prop
}

export const FeedFooter = ({
  likes,
  comments,
  date,
  onClick,
  onLikeClick,
  likesState
}: {
  likes: number
  comments: number
  date: string
  onClick: () => void
  onLikeClick: () => void
  likesState: boolean
}) => (
  <>
    <S.Footer>
      <S.Stat>
        <S.Icon>
          <HeartIcon
            onClick={onLikeClick}
            liked={likesState}
          />
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
const HeartIcon = styled(FaHeart)<HeartIconProps>`
  color: ${({ liked }) => (liked ? 'red' : 'gray')};
  cursor: pointer;
  &:hover {
    color: ${({ liked }) => (liked ? 'darkred' : 'darkgray')};
  }
`
