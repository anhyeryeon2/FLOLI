import CommentEditor from '@/component/Comment/CommentEditor'
import CommentList from '@/component/Comment/CommentList'
import { Profile } from '@/component'
import ViewVideoList from '@/component/ViewVideoList/ViewVideoList'
import * as S from '@/styles/pages/view/view.style'
import { IViewProps } from '@/types/View'
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

// {
//   playListTitle,
//   VideoTitle,
//   createAt,
//   description,
//   creatorImgPath,
//   creatorName,
//   subscCount,
//   isSubsc,
//   isLike,
//   isStore,
//   commentCount,
//   trackCount,
// }: IViewProps
export const View = () => {
  const playListTitle =
    '플레이리스트 제목 플레이리스트 제목 플레이리스트 제목 플레이리스트 제목 플레이리스트 제목플레이리스트 제목플레이리스트 제목플레이리스트 제목플레이리스트 제목'
  const VideoTitle = '영상 제목 가나다라 마바사아'
  const createAt = '2024년 9월 10일'
  const description =
    '테스트입니다 테스트입니다테스트입니다 테스트입니다테스트입니다 테스트입니다테스트입니다 테스트입니다테스트입니다 테스트입니다테스트입니다 테스트입니다테스트입니다 테스트입니다'
  const creatorImgPath =
    'https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg'
  const creatorName =
    '홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동'
  const subscCount = 2857612
  const isSubsc = false
  const isLike = false
  const isStore = false
  const commentCount = 172
  const trackCount = 24

  const [isVideoListOpen, setIsVideoListOpen] = useState(false)
  const openVideoList = () => setIsVideoListOpen(true)
  const closeVideoList = () => setIsVideoListOpen(false)

  return (
    <>
      <S.Container>
        {/* todo: 영상 들어가는 영역 - sticky 넣기 */}
        <S.VideoInfoWrapper>
          <h2>{VideoTitle}</h2>
          <h1>{playListTitle}</h1>
          <div className="info-box">
            <span className="create-at">{createAt}</span>
            <DescriptionText description={description} />
          </div>
          <S.CreatorProfileWrapper>
            <div>
              <Profile
                className="profile-img"
                userId="userIdtest"
                size="3.2rem"
                imageUrl={creatorImgPath}
              />
              <h3 className="creator-name">{creatorName}</h3>
              <span className="subsc-count">{subscCount}</span>
            </div>
            {isSubsc ? (
              <S.StyledButton
                type="button"
                className="subsc-cancel">
                구독 취소
              </S.StyledButton>
            ) : (
              <S.StyledButton type="button">구독</S.StyledButton>
            )}
          </S.CreatorProfileWrapper>
          <S.ActionButtonWrapper>
            <button type="button">
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
              <span>25.6K</span>
            </button>
            <button type="button">
              <FaShareAlt size="16" />
              <span>공유</span>
            </button>
            <button type="button">
              {isStore ? <FaBookmark size="16" /> : <FaRegBookmark size="16" />}
              <span>저장</span>
            </button>
          </S.ActionButtonWrapper>
        </S.VideoInfoWrapper>
        <S.CommentWrapper>
          <div className="comment-count">
            댓글
            <span>{commentCount}</span>
          </div>
          <CommentEditor />
          <CommentList />
        </S.CommentWrapper>

        <S.VideoListPanel onClick={openVideoList}>
          <RiPlayList2Fill size="24" />
          <div className="playList-info-wrapper">
            <p className="next-video-title">
              다음 영상 제목 들어가기다음 영상 제목 들어가기 다음 영상 제목
              들어가기
            </p>
            <div className="playList-info">
              <p>{playListTitle} 말줄임표 넣기</p>
              <span>&nbsp;|&nbsp;</span>
              <span>2/{trackCount}</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-toggle-button">
            <IoIosArrowUp size="18" />
          </button>
        </S.VideoListPanel>
        <S.StyledModal
          id="testmodal"
          isOpen={isVideoListOpen}
          closeModal={closeVideoList}>
          <ViewVideoList
            closeModal={closeVideoList}
            trackCount={trackCount}
            playListTitle={playListTitle}
          />
        </S.StyledModal>
      </S.Container>
    </>
  )
}
