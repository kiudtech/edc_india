import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE } from '../config';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const stageOptions = ['Idea Stage', 'MVP/Prototype', 'Early Traction', 'Growth', 'Scaling'];
const industryOptions = [
  'Technology','Healthcare/HealthTech','Education/EdTech','Finance/FinTech',
  'Agriculture/AgriTech','E-Commerce','Manufacturing','Clean Energy/CleanTech',
  'Food & Beverage','Real Estate/PropTech','Media & Entertainment','Logistics/Supply Chain','Other',
];

const perks = [
  { icon: '🪪', text: 'Unique Founder ID (BUB-XXXX)' },
  { icon: '📅', text: 'Access to Events & Workshops' },
  { icon: '💰', text: 'Grant & Funding Directory' },
  { icon: '🤝', text: 'Investor Network Access' },
  { icon: '📚', text: 'Course Enrollment' },
  { icon: '🎫', text: 'Dedicated Support Tickets' },
];

export default function StartupApplicationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const params = new URLSearchParams(location.search);
  const selectedPlan = location.state?.selectedPlan || {};
  const queryPlanPrice = Number(params.get('planPrice'));
  const queryPlanName = params.get('planName') || '';
  const planAmount = Number(selectedPlan.price) > 0 ? Number(selectedPlan.price) : (Number.isFinite(queryPlanPrice) && queryPlanPrice > 0 ? queryPlanPrice : 2500);
  const planName = selectedPlan.name || queryPlanName || 'Startup Membership';

  const [view, setView] = useState('auth');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleButtonWidth, setGoogleButtonWidth] = useState(320);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', startupName: '',
    startupStage: '', industry: '', ideaSummary: '', termsAccepted: false,
  });

  useEffect(() => {
    const updateGoogleButtonWidth = () => {
      const viewport = typeof window !== 'undefined' ? window.innerWidth : 360;
      const sideGutter = viewport < 640 ? 56 : 96;
      const targetWidth = viewport - sideGutter;
      setGoogleButtonWidth(Math.max(220, Math.min(360, targetWidth)));
    };

    updateGoogleButtonWidth();
    window.addEventListener('resize', updateGoogleButtonWidth);
    return () => window.removeEventListener('resize', updateGoogleButtonWidth);
  }, []);

  const readJsonSafely = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try { return JSON.parse(text); } catch { throw new Error('Server returned an invalid response.'); }
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
        `${API_BASE}/api/auth/google-profile`,
        { token: credentialResponse.credential },
        2
      );

      setForm((prev) => ({
        ...prev,
        name: data.profile.name,
        email: data.profile.email,
      }));

      setView('form');
    } catch (err) { setError(err.message); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.termsAccepted) { setError('Please accept Terms & Conditions.'); return; }
    setError(''); setSubmitting(true);
    try {
      const joinData = await postJsonWithRetry(`${API_BASE}/api/auth/join`, {
        name: form.name, email: form.email, phone: form.phone,
        startupName: form.startupName, startupStage: form.startupStage,
        industry: form.industry, ideaSummary: form.ideaSummary, termsAccepted: form.termsAccepted,
      });
      navigate('/payment', {
        state: { userId: joinData.userId, founderId: joinData.founderId, amount: planAmount, type: 'membership', planName, successSubtitle: `You've successfully joined the EDC India ${planName}.` },
      });
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  };

  const inputClass = 'mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  return (
    <>
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT PANEL ── */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b] px-5 py-8 text-white sm:px-8 sm:py-10 lg:w-[45%] lg:min-h-screen lg:px-12 lg:py-16">
        {/* blobs */}
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-400/20 blur-[80px]" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3 sm:mb-12">
            <img src="/logo.png" alt="EDC India" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
            <span className="text-sm font-bold tracking-wide">EDC India</span>
          </div>

          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-6">
              🚀 {planName} — ₹{planAmount.toLocaleString('en-IN')}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-2xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Join India's<br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Startup Ecosystem</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              Get your Founder ID, access mentors, events, grants, and funding — all in one membership.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 space-y-2.5 sm:mt-10 sm:space-y-3">
              {perks.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-base">{p.icon}</div>
                  <span className="text-sm text-white/80">{p.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom price badge */}
        <div className="relative z-10 mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1">One-time fee</div>
          <div className="text-4xl font-extrabold text-white">₹{planAmount.toLocaleString('en-IN')}</div>
          <div className="text-sm text-white/50 mt-1">Lifetime access to the EDC India ecosystem</div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-12 lg:py-12">
        <div className="w-full max-w-md">

          {view === 'auth' && (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Create your account</h2>
                <p className="mt-2 text-sm text-slate-500">Sign in with Google to get started — it only takes a second.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg sm:mt-8 sm:p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">🚀</div>
                  <p className="text-center text-sm text-slate-500 max-w-xs">We use Google to securely verify your identity. No password needed.</p>
                  <div className="flex w-full justify-center pt-2">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError('Google sign-in failed. Please try again.')}
                      shape="pill"
                      width={googleButtonWidth}
                      text="continue_with"
                    />
                  </div>
                </div>
                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
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
                <h2 className="text-2xl font-extrabold text-slate-900">Complete your profile</h2>
                <p className="mt-2 text-sm text-slate-500">Just a few details and you're in.</p>
              </motion.div>

              <motion.form onSubmit={handleSubmit} variants={fadeUp} className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg sm:mt-8 sm:p-8">
                {error && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
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
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Startup Name</label>
                    <input name="startupName" value={form.startupName} onChange={handleChange} className={inputClass} placeholder="Optional" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Stage *</label>
                    <select name="startupStage" value={form.startupStage} onChange={handleChange} required className={inputClass}>
                      <option value="">Select stage</option>
                      {stageOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Industry *</label>
                    <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
                      <option value="">Select industry</option>
                      {industryOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Idea Summary <span className="normal-case text-slate-400">(optional)</span></label>
                    <textarea name="ideaSummary" value={form.ideaSummary} onChange={handleChange} maxLength={200} rows={3} className={inputClass} placeholder="Briefly describe your startup idea..." />
                    <div className="mt-1 text-right text-[11px] text-slate-400">{form.ideaSummary.length}/200</div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                      <span className="text-xs text-slate-500">
                        I agree to the <Link to="/terms" target="_blank" className="font-semibold text-blue-600 hover:underline">Terms & Conditions</Link> and <Link to="/terms" target="_blank" className="font-semibold text-blue-600 hover:underline">Privacy Policy</Link> of EDC India.
                      </span>
                    </label>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 active:scale-95">
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
