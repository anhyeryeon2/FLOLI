import { IToggleSubscParams } from '@/types/toggleSubsc'
import toggleSubscStatus from '@/utils/toggleSubscStatus'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useToggleSubsc = () => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, IToggleSubscParams>({
    mutationFn: toggleSubscStatus,
    onSuccess: (_, variables) => {
      // 캐시 무효화하기(바로 반영되어야해서)
      queryClient.invalidateQueries({
        queryKey: [
          'userSubscStatus',
          variables.currentUserId,
          variables.subscribedUserId
        ]
      })
    }
  })
}

export default useToggleSubsc
