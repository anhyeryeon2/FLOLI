import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import axiosInstance from '../apis/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'

export const subscribeCreate = async (id: string) => {
  try {
    const userId = useAuthStore.getState().user?.id
    const playListData = await axiosInstance.post('rpc/subscribe_to_user', {
      input_playlist_owner_id: id,
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

const useSubscribeCreate = () => {
  const { showToastMessage } = useToastMessageContext()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => subscribeCreate(id),
    onSuccess: () => {
      showToastMessage({
        message: `구독을 성공하였습니다.!! `,
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['playList'] })
    },
    onError: () =>
      showToastMessage({
        message: `구독을 실패하였습니다.`,
        type: 'error'
      })
  })
}

export default useSubscribeCreate
