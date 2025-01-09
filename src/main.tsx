import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/GlobalStyles.ts'
import Providers from './providers/index.tsx'
import ToastMessageContainer from './components/ToastMessage/ToastMessageContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <Providers>
      <App />
      <ToastMessageContainer />
    </Providers>
  </StrictMode>
)
