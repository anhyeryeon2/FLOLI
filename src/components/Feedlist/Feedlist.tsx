import { FeedListProps } from '@/types/List'
import * as S from './Feedlist.styles'
import { FeedFooter } from './Footer'
import img from '../../assets/img/profile/default_profile.png'
import { useDateKoreanFormat } from '@/hooks/useDateKoreanFormat'

const FeedList = ({
  image,
  profileImage,
  title,
  nickname,
  likes,
  comments,
  date,
  track,
  key
}: FeedListProps) => {
  let koreanDate = useDateKoreanFormat(date)
  return (
    <S.CardContainer key={key}>
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
            src={profileImage === null ? img : profileImage}
            alt="Profile"
          />
        </S.ProfileImage>
        <S.TextWrapper>
          <S.Title>{title}</S.Title>
          <S.nickname>{nickname}</S.nickname>
          <FeedFooter
            likes={likes}
            comments={comments}
            date={koreanDate}
          />
        </S.TextWrapper>
      </S.ContentWrapper>
    </S.CardContainer>
  )
}

export default FeedList
