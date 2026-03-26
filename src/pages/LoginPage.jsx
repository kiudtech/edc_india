import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'
import { GoogleLogin } from '@react-oauth/google'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [googleSubmitting, setGoogleSubmitting] = useState(false)

  // Helper to read JSON safely from a response
  const readJsonSafely = async (response) => {
    const text = await response.text()
    if (!text) return {}
    try {
      return JSON.parse(text)
    } catch {
      throw new Error('Server returned an invalid response. Make sure the backend is running. ' + text.substring(0, 100))
    }
  }

  // Wrapper to automatically retry if the server is waking up
  const postJsonWithRetry = async (url, body, retries = 1) => {
    let lastError
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await readJsonSafely(response)
        if (!response.ok) throw new Error(data.message || 'Request failed')
        return data
      } catch (err) {
        lastError = err
        const message = String(err?.message || '').toLowerCase()
        const retriable = message.includes('failed to fetch')
          || message.includes('network')
          || message.includes('econnreset')
          || message.includes('invalid response') /* handles HTML error pages from waking servers */
        if (attempt < retries && retriable) {
          await new Promise((resolve) => setTimeout(resolve, 800)) // give backend time to spin up
          continue
        }
        break // exit if not retriable
      }
    }
    throw lastError || new Error('Request failed')
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setGoogleSubmitting(true)
    try {
      // Send the raw Google token securely to our backend for verification
      const data = await postJsonWithRetry(
        `${API_BASE}/api/auth/google-login`,
        { token: credentialResponse.credential },
        2 // attempt up to 3 times (1 initial + 2 retries)
      )

      login(data.token, data.user)
      if (data.user.role === 'admin') navigate('/admin')
      else navigate('/dashboard')
    } catch (err) {
      console.error(err)
      // Extract clean error message without the truncated HTML response
      let errorMsg = err.message || 'An error occurred during Google sign in.'
      if (errorMsg.includes('Server returned an invalid response.')) {
        errorMsg = 'Server is waking up. Please try again in a few seconds.'
      }
      setError(errorMsg)
    } finally {
      setGoogleSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full object-contain bg-white" />
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-500">Not a member?</span>
            <Link to="/join" className="rounded-full bg-secondary px-4 py-2 text-white shadow-glow">
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to your account
          </p>
        </div>

        <div className="mt-8 w-full rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center">
            {googleSubmitting ? (
              <p className="text-sm font-medium text-slate-600">Logging in...</p>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google sign-in failed. Please try again.')}
                shape="rectangular"
                width={300}
                text="signin_with"
              />
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/join" className="font-semibold text-primary hover:underline">
            Join Startup Membership
          </Link>
        </p>
      </div>
    </div>
  )
}
