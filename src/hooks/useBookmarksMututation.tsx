import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import axiosInstance from '../apis/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'

export const updateBookmarks = async (id: string) => {
  try {
    const userId = useAuthStore.getState().user?.id
    const playListData = await axiosInstance.post('rpc/update_bookmarks', {
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

const useBookmarksMututation = () => {
  const { showToastMessage } = useToastMessageContext()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => updateBookmarks(id),
    onSuccess: () => {
      showToastMessage({
        message: `나의 플레이리스트에 추가되었습니다.!! `,
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['playList'] })
    },
    onError: () =>
      showToastMessage({
        message: `나의 플레이리스트 추가에 실패하였습니다.`,
        type: 'error'
      })
  })
}

export default useBookmarksMututation
