import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE } from '../config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stageOptions = ['Ideation', 'Prototype', 'Early Revenue', 'Growth'];
const industryOptions = ['Tech', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'Other'];

export default function StartupApplicationPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [view, setView] = useState('auth'); // 'auth' -> 'form'
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    startupName: '',
    startupStage: '',
    industry: '',
    ideaSummary: '',
    termsAccepted: false,
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError('');
      const response = await fetch(`${API_BASE}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Google Auth Failed');

      setForm((prev) => ({
        ...prev,
        name: data.user.name,
        email: data.user.email,
      }));
      login(data.user, data.token);
      setView('form');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.termsAccepted) {
      setError('Please accept Terms & Conditions.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const joinRes = await fetch(`${API_BASE}/api/auth/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: 'google-oauth',
          planRequested: 'Startup Membership',
          meta: {
            startupName: form.startupName,
            startupStage: form.startupStage,
            industry: form.industry,
            ideaSummary: form.ideaSummary,
          },
        }),
      });
      const joinData = await joinRes.json();
      if (!joinRes.ok) throw new Error(joinData.message || 'Registration failed');

      login(joinData.user, joinData.token);
      
      navigate('/payment', {
        state: {
          userId: joinData.user._id,
          founderId: joinData.user.founderId,
          amount: 2500,
          type: 'startup_membership',
          planName: 'Startup Membership',
          successSubtitle: "You've successfully joined the EDC India Startup Membership.",
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-sm';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/30 px-4 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-white/20">
            Startup Membership — ₹2,500
          </div>
          <h1 className="text-4xl font-bold">Join Startup Membership</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base px-4">
            Start your entrepreneurial journey with EDC India
          </p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 -mt-8">
        {view === 'auth' && (
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
            {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
          </motion.div>
        )}

        {view === 'form' && (
          <motion.form onSubmit={handleSubmit} initial="hidden" animate="visible" variants={fadeUp} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required disabled className={`${inputClass} bg-slate-50 opacity-70 cursor-not-allowed`} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Email Address *</label>
                <input name="email" value={form.email} onChange={handleChange} required disabled className={`${inputClass} bg-slate-50 opacity-70 cursor-not-allowed`} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Startup Name</label>
                <input name="startupName" value={form.startupName} onChange={handleChange} className={inputClass} placeholder="Optional" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Startup Stage *</label>
                <select name="startupStage" value={form.startupStage} onChange={handleChange} required className={inputClass}>
                  <option value="">Select stage</option>
                  {stageOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Industry *</label>
                <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
                  <option value="">Select industry</option>
                  {industryOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Idea Summary <span className="text-slate-400">(optional, max 200 chars)</span></label>
                <textarea name="ideaSummary" value={form.ideaSummary} onChange={handleChange} maxLength={200} rows={3} className={inputClass} placeholder="Briefly describe your startup idea..." />
                <div className="mt-1 text-right text-[11px] text-slate-400">{form.ideaSummary.length}/200</div>
              </div>
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                  <span className="text-xs text-slate-600">
                    I agree to the <span className="font-semibold text-blue-600">Terms & Conditions</span> and <span className="font-semibold text-blue-600">Privacy Policy</span> of EDC India.
                  </span>
                </label>
              </div>
            </div>
            
            <button type="submit" disabled={submitting} className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">
              {submitting ? 'Processing...' : 'Proceed to Payment - ₹2,500'}
            </button>
          </motion.form>
        )}
      </main>
    </div>
  );
}