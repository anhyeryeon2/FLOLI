import { useState } from 'react'

export const useDragScroll = (scrollRef: React.RefObject<HTMLDivElement>) => {
  const [isDrag, setIsDrag] = useState(false)
  const [startX, setStartX] = useState(0)
  const [_, setScrollLeft] = useState(0)

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDrag(true)
    const scrollLeft = scrollRef?.current?.scrollLeft || 0
    setStartX(e.pageX + scrollLeft)
    setScrollLeft(scrollLeft)
  }

  const onDragEnd = () => {
    setIsDrag(false)
  }

  const onDragMove = (e: React.MouseEvent) => {
    if (isDrag && scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth
      const clientWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollLeft = startX - e.pageX

      if (scrollRef.current.scrollLeft < 0) {
        scrollRef.current.scrollLeft = 0
      } else if (scrollRef.current.scrollLeft > scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = scrollWidth - clientWidth
      }
    }
  }

  const onThrottleDragMove = throttle(onDragMove, 16) // throttle 적용

  return {
    onDragStart,
    onDragEnd,
    isDrag,
    onThrottleDragMove
  }
}

function throttle<T extends (...args: any[]) => void>( // eslint-disable-line @typescript-eslint/no-explicit-any
  func: T,
  ms: number
): (...args: Parameters<T>) => void {
  let throttled = false
  return (...args: Parameters<T>) => {
    if (!throttled) {
      throttled = true
      setTimeout(() => {
        func(...args)
        throttled = false
      }, ms)
    }
  }
}
