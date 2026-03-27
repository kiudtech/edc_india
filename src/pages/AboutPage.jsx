import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const stats = [
  { value: '70+', label: 'Universities', icon: '🏛️' },
  { value: '100+', label: 'Institutes', icon: '🏫' },
  { value: '500+', label: 'Startups', icon: '🚀' },
  { value: '3,000+', label: 'Members', icon: '👥' },
];

const beliefs = [
  'Entrepreneurship is a mindset, not a designation',
  'Not everyone needs to start a startup — but everyone should think like one',
  'Real learning happens through execution, not theory',
  'Sales, problem-solving, and adaptability are core life skills',
  'Degrees alone don\'t create impact — skills and action do',
];

const whatWeDo = [
  { icon: '💡', title: 'Idea Validation', desc: 'Expert review and startup clarity reports' },
  { icon: '🤝', title: 'Membership & Community', desc: 'Access to India\'s entrepreneurial network' },
  { icon: '🎓', title: 'Entrepreneurial Fellowship', desc: '12-month execution-driven program' },
  { icon: '🏛️', title: 'University Development', desc: 'Building on-campus startup ecosystems' },
  { icon: '🏆', title: 'Innovation Rankings', desc: 'Transparent incubation ranking system' },
  { icon: '💰', title: 'Funding Support', desc: 'Grant guidance and investor connections' },
];

const timeline = [
  { year: '2019', title: 'Founded', desc: 'EDC India born with a belief that entrepreneurship is a mindset' },
  { year: '2020', title: 'National Partnerships', desc: 'Collaboration with leading institutions across India' },
  { year: '2022', title: 'Global Launch', desc: 'International exposure and cross-border mentorship' },
  { year: '2024', title: 'Scale & Growth', desc: 'Funding readiness and global market access programs' },
];

export default function AboutPage() {
  useEffect(() => { setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, 0) }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-indigo-400/15 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" /> EDC India · Est. 2019
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              About <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">EDC India</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
              We don't just talk about entrepreneurship — we build the ecosystem that makes it possible.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/join" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-blue-700 shadow-xl transition hover:bg-blue-50">
                Join the Ecosystem →
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" className="w-full fill-white"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" /></svg>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Who We Are</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Building India's Entrepreneurial Ecosystem</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">Entrepreneurial Development Council (EDC India) is a mission-driven organization dedicated to building and strengthening the entrepreneurial ecosystem across India and globally. Founded in 2019, we work at the intersection of students, startups, universities, investors, and policymakers.</p>
              <div className="mt-6 rounded-2xl border-l-4 border-blue-600 bg-blue-50 px-6 py-4">
                <p className="font-semibold text-blue-800 text-sm leading-relaxed">"Entrepreneurship is not limited to starting a company — it is a mindset of solving problems, creating value, and thinking differently."</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 text-center shadow-sm transition hover:shadow-lg hover:border-blue-100">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-500 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY / TIMELINE */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">Our Story</div>
            <h2 className="text-4xl font-extrabold text-slate-900">From a Vision to a Movement</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">EDC India started to bridge the gap between education and real-world entrepreneurship. From small sessions to a multi-layered ecosystem platform.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 hidden lg:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={`flex gap-6 items-center ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">{item.year}</div>
                      <div className="text-lg font-bold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                  <div className="hidden lg:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">What We Do</div>
            <h2 className="text-4xl font-extrabold text-slate-900">Our Focus Areas</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-blue-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="mt-4 font-bold text-slate-800">{item.title}</div>
                <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="py-20 bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-200 mb-4">What We Believe</div>
              <h2 className="text-4xl font-extrabold leading-tight">Our Core <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Philosophy</span></h2>
              <p className="mt-4 text-white/60 leading-relaxed">These beliefs drive everything we build, every program we run, and every founder we support.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              {beliefs.map((b, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-blue-300 text-xs font-bold mt-0.5">{i + 1}</div>
                  <span className="text-sm text-white/80 leading-relaxed">{b}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Our Mission', icon: '🎯', color: 'from-blue-500 to-indigo-600', text: 'To build a strong, inclusive, and execution-driven entrepreneurial ecosystem where individuals can learn, validate ideas, access mentorship and funding, and grow from idea to impact.' },
              { label: 'Our Vision', icon: '🌍', color: 'from-purple-500 to-pink-600', text: 'To become one of the most impactful entrepreneurial ecosystem builders globally — enabling millions of individuals to think, build, and grow beyond limitations.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">{item.label}</div>
                  <p className="text-white/90 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="text-5xl mb-6">🤝</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold">Join the Movement</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/60 text-lg">Whether you're a student, founder, college, or investor — there's a place for you in this ecosystem.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/join" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-700 shadow-xl transition hover:bg-blue-50">
              Join Now →
            </Link>
            <a href="mailto:enquiry@edcindia.in" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
