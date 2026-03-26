import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [adminSubmitting, setAdminSubmitting] = useState(false)
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

      login(data.token, data.user)
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-block p-3 rounded-full bg-white mb-4">
          <img src="/logo.png" alt="EDC India" className="h-10 w-10 object-contain" />
        </Link>
        <h1 className="text-2xl font-semibold sm:text-3xl text-white">Admin Portal</h1>
        <p className="mt-2 text-sm text-slate-400">
          Enter your credentials to access the dashboard
        </p>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-2xl sm:p-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Admin Email or Founder ID</label>
            <input
              type="text"
              value={adminCredentials.identifier}
              onChange={(e) => setAdminCredentials((prev) => ({ ...prev, identifier: e.target.value }))}
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">Password</label>
            <input
              type="password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))}
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Enter admin password"
            />
          </div>
          <button
            type="submit"
            disabled={adminSubmitting}
            className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {adminSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        <Link to="/" className="hover:text-white transition">← Back to Main Site</Link>
      </div>
    </div>
  )
}
