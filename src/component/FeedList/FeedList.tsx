import { FeedListProps } from '@/types/List'
import * as S from './FeedList.style'
import { FeedFooter } from './Footer'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLike } from '@/apis/like'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { dateKoreanFormat } from '@/utils/dateKoreanFormat'
import FeedListOptionPopUp from './FeedListOptionPopUp'
import { Profile } from '../Profile/Profile'

export const FeedList = ({
  image,
  profileImage,
  title,
  nickname,
  likes,
  comments,
  date,
  track,

  id,
  likesState,
  playlist_user_id,
  is_public
}: FeedListProps) => {
  const [isOpen, setIsOpen] = useState(false)
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
      {is_public && (
        <>
          <S.CardContainer
            id={id}
            to={`/view/${id}`}>
            <S.ImageWrapper>
              <img
                src={image}
                alt={title}
              />
              {track > 0 && <S.TrackTag>Track: {track}</S.TrackTag>}
            </S.ImageWrapper>
            <S.ContentWrapper>
              <Profile
                imageUrl={profileImage}
                altText="profile"
                to={`/profile/${playlist_user_id}`}
                size={'4rem'}
              />
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
          <FeedListOptionPopUp
            isOpen={isOpen}
            handleOptionsPopState={handleOptionsPopState}
            id={id}
            playlist_user_id={playlist_user_id}
            setIsOpen={setIsOpen}
          />
        </>
      )}
    </>
  )
}
