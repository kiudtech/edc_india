import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { API_BASE } from '../config'

const stageOptions = ['Idea Stage', 'MVP/Prototype', 'Early Traction', 'Growth', 'Scaling']
const industryOptions = [
  'Technology', 'Healthcare/HealthTech', 'Education/EdTech', 'Finance/FinTech', 
  'Agriculture/AgriTech', 'E-Commerce', 'Manufacturing', 'Clean Energy/CleanTech',
  'Food & Beverage', 'Real Estate/PropTech', 'Media & Entertainment',
  'Logistics/Supply Chain', 'Other',
]

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function IdeaValidationPage() {
  const [step, setStep] = useState(0) // 0 = auth, 1 = form, 2 = payment, 3 = success
  const [form, setForm] = useState({
    founderName: '', founderEmail: '', founderPhone: '',
    startupName: '', idea: '', innovationDescription: '', industry: '', stage: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [validationId, setValidationId] = useState(null)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      setForm((prev) => ({
        ...prev,
        founderName: decoded.name || '',
        founderEmail: decoded.email || '',
      }))
      setStep(1)
    } catch (err) {
      console.error(err)
      setError('Failed to authenticate with Google. Please try again.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.founderName || !form.founderEmail || !form.founderPhone || !form.startupName || !form.idea || !form.industry || !form.stage) {
      return setError('Please fill all required fields.')
    }
    if (!termsAccepted) {
      return setError('Please accept the Terms & Conditions.')
    }
    setSubmitting(true)

    try {
      const res = await fetch(`${API_BASE}/api/validation/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Submission failed')

      setValidationId(data.validationId)
      setStep(2)
      window.scrollTo(0, 0)
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
      const res = await fetch(`${API_BASE}/api/validation/process-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ validationId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Payment processing failed')

      setResult(data)
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-sm"

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/30 px-4 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-white/20">
            Idea Validation — ₹1,500
          </div>
          <h1 className="text-4xl font-bold">Get Your Startup Idea Validated</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base px-4">
            Submit your idea for expert review, feedback, and certification by EDC India.
          </p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 -mt-8">
        
        {/* Steps indicator */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${step >= s ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                {s}
              </div>
              {s < 3 && <div className={`h-1 w-10 sm:w-16 rounded ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </motion.div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Step 0: Auth */}
        {step === 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-sm rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
            <h2 className="mb-6 text-center text-lg font-semibold text-slate-800">Create your account</h2>
            <div className="flex flex-col items-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google sign-in failed. Please try again.')}
                shape="rectangular"
                width={280}
                text="continue_with"
              />
            </div>
          </motion.div>
        )}

        {/* Step 1: Form */}
        {step === 1 && (
          <motion.form initial="hidden" animate="visible" variants={fadeUp} onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Full Name *</label>
                <input name="founderName" value={form.founderName} onChange={handleChange} required disabled className={`${inputClass} bg-slate-50 opacity-70 cursor-not-allowed`} placeholder="Your full name" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Email *</label>
                <input name="founderEmail" type="email" value={form.founderEmail} onChange={handleChange} required disabled className={`${inputClass} bg-slate-50 opacity-70 cursor-not-allowed`} placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Phone *</label>
                <input name="founderPhone" value={form.founderPhone} onChange={handleChange} required className={inputClass} placeholder="10-digit phone number" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Startup Name *</label>
                <input name="startupName" value={form.startupName} onChange={handleChange} required className={inputClass} placeholder="Your startup name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Industry *</label>
                <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
                  <option value="">Select industry</option>
                  {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Stage *</label>
                <select name="stage" value={form.stage} onChange={handleChange} required className={inputClass}>
                  <option value="">Select stage</option>
                  {stageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Your Idea *</label>
                <textarea name="idea" value={form.idea} onChange={handleChange} required rows={4} className={inputClass} placeholder="Describe your startup idea in detail..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">What Makes It Innovative?</label>
                <textarea name="innovationDescription" value={form.innovationDescription} onChange={handleChange} rows={3} className={inputClass} placeholder="What makes your idea unique / innovative? (optional)" />
              </div>
            </div>
            <div className="mt-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                <span className="text-xs text-slate-600">
                  I agree to the <a href="/terms" target="_blank" className="font-semibold text-blue-600 hover:underline">Terms & Conditions</a> and <span className="font-semibold text-blue-600">Privacy Policy</span> of EDC India.
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit & Proceed to Payment →'}
            </button>
          </motion.form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mt-8 max-w-sm rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">💡</div>
            <h2 className="mt-4 text-lg font-semibold text-slate-800">Complete Payment</h2>
            <p className="mt-2 text-sm text-slate-500">
              Pay ₹1,500 to submit your idea for validation and certification.
            </p>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Idea Validation Fee</span>
                <span className="font-semibold text-slate-800">₹1,500</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              On payment, a member account will be created.
            </p>
            <button
              onClick={handlePayment}
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Pay ₹1,500'}
            </button>
            <button onClick={() => setStep(1)} className="mt-3 text-xs text-slate-500 hover:text-blue-600">← Go back</button>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && result && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mt-8 max-w-sm rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-8 text-center">
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
                <span className="font-semibold text-blue-600">{result.founderId}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              You can now log in to your dashboard to review your application status.
            </p>
            <Link to="/login" className="mt-6 inline-block w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
              Login to Dashboard →
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}
