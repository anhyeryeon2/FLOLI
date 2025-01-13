import React from 'react'
import { ToastMessageProvider } from './ToastMessageProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ToastMessageProvider>{children}</ToastMessageProvider>
}

export default Providers
