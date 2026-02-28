import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const stageOptions = ['Idea Stage', 'MVP/Prototype', 'Early Traction', 'Growth', 'Scaling']
const industryOptions = [
  'Technology', 'Healthcare/HealthTech', 'Education/EdTech', 'Finance/FinTech',
  'Agriculture/AgriTech', 'E-Commerce', 'Manufacturing', 'Clean Energy/CleanTech',
  'Food & Beverage', 'Real Estate/PropTech', 'Media & Entertainment',
  'Logistics/Supply Chain', 'Other',
]

export default function JoinPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    startupName: '', startupStage: '', industry: '', ideaSummary: '', termsAccepted: false,
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (!form.termsAccepted) return setError('You must accept the Terms & Conditions.')

    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      navigate('/payment', { state: { userId: data.userId, founderId: data.founderId } })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

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
            <span className="text-slate-500">Already a member?</span>
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-[11px] font-semibold text-orange-600">
            Startup Membership — ₹2,500
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Join Startup Membership
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start your entrepreneurial journey with EDC India
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@email.com" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Phone Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+91 XXXXX XXXXX" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Password *</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required className={inputClass} placeholder="Min 6 characters" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Confirm Password *</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required className={inputClass} placeholder="Re-enter password" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Startup Name</label>
              <input name="startupName" value={form.startupName} onChange={handleChange} className={inputClass} placeholder="Optional" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Startup Stage *</label>
              <select name="startupStage" value={form.startupStage} onChange={handleChange} required className={inputClass}>
                <option value="">Select stage</option>
                {stageOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Industry *</label>
              <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
                <option value="">Select industry</option>
                {industryOptions.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Idea Summary <span className="text-slate-400">(optional, max 200 chars)</span></label>
              <textarea
                name="ideaSummary" value={form.ideaSummary} onChange={handleChange}
                maxLength={200} rows={3} className={inputClass}
                placeholder="Briefly describe your startup idea..."
              />
              <div className="mt-1 text-right text-[11px] text-slate-400">{form.ideaSummary.length}/200</div>
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary" />
                <span className="text-xs text-slate-600">
                  I agree to the <span className="font-semibold text-primary">Terms & Conditions</span> and <span className="font-semibold text-primary">Privacy Policy</span> of EDC India.
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Processing...' : 'Proceed to Payment → ₹2,500'}
          </button>
        </form>
      </div>
    </div>
  )
}
