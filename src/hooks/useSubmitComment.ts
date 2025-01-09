import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'
import { IFetchCommentsProps } from '@/types/comments'

const submitComment = async (props: IFetchCommentsProps) => {
  const res = await axiosInstance.post('/comments', {
    user_id: props.userId,
    playlist_id: props.playlistId,
    content: props.content
  })

  return res.data
}

const useSubmitComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['submitComments', variables.playlistId]
      })
      queryClient.invalidateQueries({
        queryKey: ['playlistComments', variables.playlistId]
      })
    }
  })
}

export default useSubmitComment
