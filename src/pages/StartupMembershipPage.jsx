import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const benefits = [
  { icon: '🪪', title: 'Founder ID', desc: 'Your unique BUB-XXXX identity in the ecosystem' },
  { icon: '📅', title: 'Events & Workshops', desc: 'Monthly meetups, summits, and live sessions' },
  { icon: '💰', title: 'Grant Directory', desc: 'Curated government and private grant listings' },
  { icon: '🤝', title: 'Investor Network', desc: 'Connect with angels, VCs, and strategic investors' },
  { icon: '📚', title: 'Course Access', desc: 'Full entrepreneurship learning track enrollment' },
  { icon: '🎫', title: 'Support Tickets', desc: 'Direct help from the EDC team anytime' },
];

const forYou = [
  'You have a startup idea and want to take it forward',
  'You are an early-stage founder seeking mentorship',
  'You want access to investors, grants, and funding',
  'You want to be part of a community of founders',
  'You want structured support to grow your startup',
];

export default function StartupMembershipPage() {
  useEffect(() => { setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }) }, 0) }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        {/* Animated blobs */}
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" /> EDC India · Startup Membership
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Join India's Growing<br />
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Startup Ecosystem</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Get your Founder ID, access mentors, events, grants, and funding — everything a founder needs, in one membership.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-blue-200">
              <span>Connect</span><span className="text-white/30">→</span><span>Build</span><span className="text-white/30">→</span><span>Scale</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/startup-application" className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 shadow-2xl shadow-blue-900/40 transition hover:shadow-blue-400/30">
                <span className="relative z-10">Join Now — ₹2,500 →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition" />
              </Link>
              <a href="tel:+919792830382" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Call
              </a>
            </motion.div>
            {/* Stats row */}
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['500+', 'Founders'], ['₹50Cr+', 'Funding Raised'], ['100+', 'Partners']].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-white">{v}</div>
                  <div className="mt-1 text-xs text-white/50">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" className="w-full fill-white"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" /></svg>
        </div>
      </section>

      {/* ── FOR YOU ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Is This For You?</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Built for founders<br />at every stage</h2>
              <p className="mt-4 text-slate-500 leading-relaxed">Whether you're just starting out or already building — this membership gives you the tools, network, and support to move faster.</p>
              <ul className="mt-8 space-y-4">
                {forYou.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">✓</div>
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 blur-2xl opacity-60" />
              <div className="relative rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold">EDC Startup Membership</h3>
                <p className="mt-3 text-blue-100 text-sm leading-relaxed">Full access to India's entrepreneurial ecosystem — from a unique Founder ID to investor connections, events, grants, and dedicated support.</p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-4xl font-extrabold">₹2,500</div>
                  <div className="text-blue-200 text-sm mt-1">One-time · Lifetime access</div>
                </div>
                <Link to="/startup-application" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-50">
                  Get Started →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">What You Get</div>
            <h2 className="text-4xl font-extrabold text-slate-900">Everything in one membership</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-blue-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl group-hover:scale-110 transition-transform">{b.icon}</div>
                <div className="mt-4 font-bold text-slate-800">{b.title}</div>
                <div className="mt-1 text-sm text-slate-500">{b.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FUNDING ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">Funding & Growth</div>
              <h2 className="text-4xl font-extrabold text-slate-900">We don't just give access — we help you grow</h2>
              <div className="mt-8 space-y-4">
                {[
                  { icon: '💸', text: 'Grant support guidance up to ₹10 Lakhs' },
                  { icon: '💼', text: 'Investor introductions and pitch opportunities' },
                  { icon: '🌍', text: 'Global exposure programs and international events' },
                  { icon: '📊', text: 'Pitch deck and finance strategy support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold">Ready to scale?</h3>
              <p className="mt-3 text-green-100 text-sm">Join hundreds of founders already building with EDC India's ecosystem support.</p>
              <div className="mt-8 space-y-3">
                {['Mentorship from industry experts', 'Access to 100+ investor network', 'Monthly funding workshops', 'Dedicated growth support'].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="text-5xl mb-6">🚀</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold">Start Your Founder Journey Today</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/60 text-lg">One step. One membership. Unlimited possibilities.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/startup-application" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-700 shadow-xl transition hover:bg-blue-50">
              Join Now — ₹2,500 →
            </Link>
            <a href="mailto:enquiry@edcindia.in" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to Us
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 text-sm text-white/30 italic">"The right network and the right support can change everything."</motion.p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
