import { FaHeart } from 'react-icons/fa'
import { FaEllipsisH } from 'react-icons/fa'
import * as S from './PlayList.styles'
import { PlayListFooter } from './Footer'
import { PlayListProps } from '@/types/List'

/**
 * @typedef {Object} PlayListProps
 * @property {string} image - 플레이리스트 이미지 URL
 * @property {string} title - 플레이리스트 제목
 * @property {string} date - 생성 날짜
 * @property {number} likes - 좋아요 수
 * @property {number} comments - 댓글 수
 * @property {'heart' | 'bookmark' | 'option'} optionIcon - 옵션 아이콘 타입 ('heart' | 'bookmark' | 'option')
 * @property {boolean} [isLocked] - 선택사항: 잠금 상태 (true면 잠금 아이콘 표시)
 * @property {string} [nickname] - 선택사항: 사용자 닉네임 (지정하지 않으면 표시되지 않음)
 */

const PlayList = ({
  image,
  title,
  date,
  likes,
  comments,
  isLocked,
  optionIcon,
  nickname
}: PlayListProps) => {
  return (
    <S.CardContainer>
      <S.ImageWrapper>
        <img
          src={image}
          alt={title}
        />
      </S.ImageWrapper>
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <PlayListFooter
          date={date}
          likes={likes}
          comments={comments}
          isLocked={isLocked}
          nickname={nickname}
        />
      </S.TextWrapper>
      <S.Options>
        {optionIcon === 'heart' && <FaHeart />}
        {optionIcon === 'bookmark' && <S.PlaylistSaveIcon />}
        {optionIcon === 'option' && <FaEllipsisH />}
      </S.Options>
    </S.CardContainer>
  )
}

export default PlayList
