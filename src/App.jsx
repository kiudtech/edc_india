import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import JoinPage from './pages/JoinPage'
import PaymentPage from './pages/PaymentPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import IdeaValidationPage from './pages/IdeaValidationPage'
import CollegeApplicationPage from './pages/CollegeApplicationPage'

const offerings = [
  { title: 'Entrepreneurship Courses', desc: 'Industry-aligned courses to build real-world startup skills.', icon: '🎓' },
  { title: 'Startup Mentorship', desc: 'One-on-one guidance from experienced founders and industry leaders.', icon: '🧭' },
  { title: 'Global Exposure', desc: 'International startup visits, demo days, and exchange programs.', icon: '🌍' },
  { title: 'Investor & Funding Access', desc: 'Direct connections to angel investors, VCs, and funding opportunities.', icon: '💰' },
  { title: 'Grant Support', desc: 'Assistance in securing government and private grants.', icon: '📋' },
  { title: 'College Incubation', desc: 'Partnering with institutions to build on-campus startup ecosystems.', icon: '🏛️' },
]
const timeline = [
  { year: '2018', title: 'Idea to Impact', text: "Building India's next generation of founders." },
  { year: '2020', title: 'National Partnerships', text: 'Collaboration with leading institutions.' },
  { year: '2022', title: 'Global Launch', text: 'International exposure and cross-border mentorship.' },
  { year: '2024', title: 'Scale & Growth', text: 'Funding readiness and global market access.' },
]
const courseTabs = [
  {
    name: 'Startup Launch Program',
    description: 'Validate ideas, build MVPs, and launch market-ready startups with expert guidance.',
    topics: ['Problem validation', 'MVP planning', 'Go-to-market'],
  },
  {
    name: 'Business Scaling',
    description: 'Scale sustainably with growth frameworks, operations, and leadership support.',
    topics: ['Growth systems', 'Unit economics', 'Team building'],
  },
  {
    name: 'Pitch Training',
    description: 'Craft compelling narratives and practice with investor-grade pitch simulations.',
    topics: ['Storytelling', 'Pitch decks', 'Demo rehearsals'],
  },
  {
    name: 'Funding Readiness',
    description: 'Get investor-ready with financial models, traction plans, and legal preparedness.',
    topics: ['Fundraising strategy', 'Metrics', 'Legal setup'],
  },
  {
    name: 'Global Market Entry',
    description: 'Prepare for international markets with regulatory, cultural, and partner insights.',
    topics: ['Market research', 'Compliance', 'Global partnerships'],
  },
]
const logos = ['IITs', 'NITs', 'IIMs', 'Global Uni', 'Innovation Hub', 'Tech Park', 'Startup Inc']
const fundingSteps = [
  { step: 'Investor Network', text: 'Curated access to angel and VC communities.', icon: '🤝' },
  { step: 'Grant Assistance', text: 'Support to secure government and private grants.', icon: '📑' },
  { step: 'Seed Funding', text: 'Early-stage capital readiness and connects.', icon: '🌱' },
  { step: 'Pitch Deck Support', text: 'Investor-ready materials and coaching.', icon: '📊' },
  { step: 'Startup Evaluation', text: 'Data-driven assessment for funding fit.', icon: '✅' },
]
const galleryItems = [
  'Demo Day Spotlight',
  'Global Expo',
  'Founder Journey',
  'Pitch Arena',
  'Campus Incubation',
  'Mentorship Labs',
  'Investor Connect',
  'Market Immersion',
  'Prototype Showcase',
]

const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, AgriPulse',
    text: 'The mentorship and funding roadmap accelerated our product from pilot to scale.',
    initials: 'AM',
  },
  {
    name: 'Dr. Kavya Nair',
    role: 'Director, Institute Partner',
    text: "EDC India's programs have transformed entrepreneurial readiness on campus.",
    initials: 'KN',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Angel Investor',
    text: 'A high-quality pipeline of founders who are investor ready and globally aware.',
    initials: 'RK',
  },
]
const impactStats = [
  { label: 'Startups Supported', value: 420, icon: '🚀' },
  { label: 'Funding Raised (Cr)', value: 180, icon: '💰' },
  { label: 'College Partnerships', value: 90, icon: '🏛️' },
  { label: 'Global Programs', value: 38, icon: '🌍' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}
const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const MotionDiv = motion.div

const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 1400
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.floor(eased * value)
      setCount(start)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])
  return (
    <>
      <div className="mt-3 text-3xl font-bold text-primary">{count}+</div>
      <div className="mt-1 text-xs font-medium text-slate-600">{label}</div>
    </>
  )
}

const Lightbox = ({ item, onClose }) => {
  if (!item) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:max-w-3xl sm:p-8">
        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Startup Showcase</div>
        <div className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{item}</div>
        <div className="mt-4 h-40 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent sm:h-64" />
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(courseTabs[0])
  const [lightbox, setLightbox] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <MotionDiv
      className="min-h-screen bg-accent text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full object-contain bg-white" />
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </div>
          <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex lg:gap-8 lg:text-sm">
            {['Home', 'About', 'Programs', 'Courses', 'Plans', 'Partners', 'Impact', 'Contact'].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="nav-link transition hover:text-slate-900">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-xs font-semibold text-slate-600 transition hover:text-slate-900 sm:inline-flex lg:text-sm">Login</Link>
            <a href="#plans" className="hidden rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow sm:inline-flex lg:px-6 lg:py-2.5 lg:text-sm">Join Now</a>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold text-slate-600">
              {['Home', 'About', 'Programs', 'Courses', 'Plans', 'Partners', 'Impact', 'Contact'].map((label) => (
                <a key={label} href={`#${label.toLowerCase()}`} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>{label}</a>
              ))}
              <Link to="/login" className="rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <a href="#plans" onClick={() => setMobileMenuOpen(false)} className="mt-2 block w-full rounded-full bg-secondary px-5 py-2.5 text-center text-xs font-semibold text-white shadow-glow">Join Now</a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-white to-[#fff7f0]">
        <div className="blob-float absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="blob-float-reverse absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-orange-100/30 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-32 xl:max-w-6xl xl:py-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              India&apos;s Premier Startup Ecosystem
            </div>
            <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
              Empowering India&apos;s Next
              <br />
              Generation of{' '}
              <span className="text-shimmer bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 bg-clip-text text-transparent">Entrepreneurs</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg xl:text-xl xl:max-w-3xl">
              Courses, Funding, Global Exposure &amp; Startup Growth Ecosystem
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#plans" className="cta-pulse group rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:shadow-xl hover:shadow-blue-200/80 lg:px-8 lg:py-4 lg:text-base">
                Join Now <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
              </a>
              <a href="#programs" className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:shadow-md lg:px-8 lg:py-4 lg:text-base">
                Explore Programs
              </a>
            </div>
          </motion.div>
          <motion.div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4 xl:max-w-4xl xl:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
            {[
              { value: '500+', label: 'Startups', icon: '🚀' },
              { value: '₹50Cr+', label: 'Funding Raised', icon: '💰' },
              { value: '100+', label: 'Partners', icon: '🤝' },
              { value: '25+', label: 'Countries', icon: '🌏' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="card-hover-glow rounded-2xl border border-slate-100 bg-white/80 p-4 text-center shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1">
                <div className="text-lg">{stat.icon}</div>
                <div className="mt-1 text-xl font-bold text-primary sm:text-2xl xl:text-3xl">{stat.value}</div>
                <div className="mt-0.5 text-[11px] font-medium text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div className="grid gap-10 lg:grid-cols-2" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">About EDC India</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Empowering Startups Across India</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              EDC India nurtures entrepreneurial talent through structured programs, global exposure,
              and a trusted funding ecosystem. We enable founders to launch, scale, and compete globally.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Vision for Startup India', icon: '🎯' },
                { title: 'Global Entrepreneurship Focus', icon: '🌍' },
                { title: 'Trusted Corporate Network', icon: '🤝' },
                { title: 'Premium Talent Pipeline', icon: '⭐' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <div className="text-sm font-bold text-slate-800">{item.title}</div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Building a high-impact entrepreneurship and innovation ecosystem.</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Growth Timeline</div>
            <div className="mt-6 space-y-6">
              {timeline.map((item, index) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    {index !== timeline.length - 1 && <div className="h-full w-px bg-slate-200" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary">{item.year}</div>
                    <div className="text-sm font-bold text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ PROGRAMS ═══════════════ */}
      <section id="programs" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Our Core Offerings</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Everything Your Startup Needs</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">End-to-end ecosystem support to take your idea from concept to global scale.</p>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {offerings.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="animated-border group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50"
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{item.icon}</div>
                <div className="mt-4 text-sm font-bold text-slate-800">{item.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-slate-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ COURSES ═══════════════ */}
      <section id="courses" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Courses</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Entrepreneurship Learning Tracks</h2>
            <p className="mt-4 text-sm text-slate-600">Modular tracks built to guide founders from ideation to global expansion.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {courseTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${activeTab.name === tab.name ? 'bg-primary text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="animated-border rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="text-lg font-bold text-slate-800">{activeTab.name}</div>
            <p className="mt-3 text-sm text-slate-600">{activeTab.description}</p>
            <div className="mt-6 space-y-3">
              {activeTab.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {topic}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ PARTNERS ═══════════════ */}
      <section id="partners" className="bg-[#fafbfe] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">College Tie-Ups</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Trusted by Leading Institutions</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">Partnering with top universities and incubation hubs across India.</p>
          </motion.div>
          <div className="mt-10">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 1600 }}
              loop
              className="py-4"
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 5, spaceBetween: 28 },
              }}
            >
              {logos.map((logo) => (
                <SwiperSlide key={logo}>
                  <div className="flex h-20 items-center justify-center rounded-xl border border-slate-100 bg-white text-sm font-semibold text-slate-600 shadow-sm transition hover:shadow-md">
                    {logo}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '120+', label: 'Partner Hubs' },
              { value: '27', label: 'States Covered' },
              { value: '45K+', label: 'Student Reach' },
              { value: '300+', label: 'Innovation Labs' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                <div className="text-xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INSTITUTIONAL PRESENCE ═══════════════ */}
      <section className="overflow-hidden bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Our Presence</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Our Institutional Presence</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">Empowering entrepreneurship across leading institutions nationwide.</p>
          </motion.div>
        </div>
        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee-track">
            <div className="marquee-inner">
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="flex shrink-0 items-center gap-8">
                  {['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','10.png','11.png','12.png','13.png','14.png','15.png','16.png','17.png','18.png','19.png','20.png','21.png','22.jpg','23.png','24.png','25.png'].map((file) => (
                    <div key={`${setIdx}-${file}`} className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:h-24 sm:w-44">
                      <img src={`/insti/${file}`} alt="Institution" className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FUNDING ═══════════════ */}
      <section id="funding" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Funding Support</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Your Path to Funding</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">A structured approach to make your startup investor-ready.</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {fundingSteps.map((step, index) => (
              <div key={step.step} className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">{step.icon}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">Step {index + 1}</div>
                <div className="mt-2 text-sm font-bold text-slate-800">{step.step}</div>
                <div className="mt-1 text-xs text-slate-500">{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="bg-[#fafbfe] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Showcase</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Stories That Inspire</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">A glimpse into the journeys of founders, demo days, and global events.</p>
          </motion.div>
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, index) => (
              <button
                key={item}
                onClick={() => setLightbox(item)}
                className="mb-5 w-full break-inside-avoid rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50"
              >
                <img
                  src={`/stories/${item}.png`}
                  alt={`${item} visual`}
                  className="h-36 w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="mt-3 text-sm font-bold text-slate-800">{item}</div>
                <div className="mt-1 text-xs text-slate-500">Success stories and founder journeys.</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPACT ═══════════════ */}
      <section id="impact" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Our Impact</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Numbers That Speak</h2>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {impactStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} whileHover={{ scale: 1.05, y: -4 }} className="card-hover-glow rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-lg hover:shadow-blue-100/50">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">{stat.icon}</div>
                <Counter value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" className="bg-[#fafbfe] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Testimonials</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Trusted by Founders & Investors</h2>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {testimonials.map((item) => (
              <motion.div key={item.name} variants={staggerItem} whileHover={{ y: -4 }} className="animated-border rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-blue-100/50">
                <div className="text-3xl text-blue-200">&ldquo;</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{item.initials}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Get Started</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Applications & Partnerships</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">Ready to join the ecosystem? Fill out the relevant form below.</p>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { title: 'Startup Application', cta: 'Apply Now', icon: '🚀' },
              { title: 'Investor Interest', cta: 'Join as Investor', icon: '💼' },
              { title: 'College Partnership', cta: 'Partner With Us', icon: '🏛️' },
              { title: 'Newsletter', cta: 'Subscribe', icon: '📩' },
            ].map((form) => (
              <motion.form key={form.title} variants={staggerItem} whileHover={{ y: -2 }} className="animated-border rounded-2xl border border-slate-100 bg-[#fafbfe] p-6 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{form.icon}</span>
                  <div className="text-sm font-bold text-slate-800">{form.title}</div>
                </div>
                <div className="mt-4 grid gap-3">
                  <input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" placeholder="Full Name" />
                  <input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" placeholder="Email Address" />
                  <input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" placeholder="Organization / Startup" />
                </div>
                <button className="mt-4 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  {form.cta}
                </button>
              </motion.form>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PLANS ═══════════════ */}
      <section id="plans" className="bg-[#fafbfe] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 xl:max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Membership Plans</div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Choose Your Plan</h2>
            <p className="mt-3 text-sm text-slate-500">Two pathways to grow your startup with EDC India</p>
          </motion.div>
          <motion.div className="mt-10 grid gap-6 sm:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={staggerItem} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" whileHover={{ scale: 1.02 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">Most Popular</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Startup Membership</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">₹2,500</span>
                <span className="text-xs text-slate-500">one-time</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">Full access to the EDC India startup ecosystem, mentorship, events, grants, and funding opportunities.</p>
              <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                {['Unique Founder ID (BUB-XXXX)', 'Access to Events & Workshops', 'Grant & Funding Directory', 'Investor Network Access', 'Community & Announcements', 'Course Enrollment', 'Dedicated Support Tickets'].map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span>{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/join')} className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-700">
                Join Now — ₹2,500
              </button>
            </motion.div>
            <motion.div variants={staggerItem} className="relative rounded-2xl border-2 border-purple-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" whileHover={{ scale: 1.02 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-[10px] font-semibold text-purple-600">Expert Review</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Idea Validation</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-purple-600">₹5,000</span>
                <span className="text-xs text-slate-500">one-time</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">Get your startup idea validated by experts, receive feedback, certification, and a member account.</p>
              <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                {['Expert Idea Review & Feedback', 'Validation Certificate', 'Auto Member Account + Founder ID', 'Access to Full Ecosystem', 'Priority Admin Review', 'Startup Stage Assessment', 'Innovation Report'].map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="mt-0.5 text-purple-500">✓</span>{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/join-validation')} className="mt-6 w-full rounded-full bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200/50 transition hover:bg-purple-700">
                Join Now — ₹5,000
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="bg-gradient-to-r from-primary to-[#0a347d] py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Build Your Startup With The Right Ecosystem</h2>
              <p className="mt-2 text-sm text-white/70">Join 500+ startups already growing with EDC India.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <a href="#plans" className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-primary shadow-lg transition hover:shadow-xl">
                Join Now
              </a>
              <button className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-[#071f4d] to-[#040e24] text-white">
        {/* Main Footer */}
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="EDC India" className="h-20 w-20 rounded-full bg-white p-1 object-contain shadow-lg shadow-blue-900/40" />
                <div>
                  <div className="text-lg font-bold leading-tight">Entrepreneurial<br />Development Council</div>
                  <div className="mt-0.5 text-xs font-semibold tracking-widest text-blue-300">EDC INDIA</div>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
                Empowering India&apos;s next generation of entrepreneurs through curated programs, funding access, and global startup exposure.
              </p>
              {/* Social */}
              <div className="mt-6 flex gap-3">
                {[
                  { name: 'LinkedIn', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { name: 'Instagram', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                  { name: 'YouTube', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                  { name: 'Twitter', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                ].map((social) => (
                  <a key={social.name} href="#" aria-label={social.name} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-blue-400 hover:bg-blue-500/20 hover:text-white">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <div className="text-sm font-bold uppercase tracking-wider text-blue-300">Quick Links</div>
              <div className="mt-4 space-y-3">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'About Us', href: '#about' },
                  { label: 'Programs', href: '#programs' },
                  { label: 'Courses', href: '#courses' },
                  { label: 'Plans & Pricing', href: '#plans' },
                  { label: 'Impact', href: '#impact' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                    <span className="h-1 w-1 rounded-full bg-blue-400 opacity-0 transition group-hover:opacity-100" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div className="lg:col-span-2">
              <div className="text-sm font-bold uppercase tracking-wider text-blue-300">Our Programs</div>
              <div className="mt-4 space-y-3">
                {[
                  'Startup Membership',
                  'Idea Validation',
                  'Funding & Grants',
                  'Global Exposure',
                  'College Ranking',
                  'Mentorship',
                ].map((item) => (
                  <div key={item} className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white cursor-pointer">
                    <span className="h-1 w-1 rounded-full bg-blue-400 opacity-0 transition group-hover:opacity-100" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Address */}
            <div className="lg:col-span-4">
              <div className="text-sm font-bold uppercase tracking-wider text-blue-300">Contact Us</div>
              <div className="mt-4 space-y-4">
                {/* Address */}
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div className="text-sm leading-relaxed text-white/60">
                    Office No. 1026, Floor No. 10,<br />
                    Gaur City Mall, Noida Extension,<br />
                    Gautam Buddha Nagar – 201306,<br />
                    Uttar Pradesh
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <a href="mailto:enquiry@edcindia.in" className="text-sm text-white/60 transition hover:text-white">enquiry@edcindia.in</a>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <a href="tel:+919792830382" className="text-sm text-white/60 transition hover:text-white">+91 9792830382</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
            <div className="text-center text-xs text-white/40 sm:text-left">
              © {new Date().getFullYear()} Entrepreneurial Development Council India (EDC INDIA). All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="transition hover:text-white">Privacy Policy</a>
              <a href="#" className="transition hover:text-white">Terms of Service</a>
              <a href="#" className="transition hover:text-white">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </MotionDiv>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join-validation" element={<IdeaValidationPage />} />
          <Route path="/college-apply" element={<CollegeApplicationPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
