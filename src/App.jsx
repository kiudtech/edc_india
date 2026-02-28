import { useEffect, useMemo, useRef, useState } from 'react'
<<<<<<< HEAD
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom'
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom'
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import JoinPage from './pages/JoinPage'
import PaymentPage from './pages/PaymentPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
=======
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5

const heroIcons = [
  { icon: '🚀', top: '24%', left: '10%', tone: 'text-primary' },
  { icon: '📈', top: '34%', left: '78%', tone: 'text-primary' },
  { icon: '🎯', top: '62%', left: '12%', tone: 'text-secondary' },
  { icon: '👥', top: '68%', left: '86%', tone: 'text-secondary' },
]
const offerings = [
  'Entrepreneurship Courses',
  'Startup Mentorship Programs',
  'International Startup Exposure',
  'Investor & Funding Access',
  'Grant Support',
  'College Incubation Tie-Ups',
]
const timeline = [
  { year: '2018', title: 'Idea to Impact', text: 'Building India’s next generation of founders.' },
  { year: '2020', title: 'National Partnerships', text: 'Collaboration with leading institutions.' },
  { year: '2022', title: 'Global Launch', text: 'International exposure and cross-border mentorship.' },
  { year: '2024', title: 'Scale & Growth', text: 'Funding readiness and global market access.' },
]
const courseTabs = [
  {
    name: 'Startup Launch Program',
    description:
      'Validate ideas, build MVPs, and launch market-ready startups with expert guidance.',
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
  { step: 'Investor Network', text: 'Curated access to angel and VC communities.' },
  { step: 'Grant Assistance', text: 'Support to secure government and private grants.' },
  { step: 'Seed Funding', text: 'Early-stage capital readiness and connects.' },
  { step: 'Pitch Deck Support', text: 'Investor-ready materials and coaching.' },
  { step: 'Startup Evaluation System', text: 'Data-driven assessment for funding fit.' },
]
const globalExposure = [
  'International Startup Visits',
  'Global Demo Days',
  'Startup Exchange Programs',
  'Cross-border Mentorship',
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
const aiImages = [
  'https://image.pollinations.ai/prompt/ai%20generated%20startup%20team%20collaboration%20modern%20office%20premium%20lighting',
  'https://image.pollinations.ai/prompt/ai%20generated%20global%20demo%20day%20stage%20founder%20pitch%20cinematic',
  'https://image.pollinations.ai/prompt/ai%20generated%20innovation%20lab%20prototyping%20workshop%20clean%20aesthetic',
  'https://image.pollinations.ai/prompt/ai%20generated%20investor%20meeting%20boardroom%20startup%20funding%20premium',
  'https://image.pollinations.ai/prompt/ai%20generated%20college%20incubation%20hub%20students%20building%20startup',
  'https://image.pollinations.ai/prompt/ai%20generated%20global%20startup%20expo%20booth%20modern%20design',
]
const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, AgriPulse',
    text: 'The mentorship and funding roadmap accelerated our product from pilot to scale.',
  },
  {
    name: 'Dr. Kavya Nair',
    role: 'Director, Institute Partner',
    text: 'EDC India’s programs have transformed entrepreneurial readiness on campus.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Angel Investor',
    text: 'A high-quality pipeline of founders who are investor ready and globally aware.',
  },
]
const impactStats = [
  { label: 'Startups Supported', value: 420 },
  { label: 'Funding Raised', value: 180 },
  { label: 'College Partnerships', value: 90 },
  { label: 'Global Programs', value: 38 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
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
    <div className="rounded-3xl border border-secondary/40 bg-white/80 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="text-3xl font-semibold text-primary">{count}+</div>
      <div className="mt-2 text-sm font-medium text-slate-600">{label}</div>
    </div>
  )
}

const Lightbox = ({ item, onClose }) => {
  if (!item) return null
  return (
<<<<<<< HEAD
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:max-w-3xl sm:p-8">
        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Startup Showcase</div>
        <div className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{item}</div>
        <div className="mt-4 h-40 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent sm:h-64" />
=======
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Startup Showcase</div>
        <div className="mt-3 text-2xl font-semibold text-slate-900">{item}</div>
        <div className="mt-4 h-64 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent" />
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
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
<<<<<<< HEAD
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(courseTabs[0])
  const [lightbox, setLightbox] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
=======
  const [activeTab, setActiveTab] = useState(courseTabs[0])
  const [lightbox, setLightbox] = useState(null)
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
  const iconRefs = useRef([])

  useEffect(() => {
    iconRefs.current.forEach((el, index) => {
      if (!el) return
      gsap.to(el, {
        y: -18,
        duration: 3.5 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      })
    })
  }, [])

  const mapNodes = useMemo(
    () => [
      { top: '20%', left: '18%' },
      { top: '32%', left: '54%' },
      { top: '55%', left: '26%' },
      { top: '48%', left: '72%' },
      { top: '70%', left: '45%' },
    ],
    []
  )

  return (
    <MotionDiv
      className="min-h-screen bg-accent text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
<<<<<<< HEAD
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
=======
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 text-sm font-semibold text-white">
              E
            </div>
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </div>
          <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex">
            {['Home', 'About', 'Programs', 'Courses', 'Partners', 'Impact', 'Contact'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="transition hover:text-slate-900"
              >
                {label}
              </a>
            ))}
          </div>
<<<<<<< HEAD
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-xs font-semibold text-slate-600 transition hover:text-slate-900 sm:inline-flex">
              Login
            </Link>
            <button
              onClick={() => navigate('/join')}
              className="hidden rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow sm:inline-flex"
            >
              Join Now
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold text-slate-600">
              {['Home', 'About', 'Programs', 'Courses', 'Partners', 'Impact', 'Contact'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <Link to="/login" className="rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/join') }}
                className="mt-2 w-full rounded-full bg-secondary px-5 py-2.5 text-xs font-semibold text-white shadow-glow"
              >
                Join Now
              </button>
            </div>
          </div>
        )}
=======
          <button className="rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow">
            Apply Now
          </button>
        </div>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
      </nav>
      <section id="home" className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#fff1e8]" />
        {heroIcons.map((item, index) => (
          <div
            key={`${item.icon}-${index}`}
            ref={(el) => {
              iconRefs.current[index] = el
            }}
<<<<<<< HEAD
            className={`absolute hidden h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg sm:flex sm:h-12 sm:w-12 ${item.tone}`}
            style={{ top: item.top, left: item.left }}
          >
            <span className="text-lg sm:text-xl">{item.icon}</span>
          </div>
        ))}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
=======
            className={`absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg ${item.tone}`}
            style={{ top: item.top, left: item.left }}
          >
            <span className="text-xl">{item.icon}</span>
          </div>
        ))}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-[11px] font-semibold text-orange-600">
              India&apos;s Premier Startup Ecosystem
            </div>
<<<<<<< HEAD
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
=======
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
              <span className="block">Empowering India&apos;s</span>
              <span className="block">Next Generation of</span>
              <span className="block bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Entrepreneurs
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
              Courses, Funding, Global Exposure &amp; Startup Growth Ecosystem
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
<<<<<<< HEAD
              <button onClick={() => navigate('/join')} className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200">
                Join Now
              </button>
              <a href="#programs" className="rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600">
                Explore Programs
              </a>
            </div>
          </motion.div>
          <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-4">
=======
              <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200">
                Join Now
              </button>
              <button className="rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600">
                Explore Programs
              </button>
            </div>
          </motion.div>
          <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            {[
              { value: '500+', label: 'Startups' },
              { value: '₹50Cr+', label: 'Funding Raised' },
              { value: '100+', label: 'Partners' },
              { value: '25+', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-semibold text-blue-700 sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex h-10 w-6 items-center justify-center rounded-full border border-slate-200 bg-white">
            <div className="h-3 w-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section id="about" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
=======
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
        <motion.div
          className="grid gap-10 lg:grid-cols-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">About EDC India</div>
<<<<<<< HEAD
            <h2 className="section-title mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">
=======
            <h2 className="section-title mt-4 text-3xl font-semibold text-primary sm:text-4xl">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
              Mission-driven storytelling for a stronger Startup India
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              EDC India nurtures entrepreneurial talent through structured programs, global exposure,
              and a trusted funding ecosystem. We enable founders to launch, scale, and compete globally.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Vision for Startup India', 'Global Entrepreneurship Focus', 'Trusted Corporate Network', 'Premium Talent Pipeline'].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-secondary/40 bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div className="text-sm font-semibold text-slate-800">{item}</div>
                    <div className="mt-2 text-xs text-slate-500">
                      Building a high-impact entrepreneurship and innovation ecosystem.
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
<<<<<<< HEAD
          <div className="rounded-3xl border border-secondary/40 bg-white p-5 shadow-xl sm:p-8">
=======
          <div className="rounded-3xl border border-secondary/40 bg-white p-8 shadow-xl">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Growth Timeline</div>
            <div className="mt-6 space-y-6">
              {timeline.map((item, index) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    {index !== timeline.length - 1 && <div className="h-full w-px bg-slate-200" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">{item.year}</div>
                    <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      <section id="programs" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
=======
      <section id="programs" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Our Core Offerings</div>
<<<<<<< HEAD
            <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Premium ecosystem support</h2>
=======
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Premium ecosystem support</h2>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <motion.div
                key={item}
                className="group rounded-3xl border border-secondary/40 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-glow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm font-semibold text-slate-800">{item}</div>
                <div className="mt-3 text-xs text-slate-500">
                  Bespoke programs curated to accelerate startup performance.
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/10 via-secondary/30 to-primary/10 opacity-0 transition group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section id="courses" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
=======
      <section id="courses" className="mx-auto max-w-6xl px-6 py-20">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.1fr_1fr]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Courses</div>
<<<<<<< HEAD
            <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Entrepreneurship learning tracks</h2>
=======
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Entrepreneurship learning tracks</h2>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            <p className="mt-4 text-sm text-slate-600">
              Modular tracks built to guide founders from ideation to global expansion.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {courseTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    activeTab.name === tab.name
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
<<<<<<< HEAD
          <div className="rounded-3xl border border-secondary/40 bg-white p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-8">
=======
          <div className="rounded-3xl border border-secondary/40 bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-glow">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            <div className="text-lg font-semibold text-slate-800">{activeTab.name}</div>
            <p className="mt-3 text-sm text-slate-600">{activeTab.description}</p>
            <div className="mt-6 space-y-3">
              {activeTab.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      <section id="partners" className="bg-accent py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
=======
      <section id="partners" className="bg-accent py-20">
        <div className="mx-auto max-w-6xl px-6">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">College Tie-Ups</div>
<<<<<<< HEAD
            <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">University collaboration showcase</h2>
=======
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">University collaboration showcase</h2>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-secondary/40 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="text-sm font-semibold text-slate-800">Partner Logos Carousel</div>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 1600 }}
                  loop
                  className="mt-6 py-2"
                  slidesPerView={2}
                  spaceBetween={24}
                  breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 28 },
                  }}
                >
                  {logos.map((logo) => (
                    <SwiperSlide key={logo}>
                      <div className="group flex h-20 items-center justify-center rounded-2xl border border-secondary/40 bg-white text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-secondary/70 hover:shadow-glow">
                        {logo}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {['120+ partner hubs', '27 states', '45k student reach', '300+ labs'].map((stat) => (
                    <div
                      key={stat}
                      className="rounded-2xl border border-secondary/40 bg-accent p-4 text-xs font-semibold text-slate-600 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                    >
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
<<<<<<< HEAD
              <div className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-primary p-5 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-8">
                <div className="text-sm font-semibold text-white/80">Interactive World Map</div>
                <div className="mt-6 h-48 rounded-2xl bg-white/10 sm:h-64">
=======
              <div className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-primary p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="text-sm font-semibold text-white/80">Interactive World Map</div>
                <div className="mt-6 h-64 rounded-2xl bg-white/10">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
                  {mapNodes.map((node, index) => (
                    <span
                      key={index}
                      className="absolute h-3 w-3 rounded-full bg-secondary shadow-[0_0_16px_rgba(255,107,0,0.8)]"
                      style={{ top: node.top, left: node.left }}
                    />
                  ))}
                </div>
                <div className="mt-6 text-xs text-white/70">
                  Cross-campus incubation hubs with global partner access.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
      <section id="funding" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
=======
      <section id="funding" className="mx-auto max-w-6xl px-6 py-20">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Funding Support</div>
<<<<<<< HEAD
          <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Step-by-step funding flow</h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
=======
          <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Step-by-step funding flow</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            {fundingSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl border border-secondary/40 bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-xs font-semibold text-secondary">Step {index + 1}</div>
                <div className="mt-2 text-sm font-semibold text-slate-800">{step.step}</div>
                <div className="mt-2 text-xs text-slate-500">{step.text}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      <section id="global" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
=======
      <section id="global" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Global Exposure</div>
<<<<<<< HEAD
            <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">World map with glowing nodes</h2>
          </motion.div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative rounded-3xl border border-secondary/40 bg-primary p-5 text-white transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-8">
              <div className="h-48 rounded-2xl bg-white/10 sm:h-72">
=======
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">World map with glowing nodes</h2>
          </motion.div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative rounded-3xl border border-secondary/40 bg-primary p-8 text-white transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="h-72 rounded-2xl bg-white/10">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
                {mapNodes.map((node, index) => (
                  <span
                    key={index}
                    className="absolute h-3 w-3 rounded-full bg-secondary shadow-[0_0_16px_rgba(255,107,0,0.8)]"
                    style={{ top: node.top, left: node.left }}
                  />
                ))}
              </div>
              <div className="mt-6 text-xs text-white/70">
                Strategic access to global startup ecosystems across key innovation hubs.
              </div>
            </div>
<<<<<<< HEAD
            <div className="rounded-3xl border border-secondary/40 bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-8">
=======
            <div className="rounded-3xl border border-secondary/40 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
              <div className="text-sm font-semibold text-slate-800">Programs</div>
              <div className="mt-6 space-y-4">
                {globalExposure.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-secondary/40 bg-accent p-4 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
=======
      <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Showcase Gallery</div>
<<<<<<< HEAD
          <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Masonry + lightbox</h2>
=======
          <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Masonry + lightbox</h2>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, index) => (
              <button
                key={item}
                onClick={() => setLightbox(item)}
                className="mb-6 w-full break-inside-avoid rounded-3xl border border-secondary/40 bg-white p-6 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-sm font-semibold text-slate-800">{item}</div>
                <img
                  src={aiImages[index % aiImages.length]}
                  alt={`${item} AI visual`}
                  className="mt-4 h-32 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="mt-3 text-xs text-slate-500">Success stories and founder journeys.</div>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      <section id="impact" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
=======
      <section id="impact" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Impact</div>
<<<<<<< HEAD
            <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Counter animation</h2>
=======
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Counter animation</h2>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <Counter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
=======
      <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Testimonials</div>
<<<<<<< HEAD
          <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Trusted by founders and investors</h2>
          <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
=======
          <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Trusted by founders and investors</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-secondary/40 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
                <p className="mt-4 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      <section id="contact" className="bg-accent py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
=======
      <section id="contact" className="bg-accent py-20">
        <div className="mx-auto max-w-6xl px-6">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Forms</div>
<<<<<<< HEAD
            <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">Applications &amp; partnerships</h2>
            <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2">
=======
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Applications &amp; partnerships</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
              {[
                { title: 'Startup Application Form', cta: 'Apply Now' },
                { title: 'Investor Interest Form', cta: 'Join as Investor' },
                { title: 'College Partnership Form', cta: 'Partner With Us' },
                { title: 'Newsletter Subscription', cta: 'Subscribe' },
              ].map((form) => (
                <form
                  key={form.title}
                  className="rounded-3xl border border-secondary/40 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="text-sm font-semibold text-slate-800">{form.title}</div>
                  <div className="mt-4 grid gap-3">
                    <input
                      className="w-full rounded-2xl border border-secondary/40 px-4 py-3 text-sm"
                      placeholder="Full Name"
                    />
                    <input
                      className="w-full rounded-2xl border border-secondary/40 px-4 py-3 text-sm"
                      placeholder="Email Address"
                    />
                    <input
                      className="w-full rounded-2xl border border-secondary/40 px-4 py-3 text-sm"
                      placeholder="Organization / Startup"
                    />
                  </div>
                  <button className="mt-4 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
                    {form.cta}
                  </button>
                </form>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
      <section id="cta" className="bg-primary py-10 text-white sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
=======
      <section id="cta" className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <motion.div
            className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/70">Call To Action</div>
<<<<<<< HEAD
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Build Your Startup With The Right Ecosystem</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/join')} className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow">
                Join Now
=======
              <h2 className="mt-3 text-3xl font-semibold">Build Your Startup With The Right Ecosystem</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow">
                Apply Now
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
              </button>
              <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white">
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
      <footer className="bg-[#071f4d] py-10 text-white sm:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
=======
      <footer className="bg-[#071f4d] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
          <div>
            <div className="text-lg font-semibold">EDC India</div>
            <p className="mt-3 text-xs text-white/70">
              Empowering founders through curated programs, funding, and global exposure.
            </p>
          </div>
          {[
            { title: 'Quick Links', items: ['Home', 'About', 'Programs', 'Impact'] },
            { title: 'Programs', items: ['Courses', 'Funding', 'Global Exposure', 'Showcase'] },
            { title: 'Partner With Us', items: ['Investors', 'Colleges', 'Mentors', 'Corporate'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold">{col.title}</div>
              <div className="mt-3 space-y-2 text-xs text-white/70">
                {col.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 space-y-2 text-xs text-white/70">
              <div>hello@edcindia.org</div>
              <div>+91 90000 00000</div>
              <div>New Delhi · Bengaluru · Global</div>
            </div>
            <div className="mt-4 flex gap-3 text-xs text-white/70">
              {['LinkedIn', 'YouTube', 'Instagram'].map((item) => (
                <div key={item} className="rounded-full border border-white/20 px-3 py-1">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </MotionDiv>
  )
}

function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 1e0bcfff9e52b2fd7503ee96976b895c1bf464e5
  )
}

export default App
