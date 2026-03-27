import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const criteria = [
  { icon: '🚀', title: 'Startup Growth', desc: 'Number and quality of startups incubated' },
  { icon: '🏢', title: 'Incubation Quality', desc: 'Infrastructure, mentorship, and support systems' },
  { icon: '💰', title: 'Funding Support', desc: 'Capital raised by incubated startups' },
  { icon: '👨‍💼', title: 'Job Creation', desc: 'Employment generated through startups' },
  { icon: '💡', title: 'Innovation & Patents', desc: 'Research output and IP filings' },
  { icon: '🔄', title: 'Idea-to-Business', desc: 'Conversion rate from idea to execution' },
];

const rankings = [
  { icon: '🥇', title: 'Top 30 Incubation Centers', desc: 'Best-in-class incubation infrastructure and outcomes' },
  { icon: '🚀', title: 'Top 30 Startup Ecosystems', desc: 'Institutions driving the most startup activity' },
  { icon: '💡', title: 'Top 100 Student Innovations', desc: 'Outstanding student-led innovation projects' },
];

const whyParticipate = [
  'Build national credibility and brand value',
  'Attract better students, startups, and partnerships',
  'Benchmark against top institutions across India',
  'Strengthen your innovation & incubation ecosystem',
  'Showcase real impact to government & stakeholders',
];

export default function RankingPage() {
  useEffect(() => { setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, 0) }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2d2d] via-[#0d4a4a] to-[#0e6b6b]">
        <div className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-teal-400/15 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-[100px] animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" /> IIIR · India Innovation & Incubation Ranking
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              India's Most Transparent<br />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">Innovation Ranking</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
              Recognizing institutions, startups, and student innovators who are building real impact.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-teal-200">
              <span>Measured by Execution</span><span className="text-white/30">·</span><span>Recognized by Impact</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/college-ranking-application" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-teal-700 shadow-2xl transition hover:bg-teal-50">
                Apply for Ranking →
              </Link>
              <a href="mailto:enquiry@edcindia.in?subject=IIIR%20Brochure%20Request" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Request Brochure
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['70+', 'Institutions'], ['3', 'Categories'], ['Annual', 'Recognition']].map(([v, l]) => (
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

      {/* BEYOND TRADITIONAL */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-4">Our Philosophy</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Beyond Traditional Rankings</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">Most rankings focus on academics, infrastructure, and legacy. But the world has changed. The real question today is: Is your institution creating innovators, startups, and job creators?</p>
              <div className="mt-6 rounded-2xl border-l-4 border-teal-500 bg-teal-50 px-6 py-4">
                <p className="font-semibold text-teal-800 text-sm leading-relaxed">IIIR measures real innovation, real execution, and real outcomes — not just reports.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-teal-100 to-cyan-100 blur-2xl opacity-60" />
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0b2d2d] to-[#0e6b6b] p-8 text-white shadow-2xl">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold">Verified. Transparent. Data-Driven.</h3>
                <p className="mt-3 text-teal-100 text-sm leading-relaxed">Our evaluation combines data analysis, physical campus visits, interaction with founders & students, and performance-based scoring.</p>
                <div className="mt-6 space-y-2 text-sm text-teal-100">
                  {['Data Analysis', 'Campus Visits', 'Founder Interactions', 'Performance Scoring'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-300" />{t}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CRITERIA */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-4">Evaluation Framework</div>
            <h2 className="text-4xl font-extrabold text-slate-900">What We Measure</h2>
            <p className="mt-3 text-slate-500">Six key dimensions that define real innovation impact.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-teal-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="mt-4 font-bold text-slate-800">{item.title}</div>
                <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RANKING STRUCTURE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">Annual Recognition</div>
            <h2 className="text-4xl font-extrabold text-slate-900">Ranking Structure</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-3">
            {rankings.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-teal-50/40 p-8 text-center shadow-sm transition hover:shadow-xl">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="font-bold text-slate-900 text-lg">{item.title}</div>
                <div className="mt-2 text-sm text-slate-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY PARTICIPATE */}
      <section className="py-20 bg-gradient-to-br from-[#0b2d2d] to-[#0e6b6b] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-200 mb-4">Why Participate</div>
              <h2 className="text-4xl font-extrabold leading-tight">This is not just ranking — <span className="text-teal-300">this is positioning.</span></h2>
              <p className="mt-4 text-white/60 leading-relaxed">Get recognized for the real work your institution is doing to build India's next generation of innovators and entrepreneurs.</p>
              <Link to="/college-ranking-application" className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold text-teal-700 shadow-xl transition hover:bg-teal-50">
                Apply Now →
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              {whyParticipate.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/30 text-teal-300 text-xs font-bold mt-0.5">{i + 1}</div>
                  <span className="text-sm text-white/80 leading-relaxed">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0b2d2d] to-[#0d4a4a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="text-5xl mb-6">🚀</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold">Get Recognized for Real Impact</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/60 text-lg">If your institution is creating innovation and driving real change — it deserves national recognition.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/college-ranking-application" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-teal-700 shadow-xl transition hover:bg-teal-50">
              Apply for Ranking →
            </Link>
            <a href="mailto:enquiry@edcindia.in?subject=Connect%20with%20EDC%20for%20Ranking" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Connect with EDC
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 text-sm text-white/30 italic">"Innovation is not what you claim. It's what you build."</motion.p>
        </motion.div>
      </section>
    </div>
  );
}
