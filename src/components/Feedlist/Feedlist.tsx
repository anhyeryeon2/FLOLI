import { FeedListProps } from '@/types/List'
import * as S from './Feedlist.styles'
import { FeedFooter } from './Footer'

const FeedList = ({
  image,
  profileImage,
  title,
  nickname,
  likes,
  comments,
  date,
  track
}: FeedListProps) => {
  return (
    <S.CardContainer>
      <S.ImageWrapper>
        <img
          src={image}
          alt={title}
        />
        {track > 0 && <S.TrackTag>Track: {track}</S.TrackTag>}
      </S.ImageWrapper>
      <S.ContentWrapper>
        <S.ProfileImage>
          <img
            src={profileImage}
            alt="Profile"
          />
        </S.ProfileImage>
        <S.TextWrapper>
          <S.Title>{title}</S.Title>
          <S.nickname>{nickname}</S.nickname>
          <FeedFooter
            likes={likes}
            comments={comments}
            date={date}
          />
        </S.TextWrapper>
      </S.ContentWrapper>
    </S.CardContainer>
  )
}

export default FeedList
