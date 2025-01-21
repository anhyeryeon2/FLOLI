import { FeedListProps } from '@/types/List'
import * as S from './FeedList.style'
import { FeedFooter } from './Footer'
import { memo, useCallback, useState } from 'react'
import { dateKoreanFormat } from '@/utils/dateKoreanFormat'
import FeedListOptionPopUp from './FeedListOptionPopUp'
import { Profile } from '../Profile/Profile'
import { useNavigate } from 'react-router-dom'
import useUpdateLike from '@/hooks/useUpdateLike'

export const FeedList = memo(
  ({
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

    const navigate = useNavigate()
    const path = window.location.pathname

    const { mutate } = useUpdateLike()

    const handleOptionsPopup = useCallback(() => {
      setIsOpen(true)
    }, [setIsOpen])

    const handleOptionsPopState = useCallback(() => {
      setIsOpen(false)
      navigate(path)
    }, [setIsOpen])

    const handleUpdateLike = useCallback(
      (id: string, e: React.MouseEvent<SVGAElement>) => {
        e.preventDefault()
        e.stopPropagation()
        mutate(id)
      },
      [mutate]
    )

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
                    onLikeClick={e => handleUpdateLike(id, e)}
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
)
