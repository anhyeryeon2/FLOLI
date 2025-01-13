import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/GlobalStyles.ts'
import Providers from './providers/index.tsx'
import ToastMessageContainer from './components/ToastMessage/ToastMessageContainer.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Providers>
        <App />
        <ToastMessageContainer />
      </Providers>
    </QueryClientProvider>
  </StrictMode>
)
