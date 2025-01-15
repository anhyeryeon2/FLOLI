import { useState } from 'react'
import { supabase } from '@/supabase/supabaseConfig'
import { FaLock, FaLockOpen, FaShareAlt } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useToast } from '@/hooks/useToast'

type Option = {
  id: string
  name: string
  icon: JSX.Element
  action: () => void
}

export const useMyPlaylistOptions = (
  playlistId: string | undefined,
  initialIsLocked: boolean | undefined,
  onDelete?: (id: string) => void
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [ispublic, setIspublic] = useState(initialIsLocked)

  const handleOptionsPopup = () => setIsOpen(true)
  const handleOptionsPopState = () => setIsOpen(false)
  const { handleToastError, handleToastSuccess } = useToast()

  const handleTogglePublic = async () => {
    const updatedIsLocked = !ispublic
    try {
      const { error } = await supabase.rpc('toggle_playlist_visibility', {
        p_playlist_id: playlistId,
        p_new_visibility: updatedIsLocked
      })

      if (error) throw error

      handleToastSuccess(
        `플레이리스트가 ${updatedIsLocked ? '공개' : '비공개'} 상태로 변경되었습니다.`
      )
      setIspublic(updatedIsLocked)
      setIsOpen(false)
    } catch {
      handleToastError('공개 여부 변경에 실패했습니다.')
    }
  }

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/view/${playlistId}`
    navigator.clipboard.writeText(shareUrl)
    handleToastSuccess('플레이리스트 링크가 클립보드에 복사되었습니다.')
    setIsOpen(false)
  }

  const options: Option[] = [
    {
      id: '1',
      name: '플레이리스트 삭제',
      icon: <RiDeleteBin6Line size={24} />,
      action: () => {
        if (onDelete && playlistId) onDelete(playlistId)
        setIsOpen(false)
      }
    },
    {
      id: '2',
      name: ispublic ? '비공개로 변경' : '공개로 변경',
      icon: ispublic ? <FaLock size={20} /> : <FaLockOpen size={20} />,
      action: handleTogglePublic
    },
    {
      id: '3',
      name: '링크 공유',
      icon: <FaShareAlt size={24} />,
      action: handleShareLink
    }
  ]

  return {
    isOpen,
    ispublic,
    options,
    handleOptionsPopup,
    handleOptionsPopState
  }
}
