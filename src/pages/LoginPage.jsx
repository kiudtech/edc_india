import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'
import { GoogleLogin } from '@react-oauth/google'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setSubmitting(true)
    try {
      // Send the raw Google token securely to our backend for verification
      const res = await fetch(`${API_BASE}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      })
      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { throw new Error('Server returned an invalid response. Make sure the backend is running.') }
      if (!res.ok) throw new Error(data.message || 'Login failed')

      login(data.token, data.user)
      if (data.user.role === 'admin') navigate('/admin')
      else navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError(err.message || 'An error occurred during Google sign in.')
    } finally {
      setSubmitting(false)
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
            {submitting ? (
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
