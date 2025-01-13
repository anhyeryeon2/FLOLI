import axiosInstance from '../../axiosInstance'

const ITEM_COUNT = 3

export const getSubscribePlayLists = async (
  userId: string,
  page: number = 1,
  item: number = ITEM_COUNT
) => {
  try {
    const subscribeData = await axiosInstance.get('rpc/get_playlists_by_user', {
      params: {
        input_user_id: userId,
        page: page,
        item: item
      }
    })
    return subscribeData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}
