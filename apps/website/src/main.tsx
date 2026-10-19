import './polyfills'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { I18nProvider } from './i18n'
import { BootFallback } from './components/BootFallback'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<BootFallback />}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>,
)
