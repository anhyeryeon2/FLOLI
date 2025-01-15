import axiosInstance from '@/apis/axiosInstance'
import { ModifyCommentProps } from '@/types/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const modifyComment = async (props: ModifyCommentProps) => {
  await axiosInstance.patch(
    '/comments',
    {
      content: props.content
    },
    {
      params: {
        comment_id: `eq.${props.commentId}`
      }
    }
  )
}

const useModifyComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: modifyComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['playlistComments', variables.playlistId]
      })
    }
  })
}

export default useModifyComment
