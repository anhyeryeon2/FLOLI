import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastMessageProvider } from './ToastMessageProvider'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastMessageProvider>{children}</ToastMessageProvider>
    </QueryClientProvider>
  )
}

export default Providers
