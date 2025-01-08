import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IToggleLikeParams } from '@/types/toggleLike'
import toggleLikeStatus from '@/utils/toggleLikeStatus'

const useToggleLike = () => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, IToggleLikeParams>({
    mutationFn: toggleLikeStatus,
    onSuccess: (_, variables) => {
      // 캐시 무효화하기(바로 반영되어야해서)
      queryClient.invalidateQueries({
        queryKey: ['userLikeStatus', variables.userId, variables.playlistId]
      })
      queryClient.invalidateQueries({
        queryKey: ['playlist', variables.playlistId]
      })
    }
  })
}

export default useToggleLike
