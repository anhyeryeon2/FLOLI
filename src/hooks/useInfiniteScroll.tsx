import { useEffect } from 'react'

type UseInfiniteScrollProps = {
  observerElem: React.RefObject<HTMLElement>
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const useInfiniteScroll = ({
  observerElem,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    // observerElem.current를 외부 변수로 복사하여 사용
    const currentElem = observerElem.current

    if (!currentElem) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.5
      }
    )

    observer.observe(currentElem)

    // 클린업 함수에서 currentElem을 사용
    return () => {
      observer.unobserve(currentElem)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, observerElem])
}
