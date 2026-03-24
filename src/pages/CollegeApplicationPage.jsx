import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../config'

export default function CollegeApplicationPage() {
  const [form, setForm] = useState({
    collegeName: '', contactPerson: '', email: '', phone: '',
    startupCount: '', activities: '', innovationData: '',
    workshopsConducted: '', incubationPrograms: '', successStories: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.collegeName || !form.contactPerson || !form.email || !form.phone) {
      return setError('Please fill all required fields.')
    }
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        startupCount: Number(form.startupCount) || 0,
        workshopsConducted: Number(form.workshopsConducted) || 0,
      }
      const res = await fetch(`${API_BASE}/api/college/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed.')
      setSuccess(true)
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
            <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full object-contain bg-white" />
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/join" className="text-slate-500 hover:text-primary">Membership</Link>
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1 text-[11px] font-semibold text-teal-600">
            College Innovation Ranking
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Apply for College Ranking
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Submit your college&apos;s startup & innovation data to participate in EDC India&apos;s College Innovation Ranking
          </p>
        </div>

        {success ? (
          <div className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">🎓</div>
            <h2 className="mt-4 text-lg font-semibold text-slate-800">Application Submitted!</h2>
            <p className="mt-2 text-sm text-slate-500">
              Thank you for applying. Our team will review your data and update the rankings.
              You will be notified once your college has been reviewed and scored.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/" className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
                Back to Home
              </Link>
              <button onClick={() => { setSuccess(false); setForm({ collegeName: '', contactPerson: '', email: '', phone: '', startupCount: '', activities: '', innovationData: '', workshopsConducted: '', incubationPrograms: '', successStories: '' }) }} className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                Submit Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}

            <h2 className="mb-5 text-sm font-semibold text-slate-700">College Information</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">College / University Name *</label>
                <input name="collegeName" value={form.collegeName} onChange={handleChange} required className={inputClass} placeholder="Full name of institution" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Contact Person *</label>
                <input name="contactPerson" value={form.contactPerson} onChange={handleChange} required className={inputClass} placeholder="Name of coordinator" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="Official email" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="Contact number" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">No. of Startups Incubated</label>
                <input name="startupCount" type="number" min="0" value={form.startupCount} onChange={handleChange} className={inputClass} placeholder="0" />
              </div>
            </div>

            <h2 className="mb-5 mt-8 text-sm font-semibold text-slate-700">Innovation & Startup Activities</h2>
            <div className="grid gap-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Startup & Entrepreneurship Activities</label>
                <textarea name="activities" value={form.activities} onChange={handleChange} rows={3} className={inputClass} placeholder="Describe clubs, cells, E-summits, hackathons, etc." />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Innovation Data & Patents</label>
                <textarea name="innovationData" value={form.innovationData} onChange={handleChange} rows={3} className={inputClass} placeholder="Research output, patents filed, innovations developed..." />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Workshops Conducted</label>
                  <input name="workshopsConducted" type="number" min="0" value={form.workshopsConducted} onChange={handleChange} className={inputClass} placeholder="0" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Incubation Programs</label>
                <textarea name="incubationPrograms" value={form.incubationPrograms} onChange={handleChange} rows={2} className={inputClass} placeholder="Details about incubation programs run by the college..." />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Success Stories</label>
                <textarea name="successStories" value={form.successStories} onChange={handleChange} rows={2} className={inputClass} placeholder="Notable startups or founders from your institution..." />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
