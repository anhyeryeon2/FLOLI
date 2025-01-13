import { IoIosArrowDown } from 'react-icons/io'
import * as S from './ViewVideoList.style'
import { LAST_VIDEO_TITLE } from '@/constants/constant'
import DetailPlayList from '@/component/DetailPlayList/DetailPlayList'

interface IViewVideoListProps {
  closeModal: () => void
  playListTitle: string
  trackCount: number
  videoData: videoDataType[]
  selectVideo: (
    video_id: string,
    index: number,
    title: string,
    nextTitle: string
  ) => void
  videoContentIndex: number
}

type videoDataType = {
  title: string
  author_name: string
  thumbnail_url: string
  video_id: string
}

const ViewVideoList = ({
  closeModal,
  playListTitle,
  trackCount,
  videoData,
  selectVideo,
  videoContentIndex
}: IViewVideoListProps) => {
  const handleClick = (
    video_id: string,
    index: number,
    title: string,
    nextTitle: string
  ) => {
    selectVideo(video_id, index, title, nextTitle)
  }

  return (
    <S.Container>
      <S.TitleWrapper>
        <div className="title-box">
          <h2>{playListTitle}</h2>
          <span>
            {videoContentIndex + 1}/{trackCount}
          </span>
        </div>
        <button
          type="button"
          onClick={closeModal}>
          <IoIosArrowDown size="20" />
        </button>
      </S.TitleWrapper>

      <div className="detail-play-List">
        {videoData?.map((data: videoDataType, index: number) => {
          const nextTitle =
            index + 1 < videoData.length
              ? videoData[index + 1].title
              : LAST_VIDEO_TITLE
          return (
            <DetailPlayList
              key={data.video_id}
              image={data.thumbnail_url}
              title={data.title}
              nickname={data.author_name}
              onClick={() =>
                handleClick(data.video_id, index, data.title, nextTitle)
              }
            />
          )
        })}
      </div>
    </S.Container>
  )
}

export default ViewVideoList
