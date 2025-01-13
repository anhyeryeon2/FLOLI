import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/GlobalStyles.ts'
import Providers from './providers/index.tsx'
import ToastMessageContainer from './component/ToastMessage/ToastMessageContainer.tsx'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/component/ErrorBoundary/ErrorFallback.tsx'
import Loading from './component/LoadingSpinner/Loading.tsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Providers>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Loading />}>
                <App />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ToastMessageContainer />
      </Providers>
    </QueryClientProvider>
  </StrictMode>
)
