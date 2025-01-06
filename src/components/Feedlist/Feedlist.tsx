import { FeedListProps } from '@/types/List'
import * as S from './Feedlist.styles'
import { FeedFooter } from './Footer'
import { OpitonPopup } from '../OptionPopup/OptionPopup'
import Modal from '../Modal/Modal'
import { RiUserUnfollowLine } from 'react-icons/ri'
import { MdPlaylistAdd } from 'react-icons/md'
import { useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
  // const [closeModal, setCloseModal] = useState(false)
  const options = [
    { id: '1', name: '구독취소', icon: <RiUserUnfollowLine /> },
    { id: '2', name: '저장', icon: <MdPlaylistAdd /> }
  ]

  const handleOptionsPopup = () => {
    setIsOpen(true)
  }
  const handleOptionsPopState = () => {
    setIsOpen(false)
  }
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
          <OpitonPopup />
        </S.ContentWrapper>
      </S.CardContainer>
      <Modal
        id="testmodal"
        isOpen={isOpen}
        closeModal={handleOptionsPopState}
        className="feedoption">
        {options.map(value => (
          <div key={value.id}>
            <span>{value.icon}</span>
            <span>{value.name}</span>
          </div>
        ))}
      </Modal>
    </>
  )
}

export default FeedList
