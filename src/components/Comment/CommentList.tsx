import * as S from '@/styles/components/comment/comment-List.style'
import CommentItem from './CommentItem'
import useFetchPlaylistComments from '@/hooks/useFetchPlaylistComments'
import { ICommentItemProps, CommentListProps } from '@/types/comments'
import Loading from '../LoadingSpinner/Loading'
import { NotFound } from '@/pages'

const CommentList = ({ playlistId }: CommentListProps) => {
  const {
    data: commentsData,
    error,
    isPending
  } = useFetchPlaylistComments(playlistId)

  if (isPending) {
    return <Loading />
  }

  if (error) {
    console.error('댓글 정보 호출 실패:', error)
    return <NotFound />
  }

  return (
    <S.Container>
      {commentsData.map((data: ICommentItemProps) => (
        <CommentItem
          key={data.comment_id}
          commentId={data.comment_id}
          commentUserId={data.user_id}
          content={data.content}
          createAt={data.created_at}
          updatedAt={data.updated_at ? data.updated_at : null}
        />
      ))}
    </S.Container>
  )
}

export default CommentList
