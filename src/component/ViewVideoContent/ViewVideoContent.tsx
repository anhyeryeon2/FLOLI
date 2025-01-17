import { forwardRef } from 'react'
import * as S from './ViewVideoContent.style'

type ViewVideoContentProps = {
  videoId: string
}

const ViewVideoContent = forwardRef<HTMLDivElement, ViewVideoContentProps>(
  ({ videoId }, ref) => {
    const embedUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1'

    return (
      <S.Container ref={ref}>
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </S.Container>
    )
  }
)

export default ViewVideoContent
