import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'
import { motion } from 'framer-motion'
import SiteNavbar from '../components/SiteNavbar'
import SiteFooter from '../components/SiteFooter'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [adminSubmitting, setAdminSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [adminCredentials, setAdminCredentials] = useState({
    identifier: '',
    password: '',
  })

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

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setError('')
    setAdminSubmitting(true)

    try {
      const data = await postJsonWithRetry(
        `${API_BASE}/api/auth/login`,
        {
          identifier: adminCredentials.identifier,
          password: adminCredentials.password,
        },
        1
      )

      if (data.user?.role !== 'admin') {
        throw new Error('This account does not have admin access.')
      }

      login(data.token, data.user, { remember: rememberMe })
      navigate('/admin')
    } catch (err) {
      console.error(err)
      let errorMsg = err.message || 'An error occurred during admin login.'
      if (errorMsg.includes('Server returned an invalid response.')) {
        errorMsg = 'Server is waking up. Please try again in a few seconds.'
      }
      setError(errorMsg)
    } finally {
      setAdminSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex min-h-screen flex-col"
    >
      <SiteNavbar />

      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="blob-float absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="blob-float-reverse absolute -bottom-28 -left-28 h-[360px] w-[360px] rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative mx-auto grid h-full max-w-7xl items-stretch gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-12">
          <section className="hidden rounded-[2rem] border border-white/15 bg-white/5 p-10 text-white backdrop-blur-sm lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <div className="rounded-2xl border border-white/70 bg-white p-2.5 shadow-sm transition group-hover:bg-white">
                    <img src="/logo.png" alt="EDC India" className="h-9 w-9 rounded-md bg-white object-contain p-0.5" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white">EDC India</span>
                </Link>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 whitespace-nowrap">
                  Admin Access
                </div>
              </div>

              <h2 className="mt-10 text-5xl font-extrabold leading-tight tracking-tight text-white">
                Welcome Back,
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">Administrator</span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                Monitor platform activity, manage member journeys, and keep operations running smoothly from your command dashboard.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'User Oversight', text: 'Manage users, memberships, and profile status.' },
                  { title: 'Query Management', text: 'Track incoming requests and partnership forms.' },
                  { title: 'Payments & Plans', text: 'Review transactions and update plan details.' },
                  { title: 'Content Controls', text: 'Maintain events, grants, and notifications.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/60">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/75">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold">AD</div>
              Admin sessions are protected with role-based access checks.
            </div>
          </section>

          <section className="flex w-full items-center justify-center py-1 sm:py-6">
            <div className="w-full max-w-xl rounded-[1.6rem] border border-white/20 bg-white/95 p-4 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-9">
              <div className="mb-7 text-center">
                <Link to="/" className="mx-auto inline-flex items-center gap-2.5 lg:hidden">
                  <img src="/logo.png" alt="EDC India" className="h-9 w-9 rounded-full bg-white object-contain p-0.5" />
                  <span className="text-base font-bold text-slate-800">EDC India</span>
                </Link>
                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Admin Portal Login</h1>
                <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">Sign in with your admin credentials to continue.</p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">Admin Email or Founder ID</label>
                  <input
                    type="text"
                    value={adminCredentials.identifier}
                    onChange={(e) => setAdminCredentials((prev) => ({ ...prev, identifier: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">Password</label>
                  <input
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter admin password"
                  />
                </div>

                <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-2.5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm text-slate-700 transition hover:bg-white/80">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-primary shadow-sm focus:ring-primary/30"
                      />
                      <span className="font-semibold">Remember me</span>
                    </label>

                    <button
                      type="submit"
                      disabled={adminSubmitting}
                      className="w-44 shrink-0 rounded-xl border border-primary bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a3478] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-52"
                    >
                      {adminSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-700 sm:text-sm">
                If your account does not have admin role permissions, access to the dashboard will be denied.
              </div>

              <div className="mt-6 text-center text-sm text-slate-500">
                <Link to="/" className="font-semibold text-primary transition-colors hover:text-secondary">Back to Main Site</Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </motion.div>
  )
}
