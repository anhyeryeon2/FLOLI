import { useState } from 'react'

// 마우스와 터치 이벤트 타입을 각각 분리하여 처리
export const useDragScroll = (scrollRef: React.RefObject<HTMLDivElement>) => {
  const [isDrag, setIsDrag] = useState(false)
  const [startX, setStartX] = useState(0)
  const [, setScrollLeft] = useState(0)

  const getPageX = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      return e.touches[0].pageX // 터치 이벤트에서 X 좌표
    } else {
      return e.pageX // 마우스 이벤트에서 X 좌표
    }
  }

  // onDragStart는 MouseEvent, TouchEvent에 대해 각각 처리
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault() // preventDefault 호출 가능
    setIsDrag(true)
    const scrollLeft = scrollRef?.current?.scrollLeft || 0
    setStartX(getPageX(e.nativeEvent) + scrollLeft) // nativeEvent를 통해 MouseEvent로 전달
    setScrollLeft(scrollLeft)
  }

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault()
    setIsDrag(true)
    const scrollLeft = scrollRef?.current?.scrollLeft || 0
    setStartX(getPageX(e.nativeEvent) + scrollLeft)
    setScrollLeft(scrollLeft)
  }

  const onDragEnd = () => {
    setIsDrag(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragMove = (e: any) => {
    if (isDrag && scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth
      const clientWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollLeft = startX - getPageX(e)

      // 스크롤이 0보다 작은 값으로 이동하지 않도록 제한
      if (scrollRef.current.scrollLeft < 0) {
        scrollRef.current.scrollLeft = 0
      } else if (scrollRef.current.scrollLeft > scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = scrollWidth - clientWidth
      }
    }
  }

  const onThrottleDragMove = throttle(onDragMove, 16) // throttle 적용

  return {
    onMouseDown,
    onTouchStart,
    onDragEnd,
    isDrag,
    onThrottleDragMove
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle<T extends (...args: any[]) => void>(
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
