import { FeedListProps } from '@/types/List'
import * as S from './FeedList.style'
import { FeedFooter } from './Footer'
import { useState } from 'react'
import FeedListOptionPopUp from './FeedListOptionPopUp'

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
  id,
  playlist_user_id
}: FeedListProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionsPopup = () => setIsOpen(true)

  const handleOptionsPopState = () => setIsOpen(false)

  return (
    <>
      <S.CardContainer key={key}>
        <S.ImageWrapper key={key}>
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
              onClick={handleOptionsPopup}
            />
          </S.TextWrapper>
        </S.ContentWrapper>
      </S.CardContainer>
      <FeedListOptionPopUp
        isOpen={isOpen}
        handleOptionsPopState={handleOptionsPopState}
        id={id}
        playlist_user_id={playlist_user_id}
      />
    </>
  )
}

export default FeedList
