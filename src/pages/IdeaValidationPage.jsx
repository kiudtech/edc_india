import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { API_BASE } from '../config'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const stageOptions = ['Idea Stage', 'MVP/Prototype', 'Early Traction', 'Growth', 'Scaling']
const industryOptions = [
  'Technology','Healthcare/HealthTech','Education/EdTech','Finance/FinTech',
  'Agriculture/AgriTech','E-Commerce','Manufacturing','Clean Energy/CleanTech',
  'Food & Beverage','Real Estate/PropTech','Media & Entertainment','Logistics/Supply Chain','Other',
]

const perks = [
  { icon: '🔍', text: 'Expert Idea Review & Feedback' },
  { icon: '📜', text: 'Validation Certificate' },
  { icon: '🪪', text: 'Auto Member Account + Founder ID' },
  { icon: '🌐', text: 'Access to Full Ecosystem' },
  { icon: '⚡', text: 'Priority Admin Review' },
  { icon: '🗺️', text: 'Clear Next Action Roadmap' },
]

const inputClass = 'mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20'

export default function IdeaValidationPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const selectedPlan = location.state?.selectedPlan || {}
  const queryPlanPrice = Number(params.get('planPrice'))
  const planPrice = Number(selectedPlan.price) > 0
    ? Number(selectedPlan.price)
    : (Number.isFinite(queryPlanPrice) && queryPlanPrice > 0 ? queryPlanPrice : 5000)
  const planName = (selectedPlan.name || params.get('planName') || 'Idea Validation').trim()
  const planSlug = String(selectedPlan.slug || params.get('planSlug') || 'idea-validation').trim().toLowerCase()
  const formattedPlanPrice = `₹${planPrice.toLocaleString('en-IN')}`

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ founderName:'', founderEmail:'', founderPhone:'', startupName:'', idea:'', innovationDescription:'', industry:'', stage:'' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [validationId, setValidationId] = useState(null)
  const [result, setResult] = useState(null)
  const [razorpayReady, setRazorpayReady] = useState(false)

  const handleChange = (e) => { const { name, value } = e.target; setForm((prev) => ({ ...prev, [name]: value })) }

  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setRazorpayReady(true)
    script.onerror = () => setError('Failed to load Razorpay SDK. Please refresh and try again.')
    document.body.appendChild(script)
  }, [])

  const parseApiResponse = async (res, fallbackMessage) => {
    const contentType = res.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      return res.json()
    }

    const text = await res.text()
    if (!res.ok) {
      if ((text || '').trim().startsWith('<')) {
        throw new Error('Server returned HTML instead of JSON. Check backend URL/proxy and CORS settings.')
      }
      throw new Error(text || fallbackMessage)
    }

    return {}
  }

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      setForm((prev) => ({ ...prev, founderName: decoded.name || '', founderEmail: decoded.email || '' }))
      setStep(1)
    } catch { setError('Failed to authenticate with Google. Please try again.') }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.founderName || !form.founderEmail || !form.founderPhone || !form.startupName || !form.idea || !form.industry || !form.stage) return setError('Please fill all required fields.')
    if (!termsAccepted) return setError('Please accept the Terms & Conditions.')
    setError(''); setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/validation/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          planSlug,
          planName,
          planPrice,
        }),
      })
      const data = await parseApiResponse(res, 'Submission failed')
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setValidationId(data.validationId); setStep(2); window.scrollTo(0, 0)
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const handlePayment = async () => {
    setError(''); setSubmitting(true)
    let checkoutOpened = false
    try {
      if (!validationId) {
        throw new Error('Validation submission was not found. Please submit the form again.')
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK is not ready. Please refresh and try again.')
      }

      const createOrderRes = await fetch(`${API_BASE}/api/validation/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ validationId, planSlug }),
      })

      const orderData = await parseApiResponse(createOrderRes, 'Failed to create payment order')
      if (!createOrderRes.ok) throw new Error(orderData.message || 'Failed to create payment order')

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EDC India',
        description: 'Idea Validation',
        order_id: orderData.orderId,
        prefill: {
          name: orderData.user?.name || form.founderName || '',
          email: orderData.user?.email || form.founderEmail || '',
          contact: orderData.user?.phone || form.founderPhone || '',
        },
        notes: {
          validationId,
          planType: 'validation',
        },
        theme: {
          color: '#7c3aed',
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/validation/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                validationId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await parseApiResponse(verifyRes, 'Payment verification failed')
            if (!verifyRes.ok) throw new Error(verifyData.message || 'Payment verification failed')

            setResult(verifyData)
            setStep(3)
          } catch (verifyErr) {
            setError(verifyErr.message || 'Payment verification failed')
          } finally {
            setSubmitting(false)
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      })

      razorpay.on('payment.failed', (response) => {
        setError(response?.error?.description || 'Payment failed. Please try again.')
        setSubmitting(false)
      })

      razorpay.open()
      checkoutOpened = true
    } catch (err) { setError(err.message) }
    finally {
      if (!checkoutOpened) {
        setSubmitting(false)
      }
    }
  }

  const StepDot = ({ n }) => (
    <div className="flex items-center gap-2">
      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${step >= n ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'border-2 border-slate-200 bg-white text-slate-400'}`}>{n}</div>
      {n < 3 && <div className={`h-1 w-10 sm:w-16 rounded-full transition-all ${step > n ? 'bg-purple-600' : 'bg-slate-200'}`} />}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed] px-8 py-12 text-white lg:w-[45%] lg:min-h-screen lg:px-12 lg:py-16">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-400/20 blur-[80px]" />
        <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="EDC India" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
            <span className="text-sm font-bold tracking-wide">EDC India</span>
          </div>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-6">
              💡 {planName} — {formattedPlanPrice}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Validate Your Idea.<br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Build With Clarity.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              Get expert review, a complete validation report, and access to India's startup ecosystem — all in one step.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 space-y-3">
              {perks.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-base">{p.icon}</div>
                  <span className="text-sm text-white/80">{p.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className="relative z-10 mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1">One-time fee</div>
          <div className="text-4xl font-extrabold text-white">{formattedPlanPrice}</div>
          <div className="text-sm text-white/50 mt-1">Includes 1-Year EDC Membership FREE</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">

          {/* Step indicator */}
          {step < 3 && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 flex items-center justify-center gap-1">
              <StepDot n={1} /><StepDot n={2} /><StepDot n={3} />
            </motion.div>
          )}

          {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

          {/* Step 0: Auth */}
          {step === 0 && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Create your account</h2>
                <p className="mt-2 text-sm text-slate-500">Sign in with Google to submit your idea for validation.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">💡</div>
                  <p className="text-center text-sm text-slate-500 max-w-xs">We use Google to securely verify your identity. No password needed.</p>
                  <div className="w-full pt-2">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in failed.')} shape="rectangular" width={360} text="continue_with" />
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[['🔒','Secure'],['⚡','Instant'],['✅','Verified']].map(([icon, label]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="text-xl">{icon}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 1: Form */}
          {step === 1 && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Tell us about your idea</h2>
                <p className="mt-2 text-sm text-slate-500">Fill in the details for your expert validation report.</p>
              </motion.div>
              <motion.form onSubmit={handleSubmit} variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <input name="founderName" value={form.founderName} onChange={handleChange} required disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>
                    <input name="founderEmail" type="email" value={form.founderEmail} onChange={handleChange} required disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone *</label>
                    <input name="founderPhone" value={form.founderPhone} onChange={handleChange} required className={inputClass} placeholder="10-digit number" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Startup Name *</label>
                    <input name="startupName" value={form.startupName} onChange={handleChange} required className={inputClass} placeholder="Your startup name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Industry *</label>
                    <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
                      <option value="">Select industry</option>
                      {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Stage *</label>
                    <select name="stage" value={form.stage} onChange={handleChange} required className={inputClass}>
                      <option value="">Select stage</option>
                      {stageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Your Idea *</label>
                    <textarea name="idea" value={form.idea} onChange={handleChange} required rows={3} className={inputClass} placeholder="Describe your startup idea in detail..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">What Makes It Innovative? <span className="normal-case text-slate-400">(optional)</span></label>
                    <textarea name="innovationDescription" value={form.innovationDescription} onChange={handleChange} rows={2} className={inputClass} placeholder="What makes your idea unique?" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600" />
                      <span className="text-xs text-slate-500">I agree to the <a href="/terms" target="_blank" className="font-semibold text-purple-600 hover:underline">Terms & Conditions</a> and <a href="/terms" target="_blank" className="font-semibold text-purple-600 hover:underline">Privacy Policy</a> of EDC India.</span>
                    </label>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50 active:scale-95">
                  {submitting ? 'Submitting...' : 'Submit & Proceed to Payment →'}
                </button>
              </motion.form>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Complete Payment</h2>
                <p className="mt-2 text-sm text-slate-500">One step away from your validation report.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">💡</div>
                <h3 className="mt-4 text-lg font-bold text-slate-800">{planName} Fee</h3>
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Validation Report</span><span className="font-bold text-slate-800">{formattedPlanPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-slate-500">1-Year Membership</span><span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-400">A member account will be created on payment.</p>
                <button onClick={handlePayment} disabled={submitting || !razorpayReady} className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50">
                  {submitting ? 'Opening Checkout...' : (!razorpayReady ? 'Loading Razorpay...' : `Pay ${formattedPlanPrice} →`)}
                </button>
                <button onClick={() => setStep(1)} className="mt-3 text-xs text-slate-400 hover:text-purple-600">← Go back</button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 3 && result && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">✅</div>
                <h2 className="mt-4 text-xl font-extrabold text-slate-900">Submission Successful!</h2>
                <p className="mt-2 text-sm text-slate-500">{result.message}</p>
                <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-5 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Transaction ID</span>
                    <span className="font-mono text-xs font-semibold text-slate-800">{result.transactionId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Founder ID</span>
                    <span className="font-bold text-purple-600">{result.founderId}</span>
                  </div>
                </div>
                <Link to="/login" className="mt-6 block w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:opacity-90">
                  Login to Dashboard →
                </Link>
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}
