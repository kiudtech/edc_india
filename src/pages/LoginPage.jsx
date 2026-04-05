import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'
import { GoogleLogin } from '@react-oauth/google'
import { motion } from 'framer-motion'
import SiteFooter from '../components/SiteFooter'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const googleClientIdConfigured = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim())
  const [error, setError] = useState('')
  const [googleSubmitting, setGoogleSubmitting] = useState(false)
  const [googleButtonWidth, setGoogleButtonWidth] = useState(280)
  const googleAuthSlotRef = useRef(null)

  useEffect(() => {
    const updateGoogleButtonWidth = () => {
      const viewport = typeof window !== 'undefined' ? window.innerWidth : 360
      const fallbackWidth = viewport < 640 ? viewport - 120 : viewport - 160
      const slotWidth = googleAuthSlotRef.current?.clientWidth || fallbackWidth
      const targetWidth = slotWidth - 6
      setGoogleButtonWidth(Math.max(170, Math.min(360, Math.floor(targetWidth))))
    }

    updateGoogleButtonWidth()

    let resizeObserver
    if (typeof ResizeObserver !== 'undefined' && googleAuthSlotRef.current) {
      resizeObserver = new ResizeObserver(updateGoogleButtonWidth)
      resizeObserver.observe(googleAuthSlotRef.current)
    }

    window.addEventListener('resize', updateGoogleButtonWidth)
    return () => {
      window.removeEventListener('resize', updateGoogleButtonWidth)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [])

  const readJsonSafely = async (response) => {
    const text = await response.text()
    if (!text) return {}
    try {
      return JSON.parse(text)
    } catch {
      throw new Error('Server returned an invalid response. Make sure the backend is running. ' + text.substring(0, 100))
    }
  }

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
          || message.includes('invalid response')
        if (attempt < retries && retriable) {
          await new Promise((resolve) => setTimeout(resolve, 800))
          continue
        }
        break
      }
    }
    throw lastError || new Error('Request failed')
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setGoogleSubmitting(true)
    try {
      const data = await postJsonWithRetry(
        `${API_BASE}/api/auth/google-login`,
        { token: credentialResponse.credential },
        2
      )

      login(data.token, data.user)
      if (data.user.role === 'admin') navigate('/admin')
      else navigate('/dashboard')
    } catch (err) {
      console.error(err)
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
    <motion.div
      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex min-h-[calc(100vh-73px)] flex-col"
    >
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="blob-float absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="blob-float-reverse absolute -bottom-28 -left-28 h-[360px] w-[360px] rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-stretch gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-12">
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
                  Member Access
                </div>
              </div>
              <h2 className="mt-10 text-5xl font-extrabold leading-tight tracking-tight text-white">
                Welcome Back,
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">Founder</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                Access your dashboard, explore opportunities, and manage your startup journey with EDC India's ecosystem support.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: '🚀', title: 'Growth Network', text: 'Connect with founders, mentors, and investors.' },
                  { icon: '📋', title: 'Validation Insights', text: 'Track idea validation progress and reports.' },
                  { icon: '💰', title: 'Funding Access', text: 'Discover grants, opportunities, and support.' },
                  { icon: '🎓', title: 'Fellowship Tracks', text: 'Continue your entrepreneurship learning path.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="text-lg">{item.icon}</div>
                    <div className="mt-1 text-sm font-bold text-white">{item.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/60">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/75">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-base">🛡️</div>
              Your access is secured through Google authentication.
            </div>
          </section>

          <section className="flex w-full items-center justify-center py-1 sm:py-6">
            <div className="w-full max-w-xl rounded-[1.6rem] border border-white/20 bg-white/95 p-4 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-9">
              <div className="mb-7 text-center">
                <Link to="/" className="mx-auto inline-flex items-center gap-2.5 lg:hidden">
                  <img src="/logo.png" alt="EDC India" className="h-9 w-9 rounded-full bg-white object-contain p-0.5" />
                  <span className="text-base font-bold text-slate-800">EDC India</span>
                </Link>
                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Login to Continue</h1>
                <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">Sign in securely and continue building with EDC India.</p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="rounded-full bg-slate-50 px-4 text-slate-500">Google Secure Login</span>
                  </div>
                </div>

                <div ref={googleAuthSlotRef} className="mt-6 flex w-full justify-center">
                  {!googleClientIdConfigured ? (
                    <div className="w-full max-w-[360px] rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                      Google login is currently unavailable because VITE_GOOGLE_CLIENT_ID is not configured.
                    </div>
                  ) : googleSubmitting ? (
                    <div className="flex w-full max-w-[360px] items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3.5 shadow-sm sm:px-8">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <span className="text-sm font-semibold text-slate-600">Authenticating...</span>
                    </div>
                  ) : (
                    <div className="google-auth-sparkle w-full max-w-[360px] transition-transform duration-300 hover:-translate-y-0.5">
                      <svg className="google-auth-sparkle-svg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                        <rect className="google-auth-sparkle-track" x="1" y="1" width="98" height="38" rx="19" ry="19" pathLength="100" />
                        <rect className="google-auth-sparkle-glow" x="1" y="1" width="98" height="38" rx="19" ry="19" pathLength="100" />
                        <rect className="google-auth-sparkle-tail2" x="1" y="1" width="98" height="38" rx="19" ry="19" pathLength="100" />
                        <rect className="google-auth-sparkle-core" x="1" y="1" width="98" height="38" rx="19" ry="19" pathLength="100" />
                      </svg>
                      <div className="google-auth-sparkle-content">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => setError('Google sign-in failed. Please try again.')}
                          shape="pill"
                          theme="outline"
                          size="large"
                          width={googleButtonWidth}
                          text="continue_with"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-700">
                <p className="font-semibold">New to EDC India?</p>
                <p className="mt-1 text-blue-700/80">Apply for a membership plan to get founder access and dashboard features.</p>
              </div>

              <div className="mt-6 text-center text-sm text-slate-500">
                <Link to="/join" className="font-bold text-primary transition-colors hover:text-secondary">Apply for Membership →</Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </motion.div>
  )
}
