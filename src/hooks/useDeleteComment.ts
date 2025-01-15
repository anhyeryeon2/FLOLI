import deleteComment from '@/apis/comment/deleteComment'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
