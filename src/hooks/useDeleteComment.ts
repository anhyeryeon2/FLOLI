import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'
import { DeleteCommentProps } from '@/types/comments'

const deleteComment = async (props: DeleteCommentProps): Promise<void> => {
  await axiosInstance.delete(`/comments`, {
    params: {
      comment_id: `eq.${props.commentId}`
    }
  })
}

const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['playlistComments', variables.playlistId]
      })
    }
  })
}

export default useDeleteComment
