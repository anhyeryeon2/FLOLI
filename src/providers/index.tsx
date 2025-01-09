import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastMessageProvider } from './ToastMessageProvider'
import { OverlayProvider } from '@toss/use-overlay'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <ToastMessageProvider>{children}</ToastMessageProvider>
      </OverlayProvider>
    </QueryClientProvider>
  )
}

export default Providers
