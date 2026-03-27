import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'
import { GoogleLogin } from '@react-oauth/google'
import { motion } from 'framer-motion'
import SiteFooter from '../components/SiteFooter'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [googleSubmitting, setGoogleSubmitting] = useState(false)

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
      className="flex flex-col min-h-[calc(100vh-73px)]"
    >
      <div className="relative flex-1 grid lg:grid-cols-2 bg-slate-50 overflow-hidden">
      
      {/* Decorative Blob Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

      {/* Left Panel: Branding / Visuals */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-white/40 backdrop-blur-3xl relative z-10 border-r border-slate-200/50 shadow-[10px_0_40px_-15px_rgba(0,0,0,0.05)]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="p-2 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow">
              <img src="/logo.png" alt="EDC India" className="h-10 w-10 object-contain" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              EDC India
            </span>
          </Link>
        </div>

        <div className="max-w-md mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
            Elevate Your Journey
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-ink mb-6 leading-tight">
            Empower Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#2C6AE5]">Startup Vision.</span>
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            Join the elite community of innovators. Access world-class resources, networking, and validation tools to supercharge your startup journey.
          </p>
          
          <div className="flex gap-4 items-center bg-white/60 p-4 rounded-2xl border border-white shadow-sm backdrop-blur-sm inline-flex">
             <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm"><img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm"><img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm"><img src="https://i.pravatar.cc/100?img=13" alt="User" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-primary flex items-center justify-center text-xs font-bold text-white shadow-sm">+9k</div>
             </div>
             <div className="text-sm font-medium text-slate-600">
               Trusted by <span className="text-slate-900 font-bold">10,000+</span> founders
             </div>
          </div>
        </div>

        <div className="mt-auto pt-10 text-sm font-medium text-slate-400">
          © {new Date().getFullYear()} EDC India. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 relative z-10 min-h-[calc(100vh-73px)] lg:min-h-full">
        
        <div className="mx-auto w-full max-w-md">
          <div className="text-center lg:text-left mb-10 mt-10 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-3">
              Welcome back
            </h1>
            <p className="text-base text-slate-500 font-medium">
              Transform your ideas into reality. Please sign in to access your dashboard.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-2xl shadow-slate-200/50 relative overflow-hidden group hover:shadow-primary/5 transition-all duration-500">
            {/* Inner top glow effect */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="p-8 sm:p-10">
              {error && (
                <div className="mb-8 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 flex items-start gap-3 backdrop-blur-sm shadow-sm transition-all duration-300">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#fbfcff] px-4 text-slate-500 rounded-full font-medium">
                      Secure login with Google
                    </span>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  {googleSubmitting ? (
                    <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner w-full max-w-[300px] justify-center">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-semibold text-slate-600">Authenticating...</span>
                    </div>
                  ) : (
                    <div className="hover:-translate-y-1 transition-transform duration-300 drop-shadow-sm">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google sign-in failed. Please try again.')}
                        shape="pill"
                        theme="outline"
                        size="large"
                        width={300}
                        text="continue_with"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-slate-100/80 text-center">
                 <p className="text-sm text-slate-500 font-medium">
                   Don't have an account?{' '}
                   <Link to="/join" className="font-bold text-primary hover:text-secondary transition-colors duration-200 ml-1">
                     Apply for Membership &rarr;
                   </Link>
                 </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <SiteFooter />
  </motion.div>
  )
}
