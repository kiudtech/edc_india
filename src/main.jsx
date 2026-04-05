import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim()

if (!clientId) {
  // Allow app boot without Google auth to avoid a blank screen in local/dev misconfiguration.
  console.warn('Missing VITE_GOOGLE_CLIENT_ID. Google login is disabled until this variable is configured.')
}

// Disable browser scroll restoration so our ScrollToTop component controls it
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {clientId ? (
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
)
