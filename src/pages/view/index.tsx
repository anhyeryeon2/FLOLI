import axiosInstance from '@/apis/axiosInstance'
import CommentEditor from '@/components/Comment/CommentEditor'
import CommentList from '@/components/Comment/CommentList'
import Profile from '@/components/Profile/Profile'
import ViewVideoList from '@/components/ViewVideoList/ViewVideoList'
import * as S from './view.style'
import { IViewProps } from '@/types/View'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
  FaShareAlt
} from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import { RiPlayList2Fill } from 'react-icons/ri'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useFetchUserData from '@/hooks/useFetchUserData'
import useFetchUserLikeStatus from '@/hooks/useFetchUserLikeStatus' // 좋아요 상태 가져오는 훅
import { NotFound } from '../notFound'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { formatKoreanUnit } from '@/utils/formatKoreanUnit'
import copyToClipboard from '@/utils/copyToClipboard'
import Loading from '@/components/LoadingSpinner/Loading'
import { useAuthStore } from '@/store/useAuthStore'
import useFetchUserSubscStatus from '@/hooks/useFetchUserSubscStatus'
import useToggleLike from '@/hooks/useToggleLike'
import useToggleSubsc from '@/hooks/useToggleSubsc'
import useToggleBookmark from '@/hooks/useToggleBookmark'
import useFetchUserBookmarkStatus from '@/hooks/useFetchUserBookmarkStatus'
import ViewVideoContent from '@/components/ViewVideoContent/ViewVideoContent'
import useFetchVideoList from '@/hooks/useFetchVideoList'
import { LAST_VIDEO_TITLE } from '@/constants/constant'

// todo: util에 등록된걸로 바꾸기
const dateKoreanFormat = (date: string): string => {
  const dateTypeFormat = date as unknown as Date
  const stringToDate = new Date(dateTypeFormat)

  const year = stringToDate.getFullYear()
  const month = String(stringToDate.getMonth() + 1).padStart(2, '0')
  const day = String(stringToDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}년 ${month}월 ${day}일`

  return formattedDate
}

const DescriptionText = ({ description }: Pick<IViewProps, 'description'>) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setIsOverflow(textRef.current.scrollHeight > textRef.current.clientHeight)
    }
  }, [])

  return (
    <>
      <S.Description onClick={() => setIsOpen(prev => !prev)}>
        <div
          className={`desc-text ${isOpen ? 'open' : ''}`}
          ref={textRef}>
          {description}
        </div>
        {isOverflow && (
          <span className="desc-toggle-text">
            {isOpen ? '접기' : '...더보기'}
          </span>
        )}
      </S.Description>
    </>
  )
}

export const View = (): JSX.Element => {
  // const videoContentRef = useRef(null)

  const { user: currentUser } = useAuthStore()

  const [isVideoListOpen, setIsVideoListOpen] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const [videoContentId, setVideoContentId] = useState('')
  const [videoContentIndex, setVideoContentIndex] = useState(0)
  const [videoContentTitle, setVideoContentTitle] = useState('')
  const [nextVideoContentTitle, setNextVideoContentTitle] = useState('')
  // const [playlistModalHeight, setPlaylistModalHeight] = useState(0)

  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  const { mutate: toggleLikeMutate, isPending: isToggleLikePending } =
    useToggleLike()
  const { mutate: toggleSubscMutate, isPending: isToggleSubscPending } =
    useToggleSubsc()

  const { mutate: toggleBookmarkMutate, isPending: isToggleBookmarkPending } =
    useToggleBookmark()

  const { showToastMessage } = useToastMessageContext()

  const { playlist_id } = useParams<{ playlist_id: string }>()

  const nowHref = window.location.href

  // 플리 정보
  const fetchPlaylistData = async (id: string) => {
    const res = await axiosInstance.get('/playlists', {
      params: {
        playlist_id: `eq.${id}`
      }
    })
    return res.data[0]
  }

  const {
    data: playlist,
    error,
    isPending
  } = useQuery({
    queryKey: ['playlist', playlist_id],
    queryFn: () => fetchPlaylistData(playlist_id!),
    enabled: !!playlist_id
  })

  // 플리 제작한 유저 정보
  const {
    data: creatorData,
    error: creatorDataError,
    isPending: isCreatorDataPending
  } = useFetchUserData(playlist?.user_id)

  // 좋아요 상태 가져오기
  const {
    data: isLike,
    error: likeError,
    isPending: isLikePending
  } = useFetchUserLikeStatus(currentUser!.id, playlist_id!)

  useEffect(() => {
    if (playlist) {
      setLikeCount(playlist.likes_count)
    }
  }, [playlist])

  // 구독 상태 가져오기
  const {
    data: isSubsc,
    error: subscError,
    isPending: isSubscPending
  } = useFetchUserSubscStatus(currentUser!.id, playlist?.user_id)

  // 플리 저장 상태 가져오기
  const {
    data: isBookmark,
    error: bookmarkError,
    isPending: isBookmarkPending
  } = useFetchUserBookmarkStatus(currentUser!.id, playlist_id!)

  // 영상 목록 데이터 가져오기
  const {
    data: videoData,
    error: videoDataError,
    isPending: isVideoDataPending
  } = useFetchVideoList(playlist?.video_url.split(','))

  // 첫 영상 보여주기
  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setVideoContentId(videoData[0]?.video_id)
      setVideoContentIndex(0)
      setVideoContentTitle(videoData[0]?.title)
      setNextVideoContentTitle(videoData[1]?.title || LAST_VIDEO_TITLE)
    }
  }, [videoData])

  // useEffect(() => {
  //   setPlaylistModalHeight(videoContentRef.current?.offsetHeight)
  // }, [videoContentRef])

  if (isPending) {
    return <Loading />
  }

  if (error) {
    return <NotFound />
  }

  if (isCreatorDataPending) {
    return <Loading />
  }

  if (isLikePending) {
    return <Loading />
  }

  if (isSubscPending) {
    return <Loading />
  }

  if (isBookmarkPending) {
    return <Loading />
  }

  if (isVideoDataPending) {
    return <Loading />
  }

  if (creatorDataError) {
    return <NotFound />
  }

  if (likeError) {
    return <NotFound />
  }

  if (subscError) {
    return <NotFound />
  }

  if (bookmarkError) {
    return <NotFound />
  }

  if (videoDataError) {
    return <NotFound />
  }

  const { title, description, created_at, video_count } = playlist
  const { id: creator_id, nickname, profile_img, subsc_count } = creatorData

  console.log('@@', creatorData)

  const commentCount = 172

  const handleShareClick = () => {
    copyToClipboard({ url: nowHref, showToastMessage })
  }

  const handleLikeClick = () => {
    const props = { userId: currentUser!.id, playlistId: playlist_id! }
    toggleLikeMutate(props, {
      onSuccess: data => {
        setLikeCount(prevCount => (data ? prevCount + 1 : prevCount - 1))
      }
    })
  }

  const handleSubscClick = () => {
    const props = {
      currentUserId: currentUser!.id,
      subscribedUserId: creator_id
    }
    toggleSubscMutate(props)
  }

  const handleBookmarkClick = () => {
    const props = { userId: currentUser!.id, playlistId: playlist_id! }
    toggleBookmarkMutate(props)
  }

  const openVideoList = () => setIsVideoListOpen(true)
  const closeVideoList = () => {
    const params = new URLSearchParams(search)
    params.delete('modal')
    navigate(`${pathname}?${params.toString()}`)
    setIsVideoListOpen(false)
  }

  const handleVideoSelect = (
    videoId: string,
    index: number,
    title: string,
    nextTitle: string
  ) => {
    setVideoContentId(videoId)
    setVideoContentIndex(index)
    setVideoContentTitle(title)
    setNextVideoContentTitle(nextTitle)
  }

  return (
    <>
      <S.Container>
        <ViewVideoContent
          // ref={videoContentRef}
          videoId={videoContentId}
        />
        <S.VideoInfoWrapper>
          <h2>{videoContentTitle}</h2>
          <h1>{title}</h1>
          <div className="info-box">
            <span className="create-at">{dateKoreanFormat(created_at)}</span>
            <DescriptionText description={description} />
          </div>
          <S.CreatorProfileWrapper>
            <div>
              <Profile
                className="profile-img"
                userId="userIdtest"
                size="3.2rem"
                imageUrl={profile_img}
              />
              <h3 className="creator-name">{nickname}</h3>
              <span className="subsc-count">
                {formatKoreanUnit(subsc_count + 1)}
              </span>
            </div>
            {currentUser!.id !== playlist?.user_id &&
              (isSubsc ? (
                <S.StyledButton
                  type="button"
                  className="subsc-cancel"
                  onClick={handleSubscClick}
                  disabled={isToggleSubscPending}>
                  구독 취소
                </S.StyledButton>
              ) : (
                <S.StyledButton
                  type="button"
                  onClick={handleSubscClick}
                  disabled={isToggleSubscPending}>
                  구독
                </S.StyledButton>
              ))}
          </S.CreatorProfileWrapper>
          <S.ActionButtonWrapper>
            <button
              type="button"
              onClick={handleLikeClick}
              disabled={isToggleLikePending}>
              {isLike ? (
                <FaHeart
                  size="16"
                  color="var(--color-main1)"
                />
              ) : (
                <FaRegHeart
                  size="16"
                  color="var(--color-main1)"
                />
              )}
              <span>{formatKoreanUnit(likeCount + 1)}</span>
            </button>
            <button
              type="button"
              onClick={handleShareClick}>
              <FaShareAlt size="16" />
              <span>공유</span>
            </button>
            <button
              type="button"
              onClick={handleBookmarkClick}
              disabled={isToggleBookmarkPending}>
              {isBookmark ? (
                <FaBookmark size="16" />
              ) : (
                <FaRegBookmark size="16" />
              )}
              <span>저장</span>
            </button>
          </S.ActionButtonWrapper>
        </S.VideoInfoWrapper>
        <S.CommentWrapper>
          <div className="comment-count">
            댓글
            <span>{commentCount}</span>
          </div>
          <CommentEditor playlistId={playlist_id!} />
          <CommentList playlistId={playlist_id!} />
        </S.CommentWrapper>

        <S.VideoListPanel onClick={openVideoList}>
          <div className="inner">
            <RiPlayList2Fill size="22" />
            <div className="playList-info-wrapper">
              <p className="next-video-title">{nextVideoContentTitle}</p>
              <div className="playList-info">
                <p>{title}</p>
                <span>&nbsp;|&nbsp;</span>
                <span>
                  {videoContentIndex + 1}/{video_count}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="modal-toggle-button">
            <IoIosArrowUp size="18" />
          </button>
        </S.VideoListPanel>
        <S.StyledModal
          id="videoList"
          // height={`${playlistModalHeight}px`}
          isOpen={isVideoListOpen}
          closeModal={closeVideoList}>
          <ViewVideoList
            closeModal={closeVideoList}
            trackCount={video_count}
            playListTitle={title}
            videoData={videoData}
            selectVideo={handleVideoSelect}
            videoContentIndex={videoContentIndex}
          />
        </S.StyledModal>
      </S.Container>
    </>
  )
}
