import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const valueProps = [
  { icon: '📜', title: 'Official Startup Validation Certificate', desc: 'Get recognized with a certificate that builds instant credibility.' },
  { icon: '🔍', title: 'Structured Feedback from Experts', desc: 'Detailed, actionable insights from experienced startup mentors.' },
  { icon: '💼', title: 'Investor-Ready Startup Profile', desc: 'A polished profile that speaks the language investors understand.' },
  { icon: '🏛️', title: 'Guidance for DPIIT & Compliance', desc: 'Navigate registrations and compliance with expert hand-holding.' },
  { icon: '🚀', title: 'Access to Incubation & Funding', desc: 'Direct access to incubation programs and funding opportunities.' },
  { icon: '🌐', title: 'Recognition in Startup Ecosystem', desc: "Get listed and recognized within India's growing startup network." },
];

const trustPoints = [
  { icon: '🌱', value: '5000+', label: 'Founders Supported' },
  { icon: '🌐', value: 'Strong', label: 'Startup Ecosystem Network' },
  { icon: '💡', value: 'Expert', label: 'Mentors & Industry Leaders' },
  { icon: '🏆', value: 'Proven', label: 'Track Record in Startup Enablement' },
];

const beforeAfter = [
  ['Idea ignored', 'Recognized startup'],
  ['No investor trust', 'Verified credibility'],
  ['Confusion & chaos', 'Clear roadmap'],
  ['No funding access', 'Funding-ready'],
];

const steps = [
  { n: '01', label: 'Apply for validation', icon: '📝' },
  { n: '02', label: 'Submit your startup details', icon: '📋' },
  { n: '03', label: 'Get reviewed by experts', icon: '🔬' },
  { n: '04', label: 'Receive certificate & feedback', icon: '🏅' },
];

const testimonials = [
  { quote: 'EDC validation helped me refine my idea and gain investor confidence.', name: 'Startup Founder', location: 'Delhi' },
  { quote: 'Within days, I got clarity and a structured roadmap for my startup.', name: 'Early-Stage Founder', location: 'Bangalore' },
];

export default function MembershipValidationPage() {
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
              Get Your Startup Validated<br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">&amp; Build Instant Credibility.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Turn your idea into a recognized startup with expert validation, structured guidance, and access to funding opportunities.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/join-validation" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-purple-700 shadow-2xl shadow-purple-900/40 transition hover:bg-purple-50">
                🚀 Apply for Startup Validation Now
              </Link>
              <a href="tel:+919792830382" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Call
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-purple-200 font-medium">
              <span>✔ Trusted by 5000+ founders</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>✔ Investor-ready guidance</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>✔ Fast-track validation</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['5000+', 'Founders Supported'], ['70+', 'MoUs Signed'], ['7 Days', 'Turnaround']].map(([v, l]) => (
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

      {/* ── PROBLEM SECTION ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-500 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> The Hard Truth
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Why Most Startups Fail<br />Before They Even Begin</h2>
              <p className="mt-5 text-slate-500 leading-relaxed text-base">90% of startups fail not because of lack of effort — but due to lack of validation, clarity, and direction.</p>
              <div className="mt-8 space-y-3">
                {['No clear roadmap', 'No trust in front of investors', 'No structured feedback', 'No recognition'].map((t) => (
                  <div key={t} className="flex items-center gap-4 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-rose-50 px-5 py-3.5 shadow-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-bold">✗</div>
                    <span className="font-semibold text-red-800 text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-base font-bold text-slate-800">Don't let your idea fail before it even starts.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-purple-200 to-indigo-200 blur-3xl opacity-40" />
              <div className="relative rounded-3xl bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed] p-8 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5">💡</div>
                  <h3 className="text-2xl font-extrabold">The Solution</h3>
                  <p className="mt-3 text-purple-100 text-sm leading-relaxed">Get your idea reviewed by experts before you invest time and money. Walk away with an official validation certificate and a clear roadmap.</p>
                  <div className="mt-6 pt-6 border-t border-white/20 flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-extrabold">₹5,000</div>
                      <div className="text-purple-300 text-xs mt-1">One-time · Includes 1-Year Membership</div>
                    </div>
                    <div className="text-right text-xs text-purple-300 line-through">₹7,500</div>
                  </div>
                  <Link to="/join-validation" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-purple-700 transition hover:bg-purple-50 shadow-lg">
                    Get Validated →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-400/20 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-purple-200 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-pulse" /> What You Get
            </div>
            <h2 className="text-4xl font-extrabold text-white">What You Get with EDC Validation</h2>
            <p className="mt-4 text-purple-200 text-base max-w-xl mx-auto">Everything you need to go from idea to investor-ready — in one package.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, scale: 1.02 }} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition hover:bg-white/10 hover:border-white/20 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="mt-4 font-bold text-white text-base">{item.title}</div>
                <div className="mt-2 text-sm text-purple-200 leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── BEFORE vs AFTER ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-500 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Transformation
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Without vs With Validation</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">See the difference validation makes — from ignored idea to investor-ready startup.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2">
            {/* Without */}
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-rose-50 p-8 shadow-sm">
              <div className="absolute top-4 right-4 text-2xl opacity-20">❌</div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-6">Without Validation</div>
              <div className="space-y-4">
                {beforeAfter.map(([before]) => (
                  <div key={before} className="flex items-center gap-4 rounded-xl bg-white/70 border border-red-100 px-4 py-3 shadow-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-bold">✗</div>
                    <span className="text-sm font-semibold text-red-800">{before}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* With */}
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed] p-8 shadow-2xl">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute top-4 right-4 text-2xl opacity-20">✅</div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">With EDC Validation</div>
                <div className="space-y-4">
                  {beforeAfter.map(([, after]) => (
                    <div key={after} className="flex items-center gap-4 rounded-xl bg-white/10 border border-white/10 px-4 py-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-400/20 text-green-300 text-xs font-bold">✓</div>
                      <span className="text-sm font-semibold text-white">{after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50/40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 border border-purple-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" /> Process
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Simple 4-Step Validation Process</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">From application to certificate — we make it fast, clear, and powerful.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200" />
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5b21b6] to-[#7c3aed] shadow-xl shadow-purple-200 group-hover:shadow-purple-400/40 transition-shadow">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-purple-200 text-xs font-extrabold text-purple-700 shadow">{s.n}</div>
                </div>
                <div className="mt-5 font-bold text-slate-800 text-sm leading-snug px-2">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-14 text-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-purple-200 bg-white px-6 py-3 text-sm font-bold text-purple-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" /> Simple. Fast. Powerful.
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-50 blur-3xl" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-50 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Why Us
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Why Founders Trust EDC</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-purple-50/60 p-7 text-center shadow-sm transition hover:shadow-xl hover:border-purple-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:to-indigo-600/5 transition-all" />
                <div className="relative z-10">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 text-3xl shadow-sm group-hover:scale-110 transition-transform">{t.icon}</div>
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">{t.value}</div>
                  <div className="mt-2 text-sm text-slate-500 font-medium leading-snug">{t.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full fill-white opacity-10"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-purple-200 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-pulse" /> Testimonials
            </div>
            <h2 className="text-4xl font-extrabold text-white">What Founders Say</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition">
                <div className="text-5xl font-serif text-purple-300/50 leading-none mb-4">"</div>
                <p className="text-white/80 leading-relaxed italic text-sm">"{t.quote}"</p>
                <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 text-white font-bold text-sm shadow-lg">{t.name[0]}</div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-purple-300">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── URGENCY CTA ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2d0b6b] via-[#5b21b6] to-[#7c3aed] p-12 text-center shadow-2xl">
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative z-10">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> Limited Slots
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white">Don't Wait — Validate Your Startup Today</motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-slate-400 leading-relaxed">Limited validation slots available to ensure quality review for every founder.</motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <Link to="/join-validation" className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-10 py-4 text-sm font-bold text-white shadow-xl shadow-purple-900/40 transition hover:opacity-90 hover:shadow-purple-500/40">
                  🔥 Apply Now &amp; Get Your Startup Validated
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/40">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 border border-purple-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600 mb-5">
                🎁 Free Resource
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Not Ready Yet? Start Here</h2>
              <p className="mt-4 text-slate-500 leading-relaxed">Download our FREE Startup Validation Checklist and see if your idea is ready to be validated.</p>
              <a href="mailto:enquiry@edcindia.in?subject=Free Startup Validation Checklist" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:opacity-90">
                📥 Download Free Checklist
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-100 to-indigo-100 blur-2xl opacity-50" />
              <div className="relative rounded-3xl border border-purple-100 bg-white p-8 shadow-xl">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-extrabold text-slate-900 text-lg">Startup Validation Checklist</h3>
                <p className="mt-2 text-sm text-slate-500">A step-by-step guide to know if your idea is validation-ready.</p>
                <div className="mt-5 space-y-2">
                  {['Problem clarity', 'Target audience defined', 'Unique value proposition', 'Basic market research'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="text-purple-500 font-bold">✓</span>{item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-purple-50 border border-purple-100 px-4 py-2 text-xs text-purple-600 font-semibold text-center">FREE — Sent directly to your inbox</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-28 bg-gradient-to-br from-[#2d0b6b] to-[#5b21b6] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[120px]" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl shadow-xl backdrop-blur-sm">🚀</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight">Your idea deserves recognition.<br />Take the first step today.</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/60 text-lg">Don't waste months guessing. Get clarity, direction, and access — all in one step.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/join-validation" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-purple-700 shadow-xl transition hover:bg-purple-50">
              🚀 Apply for Startup Validation Now
            </Link>
            <a href="mailto:enquiry@edcindia.in" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to Us
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-10 text-sm text-white/30 italic">"Right idea + right direction = real growth."</motion.p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
