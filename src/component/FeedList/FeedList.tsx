import { FeedListProps } from '@/types/List'
import * as S from './FeedList.style'
import { FeedFooter } from './Footer'
import Modal from '../Modal/Modal'
import { RiUserUnfollowLine } from 'react-icons/ri'
import { MdPlaylistAdd } from 'react-icons/md'
import { useState } from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLike } from '@/apis/like'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
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
  id,
  likesState
}: FeedListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const options = [
    { id: '1', name: '구독취소', icon: <RiUserUnfollowLine size={24} /> },
    { id: '2', name: '저장', icon: <MdPlaylistAdd size={24} /> },
    { id: '3', name: '공유', icon: <FaShareAlt size={24} /> }
  ]
  const { showToastMessage } = useToastMessageContext()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id: string) => updateLike(id, undefined),
    onSuccess: () => {
      showToastMessage({
        message: `좋아요를 눌렀습니다.!! `,
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['playList'] })
    },
    onError: () =>
      showToastMessage({
        message: `좋아요를 누르는데 실패했습니다.`,
        type: 'error'
      })
  })

  const handleOptionsPopup = () => setIsOpen(true)

  const handleOptionsPopState = () => setIsOpen(false)
  const handleUpdateLike = (id: string) => {
    mutate(id)
  }
  return (
    <>
      <S.CardContainer
        key={key}
        id={id}>
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
              date={dateKoreanFormat(date)}
              onClick={handleOptionsPopup}
              onLikeClick={() => handleUpdateLike(id)}
              likesState={likesState}
            />
          </S.TextWrapper>
        </S.ContentWrapper>
      </S.CardContainer>
      <Modal
        id="testmodal"
        isOpen={isOpen}
        closeModal={handleOptionsPopState}
        className="feedoption"
        isBg={true}>
        {options.map(value => (
          <S.ModalWrapper key={value.id}>
            <span>{value.icon}</span>
            <span>{value.name}</span>
          </S.ModalWrapper>
        ))}
      </Modal>
    </>
  )
}

export default FeedList
