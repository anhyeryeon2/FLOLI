import * as S from '@/component/PlayListCreate/PlayListCreate.styles'
import { VideoItem } from '@/types/playListCreate'

export const VideoList = ({
  videoList,
  handleRemoveVideo
}: {
  videoList: VideoItem[]
  handleRemoveVideo: (index: number) => void
}) => (
  <div>
    {videoList.map((video, index) => (
      <S.VideoItem key={video.id}>
        <a
          href={video.link}
          target="_blank"
          rel="noopener noreferrer">
          <S.Thumbnail
            src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
            alt={video.title}
          />
        </a>
        <S.VideoInfo>
          <span>{video.title}</span>
          <p>{video.channel || '알 수 없는 채널'}</p>
        </S.VideoInfo>
        <S.RemoveButton onClick={() => handleRemoveVideo(index)}>
          ✕
        </S.RemoveButton>
      </S.VideoItem>
    ))}
  </div>
)
