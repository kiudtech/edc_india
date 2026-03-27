import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const perks = [
  { icon: '🏆', text: 'National recognition & credibility' },
  { icon: '📊', text: 'Transparent, data-driven evaluation' },
  { icon: '🤝', text: 'Attract better students & partnerships' },
  { icon: '🌐', text: 'Featured in EDC India national reports' },
  { icon: '🎓', text: 'Benchmark against top institutions' },
  { icon: '🚀', text: 'Strengthen your innovation ecosystem' },
];

const inputClass = 'mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20';

export default function CollegeRankingApplicationPage() {
  useEffect(() => { setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, 0) }, []);

  const [formData, setFormData] = useState({ collegeName: '', contactPerson: '', email: '', phone: '', message: '' });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setStatus('Please agree to the Terms & Conditions.'); return; }
    setSubmitting(true); setStatus('');
    try {
      await axios.post('/api/admin/college-ranking-application', formData);
      setSuccess(true);
      setFormData({ collegeName: '', contactPerson: '', email: '', phone: '', message: '' });
      setAgreed(false);
    } catch {
      setStatus('An error occurred. Please try again.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b2d2d] via-[#0d4a4a] to-[#0e6b6b] px-8 py-12 text-white lg:w-[45%] lg:min-h-screen lg:px-12 lg:py-16">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-teal-400/20 blur-[80px]" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="EDC India" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
            <span className="text-sm font-bold tracking-wide">EDC India</span>
          </div>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-6">
              🏆 IIIR · India Innovation & Incubation Ranking
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Rank Your<br />
              <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">College</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              Get recognized by India's most transparent innovation & incubation ranking. Measured by execution. Recognized by impact.
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
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Annual Program</div>
          <div className="text-2xl font-extrabold text-white">IIIR 2026</div>
          <div className="text-sm text-white/50 mt-1">Applications open · Limited slots available</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">

          {success ? (
            <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
              <motion.div variants={fadeUp} className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-50 text-4xl mb-6">🎉</motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-extrabold text-slate-900">Application Submitted!</motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-slate-500">Thank you for applying. Our team will review your application and get back to you shortly.</motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3">
                <Link to="/ranking" className="rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:opacity-90">
                  Back to Ranking Page
                </Link>
                <button onClick={() => setSuccess(false)} className="rounded-xl border border-slate-200 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                  Submit Another Application
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-extrabold text-slate-900">Apply for Ranking</h2>
                <p className="mt-2 text-sm text-slate-500">Fill in your institution details to get started.</p>
              </motion.div>

              <motion.form onSubmit={handleSubmit} variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                {status && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{status}</div>}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">College / University Name *</label>
                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} required className={inputClass} placeholder="Full institution name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact Person *</label>
                    <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required className={inputClass} placeholder="Name of coordinator" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Official email address" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Message <span className="normal-case text-slate-400">(optional)</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className={inputClass} placeholder="Tell us about your institution's innovation activities..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600" />
                      <span className="text-xs text-slate-500">
                        I agree to the <a href="/terms" target="_blank" className="font-semibold text-teal-600 hover:underline">Terms & Conditions</a> and <a href="/terms" target="_blank" className="font-semibold text-teal-600 hover:underline">Privacy Policy</a> of EDC India.
                      </span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-200 transition hover:opacity-90 disabled:opacity-50 active:scale-95">
                  {submitting ? 'Submitting...' : 'Apply for Ranking →'}
                </button>
              </motion.form>

              <motion.div variants={fadeUp} className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[['🔒', 'Secure'], ['✅', 'Verified'], ['🏆', 'Recognized']].map(([icon, label]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="text-xl">{icon}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
