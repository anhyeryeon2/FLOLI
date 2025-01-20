import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import axiosInstance from '../apis/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'

export const updateLike = async (id: string) => {
  try {
    const userId = useAuthStore.getState().user?.id

    const playListData = await axiosInstance.post('rpc/update_likes_count', {
      input_playlist_id: id,
      input_user_id: userId
    })
    return playListData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

const useUpdateLike = () => {
  const { showToastMessage } = useToastMessageContext()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => updateLike(id),
    onSuccess: () => {
      showToastMessage({
        message: `좋아요를 눌렀습니다.!! `,
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['playList'] })
    },

    onError: () =>
      showToastMessage({
        message: `좋아요를 누르는데 실패했습니다.`,
        type: 'error'
      })
  })
}

export default useUpdateLike
