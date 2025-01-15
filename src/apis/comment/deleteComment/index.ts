import axiosInstance from '@/apis/axiosInstance'
import { DeleteCommentProps } from '@/types/comments'

const deleteComment = async (props: DeleteCommentProps): Promise<void> => {
  await axiosInstance.delete(`/comments`, {
    params: {
      comment_id: `eq.${props.commentId}`
    }
  })
}

export default deleteComment
