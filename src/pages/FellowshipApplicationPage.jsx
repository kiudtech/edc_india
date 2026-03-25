import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE } from '../config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FellowshipApplicationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const authUserId = user?.id || user?._id;

  const params = new URLSearchParams(location.search);
  const selectedPlan = location.state?.selectedPlan || {};
  const queryPlanPrice = Number(params.get('planPrice'));
  const queryPlanName = params.get('planName') || '';
  const planAmount = Number(selectedPlan.price) > 0 ? Number(selectedPlan.price) : (Number.isFinite(queryPlanPrice) && queryPlanPrice > 0 ? queryPlanPrice : 5000);
  const planName = selectedPlan.name || queryPlanName || 'Fellowship Program';
  
  // Decide view based on whether user is already logged in
  const [view, setView] = useState(authUserId ? 'form' : 'auth'); 
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    education: '',
    city: '',
    startupIdea: '',
    message: '',
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
        const retriable = String(err?.message || '').toLowerCase().includes('failed to fetch')
          || String(err?.message || '').toLowerCase().includes('network')
          || String(err?.message || '').toLowerCase().includes('econnreset');
        if (attempt < retries && retriable) {
          await new Promise((resolve) => setTimeout(resolve, 400));
          continue;
        }
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
        1
      );

      setForm((prev) => ({
        ...prev,
        fullName: data.user.name,
        email: data.user.email,
      }));
      login(data.token, data.user); // Optional: log them in immediately
      setView('form');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (!authUserId) {
      setStatus('Please login first, then continue with fellowship payment.');
      setView('auth');
      return;
    }
    
    navigate('/payment', {
      state: {
        userId: authUserId,
        founderId: user.founderId,
        amount: planAmount,
        type: 'fellowship',
        planName,
        successSubtitle: 'Your fellowship payment has been received successfully.',
      },
    });
  };

  const inputClass =
    'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-sm';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/30 px-4 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-white/20">
            {planName} — ₹{planAmount.toLocaleString('en-IN')}
          </div>
          <h1 className="text-4xl font-bold">Fellowship Application Form</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base px-4">
            Fill in your details to apply for the EDC Entrepreneurial Fellowship.
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
            {status && <p className="mt-4 text-center text-sm text-orange-500">{status}</p>}
          </motion.div>
        )}

        {view === 'form' && (
          <motion.form onSubmit={handleProceedToPayment} initial="hidden" animate="visible" variants={fadeUp} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required disabled className={`${inputClass} bg-slate-50 opacity-70 cursor-not-allowed`} />
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
                <label className="text-xs font-semibold text-slate-600">Education *</label>
                <input name="education" value={form.education} onChange={handleChange} required className={inputClass} placeholder="BBA, MBA, Engineering..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">City *</label>
                <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="City name" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Startup Idea <span className="text-slate-400">(optional)</span></label>
                <input name="startupIdea" value={form.startupIdea} onChange={handleChange} className={inputClass} placeholder="Short idea title/summary" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Why do you want to join? *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className={inputClass} placeholder="Briefly describe your motivation..." />
              </div>
            </div>
            
            <button type="submit" disabled={submitting} className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">
              Proceed to Payment - ₹{planAmount.toLocaleString('en-IN')}
            </button>
          </motion.form>
        )}
      </main>
    </div>
  );
}
