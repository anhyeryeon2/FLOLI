import { FaHeart } from 'react-icons/fa'
import { FaEllipsisH } from 'react-icons/fa'
import * as S from './PlayList.styles'
import { PlayListFooter } from './Footer'
import { PlayListProps } from '@/types/List'
import Modal from '../Modal/Modal'
import { useMyPlaylistOptions } from '@/hooks/useMyPlayListOptions'

const PlayList = ({
  image,
  title,
  date,
  likes,
  comments,
  optionIcon,
  nickname,
  playlistId,
  isLocked: initialIsLocked,
  onDelete,
  onClick,
  onOptionClick
}: PlayListProps) => {
  const {
    isOpen,
    isLocked,
    options,
    handleOptionsPopup,
    handleOptionsPopState
  } = useMyPlaylistOptions(playlistId, initialIsLocked, onDelete)

  return (
    <>
      <S.CardContainer onClick={onClick}>
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
        <S.Options
          onClick={event => {
            event.stopPropagation()
            onOptionClick?.()
            if (optionIcon === 'option') handleOptionsPopup()
          }}>
          {optionIcon === 'heart' && <FaHeart />}
          {optionIcon === 'bookmark' && <S.PlayListSaveIcon />}
          {optionIcon === 'option' && (
            <FaEllipsisH onClick={handleOptionsPopup} />
          )}
        </S.Options>
      </S.CardContainer>
      <Modal
        id="playlistOptionsModal"
        isOpen={isOpen}
        closeModal={handleOptionsPopState}
        className="playlist-options-modal"
        isBg={true}>
        {options.map(option => (
          <S.ModalWrapper
            key={option.id}
            onClick={option.action}
            style={{ cursor: 'pointer' }}>
            <span>{option.icon}</span>
            <span>{option.name}</span>
          </S.ModalWrapper>
        ))}
      </Modal>
    </>
  )
}

export default PlayList
