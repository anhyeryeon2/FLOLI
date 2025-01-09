import {
  type ToastMessageProps,
  type ToastMessageContextType
} from '@/types/ToastMessage'
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect
} from 'react'

const ToastMessageContext = createContext<ToastMessageContextType | null>(null)
export const ToastMessageProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [toastMessages, setToastMessages] = useState<ToastMessageProps[]>([])
  const timeoutIds = useRef(new Set())

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(id => clearTimeout(id as number))
    }
  }, [])

  const removeToastMessage = useCallback((id: string) => {
    setToastMessages(prev =>
      prev.filter(toastMessage => toastMessage.id !== id)
    )
  }, [])

  const showToastMessage = useCallback(
    ({
      message,
      type
    }: {
      message: string
      type: ToastMessageProps['type']
    }) => {
      const id = Math.random().toString(36).substring(7)
      if (
        toastMessages.some(toastMessage => toastMessage.message === message)
      ) {
        return
      }

      setToastMessages(prev => [...prev, { id, message, type }])

      const timeoutId = setTimeout(() => {
        removeToastMessage(id)
        timeoutIds.current.delete(timeoutId)
      }, 3000)
      timeoutIds.current.add(timeoutId)
    },

    [toastMessages, removeToastMessage]
  )
  return (
    <ToastMessageContext.Provider
      value={{ toastMessages, showToastMessage, removeToastMessage }}>
      {children}
    </ToastMessageContext.Provider>
  )
}

export const useToastMessageContext = () => {
  const context = useContext(ToastMessageContext)
  if (!context) {
    throw new Error(
      'useToastMessageContext must be used within ToastMessageProvider'
    )
  }
  return context
}
