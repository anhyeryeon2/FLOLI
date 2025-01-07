import { useState } from 'react'

/**
 * useImageUpload - 이미지 업로드 및 미리보기를 위한 커스텀 훅
 */

export const useImageUpload = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null)

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetThumbnail = () => {
    setThumbnail(null)
  }

  return {
    thumbnail,
    handleThumbnailUpload,
    resetThumbnail
  }
}
