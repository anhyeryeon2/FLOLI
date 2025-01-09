import { useEffect } from 'react'

type useScrollLockProps = {
  isOpen: boolean
}

const useScrollLock = ({ isOpen }: useScrollLockProps) => {
  // 스크롤 방지
  const preventScroll = () => {
    const currentScrollY = window.scrollY
    const hasScrollBar =
      window.innerWidth > document.documentElement.clientWidth

    document.documentElement.style.setProperty(
      '--scroll-position',
      `-${currentScrollY}px`
    )
    document.body.classList.add('scroll-locked')
    if (hasScrollBar) document.body.classList.add('has-scrollbar')

    return currentScrollY
  }

  // 스크롤 허용
  const allowScroll = (scrollY: number) => {
    document.body.classList.remove('scroll-locked', 'has-scrollbar')
    document.documentElement.style.removeProperty('--scroll-position')
    window.scrollTo(0, scrollY)
  }

  useEffect(() => {
    if (isOpen) {
      const scrollY = preventScroll()
      return () => allowScroll(scrollY)
    }
  }, [isOpen])
}

export { useScrollLock }
