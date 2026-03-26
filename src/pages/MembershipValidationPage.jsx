import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const validationItems = [
  { icon: '🔍', title: 'Idea Stage Clarity', desc: 'Know exactly where your idea stands' },
  { icon: '📊', title: 'Market Analysis', desc: 'Understand your target market deeply' },
  { icon: '🎯', title: 'Problem-Solution Fit', desc: 'Validate if your solution truly solves the problem' },
  { icon: '💡', title: 'Business Model', desc: 'Get direction on how to monetize' },
  { icon: '⚠️', title: 'Strengths & Risks', desc: 'Know what to leverage and what to watch out for' },
  { icon: '🗺️', title: 'Action Roadmap', desc: 'Clear next steps to move forward' },
];

const membershipBenefits = [
  { icon: '📅', text: 'Monthly workshops & meetups' },
  { icon: '🎤', text: 'Investor pitch opportunities' },
  { icon: '🤝', text: 'Networking with founders & mentors' },
  { icon: '💬', text: 'Doubt-solving sessions' },
  { icon: '📢', text: 'Updates on funding & grants' },
  { icon: '📊', text: 'Pitch, finance & strategy support' },
];

export default function MembershipValidationPage() {
  useEffect(() => { setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }) }, 0) }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed]">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-[100px] animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-pulse" /> EDC India · Idea Validation
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Don't Build Blindly.<br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">Validate First.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Get clarity, direction, and access to India's startup ecosystem — all in one expert validation report.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-purple-200">
              <span>Validate</span><span className="text-white/30">→</span><span>Build</span><span className="text-white/30">→</span><span>Grow</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/join-validation" className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-purple-700 shadow-2xl shadow-purple-900/40 transition hover:shadow-purple-400/30">
                Validate My Idea — ₹5,000 →
              </Link>
              <a href="tel:+919792830382" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Call
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['500+', 'Ideas Reviewed'], ['95%', 'Clarity Rate'], ['7 Days', 'Turnaround']].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-white">{v}</div>
                  <div className="mt-1 text-xs text-white/50">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" className="w-full fill-white"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" /></svg>
        </div>
      </section>

      {/* ── WHY VALIDATE ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-500 mb-4">The Hard Truth</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Why most people fail<br />before they even start</h2>
              <p className="mt-4 text-slate-500 leading-relaxed">Most people jump into ideas without clarity. They follow trends, copy others, or start building without understanding the market.</p>
              <div className="mt-8 space-y-3">
                {['No customers', 'No revenue', 'No growth'].map((t) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <span className="text-red-400 text-lg">✗</span>
                    <span className="font-semibold text-red-700">{t}</span>
                    <span className="text-slate-500 text-sm">— not because the idea was bad, but because it was never validated.</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-100 to-indigo-100 blur-2xl opacity-60" />
              <div className="relative rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
                <div className="text-5xl mb-4">💡</div>
                <h3 className="text-2xl font-bold">The Solution</h3>
                <p className="mt-3 text-purple-100 text-sm leading-relaxed">Get your idea reviewed by experts before you invest time and money. Walk away with a complete validation report and a clear roadmap.</p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-4xl font-extrabold">₹5,000</div>
                  <div className="text-purple-200 text-sm mt-1">One-time · Includes 1-Year Membership</div>
                </div>
                <Link to="/join-validation" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-purple-700 transition hover:bg-purple-50">
                  Get Validated →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 mb-4">Your Report Includes</div>
            <h2 className="text-4xl font-extrabold text-slate-900">You don't just get feedback —<br />you get a roadmap</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {validationItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-purple-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="mt-4 font-bold text-slate-800">{item.title}</div>
                <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BONUS MEMBERSHIP ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp} className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold mb-6">🎁 Included Free</div>
              <h3 className="text-2xl font-bold">1-Year EDC Membership</h3>
              <p className="mt-3 text-indigo-100 text-sm">Along with your validation report, you get full access to the EDC ecosystem for 1 year.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {membershipBenefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-indigo-100">
                    <span>{b.icon}</span><span>{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">And That's Not All</div>
              <h2 className="text-4xl font-extrabold text-slate-900">Validate + Ecosystem Access</h2>
              <p className="mt-4 text-slate-500 leading-relaxed">You're not just getting a report. You're getting a full year inside India's most active entrepreneurial community.</p>
              <div className="mt-8 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 p-6 text-center">
                <div className="text-sm text-slate-500 line-through">Idea Validation ₹5,000 + Membership ₹2,500</div>
                <div className="mt-2 text-4xl font-extrabold text-purple-700">₹5,000</div>
                <div className="mt-1 text-sm font-semibold text-purple-600">You save ₹2,500 — Membership is FREE</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#2d0b6b] to-[#5b21b6] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="text-5xl mb-6">🚀</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold">Validate Your Idea. Unlock the Ecosystem.</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/60 text-lg">Don't waste months guessing. Get clarity, direction, and access — all in one step.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/join-validation" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-purple-700 shadow-xl transition hover:bg-purple-50">
              Apply for Idea Validation →
            </Link>
            <a href="mailto:enquiry@edcindia.in" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to Us
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 text-sm text-white/30 italic">"Right idea + right direction = real growth."</motion.p>
        </motion.div>
      </section>
    </div>
  );
}
