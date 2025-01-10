import React from 'react'
import { ToastMessageProvider } from './ToastMessageProvider'
import { OverlayProvider } from '@toss/use-overlay'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayProvider>
      <ToastMessageProvider>{children}</ToastMessageProvider>
    </OverlayProvider>
  )
}

export default Providers
