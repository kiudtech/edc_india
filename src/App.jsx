import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Route, Routes, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { Rocket, Lightbulb, Users, Trophy, BookOpen, Building2, Target, Globe, Handshake, Star, Search, GraduationCap, TrendingUp, DollarSign, Briefcase, BarChart3, Zap, RefreshCw, MapPin, Mail, Phone, University, ChevronRight } from 'lucide-react'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import ScrollToTop from './components/ScrollToTop'
import SiteNavbar from './components/SiteNavbar'
import SiteFooter from './components/SiteFooter'
import JoinPage from './pages/JoinPage'
import PaymentPage from './pages/PaymentPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import IdeaValidationPage from './pages/IdeaValidationPage'
import CollegeApplicationPage from './pages/CollegeApplicationPage'
import AboutPage from './pages/AboutPage'
import FellowshipPage from './pages/FellowshipPage'
import FellowshipApplicationPage from './pages/FellowshipApplicationPage'
import StartupApplicationPage from './pages/StartupApplicationPage'
import MembershipValidationPage from './pages/MembershipValidationPage'
import StartupMembershipPage from './pages/StartupMembershipPage'
import RankingPage from './pages/RankingPage'
import CollegeRankingApplicationPage from './pages/CollegeRankingApplicationPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import { API_BASE } from './config'

const offerings = [
  { title: 'Idea Validation', desc: 'Get a detailed validation report and clear direction for your next step.', icon: <Search className="h-6 w-6" />, route: '/membership-validation' },
  { title: 'EDC Membership', desc: 'Join India\u2019s growing entrepreneurial community for everything you need.', icon: <Users className="h-6 w-6" />, route: '/startup-membership' },
  { title: 'Entrepreneurial Fellowship', desc: 'A 1-year intensive program to build startups from scratch.', icon: <GraduationCap className="h-6 w-6" />, route: '/fellowship' },
  { title: 'Innovation & Incubation Ranking', desc: 'Transparent, on-ground evaluation of colleges and universities.', icon: <Trophy className="h-6 w-6" />, route: '/ranking' },
  { title: 'Fund Support', desc: 'Assistance in securing government and private grants.', icon: <DollarSign className="h-6 w-6" />, route: '/join' },
  { title: 'Incubation Accelerator', desc: 'Partnering with institutions to build on-campus startup ecosystems.', icon: <Building2 className="h-6 w-6" />, route: '/college-apply' },
]
const timeline = [
  { year: '2019', title: 'Founded', text: 'EDC India was created with a belief that entrepreneurship is a mindset.' },
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
  { step: 'Idea Validation', text: 'Understand your idea stage and market potential.', icon: <Search className="h-5 w-5" /> },
  { step: 'Pitch and finance support', text: 'Get support for your pitch and financial planning.', icon: <Briefcase className="h-5 w-5" /> },
  { step: 'Pitch Presentation', text: 'Craft investor-ready materials and get coaching.', icon: <BarChart3 className="h-5 w-5" /> },
  { step: 'Grant and fund Support', text: 'Assistance in securing government and private grants.', icon: <DollarSign className="h-5 w-5" /> },
  { step: 'Growth', text: 'Scale your startup with our ecosystem support.', icon: <TrendingUp className="h-5 w-5" /> },
]
const galleryItems = [
  {
    label: 'Demo Day Spotlight',
    file: 'WhatsApp Image 2026-03-22 at 9.35.11 PM.jpeg',
    desc: 'Founders pitch live to investors and industry leaders.',
  },
  {
    label: 'Pitch Arena',
    file: 'image.png',
    desc: 'High-energy pitch sessions with real-time feedback.',
  },
  {
    label: 'Campus Incubation',
    file: 'Incubation.jpeg',
    desc: 'On-campus startup ecosystems built with partner institutions.',
  },
  {
    label: 'Founder Journey',
    file: 'ChatGPT Image Jan 29, 2026, 04_18_46 PM.png',
    desc: 'Stories of resilience, growth, and entrepreneurial grit.',
  },
  {
    label: 'Global Expo',
    file: 'Copy of WhatsApp Image 2023-12-16 at 12.59.52.jpeg',
    desc: 'Showcasing Indian startups on the global stage.',
  },
  {
    label: 'Mentorship Labs',
    file: 'Copy of WhatsApp Image 2023-12-16 at 12.59.56 (1).jpeg',
    desc: 'Hands-on sessions with experienced mentors and advisors.',
  },
  {
    label: 'Investor Connect',
    file: 'Copy of WhatsApp Image 2023-12-16 at 13.05.27.jpeg',
    desc: 'Bridging founders with angels, VCs, and strategic investors.',
  },
  {
    label: 'Market Immersion',
    file: 'Copy of WhatsApp Image 2023-12-16 at 13.05.30.jpeg',
    desc: 'Deep dives into target markets and customer discovery.',
  },
  {
    label: 'Prototype Showcase',
    file: 'Copy of WhatsApp Image 2023-12-16 at 13.05.33 (1).jpeg',
    desc: 'From idea to working prototype — live demonstrations.',
  },
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
  { label: 'Universities', value: 70, icon: <University className="h-6 w-6" /> },
  { label: 'Institutes', value: 100, icon: <Building2 className="h-6 w-6" /> },
  { label: 'Startups', value: 500, icon: <Rocket className="h-6 w-6" /> },
  { label: 'Members', value: 3000, icon: <Users className="h-6 w-6" /> },
]

const defaultPlans = [
  {
    slug: 'startup-membership',
    name: 'Startup Membership',
    badge: 'Most Popular',
    description: 'Full access to the EDC India startup ecosystem, mentorship, events, grants, and funding opportunities.',
    price: 2500,
    billingText: '/ one-time',
    ctaText: 'Join Now',
    ctaRoute: '/startup-application',
    features: [
      'Unique Founder ID (BUB-XXXX)',
      'Access to Events & Workshops',
      'Grant & Funding Directory',
      'Investor Network Access',
      'Community & Announcements',
      'Course Enrollment',
      'Dedicated Support Tickets',
    ],
  },
  {
    slug: 'idea-validation',
    name: 'Idea Validation',
    badge: 'Expert Review',
    description: 'Get your startup idea validated by experts, receive feedback, certification, and a member account.',
    price: 5000,
    billingText: '/ one-time',
    ctaText: 'Join Now',
    ctaRoute: '/join-validation',
    features: [
      'Expert Idea Review & Feedback',
      'Validation Certificate',
      'Auto Member Account + Founder ID',
      'Access to Full Ecosystem',
      'Priority Admin Review',
      'Startup Stage Assessment',
      'Innovation Report',
    ],
  },
  {
    slug: 'fellowship-program',
    name: 'Fellowship Program',
    badge: 'Career + Startup',
    description: 'A structured fellowship track to build entrepreneurial skills with execution support, mentorship, and growth opportunities.',
    price: 5000,
    billingText: '/ one-time',
    ctaText: 'Join Fellowship',
    ctaRoute: '/fellowship-application',
    features: [
      'Execution-focused learning path',
      'Mentor support and progress guidance',
      'Communication and pitch practice',
      'Career and startup exposure',
      'Network with founders and peers',
      'Funding opportunity readiness',
    ],
  },
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

const Counter = ({ value, label, prefix = '', suffix = '+', className = 'mt-3 text-3xl font-bold text-primary', labelClassName = 'mt-1 text-xs font-medium text-slate-600' }) => {
  const [count, setCount] = useState(0)
  const elRef = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true
        const duration = 1600
        const startTime = performance.now()
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * value))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (elRef.current) observer.observe(elRef.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={elRef}>
      <div className={className}>{prefix}{count.toLocaleString('en-IN')}{suffix}</div>
      <div className={labelClassName}>{label}</div>
    </div>
  )
}

const Lightbox = ({ item, onClose }) => {
  if (!item) return null
  const galleryItem = galleryItems.find((g) => g.label === item)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Blurred backdrop using the actual image */}
      {galleryItem && (
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl brightness-[0.3]"
          style={{ backgroundImage: `url(/stories/${galleryItem.file})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {galleryItem && (
          <div className="relative">
            <img
              src={`/stories/${galleryItem.file}`}
              alt={galleryItem.label}
              className="w-full max-h-[65vh] object-cover object-center"
            />
            {/* gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {/* close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 transition hover:bg-black/60"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* label on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm mb-2">
                EDC India · Startup Showcase
              </div>
              <div className="text-2xl font-extrabold text-white">{galleryItem.label}</div>
              <div className="mt-1 text-sm text-white/60">{galleryItem.desc}</div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Click outside hint */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30">Click anywhere outside to close</p>
    </motion.div>
  )
}

const ContactCard = ({ form }) => {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    if (!values.fullName.trim() || !values.email.trim() || !values.phone.trim()) {
      setSubmitError('Please enter your name, email, and phone number to continue.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`${API_BASE}/api/admin/contact-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: form.formType,
          formTitle: form.title,
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          organization: values.organization.trim(),
          message: values.message.trim(),
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'Unable to submit your request right now.')

      setSubmitSuccess(data.message || form.successMessage || `Thanks for your ${form.title.toLowerCase()} request. We will process your request shortly.`)
      setValues({ fullName: '', email: '', phone: '', organization: '', message: '' })
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit your request right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      variants={staggerItem}
      layout
      className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-300"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${form.gradient}`} />
      <div className="p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${form.bg} text-3xl shadow-sm`}>
              {form.icon}
            </div>
            <div>
              <div className={`text-base font-bold ${form.accent}`}>{form.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{form.desc}</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className={`ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open ? 'border-slate-300 bg-slate-100 rotate-45' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
          >
            <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
            {submitSuccess && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700 sm:text-sm">
                {submitSuccess}
              </div>
            )}
            {submitError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 sm:text-sm">
                {submitError}
              </div>
            )}

            <input
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${form.ring}`}
              placeholder="Full Name"
              value={values.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              required
            />
            <input
              type="email"
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${form.ring}`}
              placeholder="Email Address"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              required
            />
            <input
              type="tel"
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${form.ring}`}
              placeholder="Phone Number"
              value={values.phone}
              onChange={(e) => setField('phone', e.target.value)}
              required
            />
            <input
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${form.ring}`}
              placeholder="Organization / Startup"
              value={values.organization}
              onChange={(e) => setField('organization', e.target.value)}
            />
            <textarea
              rows={3}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${form.ring}`}
              placeholder="Any specific requirement or message (optional)"
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
            />

            <button
              type="submit"
              disabled={submitting}
              className={`mt-1 w-full rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${form.btn}`}
            >
              {submitting ? 'Submitting...' : `${form.cta} →`}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

const homeMobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
      when: 'afterChildren',
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      delayChildren: 0.03,
      staggerChildren: 0.05,
    },
  },
}

const homeMobileItemVariants = {
  closed: { opacity: 0, y: -8 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(courseTabs[0])
  const [lightbox, setLightbox] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [plans, setPlans] = useState(defaultPlans)
  const [plansError, setPlansError] = useState('')
  const heroHeadlineWords = 'Entrepreneurship is not just about starting a company — it’s about building a mindset.'.split(' ')
  const homeNavItems = [
    { label: 'Home', type: 'anchor', target: 'home' },
    { label: 'About', type: 'route', to: '/about-us' },
    { label: 'Programs', type: 'anchor', target: 'programs' },
    { label: 'Fellowship', type: 'route', to: '/fellowship' },
    { label: 'Membership', type: 'route', to: '/startup-membership' },
    { label: 'Validation', type: 'route', to: '/membership-validation' },
    { label: 'Ranking', type: 'route', to: '/ranking' },
    { label: 'Partners', type: 'anchor', target: 'partners' },
    { label: 'Contact', type: 'anchor', target: 'contact' },
  ]

  const handleRouteNavTop = () => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const scrollingElement = document.scrollingElement || document.documentElement || document.body
    if (scrollingElement) {
      scrollingElement.scrollTop = 0
      scrollingElement.scrollLeft = 0
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansError('')

      const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)
      const apiFromEnv = (API_BASE || '').trim()
      const baseCandidates = Array.from(new Set([
        apiFromEnv,
        '',
        ...(apiFromEnv ? [] : ['http://localhost:5000']),
        ...(isLocalhost ? ['http://127.0.0.1:5000'] : []),
      ]))

      let lastFailure = ''

      for (const base of baseCandidates) {
        try {
          const res = await fetch(`${base}/api/plans`, { cache: 'no-store' })
          if (!res.ok) {
            lastFailure = `Plans API responded with status ${res.status}.`
            continue
          }

          const contentType = res.headers.get('content-type') || ''
          if (!contentType.includes('application/json')) {
            lastFailure = 'Plans API is returning non-JSON content. Check VITE_API_URL or deployment rewrites for /api routes.'
            continue
          }

          const data = await res.json()
          if (Array.isArray(data)) {
            setPlans(data)
            return
          }

          lastFailure = 'Plans API did not return a valid list.'
        } catch {
          lastFailure = 'Could not connect to plans API endpoint.'
        }
      }

      setPlansError(`${lastFailure || 'Unable to load latest plans from backend.'} Showing default plans.`)
    }

    fetchPlans()
  }, [])

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
            <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full bg-white object-contain" />
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </div>

          <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex lg:gap-8 lg:text-sm">
            {homeNavItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="nav-link transition hover:text-slate-900"
                  onClick={handleRouteNavTop}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`#${item.target}`}
                  className="nav-link transition hover:text-slate-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:hidden"
              onClick={handleRouteNavTop}
            >
              Login
            </Link>
            <Link to="/login" className="hidden text-xs font-semibold text-slate-600 transition hover:text-slate-900 sm:inline-flex lg:text-sm" onClick={handleRouteNavTop}>Login</Link>
            <Link to="/join" className="hidden rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow sm:inline-flex lg:px-6 lg:py-2.5 lg:text-sm" onClick={handleRouteNavTop}>Join Now</Link>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="home-mobile-navigation-menu"
            >
              <motion.svg
                className="h-5 w-5 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                animate={{ rotate: mobileMenuOpen ? 90 : 0, scale: mobileMenuOpen ? 1.05 : 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </motion.svg>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              id="home-mobile-navigation-menu"
              className="origin-top overflow-hidden border-t border-slate-100 bg-white/95 md:hidden"
              variants={homeMobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6">
                <div className="overflow-hidden rounded-b-[1.5rem] border border-slate-200/80 border-t-0 bg-white p-3 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.58)] backdrop-blur-xl">
                  <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
                    {homeNavItems.map((item) => (
                      <motion.div key={item.label} variants={homeMobileItemVariants}>
                        {item.type === 'route' ? (
                          <Link
                            to={item.to}
                            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                            onClick={handleRouteNavTop}
                          >
                            <span className="flex items-center gap-3">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">{item.label.charAt(0)}</span>
                              <span>{item.label}</span>
                            </span>
                            <svg className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ) : (
                          <a
                            href={`#${item.target}`}
                            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">{item.label.charAt(0)}</span>
                              <span>{item.label}</span>
                            </span>
                            <svg className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </motion.div>
                    ))}

                    <motion.div variants={homeMobileItemVariants} className="mt-0.5 grid grid-cols-2 gap-1">
                      <Link
                        to="/login"
                        onClick={handleRouteNavTop}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      >
                        Login
                      </Link>
                      <Link
                        to="/join"
                        onClick={handleRouteNavTop}
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-secondary via-secondary to-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_28px_-18px_rgba(11,61,145,0.9)] transition hover:brightness-105"
                      >
                        Join Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="blob-float absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="blob-float-reverse absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-32 xl:max-w-6xl xl:py-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              Building founders through clarity, execution, and ecosystem support.
            </div>
            <motion.h1
              className="mx-auto mt-8 max-w-5xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.2rem] xl:text-[3.8rem]"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {heroHeadlineWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={staggerItem}
                  data-text={word}
                  className={`inline-block mr-3 ${index >= heroHeadlineWords.length - 4 ? 'hero-premium-accent' : 'text-white'}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.div
              className="mx-auto mt-4 h-1 w-40 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg xl:text-xl xl:max-w-3xl">
              Courses, Funding, Global Exposure &amp; Startup Growth Ecosystem
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/join" className="cta-pulse group rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-2xl transition hover:bg-blue-50 lg:px-8 lg:py-4 lg:text-base" onClick={handleRouteNavTop}>
                Join Now <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
              </Link>
              <a href="#programs" className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 lg:px-8 lg:py-4 lg:text-base">
                Explore Programs
              </a>
            </div>
          </motion.div>
          <motion.div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4 xl:max-w-4xl xl:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
            {[
              { num: 500, label: 'Startups', icon: <Rocket className="h-5 w-5 text-white/70" />, suffix: '+' },
              { num: 50, label: 'Funding Raised', icon: <DollarSign className="h-5 w-5 text-white/70" />, prefix: '₹', suffix: 'Cr+' },
              { num: 100, label: 'Partners', icon: <Handshake className="h-5 w-5 text-white/70" />, suffix: '+' },
              { num: 25, label: 'Countries', icon: <Globe className="h-5 w-5 text-white/70" />, suffix: '+' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="card-hover-glow rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1">
                <div className="flex justify-center">{stat.icon}</div>
                <Counter value={stat.num} label={stat.label} prefix={stat.prefix || ''} suffix={stat.suffix} className="mt-1 text-xl font-bold text-white sm:text-2xl xl:text-3xl" labelClassName="mt-1 text-xs font-medium text-white/60" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"><svg viewBox="0 0 1440 80" className="w-full fill-white"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" /></svg></div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div className="grid gap-10 lg:grid-cols-2" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Who We Are</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Empowering Startups Across India</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Entrepreneurial Development Council (EDC India) is a mission-driven organization working to build and strengthen the entrepreneurial ecosystem across India and globally. Since 2019, we have been actively working to spread entrepreneurial awareness, enable innovation, and help individuals understand that entrepreneurship is not limited to starting a startup — it is a way of thinking, solving, and creating impact.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Vision for Startup India', icon: <Target className="h-5 w-5 text-blue-600" /> },
                { title: 'Global Entrepreneurship Focus', icon: <Globe className="h-5 w-5 text-blue-600" /> },
                { title: 'Trusted Corporate Network', icon: <Handshake className="h-5 w-5 text-blue-600" /> },
                { title: 'Premium Talent Pipeline', icon: <Star className="h-5 w-5 text-blue-600" /> },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">{item.icon}</span>
                    <div className="text-sm font-bold text-slate-800">{item.title}</div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Building a high-impact entrepreneurship and innovation ecosystem.</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-slate-100 bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] p-5 shadow-sm sm:p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">Growth Timeline</div>
            <div className="mt-6 space-y-6">
              {timeline.map((item, index) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-cyan-400" />
                    {index !== timeline.length - 1 && <div className="h-full w-px bg-white/20" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-cyan-300">{item.year}</div>
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-white/60">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        </div>
      </section>

      {/* ═══════════════ PROGRAMS ═══════════════ */}
      <section id="programs" className="bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
            <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm mb-4">What We Do</div>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Everything Your Startup Needs</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">End-to-end ecosystem support to take your idea from concept to global scale.</p>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {offerings.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="animated-border group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{item.icon}</div>
                <div className="mt-4 text-sm font-bold text-white">{item.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-white/60">{item.desc}</div>
                <button onClick={() => navigate(item.route)} className="mt-4 inline-block text-xs font-semibold text-cyan-300">Explore →</button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FUNDING ═══════════════ */}
      <section id="funding" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Startup Funding Support</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Your Path to Funding</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">A structured approach to make your startup investor-ready.</p>
          </motion.div>
          <div className="relative mt-12">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200"></div>
            <div className="relative flex justify-between">
              {fundingSteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg">{index + 1}</div>
                  <div className="mt-2 text-sm font-bold text-slate-800">{step.step}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {fundingSteps.map((step, index) => (
              <div key={step.step} className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">{step.icon}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">Step {index + 1}</div>
                <div className="mt-2 text-sm font-bold text-slate-800">{step.step}</div>
                <div className="mt-1 text-xs text-slate-500">{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PLANS ═══════════════ */}
      <section id="plans" className="bg-gradient-to-br from-slate-50 to-indigo-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">Membership Plans</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Choose Your Plan</h2>
            <p className="mt-3 text-sm text-slate-500">Two pathways to grow your startup with EDC India</p>
          </motion.div>
          <motion.div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {plansError && (
              <div className="col-span-full mx-auto mb-5 w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 text-center">
                {plansError}
              </div>
            )}
            {plans.map((plan, index) => {
              const planThemes = [
                { border: 'border border-slate-200', badgeTheme: 'bg-blue-50 text-blue-600', priceTheme: 'text-primary', checkColor: 'text-green-500', btnTheme: 'bg-primary shadow-blue-200/50 hover:bg-blue-700' },
                { border: 'border-2 border-purple-200', badgeTheme: 'bg-purple-50 text-purple-600', priceTheme: 'text-purple-600', checkColor: 'text-purple-500', btnTheme: 'bg-purple-600 shadow-purple-200/50 hover:bg-purple-700' },
                { border: 'border-2 border-indigo-200', badgeTheme: 'bg-indigo-50 text-indigo-600', priceTheme: 'text-indigo-600', checkColor: 'text-indigo-500', btnTheme: 'bg-indigo-600 shadow-indigo-200/50 hover:bg-indigo-700' },
              ];
              const theme = planThemes[index % planThemes.length];

              return (
                <motion.div key={plan.slug || `${plan.name}-${index}`} variants={staggerItem} className={`relative rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${theme.border}`} whileHover={{ scale: 1.02 }}>
                  {plan.badge && (
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold ${theme.badgeTheme}`}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${theme.priceTheme}`}>₹{Number(plan.price || 0).toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-500">{plan.billingText || 'one-time'}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{plan.description}</p>
                  <ul className="mt-5 space-y-2.5 text-xs text-slate-600 bg-white">
                    {(plan.features || []).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`mt-0.5 ${theme.checkColor}`}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate((plan.ctaRoute || '/join').trim().startsWith('/') ? (plan.ctaRoute || '/join').trim() : `/${(plan.ctaRoute || 'join').trim()}`)}
                    className={`mt-6 w-full rounded-full py-3 text-sm font-semibold text-white shadow-lg transition ${theme.btnTheme}`}
                  >
                    {(plan.ctaText || 'Join Now')} — ₹{Number(plan.price || 0).toLocaleString('en-IN')}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ COURSES ═══════════════ */}
      <section id="courses" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Courses</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Entrepreneurship Learning Tracks</h2>
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
          <motion.div variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border-2 border-transparent bg-white p-5 shadow-sm sm:p-8" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #06b6d4) border-box' }}>
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
        </div>
      </section>

      {/* ═══════════════ PARTNERS ═══════════════ */}
      <section id="partners" className="bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm mb-4">College Tie-Ups</div>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Trusted by Leading Institutions</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">Partnering with top universities and incubation hubs across India.</p>
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
                  <div className="flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                    {logo}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { num: 120, label: 'Partner Hubs', icon: <Building2 className="h-5 w-5" /> },
              { num: 27, label: 'States Covered', icon: <MapPin className="h-5 w-5" /> },
              { num: 45, label: 'Student Reach', suffix: 'K+', icon: <Users className="h-5 w-5" /> },
              { num: 300, label: 'Innovation Labs', icon: <Zap className="h-5 w-5" /> },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-sm">
                <div className="flex justify-center text-white/60 mb-2">{stat.icon}</div>
                <Counter value={stat.num} label={stat.label} suffix={stat.suffix || '+'} className="text-xl font-bold text-white" labelClassName="mt-1 text-xs font-medium text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INSTITUTIONAL PRESENCE ═══════════════ */}
      <section className="overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Our Presence</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Our Institutional Presence</h2>
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

      {/* ═══════════════ RANK YOUR COLLEGE ═══════════════ */}
      <section id="ranking" className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/40 py-20 sm:py-28">
        <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-100/60 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6">🏆 Apply for Recognition</div>
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Rank Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">College</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">Get recognized by India's most transparent innovation & incubation ranking.</p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Left — stats/benefits */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
              {[
                { icon: '🏛️', title: '70+ Universities', desc: 'Already ranked and recognized by EDC India' },
                { icon: '📊', title: 'Transparent Evaluation', desc: 'On-ground, data-driven ranking methodology' },
                { icon: '🏆', title: 'National Recognition', desc: 'Awards, certificates, and public recognition' },
                { icon: '🌐', title: 'Global Visibility', desc: "Featured in EDC India's national reports and media" },
              ].map((item, i) => (
                <motion.div key={i} variants={staggerItem} whileHover={{ x: 4 }} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-100">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">{item.icon}</div>
                  <div>
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="mt-0.5 text-sm text-slate-500">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 blur-xl opacity-60" />
              <div className="relative rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl text-white shadow-lg">🏆</div>
                  <div>
                    <div className="font-bold text-slate-900">Quick Application</div>
                    <div className="text-xs text-slate-500">Takes less than 2 minutes</div>
                  </div>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = { collegeName: e.target.collegeName.value, contactPerson: e.target.contactPerson.value, email: e.target.email.value, phone: e.target.phone.value, message: e.target.message.value };
                  try {
                    const response = await fetch('/api/admin/college-ranking-application', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
                    if (response.ok) { alert('Application submitted successfully!'); e.target.reset(); }
                    else alert('Failed to submit. Please try again.');
                  } catch { alert('An error occurred. Please try again.'); }
                }}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { id: 'collegeName', label: 'College / University Name', type: 'text', span: 2 },
                      { id: 'contactPerson', label: 'Contact Person', type: 'text', span: 1 },
                      { id: 'phone', label: 'Phone Number', type: 'tel', span: 1 },
                      { id: 'email', label: 'Email Address', type: 'email', span: 2 },
                    ].map((f) => (
                      <div key={f.id} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                        <label htmlFor={f.id} className="text-xs font-semibold uppercase tracking-wide text-slate-500">{f.label} *</label>
                        <input type={f.type} name={f.id} id={f.id} required className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</label>
                      <textarea name="message" id="message" rows={3} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Tell us about your institution..." />
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:opacity-90 active:scale-95">
                      Apply for Ranking →
                    </button>
                    <Link to="/ranking" className="flex-1 rounded-xl border-2 border-slate-200 py-3.5 text-center text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                      Full Application
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPACT ═══════════════ */}
      <section id="impact" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Our Impact</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Numbers That Speak</h2>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {impactStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} whileHover={{ scale: 1.05, y: -4 }} className="card-hover-glow rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-xl hover:border-blue-100">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">{stat.icon}</div>
                <Counter value={stat.value} label={stat.label} className="mt-3 text-3xl font-bold text-blue-600" labelClassName="mt-1 text-xs font-medium text-slate-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#0f2d6b] to-[#1a3a8f] py-20 sm:py-28">
        {/* bg grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" /> Startup Showcase
            </div>
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Stories That <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Inspire</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50 text-sm">A glimpse into the journeys of founders, demo days, and global events.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {galleryItems.map((item, index) => (
              <motion.button
                key={item.label}
                variants={staggerItem}
                onClick={() => setLightbox(item.label)}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative overflow-hidden rounded-2xl text-left focus:outline-none"
                style={{ aspectRatio: index % 3 === 1 ? '4/3' : '16/10' }}
              >
                {/* image */}
                <img
                  src={`/stories/${item.file}`}
                  alt={item.label}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* dark overlay always */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/20 group-hover:to-indigo-600/20 transition-all duration-500" />
                {/* top badge */}
                <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  EDC India
                </div>
                {/* play icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <svg className="h-5 w-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                {/* bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="mt-1 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Testimonials</div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Trusted by Founders & Investors</h2>
          </motion.div>
          <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {testimonials.map((item) => (
              <motion.div key={item.name} variants={staggerItem} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition hover:shadow-2xl">
                <div className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">&ldquo;</div>
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
      <section id="contact" className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#fff7f0] py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-100/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">Get Started</div>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">Applications & Partnerships</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">Pick your path and let's build together.</p>
          </motion.div>

          <motion.div className="mt-16 grid gap-6 sm:grid-cols-2 items-start" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { title: 'Startup Application', formType: 'startup_application', cta: 'Apply Now', icon: '🚀', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', accent: 'text-blue-600', ring: 'focus:ring-blue-500/20 focus:border-blue-500', btn: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700', desc: 'Join the EDC India startup ecosystem.', successMessage: 'Thank you for applying to Startup Application. Our team will process your request shortly and get back to you.' },
              { title: 'Investor Interest', formType: 'investor_interest', cta: 'Join as Investor', icon: '💼', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', accent: 'text-emerald-600', ring: 'focus:ring-emerald-500/20 focus:border-emerald-500', btn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700', desc: 'Connect with high-potential founders.', successMessage: 'Thank you for your investor interest. We will process your query shortly and connect with you.' },
              { title: 'College Partnership', formType: 'college_partnership', cta: 'Partner With Us', icon: '🏛️', gradient: 'from-purple-500 to-pink-600', bg: 'bg-purple-50', accent: 'text-purple-600', ring: 'focus:ring-purple-500/20 focus:border-purple-500', btn: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700', desc: 'Build an on-campus startup ecosystem.', successMessage: 'Thank you for your college partnership request. We will process your query shortly.' },
              { title: 'Newsletter', formType: 'newsletter', cta: 'Subscribe', icon: '📩', gradient: 'from-orange-500 to-rose-500', bg: 'bg-orange-50', accent: 'text-orange-600', ring: 'focus:ring-orange-500/20 focus:border-orange-500', btn: 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600', desc: 'Stay updated with funding & events.', successMessage: 'Thank you for subscribing. We will process your request shortly and share updates with you.' },
            ].map((form) => (
              <ContactCard key={form.title} form={form} />
            ))}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </MotionDiv>
  )
}

function AppContent() {
  const location = useLocation()
  const hideGlobalNavbar =
    location.pathname === '/' ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/dashboard') ||
['/payment', '/college-apply'].includes(location.pathname)

  return (
    <>
      <ScrollToTop />
      {!hideGlobalNavbar && <SiteNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/startup-application" element={<StartupApplicationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join-validation" element={<IdeaValidationPage />} />
        <Route path="/college-apply" element={<CollegeApplicationPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/fellowship" element={<FellowshipPage />} />
        <Route path="/cohort" element={<Navigate to="/fellowship" replace />} />
        <Route path="/coeip" element={<Navigate to="/" replace />} />
        <Route path="/fellowship-application" element={<FellowshipApplicationPage />} />
        <Route path="/membership-validation" element={<MembershipValidationPage />} />
        <Route path="/startup-membership" element={<StartupMembershipPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/college-ranking-application" element={<CollegeRankingApplicationPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
