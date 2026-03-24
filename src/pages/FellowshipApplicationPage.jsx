import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  education: '',
  city: '',
  startupIdea: '',
  message: '',
}

export default function FellowshipApplicationPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProceedToPayment = (e) => {
    e.preventDefault()
    setStatus('')

    if (!user?._id) {
      setStatus('Please login first, then continue with fellowship payment.')
      return
    }

    navigate('/payment', {
      state: {
        userId: user._id,
        founderId: user.founderId,
        amount: 5000,
        type: 'fellowship',
        planName: 'Fellowship Program',
        successSubtitle: 'Your fellowship payment has been received successfully.',
      },
    })
  }

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold">Fellowship Application Form</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            Fill in your details to apply for the EDC Entrepreneurial Fellowship.
          </p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.form
          onSubmit={handleProceedToPayment}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Education</label>
              <input name="education" value={form.education} onChange={handleChange} placeholder="BBA, MBA, Engineering..." className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Startup Idea (optional)</label>
              <input name="startupIdea" value={form.startupIdea} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-600">Why do you want to join?</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Proceed to Payment - ₹5,000
          </button>

          {status && <p className="mt-3 text-center text-sm text-slate-600">{status}</p>}
        </motion.form>
      </main>
    </div>
  )
}