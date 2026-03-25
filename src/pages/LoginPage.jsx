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
  const [adminSubmitting, setAdminSubmitting] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({
    identifier: '',
    password: '',
  })

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setGoogleSubmitting(true)
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
      setGoogleSubmitting(false)
    }
  }

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setError('')
    setAdminSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: adminCredentials.identifier,
          password: adminCredentials.password,
        }),
      })

      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { throw new Error('Server returned an invalid response. Make sure the backend is running.') }
      if (!res.ok) throw new Error(data.message || 'Admin login failed')

      if (data.user?.role !== 'admin') {
        throw new Error('This account does not have admin access.')
      }

      login(data.token, data.user)
      navigate('/admin')
    } catch (err) {
      console.error(err)
      setError(err.message || 'An error occurred during admin login.')
    } finally {
      setAdminSubmitting(false)
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

          <div className="mt-6 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={() => setShowAdminLogin((prev) => !prev)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {showAdminLogin ? 'Hide Admin Login' : 'Login as Admin'}
            </button>

            {showAdminLogin && (
              <form onSubmit={handleAdminLogin} className="mt-4 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Admin Email or Founder ID</label>
                  <input
                    type="text"
                    value={adminCredentials.identifier}
                    onChange={(e) => setAdminCredentials((prev) => ({ ...prev, identifier: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Password</label>
                  <input
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter admin password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={adminSubmitting}
                  className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
                >
                  {adminSubmitting ? 'Signing in...' : 'Sign In to Admin Dashboard'}
                </button>
              </form>
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
