import * as S from './CommentList.style'
import CommentItem from './CommentItem'
import useFetchPlaylistComments from '@/hooks/useFetchPlaylistComments'
import { ICommentItemProps, CommentListProps } from '@/types/comments'
import { Loading } from '@/component'
import { useInfiniteScroll } from '@/hooks'
import { useRef } from 'react'

const CommentList = ({ playlistId, creatorId }: CommentListProps) => {
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
    throw new Error('댓글 목록을 불러오는 데 실패하였습니다.')
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
          creatorId={creatorId}
        />
      ))}
      <div ref={observerElem}>{isFetchingNextPage && <Loading />}</div>
    </S.Container>
  )
}

export default CommentList
