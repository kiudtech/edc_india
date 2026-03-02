import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 text-sm font-semibold text-white">
              E
            </div>
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
            Log in with your Email or Founder ID
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 w-full rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Email or Founder ID
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="you@email.com  or  BUB-1001"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

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
