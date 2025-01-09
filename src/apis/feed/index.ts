import axiosInstance from '../axiosInstance'

const ITEM_COUNT = 3

export const getPlayList = async (
  page: number = 1,
  item: number = ITEM_COUNT
) => {
  try {
    const playListData = await axiosInstance.get('rpc/get_user_and_playlists', {
      params: {
        page: page,
        item: item
      }
    })
    return playListData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}
