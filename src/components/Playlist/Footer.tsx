import * as S from './PlayList.styles'
import { FaHeart, FaLock, FaLockOpen } from 'react-icons/fa'
import { BiConversation } from 'react-icons/bi'

interface PlayListFooterProps {
  date: string
  likes: number
  comments: number
  isLocked?: boolean
  nickname?: string
}
export const PlayListFooter = ({
  date,
  likes,
  comments,
  isLocked,
  nickname
}: PlayListFooterProps) => (
  <S.Footer>
    <S.Stat>
      {nickname}
      <S.Icon>
        {isLocked === undefined ? null : isLocked === true ? (
          <FaLock />
        ) : (
          <FaLockOpen />
        )}
      </S.Icon>
      {date}
    </S.Stat>
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
  </S.Footer>
)
