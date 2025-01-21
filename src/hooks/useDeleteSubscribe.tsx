import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../apis/axiosInstance'
import { useToast } from './useToast'
import { useAuthStore } from '@/store/useAuthStore'

export const deleteSubscribe = async (subscrbie_id: string) => {
  try {
    const userId = useAuthStore.getState().user?.id
    const subscribeData = await axiosInstance.post('rpc/delete_subscription', {
      input_subscribed_user_id: subscrbie_id,
      input_user_id: userId
    })
    return subscribeData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

const useDeleteSubscribe = () => {
  const { handleToastError, handleToastSuccess } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (subscribe_id: string) => {
      const res = await deleteSubscribe(subscribe_id)
      return res.data
    },
    onSuccess: () => {
      handleToastSuccess(`구독을 취소하였습니다. `)
      queryClient.invalidateQueries({ queryKey: ['subscribeList'] })
      queryClient.invalidateQueries({ queryKey: ['allSubscribePlayList'] })
    },
    onError: () => {
      handleToastError(`예상치 못한 이유로 구독을 취소하지 못하였습니다.`)
    }
  })
}

export default useDeleteSubscribe
