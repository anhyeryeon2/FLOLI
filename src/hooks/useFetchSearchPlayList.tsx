import { useInfiniteQuery } from '@tanstack/react-query'

import { getSearchPlayLists } from '@/apis/search/playList'

const useFetchSearchPlayLists = (searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ['playListSearch', searchTerm],
    queryFn: ({ pageParam }) =>
      getSearchPlayLists(searchTerm, pageParam as number),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1

      return nextPage <= lastPage.length ? nextPage : undefined
    },
    select: data => {
      return data.pages.flat()
    },
    initialPageParam: 1,

    staleTime: 1000 * 60
  })
}

export default useFetchSearchPlayLists
