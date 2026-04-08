import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const categories = [
  {
    icon: '🏢', title: 'Top 30 Incubation Centers',
    desc: 'Recognizing institutions building strong startup ecosystems and supporting innovation.',
    criteria: ['Innovation Ecosystem Strength', 'Number of Startups Supported', 'Funding Support & Investor Connect', 'Industry Collaboration', 'Placement & Entrepreneurial Outcomes', 'Infrastructure & Resources', 'Research & Development Impact'],
  },
  {
    icon: '🚀', title: 'Top 30 Startups',
    desc: 'Highlighting high-potential startups with strong execution and scalability.',
    criteria: ['Problem-Solution Fit', 'Market Potential', 'Traction & Revenue', 'Innovation & Differentiation', 'Scalability', 'Team Strength'],
  },
  {
    icon: '💡', title: 'Top 100 Student Innovation Projects',
    desc: 'Celebrating unique, creative, and impactful student-led ideas.',
    criteria: ['Innovation & Uniqueness', 'Practical Implementation', 'Real-world Impact', 'Creativity', 'Problem-solving Approach'],
  },
];

const applySteps = [
  { n: '01', icon: '📝', label: 'Fill out the application form' },
  { n: '02', icon: '📁', label: 'Submit required data, documents & proofs' },
  { n: '03', icon: '🔬', label: 'Evaluation by expert panel' },
  { n: '04', icon: '📊', label: 'Shortlisting based on scores' },
  { n: '05', icon: '🏅', label: 'Final ranking announcement at national event' },
];

const benefits = [
  { icon: '🏆', title: 'Recognition & Awards', items: ['National Ranking Certificate', 'Trophy / Memento at Grand Event'] },
  { icon: '📢', title: 'Media & Visibility', items: ['Coverage in 50+ media platforms', 'Featured stories & press releases', 'Digital + offline exposure'] },
  { icon: '💼', title: 'Growth Opportunities', items: ['Direct Investor Connect', 'Funding Opportunities', 'Startup Ecosystem Access'] },
  { icon: '🤝', title: 'Network & Collaboration', items: ['Connect with top institutions', 'Industry partnerships', 'Innovation ecosystem exposure'] },
];

const studentRatingParams = [
  'Innovation Environment', 'Placement Opportunities', 'Practical Learning',
  'Startup Support', 'Faculty Quality', 'Infrastructure',
  'Industry Exposure', 'Skill Development', 'Campus Culture', 'Overall Experience',
];

export default function RankingPage() {
  useEffect(() => { setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, 0) }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2d2d] via-[#0d4a4a] to-[#0e6b6b]">
        <div className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-teal-400/15 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-[100px] animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" /> EDC India · National Innovation & Startup Ranking 2026
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              National Innovation &<br />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">Startup Ranking 2026</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Recognizing India's most innovative Universities, Incubation Centers, Startups &amp; Student Projects.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-teal-200 font-medium">
              <span>📍 International Trade Expo Centre, Sector 62, Noida, UP</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>📅 19th September 2026</span>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-2 text-xs text-white/50">🎤 In presence of Government Leaders, Investors &amp; Innovation Experts</motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/college-ranking-application" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-teal-700 shadow-2xl transition hover:bg-teal-50">
                🚀 Apply for Ranking 2026
              </Link>
              <a href="mailto:enquiry@edcindia.in?subject=IIIR%20Brochure%20Request" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Request Brochure
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['3', 'Categories'], ['19 Sep', '2026 Event'], ['National', 'Recognition']].map(([v, l]) => (
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

      {/* ── ABOUT THE RANKING ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> About the Ranking
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">A National Recognition Platform for Real Innovation</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">The EDC National Ranking is designed to identify and recognize institutions and startups that are building real innovation and impact in India.</p>
              <p className="mt-3 text-slate-500 leading-relaxed">This platform brings together:</p>
              <div className="mt-5 space-y-3">
                {['Universities & Colleges', 'Incubation Centers', 'Startups', 'Student Innovators'].map((t) => (
                  <div key={t} className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-teal-50/60 px-5 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 text-xs font-bold">✓</div>
                    <span className="font-semibold text-teal-900 text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border-l-4 border-teal-500 bg-teal-50 px-6 py-4">
                <p className="font-semibold text-teal-800 text-sm leading-relaxed">This is not just a ranking — it is a national recognition platform + opportunity gateway for growth, visibility, and funding.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-teal-100 to-cyan-100 blur-3xl opacity-40" />
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2d2d] via-[#0d4a4a] to-[#0e6b6b] p-8 text-white shadow-2xl">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5">🏆</div>
                  <h3 className="text-2xl font-extrabold">Verified. Transparent. Data-Driven.</h3>
                  <p className="mt-3 text-teal-100 text-sm leading-relaxed">Our evaluation combines data analysis, physical campus visits, interaction with founders & students, and performance-based scoring.</p>
                  <div className="mt-6 space-y-2">
                    {['Data Analysis', 'Campus Visits', 'Founder Interactions', 'Performance Scoring'].map((t) => (
                      <div key={t} className="flex items-center gap-3 text-sm text-teal-100">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-300 shrink-0" />{t}
                      </div>
                    ))}
                  </div>
                  <Link to="/college-ranking-application" className="mt-8 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-teal-700 transition hover:bg-teal-50 shadow-lg">
                    Apply for Ranking 2026 →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPORTANT DECLARATION ── */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-teal-50/30">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-10 shadow-sm">
            <div className="absolute top-4 right-4 text-4xl opacity-10">⚠️</div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" /> Important Declaration
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl font-extrabold text-slate-900">EDC Does NOT Sell Rankings or Awards</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-slate-600 leading-relaxed">All rankings are strictly based on:</motion.p>
            <motion.div variants={fadeUp} className="mt-4 grid gap-3 sm:grid-cols-3">
              {['Data Submitted', 'Expert Evaluation', 'Performance Metrics'].map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-xl bg-white border border-amber-100 px-4 py-3 shadow-sm">
                  <span className="text-teal-500 font-bold">✓</span>
                  <span className="text-sm font-semibold text-slate-700">{t}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-2 text-sm font-semibold text-red-600">❌ No paid awards</div>
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-2 text-sm font-semibold text-red-600">❌ No influence-based ranking</div>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 text-sm text-slate-500">If you come across any such activity, report immediately at: <a href="mailto:ceooffice@edcindia.in" className="font-bold text-teal-600 hover:underline">📩 ceooffice@edcindia.in</a></motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── RANKING CATEGORIES ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0b2d2d] via-[#0d4a4a] to-[#0e6b6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-teal-400/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-teal-200 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" /> Ranking Categories
            </div>
            <h2 className="text-4xl font-extrabold text-white">3 Categories. One National Stage.</h2>
            <p className="mt-4 text-teal-200 max-w-xl mx-auto">Every category is evaluated independently with its own criteria and scoring system.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition hover:bg-white/10 hover:border-white/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-xl font-extrabold text-white">{cat.title}</h3>
                <p className="mt-2 text-sm text-teal-200 leading-relaxed">{cat.desc}</p>
                <div className="mt-6 space-y-2 pt-6 border-t border-white/10">
                  {cat.criteria.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-xs text-teal-100">
                      <div className="h-1 w-1 rounded-full bg-teal-400 shrink-0" />{c}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" /> How to Apply
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Simple Process. Transparent System.</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-teal-100 via-teal-400 to-teal-100" />
            {applySteps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d4a4a] to-[#0e6b6b] shadow-xl shadow-teal-100 group-hover:shadow-teal-300/40 transition-shadow">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-teal-200 text-xs font-extrabold text-teal-700 shadow">{s.n}</div>
                </div>
                <div className="mt-5 text-sm font-semibold text-slate-700 leading-snug px-2">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SCORING SYSTEM ── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-teal-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 border border-teal-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Scoring System
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Fully Transparent & Merit-Based</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">No manual bias. No influence. Just data and performance.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: '🔢', title: 'Scored 1–10', desc: 'Each parameter scored individually from 1 to 10' },
              { icon: '⚖️', title: 'Weighted System', desc: 'Weighted scoring applied based on category importance' },
              { icon: '📊', title: 'Overall Score', desc: 'Final ranking based on cumulative performance score' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-sm transition hover:shadow-xl hover:border-teal-100">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-extrabold text-slate-900">{item.title}</div>
                <div className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 text-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-teal-200 bg-white px-6 py-3 text-sm font-bold text-teal-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" /> Fully transparent · No manual bias
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── STUDENT RATING ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0b2d2d] via-[#0d4a4a] to-[#0e6b6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-200 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" /> Student-Driven Rating
              </div>
              <h2 className="text-4xl font-extrabold text-white leading-tight">Students Rate Their Own College</h2>
              <p className="mt-5 text-teal-100 leading-relaxed">Students can anonymously rate their own college — creating real transparency and credibility that no institution can fake.</p>
              <div className="mt-6 space-y-3">
                {[
                  'Ratings are averaged based on total student responses',
                  'Weighted normalization ensures fairness across campus sizes',
                  'A college with 10,000 students and one with 2,000 are evaluated proportionally',
                  'No advantage to bigger campuses',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3 text-sm text-teal-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-300 mt-2 shrink-0" />{t}
                  </div>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="text-sm font-bold text-white">Final Output: Overall 10-Star Rating</div>
                  <div className="text-xs text-teal-300 mt-0.5">Each parameter rated 1–10</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              {studentRatingParams.map((param, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm hover:bg-white/10 transition">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">{i + 1}</div>
                  <span className="text-xs text-teal-100 font-medium">{param}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Benefits
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Benefits of Applying</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">More than a certificate — it's a gateway to visibility, funding, and national recognition.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-teal-50/40 p-7 shadow-sm transition hover:shadow-xl hover:border-teal-200">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/0 to-cyan-600/0 group-hover:from-teal-600/5 group-hover:to-cyan-600/5 transition-all" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 text-3xl shadow-sm group-hover:scale-110 transition-transform">{b.icon}</div>
                  <div className="font-extrabold text-slate-900 mb-3">{b.title}</div>
                  <div className="space-y-2">
                    {b.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="text-teal-500 font-bold mt-0.5">✓</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GRAND EVENT ── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-teal-50/30 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 mb-4">
              🎤 Grand Event Highlight
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">The Grand Stage Awaits</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#071a1a] via-[#0b3030] to-[#0d4a4a]" />
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-teal-400/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-[80px]" />
            {/* top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400" />

            <div className="relative z-10 p-10 sm:p-14">
              {/* date badge */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" /> Grand Ranking Ceremony
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold text-white/70 backdrop-blur-sm">
                  📅 19th September 2026
                </div>
              </motion.div>

              {/* main content */}
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                <motion.div variants={fadeUp}>
                  <div className="text-5xl mb-5">🏆</div>
                  <h3 className="text-4xl font-extrabold text-white leading-tight">Grand Ranking<br />Ceremony 2026</h3>
                  <div className="mt-5 flex items-start gap-3 text-sm text-teal-200">
                    <span className="text-lg shrink-0">📍</span>
                    <span className="leading-relaxed">International Trade Expo Centre,<br />Sector 62, Noida, Uttar Pradesh</span>
                  </div>
                  <p className="mt-5 text-white/50 text-sm leading-relaxed">Top-ranked participants will be recognized on a national stage in front of government leaders, investors, and innovation experts.</p>
                  <Link to="/college-ranking-application" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-teal-900/40 transition hover:opacity-90">
                    🚀 Secure Your Spot Now
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Who Will Be There</div>
                  {[
                    { icon: '🏛️', label: 'Government Guests', desc: 'Senior officials & policymakers' },
                    { icon: '💰', label: 'Investors', desc: 'Angel investors & VCs' },
                    { icon: '🚀', label: 'Startup Leaders', desc: 'Founders & ecosystem builders' },
                    { icon: '💡', label: 'Innovators', desc: 'Top student & institutional innovators' },
                  ].map((g) => (
                    <div key={g.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm hover:bg-white/10 transition">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-xl">{g.icon}</div>
                      <div>
                        <div className="text-sm font-bold text-white">{g.label}</div>
                        <div className="text-xs text-teal-300">{g.desc}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* bottom strip */}
              <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm font-bold text-teal-300">High prestige + national visibility</p>
                <div className="flex flex-wrap gap-2">
                  {['Live Coverage', 'Media Partners', '50+ Press Releases'].map((t) => (
                    <span key={t} className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300">{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── URGENCY + FINAL CTA ── */}
      <section className="py-28 bg-gradient-to-br from-[#0b2d2d] to-[#0d4a4a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-teal-400/15 blur-[120px]" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> Limited Applications
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl shadow-xl backdrop-blur-sm">🚀</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight">Be Recognized Among<br />India's Top Innovators.</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/60 text-lg">To maintain quality and credibility, limited applications will be accepted. Apply early to secure your position.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/college-ranking-application" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-teal-700 shadow-xl transition hover:bg-teal-50">
              🚀 Apply for National Ranking 2026 Now
            </Link>
            <a href="mailto:enquiry@edcindia.in?subject=Connect%20with%20EDC%20for%20Ranking" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Connect with EDC
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-10 text-sm text-white/30 italic">"Innovation is not what you claim. It's what you build."</motion.p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
