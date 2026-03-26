import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const learnings = [
  { icon: '🧠', title: 'Think Like an Entrepreneur', desc: 'Shift your mindset from employee to builder' },
  { icon: '✅', title: 'Validate Any Idea', desc: 'Test before you invest time and money' },
  { icon: '🎤', title: 'Pitch Confidently', desc: 'Communicate and present with clarity' },
  { icon: '💼', title: 'Sales & Business', desc: 'Learn how to sell a product or idea' },
  { icon: '🏗️', title: 'How Startups Work', desc: 'Understand the real mechanics of building' },
  { icon: '🌐', title: 'Client Acquisition', desc: 'Approach clients and seize opportunities' },
];

const forYou = [
  'You are a student (BBA, MBA, or any field) confused about your career',
  'You want to build a startup but don\'t know where to start',
  'You want to learn real skills instead of theory',
  'You lack confidence in communication, sales, or business',
  'You want practical exposure and real opportunities',
];

const phases = [
  { phase: 'Phase 1', title: 'Learn', desc: 'Basics of entrepreneurship in simple, practical language', icon: '📖' },
  { phase: 'Phase 2', title: 'Practice', desc: 'Work on real problems, ideas, and communication', icon: '⚡' },
  { phase: 'Phase 3', title: 'Execute', desc: 'Build with real exposure and mentor guidance', icon: '🚀' },
  { phase: 'Phase 4', title: 'Grow', desc: 'Scale with funding support and global opportunities', icon: '🌍' },
];

export default function FellowshipPage() {
  useEffect(() => { window.scrollTo(0, 0) }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b]">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" /> EDC India · Entrepreneurial Fellowship
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Build Your Startup &<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">Career in 12 Months</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              No experience? No idea? No problem. Learn, build, and grow with India's most practical entrepreneurial fellowship.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-cyan-200">
              <span>30% Learning</span><span className="text-white/30">·</span><span>70% Real Execution</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/fellowship-application" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-800 shadow-2xl transition hover:bg-blue-50">
                Apply Now — ₹10,000 →
              </Link>
              <a href="tel:+919792830382" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Call
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['12 Months', 'Duration'], ['₹10,000', 'One-time Fee'], ['70%', 'Execution Focus']].map(([v, l]) => (
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

      {/* FOR YOU */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">This Is For You If...</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Even if you're starting from zero</h2>
              <p className="mt-4 text-slate-500 leading-relaxed">This fellowship is designed for anyone who wants to build something real — regardless of background or experience.</p>
              <ul className="mt-8 space-y-4">
                {forYou.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">✓</div>
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 font-semibold text-blue-600">👉 Even if you are starting from zero — this fellowship is for you.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 blur-2xl opacity-60" />
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] p-8 text-white shadow-2xl">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold">EDC Fellowship</h3>
                <p className="mt-3 text-blue-200 text-sm leading-relaxed">A 1-year execution-driven program to help you understand business, build real skills, and gain real-world exposure.</p>
                <div className="mt-6 space-y-2 text-sm text-blue-100">
                  <div className="flex justify-between"><span>Duration</span><span className="font-bold text-white">12 Months</span></div>
                  <div className="flex justify-between"><span>Model</span><span className="font-bold text-white">30% Learn + 70% Execute</span></div>
                  <div className="flex justify-between"><span>Fee</span><span className="font-bold text-white">₹10,000 one-time</span></div>
                </div>
                <Link to="/fellowship-application" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-blue-800 transition hover:bg-blue-50">
                  Apply Now →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">How It Works</div>
            <h2 className="text-4xl font-extrabold text-slate-900">Learn → Practice → Execute → Grow</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-blue-100">
                <div className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">{t.phase}</div>
                <div className="mt-4 text-3xl">{t.icon}</div>
                <div className="mt-3 font-bold text-slate-800 text-lg">{t.title}</div>
                <div className="mt-1 text-sm text-slate-500">{t.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">Curriculum</div>
            <h2 className="text-4xl font-extrabold text-slate-900">What You Will Learn</h2>
            <p className="mt-3 text-slate-500">Everything explained in simple language with real examples.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learnings.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-indigo-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="mt-4 font-bold text-slate-800">{item.title}</div>
                <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-4">After Completion</div>
              <h2 className="text-4xl font-extrabold leading-tight">Funding & Opportunities</h2>
              <p className="mt-4 text-white/60 leading-relaxed">We don't just teach — we support your growth beyond the fellowship.</p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: '💸', title: 'Up to ₹10 Lakhs', desc: 'Grant support for selected fellows' },
                  { icon: '💼', title: 'Up to ₹1 Crore', desc: 'Funding opportunity (Equity/Debt)' },
                  { icon: '🌍', title: 'International Exposure', desc: 'Dubai / Singapore for top fellows' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-white/50">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold">What You Will Become</h3>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">After this fellowship, you will become a confident communicator, a problem solver, and someone who earns through skills — not a degree.</p>
              <div className="mt-6 space-y-3">
                {['Confident communicator', 'Problem solver', 'Business & sales thinker', 'Investor-ready founder', 'Globally exposed entrepreneur'].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300 text-xs">✓</div>
                    {t}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-semibold text-cyan-300">This is not just learning — this is transformation.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="text-5xl mb-6">🎓</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold">Start Your Journey Today</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/60 text-lg">You don't need to be perfect. You just need to start.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/fellowship-application" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-800 shadow-xl transition hover:bg-blue-50">
              Apply Now — ₹10,000 →
            </Link>
            <a href="mailto:enquiry@edcindia.in?subject=Fellowship%20Enquiry" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to Us
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 text-sm text-white/30 italic">"Degrees don't build careers. Skills and execution do."</motion.p>
        </motion.div>
      </section>
    </div>
  );
}
