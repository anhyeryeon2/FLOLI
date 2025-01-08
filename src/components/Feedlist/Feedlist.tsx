import { FeedListProps } from '@/types/List'
import * as S from './Feedlist.style'
import { FeedFooter } from './Footer'
import img from '../../assets/img/profile/default_profile.png'
import { dateKoreanFormat } from '@/utils/dateKoreanFormat'

const FeedList = ({
  image,
  profileImage,
  title,
  nickname,
  likes,
  comments,
  date,
  track,
  key,
  id
}: FeedListProps) => {
  let koreanDate = dateKoreanFormat(date)
  return (
    <S.CardContainer
      key={key}
      id={id}>
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
