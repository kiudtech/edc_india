import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const differentiators = [
  { icon: '⚡', title: '30% Learning + 70% Execution', desc: 'Real projects, not just theory' },
  { icon: '🏗️', title: 'Real Projects', desc: 'Build actual things, not assignments' },
  { icon: '🤝', title: 'Industry & Startup Exposure', desc: 'Direct access to real startup world' },
  { icon: '🧠', title: 'Mentorship from Real Experts', desc: 'Learn from founders & industry leaders' },
  { icon: '💰', title: 'Funding & Career Opportunities', desc: 'Seed funding, grants & job support' },
];

const benefits = [
  { n: '01', icon: '🎓', title: 'Earn the Title of EDC Fellow', bg: 'bg-violet-500' },
  { n: '02', icon: '💼', title: '100% Job Support', bg: 'bg-purple-600' },
  { n: '03', icon: '🚀', title: 'Complete Startup Support', bg: 'bg-blue-500' },
  { n: '04', icon: '💸', title: 'Funding Support (Seed + Growth)', bg: 'bg-emerald-500' },
  { n: '05', icon: '⚖️', title: 'Company Registration & Legal Support', bg: 'bg-slate-600' },
  { n: '06', icon: '🌍', title: 'International Exposure Opportunity', bg: 'bg-cyan-500' },
  { n: '07', icon: '🗺️', title: 'India Tour (4 States for Selected Students)', bg: 'bg-indigo-500' },
  { n: '08', icon: '🎤', title: 'Real Expert Sessions', bg: 'bg-rose-500' },
  { n: '09', icon: '🤝', title: 'Networking with Founders & Investors', bg: 'bg-amber-500' },
  { n: '10', icon: '✨', title: 'And Many More Opportunities', bg: 'bg-orange-500' },
];

const curriculum = [
  { months: 'Month 1–2', phase: 'Foundation & Clarity', icon: '🧭', topics: ['Career Clarity', 'Personal Branding', 'Basics of Business & Startups', 'Communication Skills'] },
  { months: 'Month 3–4', phase: 'Skill Building', icon: '🛠️', topics: ['Sales & Marketing', 'Digital Skills', 'Content & Social Media', 'Networking Skills'] },
  { months: 'Month 5–6', phase: 'Execution Phase', icon: '⚡', topics: ['Real Project Building', 'Market Research', 'Customer Interaction', 'Validation'] },
  { months: 'Month 7–8', phase: 'Startup & Career Path', icon: '🚀', topics: ['Startup Building Basics', 'Job Readiness Training', 'Resume + Interview Prep', 'Industry Exposure'] },
  { months: 'Month 9–10', phase: 'Growth Phase', icon: '📈', topics: ['Advanced Sales', 'Scaling Strategies', 'Leadership Skills', 'Team Building'] },
  { months: 'Month 11–12', phase: 'Final Output', icon: '🏅', topics: ['Startup Launch / Job Placement', 'Demo Day / Pitching', 'Investor Interaction', 'Final Evaluation'] },
];

const whoShouldApply = ['12th Pass Students', 'College Students', 'Freshers', 'Aspiring Entrepreneurs', 'Anyone who wants career growth'];

const mentorProfiles = [
  { name: 'Rajesh Ranjan', image: '/mentors/rajesh-ranjan.jpg', linkedin: 'https://www.linkedin.com/in/rraajjeesshhr/' },
  { name: 'Sushant Dass', image: '/mentors/shushant-dass.jpg', linkedin: 'https://www.linkedin.com/in/sushant-dass-30760422/' },
  { name: 'Ritika Mahajan', image: '/mentors/ritika-mahajan.jpg', linkedin: 'https://www.linkedin.com/in/ritika-mahajan-8b6996285/' },
  { name: 'Gautam Jha', image: '/mentors/gautam-jha.jpg', linkedin: 'https://www.linkedin.com/in/gautaam-jhha/' },
  { name: 'Saurav Kumar', image: '/mentors/saurav-kumar.jpg', linkedin: 'https://www.linkedin.com/in/saurav-kumar-912206a8/' },
  { name: 'Dr. Shweta Singh', image: '/mentors/shweta-singh.jpg', linkedin: 'https://www.linkedin.com/in/dr-shweta-singh/' },
  { name: 'Kumar Sourabh', image: '/mentors/kumar-saurabh.jpg', linkedin: 'https://www.linkedin.com/in/kumarsaurabh08/' },
  { name: 'Satyendra Singh', image: '/mentors/satyendra-kumar.jpg', linkedin: 'https://www.linkedin.com/in/satyendra-kumar-singh-business-mentor-career-strategist-55b2b97/' },
  { name: 'Adv Vipul Kumar', image: '/mentors/vipul-kumar.jpg', linkedin: 'https://www.linkedin.com/in/lawyervipul/' },
  { name: 'Vritika Arora', image: '/mentors/vritika-arora.jpg', linkedin: 'https://www.linkedin.com/in/vritika-arora-83a967a3/' },
];

const mentorLookup = Object.fromEntries(mentorProfiles.map((m) => [m.name, m]));
const mentorShowcase = [
  'Ritika Mahajan','Rajesh Ranjan','Sushant Dass','Gautam Jha',
  'Dr. Shweta Singh','Saurav Kumar','Kumar Sourabh','Satyendra Singh',
  'Vritika Arora','Adv Vipul Kumar',
].map((name, i) => ({ id: `${i}-${name}`, ...mentorLookup[name] }));

export default function FellowshipPage() {
  const mentorTrackRef = useRef(null);
  const mentorCardStep = 236;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = 'smooth';
    body.style.scrollBehavior = 'smooth';

    return () => {
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    };
  }, []);

  const scrollMentors = (dir) => {
    const track = mentorTrackRef.current;
    if (!track) return;
    const loopPoint = track.scrollWidth / 2;
    let next = track.scrollLeft + (dir === 'left' ? -mentorCardStep : mentorCardStep);
    if (next < 0) next = Math.max(loopPoint - mentorCardStep, 0);
    if (next >= loopPoint) next = 0;
    track.scrollTo({ left: next, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = mentorTrackRef.current;
    if (!track) return undefined;
    const id = window.setInterval(() => {
      const t = mentorTrackRef.current;
      if (!t) return;
      const loopPoint = t.scrollWidth / 2;
      const next = t.scrollLeft + mentorCardStep;
      if (next >= loopPoint) { t.scrollTo({ left: 0, behavior: 'auto' }); return; }
      t.scrollTo({ left: next, behavior: 'smooth' });
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">

      {/* ── HERO ── */}
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
              India's First Startup<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">Fellowship Program <br/>(12 Months)</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Build Skills. Launch Your Career. Start Your Venture.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cyan-200 font-medium">
              <span>✔ Open for any student (12th pass and above)</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>✔ No need to quit your college</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-2 text-xs font-bold text-orange-300">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> 🎯 Limited Seats | High Selection Standards
              </span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/fellowship-application" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-800 shadow-2xl transition hover:bg-blue-50">
                🚀 Apply Now — ₹10,000
              </Link>
              <a href="tel:+919792830382" className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Call
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[['12 Months', 'Duration'], ['Weekend', 'Sat & Sun Classes'], ['70%', 'Execution Focus']].map(([v, l]) => (
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

      {/* ── WHY JOIN ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Why Join
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Not Just a Program —<br />A Life Upgrade Opportunity</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">Whether you want a job, start a business, or build skills — this fellowship is designed for YOU.</p>
              <div className="mt-7 space-y-3">
                {['No startup required to join', 'No prior experience needed', 'Works alongside your college'].map((t) => (
                  <div key={t} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">✓</div>
                    <span className="font-semibold text-blue-900 text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border-l-4 border-cyan-500 bg-cyan-50 px-6 py-4">
                <p className="font-semibold text-cyan-800 text-sm leading-relaxed">Even if you are confused about your career — this program gives you clarity + direction + execution power.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 blur-3xl opacity-40" />
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b] p-8 text-white shadow-2xl">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl mb-5">🎓</div>
                  <h3 className="text-2xl font-extrabold">EDC Fellowship</h3>
                  <p className="mt-3 text-blue-200 text-sm leading-relaxed">A 1-year execution-driven program to help you understand business, build real skills, and gain real-world exposure.</p>
                  <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
                    {[['Duration', '12 Months'], ['Schedule', 'Weekend (Sat & Sun)'], ['Model', '30% Learn + 70% Execute'], ['Fee (with scholarship)', '₹10,000']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-white/50">{k}</span>
                        <span className="font-bold text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/fellowship-application" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-blue-800 transition hover:bg-blue-50 shadow-lg">
                    Apply Now →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT MAKES IT DIFFERENT ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-200 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" /> What Makes This Different
            </div>
            <h2 className="text-4xl font-extrabold text-white">You Don't Just Learn —<br />You Build, Execute, and Grow</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {differentiators.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, scale: 1.02 }} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition hover:bg-white/10 hover:border-white/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-bold text-white text-sm">{item.title}</div>
                <div className="mt-1 text-xs text-blue-200 leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-white"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      {/* ── FELLOWSHIP BENEFITS ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Fellowship Benefits
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">During &amp; After Fellowship</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">Everything you gain from being an EDC Fellow — during the program and beyond.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl hover:border-slate-200">
                {/* subtle glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-slate-50 to-blue-50/60" />
                <div className="relative z-10">
                  {/* app-style icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${b.bg} text-2xl shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                    {b.icon}
                  </div>
                  {/* number */}
                  <div className="text-[10px] font-extrabold text-slate-400 tracking-widest mb-1.5">{b.n}</div>
                  {/* title */}
                  <div className="text-sm font-bold text-slate-800 leading-snug">{b.title}</div>
                </div>
                {/* bottom accent line on hover */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${b.bg}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FUNDING & REWARDS ── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> Funding & Rewards
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Real Money. Real Opportunities.</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: '💸', value: '₹1,00,000', label: 'Grant to Top 100 Fellows', color: 'from-blue-600 to-indigo-600' },
              { icon: '🚀', value: '₹50 Lakhs', label: 'Seed Funding (Selected Fellows)', color: 'from-cyan-600 to-blue-600' },
              { icon: '📈', value: '₹5 Crore', label: 'Debt/Equity Funding Opportunity', color: 'from-indigo-600 to-purple-600' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b] p-8 text-white shadow-xl">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <div className="text-3xl font-extrabold text-white">{item.value}</div>
                  <div className="mt-2 text-sm text-blue-200">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* International Exposure */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 relative overflow-hidden rounded-3xl border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-8">
            <div className="absolute top-4 right-4 text-5xl opacity-10">✈️</div>
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 border border-cyan-200 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-700 mb-4">🌍 International Exposure</div>
                <h3 className="text-2xl font-extrabold text-slate-900">Top 30 Fellows Get International Trip</h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">Selected top performers get a fully-supported 5-day international exposure program.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {[['✈️', '5 Days', 'International Program'], ['📍', 'Singapore', 'or Dubai (Any One)'], ['🏆', 'Top 30', 'Fellows Selected']].map(([icon, val, lbl]) => (
                  <div key={lbl} className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-white px-5 py-4 shadow-sm">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-extrabold text-slate-900">{val}</div>
                      <div className="text-xs text-slate-500">{lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 12-MONTH CURRICULUM ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-200 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" /> 12-Month Program Structure
            </div>
            <h2 className="text-4xl font-extrabold text-white">Weekend Classes (Sat &amp; Sun)</h2>
            <p className="mt-4 text-blue-200 max-w-lg mx-auto">Flexible with your college schedule — no need to quit or pause your studies.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((c, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition hover:bg-white/10 hover:border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl group-hover:scale-110 transition-transform">{c.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{c.months}</div>
                    <div className="font-extrabold text-white text-sm">{c.phase}</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-4 border-t border-white/10">
                  {c.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-blue-200">
                      <div className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />{t}
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

      {/* ── SELECTION PROCESS ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Selection Process
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">We Select Only Serious &amp; High-Potential Students</h2>
            <p className="mt-4 text-slate-500">Only 2 out of 10 applicants get selected.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 sm:grid-cols-3 mb-10">
            {[
              { icon: '📝', n: '01', label: 'Registration Required' },
              { icon: '🔬', n: '02', label: 'Screening & Evaluation' },
              { icon: '🏅', n: '03', label: 'Only 2/10 Get Selected' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center group">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#0f2d6b] shadow-xl shadow-blue-100 group-hover:shadow-blue-300/40 transition-shadow">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-blue-200 text-xs font-extrabold text-blue-700 shadow">{s.n}</div>
                </div>
                <div className="mt-4 font-bold text-slate-800 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl border border-cyan-100 bg-cyan-50 px-6 py-5 text-center">
            <p className="text-sm font-semibold text-cyan-800">⭐ Recommendation = Direct Selection Advantage — From Incubation Centers, Universities, or EDC Members</p>
          </motion.div>
        </div>
      </section>

      {/* ── FEES & SCHOLARSHIP ── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Fees & Scholarship
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Limited Seats — First Come, First Selection</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2">
            {/* With Scholarship */}
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b] p-8 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />
              <div className="absolute top-4 right-4 rounded-full bg-green-400/20 border border-green-400/30 px-3 py-1 text-xs font-bold text-green-300">RECOMMENDED</div>
              <div className="relative z-10">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="text-xl font-extrabold">With Scholarship</h3>
                <div className="mt-5 space-y-3">
                  <div className="flex justify-between text-sm border-b border-white/10 pb-3">
                    <span className="text-white/60">Apply Before</span>
                    <span className="font-bold text-cyan-300">📅 20 May</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Fellowship Fee</span>
                    <span className="text-3xl font-extrabold text-white">₹10,000</span>
                  </div>
                </div>
                <Link to="/fellowship-application" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-bold text-blue-800 transition hover:bg-blue-50 shadow-lg">
                  Apply with Scholarship →
                </Link>
              </div>
            </motion.div>
            {/* Without Scholarship */}
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-extrabold text-slate-900">Without Scholarship</h3>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Apply Before</span>
                  <span className="font-bold text-slate-700">📅 21 June</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Fellowship Fee</span>
                  <span className="text-3xl font-extrabold text-slate-900">₹25,000</span>
                </div>
              </div>
              <Link to="/fellowship-application" className="mt-6 block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:opacity-90">
                Apply Now →
              </Link>
            </motion.div>
          </motion.div>

          {/* Refund Policy */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 relative overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">🔁</div>
              <div>
                <div className="font-extrabold text-slate-900 mb-1">Refund Policy — Zero Risk</div>
                <p className="text-sm text-slate-600 leading-relaxed">Registration fee is required to apply. <strong>If selected</strong> → Continue program. <strong>If NOT selected</strong> → Full refund within 7 working days. This ensures only serious applicants apply.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO SHOULD APPLY ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-14 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Who Should Apply
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">No Restriction.<br />No Prior Experience Needed.</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">This fellowship is open to anyone with the drive to grow — regardless of background, stream, or experience.</p>
              <div className="mt-7 space-y-3">
                {whoShouldApply.map((t) => (
                  <div key={t} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">✓</div>
                    <span className="font-semibold text-blue-900 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />
              <div className="relative z-10">
                <div className="text-4xl mb-5">🏆</div>
                <h3 className="text-xl font-extrabold">What You Will Become</h3>
                <div className="mt-5 space-y-3">
                  {['Confident communicator', 'Problem solver', 'Business & sales thinker', 'Investor-ready founder', 'Globally exposed entrepreneur'].map((t) => (
                    <div key={t} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 text-xs">✓</div>{t}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm font-bold text-cyan-300">This is not just learning — this is transformation.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MENTORS ── */}
      {/* <section className="overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Mentor Network
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Learn from Real Experts</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">Mentorship from founders, industry leaders, and domain experts who've built real things.</p>
          </motion.div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-2 z-20 flex items-center">
            <button type="button" aria-label="Scroll left" onClick={() => scrollMentors('left')} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:border-slate-300 hover:text-slate-900">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 z-20 flex items-center">
            <button type="button" aria-label="Scroll right" onClick={() => scrollMentors('right')} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:border-slate-300 hover:text-slate-900">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-slate-50/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-slate-50/80 to-transparent" />
          <div ref={mentorTrackRef} className="flex gap-4 overflow-x-auto px-2 pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[...mentorShowcase, ...mentorShowcase].map((mentor, idx) => (
              <article key={`${mentor.id}-${idx}`} className="w-[220px] shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="h-52 w-full overflow-hidden bg-slate-100">
                  <img src={mentor.image} alt={mentor.name} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Fellowship Mentor</p>
                  <a href={mentor.linkedin} target="_blank" rel="noreferrer noopener" className="mt-3 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-900">View LinkedIn →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}
          {/* ── MENTORS ── */}
      <section className="overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 py-28 relative">
        <style>{`
          @keyframes flowLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .row-left { animation: flowLeft 45s linear infinite; }
          .marquee-zone:hover .row-left { animation-play-state: paused; }
          .li-card {
            --mx: 0.5; --my: 0.5; --on: 0; --deg: 135deg;
          }
          .li-card .spot {
            background: radial-gradient(
              350px circle at calc(var(--mx)*100%) calc(var(--my)*100%),
              rgba(10,102,194,0.12), transparent 55%
            );
            opacity: var(--on);
            transition: opacity 0.35s;
          }
          .li-card .shimmer-line {
            background: linear-gradient(
              105deg, transparent 40%,
              rgba(255,255,255,0.2) 50%, transparent 60%
            );
            background-size: 250% 100%;
            background-position: 100% 0;
            transition: background-position 0s;
          }
          .li-card:hover .shimmer-line {
            background-position: -100% 0;
            transition: background-position 0.8s ease;
          }
        `}</style>

        <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 h-60 w-60 rounded-full bg-cyan-100/40 blur-[80px]" />

        {/* Heading */}
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> Mentor Network
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Learn from Real Experts</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">Mentorship from founders, industry leaders, and domain experts who've built real things.</p>
          </motion.div>
        </div>

        {/* Single Row Marquee */}
        <div className="marquee-zone relative">
          <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-36 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-30 h-full w-36 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/90 to-transparent" />

          <div className="row-left flex gap-6 w-max py-8 px-8">
            {[...mentorShowcase, ...mentorShowcase].map((mentor, idx) => {
              const handleMove = (e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                el.style.setProperty('--mx', px.toFixed(3));
                el.style.setProperty('--my', py.toFixed(3));
                el.style.setProperty('--on', '1');
                const inner = el.querySelector('.tilt');
                if (inner) {
                  inner.style.transition = 'transform 0.12s ease-out, box-shadow 0.3s';
                  inner.style.transform = `rotateX(${(0.5 - py) * 14}deg) rotateY(${(px - 0.5) * 14}deg) translateY(-12px) scale(1.02)`;
                  inner.style.boxShadow = '0 40px 70px -20px rgba(0,0,0,0.2), 0 16px 32px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(10,102,194,0.08)';
                }
                const img = el.querySelector('.pimg');
                if (img) {
                  img.style.transition = 'transform 0.15s ease-out';
                  img.style.transform = `scale(1.1) translate(${(px - 0.5) * -8}px, ${(py - 0.5) * -8}px)`;
                }
              };
              const handleLeave = (e) => {
                const el = e.currentTarget;
                el.style.setProperty('--on', '0');
                const inner = el.querySelector('.tilt');
                if (inner) {
                  inner.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.7s';
                  inner.style.transform = 'rotateX(0) rotateY(0) translateY(0) scale(1)';
                  inner.style.boxShadow = '';
                }
                const img = el.querySelector('.pimg');
                if (img) {
                  img.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1)';
                  img.style.transform = 'scale(1) translate(0,0)';
                }
              };

              return (
                <article
                  key={`li-${mentor.id}-${idx}`}
                  className="li-card group/c relative w-[280px] shrink-0 cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  <div
                    className="tilt relative rounded-xl bg-white overflow-hidden border border-slate-200/80"
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Cursor spotlight */}
                    <div className="spot absolute inset-0 z-20 pointer-events-none rounded-xl" />
                    {/* Shimmer */}
                    <div className="shimmer-line absolute inset-0 z-20 pointer-events-none rounded-xl" />

                    {/* ── LinkedIn Banner ── */}
                    <div className="relative h-[72px] bg-gradient-to-r from-[#0a66c2] via-[#0077b5] to-[#004182] overflow-hidden">
                      {/* Banner pattern */}
                      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 30%, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      {/* LinkedIn logo watermark */}
                      <div className="absolute top-3 right-3 opacity-20">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>

                    {/* ── Avatar Area ── */}
                    <div className="relative px-5">
                      <div className="relative -mt-[52px] mb-3">
                        <div className="relative inline-block">
                          {/* Avatar ring */}
                          <div className="absolute -inset-[3px] rounded-full bg-white" />
                          <div className="relative h-[100px] w-[100px] rounded-full overflow-hidden border-[4px] border-white shadow-md group-hover/c:shadow-lg group-hover/c:shadow-blue-200/40 transition-shadow duration-500">
                            <img
                              src={mentor.image}
                              alt={mentor.name}
                              loading="lazy"
                              className="pimg h-full w-full object-cover object-top"
                              style={{ willChange: 'transform' }}
                            />
                          </div>
                          {/* Online dot */}
                          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[2.5px] border-white bg-emerald-500 shadow-sm group-hover/c:animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* ── Profile Info ── */}
                    <div className="px-5 pb-2">
                      <h3 className="text-[17px] font-bold text-slate-900 leading-tight group-hover/c:text-[#0a66c2] transition-colors duration-300">
                        {mentor.name}
                      </h3>
                      <p className="mt-0.5 text-[13px] text-slate-500 leading-snug">
                        Fellowship Mentor at EDC India
                      </p>
                      {/* Location row */}
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        India
                        <span className="mx-1 text-slate-300">·</span>
                        <span className="text-[#0a66c2] font-semibold">500+ connections</span>
                      </div>
                    </div>

                    {/* ── Divider ── */}
                    <div className="mx-5 my-3 h-px bg-slate-100" />

                    {/* ── Skills / Tags ── */}
                    <div className="px-5 pb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {['Mentorship', 'Startup', 'Leadership'].map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-[#0a66c2] border border-blue-100/80 group-hover/c:bg-blue-100/80 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ── Action Buttons ── */}
                    <div className="px-5 pb-5 flex gap-2">
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0a66c2] py-2 text-[13px] font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#004182] hover:shadow-md hover:shadow-blue-200/40 group-hover/c:shadow-md group-hover/c:shadow-blue-200/30"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        Connect
                      </a>
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center justify-center rounded-full border-2 border-[#0a66c2] px-4 py-2 text-[13px] font-bold text-[#0a66c2] transition-all duration-300 hover:bg-blue-50 hover:border-[#004182] hover:text-[#004182]"
                      >
                        View
                      </a>
                    </div>

                    {/* Bottom blue accent */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover/c:w-full bg-gradient-to-r from-[#0a66c2] via-[#0077b5] to-[#00a0dc] transition-all duration-700 ease-out" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>




      {/* ── URGENCY + FINAL CTA ── */}
      <section className="py-28 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> Limited Seats · High Competition · Early Priority
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl shadow-xl backdrop-blur-sm">🎓</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight">This is Not Just a Course —<br />It's Your Career Turning Point.</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/60 text-lg">Limited seats available. High competition. Early applicants get priority.</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/fellowship-application" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-800 shadow-xl transition hover:bg-blue-50">
              🚀 Apply Now for EDC Fellowship
            </Link>
            <a href="mailto:enquiry@edcindia.in?subject=Fellowship%20Enquiry" className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Talk to Us
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-10 text-sm text-white/30 italic">"Degrees don't build careers. Skills and execution do."</motion.p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
