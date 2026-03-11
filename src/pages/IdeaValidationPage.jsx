import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../config'

const stageOptions = ['Idea Stage', 'MVP/Prototype', 'Early Traction', 'Growth', 'Scaling']
const industryOptions = [
  'Technology', 'Healthcare/HealthTech', 'Education/EdTech', 'Finance/FinTech',
  'Agriculture/AgriTech', 'E-Commerce', 'Manufacturing', 'Clean Energy/CleanTech',
  'Food & Beverage', 'Real Estate/PropTech', 'Media & Entertainment',
  'Logistics/Supply Chain', 'Other',
]

export default function IdeaValidationPage() {
  const [step, setStep] = useState(1) // 1 = form, 2 = payment, 3 = success
  const [form, setForm] = useState({
    founderName: '', founderEmail: '', founderPhone: '', password: '',
    startupName: '', idea: '', innovationDescription: '', industry: '', stage: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [validationId, setValidationId] = useState(null)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.founderName || !form.founderEmail || !form.founderPhone || !form.startupName || !form.idea || !form.industry || !form.stage) {
      return setError('Please fill all required fields.')
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/validation/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed.')
      setValidationId(data.validationId)
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = async () => {
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/validation/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ validationId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Payment failed.')
      setResult(data)
      setStep(3)
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
            <Link to="/join" className="text-slate-500 hover:text-primary">Startup Membership</Link>
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-[11px] font-semibold text-purple-600">
            Idea Validation — ₹5,000
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Get Your Startup Idea Validated
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Submit your idea for expert review, feedback, and certification by EDC India
          </p>
        </div>

        {/* Steps indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${step >= s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                {s}
              </div>
              {s < 3 && <div className={`h-0.5 w-8 rounded ${step > s ? 'bg-primary' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-8 text-[10px] font-semibold text-slate-500">
          <span>Details</span><span>Payment</span><span>Done</span>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {/* Step 1: Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
            <h2 className="mb-5 text-sm font-semibold text-slate-700">Founder & Startup Details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Full Name *</label>
                <input name="founderName" value={form.founderName} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Email *</label>
                <input name="founderEmail" type="email" value={form.founderEmail} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Phone *</label>
                <input name="founderPhone" value={form.founderPhone} onChange={handleChange} required className={inputClass} placeholder="10-digit phone number" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Startup Name *</label>
                <input name="startupName" value={form.startupName} onChange={handleChange} required className={inputClass} placeholder="Your startup name" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Industry *</label>
                <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
                  <option value="">Select industry</option>
                  {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Stage *</label>
                <select name="stage" value={form.stage} onChange={handleChange} required className={inputClass}>
                  <option value="">Select stage</option>
                  {stageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Your Idea *</label>
                <textarea name="idea" value={form.idea} onChange={handleChange} required rows={4} className={inputClass} placeholder="Describe your startup idea in detail..." />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">What Makes It Innovative?</label>
                <textarea name="innovationDescription" value={form.innovationDescription} onChange={handleChange} rows={3} className={inputClass} placeholder="What makes your idea unique / innovative? (optional)" />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit & Proceed to Payment →'}
            </button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl">💡</div>
            <h2 className="mt-4 text-lg font-semibold text-slate-800">Complete Payment</h2>
            <p className="mt-2 text-sm text-slate-500">
              Pay ₹5,000 to submit your idea for validation and certification.
            </p>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Idea Validation Fee</span>
                <span className="font-semibold text-slate-800">₹5,000</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              On payment, a member account will be created with your phone number as temporary password.
            </p>
            <button
              onClick={handlePayment}
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Pay ₹5,000'}
            </button>
            <button onClick={() => setStep(1)} className="mt-3 text-xs text-slate-500 hover:text-primary">← Go back</button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && result && (
          <div className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✅</div>
            <h2 className="mt-4 text-lg font-semibold text-slate-800">Submission Successful!</h2>
            <p className="mt-2 text-sm text-slate-500">{result.message}</p>
            <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Transaction ID</span>
                <span className="font-mono text-xs font-semibold text-slate-800">{result.transactionId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Your Founder ID</span>
                <span className="font-semibold text-primary">{result.founderId}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Login with your email and phone number as password. You can change it later.
            </p>
            <Link to="/login" className="mt-6 inline-block w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
              Login to Dashboard →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
