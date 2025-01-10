import * as S from './CommentList.style'
import CommentItem from './CommentItem'
import useFetchPlaylistComments from '@/hooks/useFetchPlaylistComments'
import { ICommentItemProps, CommentListProps } from '@/types/comments'
import Loading from '../LoadingSpinner/Loading'
import { NotFound } from '@/pages'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRef } from 'react'

const CommentList = ({ playlistId }: CommentListProps) => {
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error
  } = useFetchPlaylistComments(playlistId)

  const observerElem = useRef(null)

  useInfiniteScroll({
    observerElem,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  if (isPending) {
    return <Loading />
  }

  if (error) {
    console.error('댓글 정보 호출 실패:', error)
    return <NotFound />
  }

  return (
    <S.Container>
      {commentsData?.pages.flat().map((data: ICommentItemProps) => (
        <CommentItem
          key={data.comment_id}
          commentId={data.comment_id}
          commentUserId={data.user_id}
          content={data.content}
          createAt={data.created_at}
          updatedAt={data.updated_at ? data.updated_at : null}
          playlistId={playlistId}
        />
      ))}
      <div ref={observerElem}>{isFetchingNextPage && <div>asdfasdf</div>}</div>
    </S.Container>
  )
}

export default CommentList
