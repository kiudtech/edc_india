import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const benefitCategories = [
  {
    icon: '🧠', title: 'Learning & Growth', color: 'from-blue-600 to-indigo-600',
    items: ['Weekly expert sessions', 'Startup & business training', 'Sales & marketing skills'],
  },
  {
    icon: '💼', title: 'Career Boost', color: 'from-indigo-600 to-purple-600',
    items: ['Internship & job opportunities', 'Resume & interview support', 'Industry exposure'],
  },
  {
    icon: '🚀', title: 'Startup Support', color: 'from-cyan-600 to-blue-600',
    items: ['Idea validation', 'Mentorship', 'Funding guidance', 'Pitch preparation'],
  },
  {
    icon: '🌍', title: 'Exposure & Network', color: 'from-blue-500 to-cyan-500',
    items: ['Startup events & competitions', 'Founder & investor connections', 'National & international exposure'],
  },
  {
    icon: '💰', title: 'Funding & Opportunities', color: 'from-emerald-600 to-teal-600',
    items: ['Access to startup funding programs', 'Participation in pitch events', 'Scholarships & rewards'],
  },
];

const premiumBenefits = [
  { icon: '🎓', label: 'Certificate of Membership' },
  { icon: '🏅', label: 'Priority access to Fellowship Program' },
  { icon: '📢', label: 'Featured in EDC platforms' },
  { icon: '🤝', label: 'Direct entry into startup ecosystem' },
  { icon: '💸', label: 'Special discounts on events & programs' },
];

const beforeAfter = [
  ['No guidance', 'Expert mentorship'],
  ['No network', 'Founder network'],
  ['No exposure', 'Real opportunities'],
  ['Confusion', 'Clear direction'],
];

const whoShouldJoin = ['12th pass students', 'College students', 'Aspiring entrepreneurs', 'Skill seekers', 'Anyone serious about growth'];

export default function StartupMembershipPage() {
  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" /> EDC India · Startup Membership
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              EDC Startup Membership<br />
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">₹2500 Only</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Turn Your Idea Into Reality. Build Skills, Network &amp; Get Opportunities.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-base text-blue-200 font-medium">
              Join India's growing startup ecosystem and unlock real growth.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-blue-200 font-medium">
              <span>✔ Turn your idea into reality</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>✔ Build skills &amp; network</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>✔ Get real opportunities</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/startup-application" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 shadow-2xl shadow-blue-900/40 transition hover:bg-blue-50">
                🚀 Join Membership Now — ₹2,500
              </Link>
              <a href="tel:+919792830382" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Call
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['1000+', 'Students & Startups'], ['₹2,500', 'One-time Fee'], ['Real', 'Opportunities']].map(([v, l]) => (
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

      {/* ── WHY THIS MEMBERSHIP ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Why This Membership
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">₹2500 mein kya mil raha hai?</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">Most students spend ₹2500 on random things — but here, you get career + startup + network + funding access.</p>
              <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50 px-6 py-4">
                <p className="font-bold text-blue-800 text-sm leading-relaxed">This is not a membership — this is your entry into the startup ecosystem.</p>
              </div>
              <div className="mt-7 space-y-3">
                {['Career + startup growth in one package', 'Network with real founders & investors', 'Funding access & mentorship support', 'Works alongside your college'].map((t) => (
                  <div key={t} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">✓</div>
                    <span className="font-semibold text-blue-900 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-40" />
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b] p-8 text-white shadow-2xl">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-400/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5">🚀</div>
                  <h3 className="text-2xl font-extrabold">EDC Startup Membership</h3>
                  <p className="mt-3 text-blue-200 text-sm leading-relaxed">Full access to India's entrepreneurial ecosystem — from mentorship to investor connections, events, and dedicated support.</p>
                  <div className="mt-6 pt-6 border-t border-white/20 flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-extrabold">₹2,500</div>
                      <div className="text-blue-300 text-xs mt-1">One-time · Lifetime access</div>
                    </div>
                    <div className="text-right text-xs text-blue-300 line-through">₹5,000</div>
                  </div>
                  <Link to="/startup-application" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg">
                    Join Now →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOR STUDENTS & STARTUPS ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-blue-200 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" /> Who Is This For
            </div>
            <h2 className="text-4xl font-extrabold text-white">Built for Students &amp; Startups Both</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 lg:grid-cols-2">
            {/* For Students */}
            <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5">💼</div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-400/20 px-3 py-1 text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">For Students</div>
              <h3 className="text-xl font-extrabold text-white">If you don't know what to do in life — this is for you</h3>
              <div className="mt-5 space-y-3">
                {['Internship opportunities', 'Resume building', 'Skill development', 'Placement support', 'Real-world exposure'].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-blue-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />{t}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs font-bold text-cyan-300">✔ College ke sath-sath kar sakte ho</p>
            </motion.div>
            {/* For Startups */}
            <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5">🚀</div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-200 uppercase tracking-widest mb-4">For Startups</div>
              <h3 className="text-xl font-extrabold text-white">If you already have an idea or startup</h3>
              <div className="mt-5 space-y-3">
                {['Access to student talent', 'Visibility in campus & events', 'Mentorship & growth support', 'Networking with founders & investors'].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-blue-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />{t}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs font-bold text-cyan-300">✔ EDC helps with mentorship, funding guidance &amp; scaling</p>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── MEMBERSHIP BENEFITS ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Membership Benefits
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Everything in One Membership</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">5 powerful categories of benefits — all unlocked with a single ₹2,500 membership.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {benefitCategories.map((cat, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-all`} />
                <div className="relative z-10">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-3xl shadow-lg group-hover:scale-110 transition-transform`}>{cat.icon}</div>
                  <div className="font-extrabold text-slate-900 mb-3">{cat.title}</div>
                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="text-blue-500 font-bold mt-0.5">✓</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PREMIUM BENEFITS ── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" /> Extra Premium Benefits
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Only for EDC Members</h2>
            <p className="mt-4 text-slate-500">Exclusive perks that make this membership irresistible.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {premiumBenefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-xl hover:border-blue-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all" />
                <div className="relative z-10">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-2xl group-hover:scale-110 transition-transform">{b.icon}</div>
                  <div className="text-sm font-bold text-slate-800 leading-snug">{b.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE vs AFTER ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-500 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> The Real Value
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Why ₹2500 Is a Steal</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">Most people spend ₹2500 on things that disappear. Here, it opens doors that stay open.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-rose-50 p-8 shadow-sm">
              <div className="absolute top-4 right-4 text-2xl opacity-20">❌</div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-6">Without Membership</div>
              <div className="space-y-4">
                {beforeAfter.map(([before]) => (
                  <div key={before} className="flex items-center gap-4 rounded-xl bg-white/70 border border-red-100 px-4 py-3 shadow-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-bold">✗</div>
                    <span className="text-sm font-semibold text-red-800">{before}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b] p-8 shadow-2xl">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute top-4 right-4 text-2xl opacity-20">✅</div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest mb-6">With EDC Membership ✅</div>
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

      {/* ── WHO SHOULD JOIN ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/40">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Who Should Join
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">No Experience Needed.<br />Just the Drive to Grow.</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">This membership is open to anyone who wants to build something real — regardless of background or experience.</p>
              <div className="mt-7 space-y-3">
                {whoShouldJoin.map((t) => (
                  <div key={t} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white px-5 py-3 shadow-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">✓</div>
                    <span className="font-semibold text-slate-800 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-50" />
              <div className="relative rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">
                <div className="text-4xl mb-5">💡</div>
                <h3 className="text-xl font-extrabold text-slate-900">The Final Push</h3>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <p className="text-sm text-slate-700 leading-relaxed">If you are serious about your future — <strong className="text-blue-700">₹2500 is nothing.</strong></p>
                  </div>
                  <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                    <p className="text-sm text-slate-700 leading-relaxed">But if you miss this — <strong className="text-orange-600">opportunity cost is huge.</strong></p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                  {['1000+ Students & Startups Connected', 'Growing Startup Ecosystem', 'Real Opportunities, Not Just Theory'].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-blue-500 font-bold">✔</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── URGENCY + FINAL CTA ── */}
      <section className="py-28 bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px]" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> Limited Access · Early Members Get More
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl shadow-xl backdrop-blur-sm">🚀</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight">Don't Wait Till Your<br />College Ends.</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/60 text-lg">Start building your future today. Membership is limited to maintain quality.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/startup-application" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-700 shadow-xl transition hover:bg-blue-50">
              🚀 Join EDC Membership Now — ₹2,500
            </Link>
            <a href="mailto:enquiry@edcindia.in" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to Us
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-10 text-sm text-white/30 italic">"The right network and the right support can change everything."</motion.p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
