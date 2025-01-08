import { IToggleBookmarkParams } from '@/types/toggleBookmark'
import toggleBookmarkStatus from '@/utils/toggleBookmarkStatus'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useToggleBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, IToggleBookmarkParams>({
    mutationFn: toggleBookmarkStatus,
    onSuccess: (_, variables) => {
      // 캐시 무효화하기(바로 반영되어야해서)
      queryClient.invalidateQueries({
        queryKey: ['userBookmarkStatus', variables.userId, variables.playlistId]
      })
    }
  })
}

export default useToggleBookmark
