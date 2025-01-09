import { IoIosArrowDown } from 'react-icons/io'
import * as S from './ViewVideoList.style'
import { IViewProps } from '@/types/View'
import { IModalDefaultProps } from '@/types/modal'
import DetailPlayList from '@/components/DetailPlayList/DetailPlayList'

type Combined = IViewProps & IModalDefaultProps

const testArr = [
  {
    image:
      'https://cdn.pixabay.com/photo/2023/07/21/21/05/bus-8142339_1280.jpg',
    title:
      '이건 영상입니다이건 영상입니다이건 영상입니다이건 영상입니다이건 영상입니다이건 영상입니다',
    nickname:
      '영상 제작자 이름영상 제작자 이름영상 제작자 이름영상 제작자 이름영상 제작자 이름영상 제작자 이름영상 제작자 이름영상 제작자 이름'
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2023/07/21/21/05/bus-8142339_1280.jpg',
    title: '영상 제목~~',
    nickname: '영상 제작자 이름~~'
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2023/07/21/21/05/bus-8142339_1280.jpg',
    title: '여기엔 영상 제목이 들어갑니다',
    nickname: '여기엔 영상 제작 채널 이름'
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2023/07/21/21/05/bus-8142339_1280.jpg',
    title: '여기엔 영상 제목이 들어갑니다2',
    nickname: '여기엔 영상 제작 채널 이름'
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2023/07/21/21/05/bus-8142339_1280.jpg',
    title: '여기엔 영상 제목이 들어갑니다3',
    nickname: '여기엔 영상 제작 채널 이름'
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2023/07/21/21/05/bus-8142339_1280.jpg',
    title: '여기엔 영상 제목이 들어갑니다4',
    nickname: '여기엔 영상 제작 채널 이름'
  }
]

const ViewVideoList = ({
  closeModal,
  playListTitle,
  trackCount
}: Pick<Combined, 'closeModal' | 'playListTitle' | 'trackCount'>) => {
  return (
    <S.Container>
      <S.TitleWrapper>
        <div className="title-box">
          <h2>{playListTitle}</h2>
          <span>2/{trackCount}</span>
        </div>
        <button
          type="button"
          onClick={closeModal}>
          <IoIosArrowDown size="20" />
        </button>
      </S.TitleWrapper>

      <div className="detail-play-List">
        {testArr.map(data => (
          <DetailPlayList
            key={data.title}
            image={data.image}
            title={data.title}
            nickname={data.nickname}
          />
        ))}
      </div>
    </S.Container>
  )
}

export default ViewVideoList
