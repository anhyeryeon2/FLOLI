import { useQuery } from '@tanstack/react-query'
import { IPlayList } from '@/types/playList'
import { getSearchPlayLists } from '@/apis/search/playList'

const useFetchPlayList = (debouncedTitle: string) => {
  return useQuery<IPlayList[]>({
    queryKey: ['searchPlayList', debouncedTitle],
    queryFn: () => getSearchPlayLists(debouncedTitle),
    enabled: !!debouncedTitle,
    staleTime: 1000 * 60
  })
}

export default useFetchPlayList
