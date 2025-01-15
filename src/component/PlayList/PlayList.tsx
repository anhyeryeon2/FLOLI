import { FaHeart } from 'react-icons/fa'
import { FaEllipsisH } from 'react-icons/fa'
import * as S from './PlayList.styles'
import { PlayListFooter } from './Footer'
import { PlayListProps } from '@/types/List'
import { Modal } from '@/component'
import { useMyPlaylistOptions } from '@/hooks'

export const PlayList = ({
  image,
  title,
  date,
  likes,
  comments,
  optionIcon,
  nickname,
  playlistId,
  ispublic: initialIsLocked,
  onDelete,
  onClick,
  onOptionClick
}: PlayListProps) => {
  const {
    isOpen,
    ispublic,
    options,
    handleOptionsPopup,
    handleOptionsPopState
  } = useMyPlaylistOptions(playlistId, initialIsLocked, onDelete)

  const handleOptionsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onOptionClick?.()
    if (optionIcon === 'option') {
      handleOptionsPopup()
    }
  }

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
            ispublic={ispublic}
            nickname={nickname}
          />
        </S.TextWrapper>
        <S.Options onClick={handleOptionsClick}>
          {optionIcon === 'heart' && <FaHeart />}
          {optionIcon === 'bookmark' && <S.PlayListSaveIcon />}
          {optionIcon === 'option' && <FaEllipsisH />}
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
