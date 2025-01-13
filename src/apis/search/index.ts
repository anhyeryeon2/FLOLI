import axiosInstance from '../axiosInstance'

export const getSearch = async (search_term: string) => {
  try {
    const playListData = await axiosInstance.get('rpc/search_playlists', {
      params: {
        search_term: search_term
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
