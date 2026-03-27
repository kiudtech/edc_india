import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE } from '../config';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const perks = [
  { icon: '📖', text: 'Execution-focused learning path' },
  { icon: '🧑‍🏫', text: 'Mentor support and progress guidance' },
  { icon: '🎤', text: 'Communication and pitch practice' },
  { icon: '🌐', text: 'Career and startup exposure' },
  { icon: '🤝', text: 'Network with founders and peers' },
  { icon: '💸', text: 'Funding opportunity readiness' },
];

export default function FellowshipApplicationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  ;
  const authUserId = user?.id || user?._id;

  const params = new URLSearchParams(location.search);
  const selectedPlan = location.state?.selectedPlan || {};
  const queryPlanPrice = Number(params.get('planPrice'));
  const queryPlanName = params.get('planName') || '';
  const planAmount = Number(selectedPlan.price) > 0 ? Number(selectedPlan.price) : (Number.isFinite(queryPlanPrice) && queryPlanPrice > 0 ? queryPlanPrice : 10000);
  const planName = selectedPlan.name || queryPlanName || 'Fellowship Program';

  const [view, setView] = useState(authUserId ? 'form' : 'auth');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || '', email: user?.email || '',
    phone: '', education: '', city: '', startupIdea: '', message: '',
  });


  const readJsonSafely = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      throw new Error('Server returned an invalid response. Please try again.');
    }
  };

  const postJsonWithRetry = async (url, body, retries = 1) => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await readJsonSafely(response);
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
      } catch (err) {
        lastError = err;
        const msg = String(err?.message || '').toLowerCase();
        const retriable = msg.includes('failed to fetch')
          || msg.includes('network')
          || msg.includes('econnreset')
          || msg.includes('invalid response');
        if (attempt < retries && retriable) {
          await new Promise((resolve) => setTimeout(resolve, 800));
          continue;
        }
        break;
      }
    }
    throw lastError || new Error('Request failed');

  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError('');

      const data = await postJsonWithRetry(
        `${API_BASE}/api/auth/google-login`,
        { token: credentialResponse.credential },
        2
      );

      setForm((prev) => ({
        ...prev,
        fullName: data.user.name,
        email: data.user.email,
      }));
      login(data.token, data.user); // Optional: log them in immediately

      setView('form');
    } catch (err) { setError(err.message); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (!authUserId) { setStatus('Please login first.'); setView('auth'); return; }
    if (!termsAccepted) { setError('Please accept the Terms & Conditions.'); return; }
    navigate('/payment', {
      state: { userId: authUserId, founderId: user.founderId, amount: planAmount, type: 'fellowship', planName, successSubtitle: 'Your fellowship payment has been received successfully.' },
    });
  };

  const inputClass = 'mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:bg-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';

  return (
    <>
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b] px-8 py-12 text-white lg:w-[45%] lg:min-h-screen lg:px-12 lg:py-16">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-[80px]" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="EDC India" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
            <span className="text-sm font-bold tracking-wide">EDC India</span>
          </div>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-6">
              🎓 {planName} — ₹{planAmount.toLocaleString('en-IN')}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Build Your Career &<br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Startup in 12 Months</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              30% Learning. 70% Real Execution. India's most practical entrepreneurial fellowship.
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
          <div className="text-4xl font-extrabold text-white">₹{planAmount.toLocaleString('en-IN')}</div>
          <div className="text-sm text-white/50 mt-1">12-month fellowship · Full ecosystem access</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">

          {view === 'auth' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Create your account</h2>
                <p className="mt-2 text-sm text-slate-500">Sign in with Google to begin your fellowship application.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">🎓</div>
                  <p className="text-center text-sm text-slate-500 max-w-xs">We use Google to securely verify your identity. No password needed.</p>
                  <div className="w-full pt-2">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in failed. Please try again.')} shape="rectangular" width={360} text="continue_with" />
                  </div>
                </div>
                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
                {status && <p className="mt-4 text-center text-sm text-orange-500">{status}</p>}
              </motion.div>
              <motion.div variants={fadeUp} className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[['🔒', 'Secure'], ['⚡', 'Instant'], ['✅', 'Verified']].map(([icon, label]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="text-xl">{icon}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {view === 'form' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Fellowship Application</h2>
                <p className="mt-2 text-sm text-slate-500">Tell us about yourself and your goals.</p>
              </motion.div>
              <motion.form onSubmit={handleProceedToPayment} variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} required disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} required disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">City *</label>
                    <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="Your city" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Education *</label>
                    <input name="education" value={form.education} onChange={handleChange} required className={inputClass} placeholder="BBA, MBA, Engineering..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Startup Idea <span className="normal-case text-slate-400">(optional)</span></label>
                    <input name="startupIdea" value={form.startupIdea} onChange={handleChange} className={inputClass} placeholder="Short idea title/summary" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Why do you want to join? *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={3} className={inputClass} placeholder="Briefly describe your motivation..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600" />
                      <span className="text-xs text-slate-500">I agree to the <a href="/terms" target="_blank" className="font-semibold text-cyan-600 hover:underline">Terms & Conditions</a> and <a href="/terms" target="_blank" className="font-semibold text-cyan-600 hover:underline">Privacy Policy</a> of EDC India.</span>
                    </label>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#0f172a] to-[#1e3a8f] py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50 active:scale-95">
                  {submitting ? 'Processing...' : `Proceed to Payment — ₹${planAmount.toLocaleString('en-IN')} →`}
                </button>
              </motion.form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
    <SiteFooter />
    </>
  );
}
