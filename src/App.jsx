import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { BrowserRouter, Route, Routes, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { Rocket, Lightbulb, Users, Trophy, BookOpen, Building2, Target, Globe, Handshake, Star, Search, GraduationCap, TrendingUp, IndianRupee, Briefcase, BarChart3, Zap, RefreshCw, MapPin, Mail, Phone, University, ChevronLeft, ChevronRight, Calendar, Plane, Flame, ChevronDown, ChevronUp } from 'lucide-react'
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
import FAQPage from './pages/FAQPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import DubaiEventPage from './pages/DubaiEventPage'
import CollegeRatingSection from './components/CollegeRatingSection'
import { getAllFaqItems } from './data/faqs'
import FAQTextLine from './components/FAQTextLine'
import { API_BASE } from './config'

const offerings = [
  { title: 'Idea Validation', desc: 'Get a detailed validation report and clear direction for your next step.', icon: <Search className="h-6 w-6" />, route: '/membership-validation' },
  { title: 'EDC Membership', desc: 'Join India\u2019s growing entrepreneurial community for everything you need.', icon: <Users className="h-6 w-6" />, route: '/startup-membership' },
  { title: 'Entrepreneurial Fellowship', desc: 'A 1-year intensive program to build startups from scratch.', icon: <GraduationCap className="h-6 w-6" />, route: '/fellowship' },
  { title: 'Innovation & Incubation Ranking', desc: 'Transparent, on-ground evaluation of colleges and universities.', icon: <Trophy className="h-6 w-6" />, route: '/ranking' },
  { title: 'Fund Support', desc: 'Assistance in securing government and private grants.', icon: <IndianRupee className="h-6 w-6" />, route: '/join' },
  { title: 'Incubation Accelerator', desc: 'Partnering with institutions to build on-campus startup ecosystems.', icon: <Building2 className="h-6 w-6" />, route: '/college-apply' },
]
const timeline = [
  { year: '2019', title: 'The Beginning', text: 'EDC India was founded with a mission to build a strong entrepreneurial ecosystem.' },
  { year: '2020', title: 'Community Expansion', text: 'Launched membership, growing to 2000+ founders with active mentorship and startup support.' },
  { year: '2022', title: 'Strategic Partnerships', text: 'Signed 70+ MoUs with leading universities and corporates.' },
  { year: '2023', title: 'Funding Launch', text: 'Started funding support for startups through our angel network.' },
  { year: '2025', title: 'Global Presence', text: 'Expanded internationally with physical offices in Dubai (UAE) and Singapore.' },
  { year: '2026', title: 'The Next Big Leap', text: 'Launching the School of Entrepreneurship — building the next generation of founders.' },
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
  { step: 'Grant and fund Support', text: 'Assistance in securing government and private grants.', icon: <IndianRupee className="h-5 w-5" /> },
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
  {
    label: 'Auditorium Ignite',
    file: 'newImg1.jpeg',
    desc: 'Hundreds of participants unite during a high-energy entrepreneurship gathering.',
  },
  {
    label: 'Campus Team Build',
    file: 'newImg2.jpeg',
    desc: 'Student founders and mentors collaborating around practical innovation projects.',
  },
  {
    label: 'Classroom Catalyst',
    file: 'newImg3.jpeg',
    desc: 'Interactive sessions where students explore startup thinking and execution.',
  },
  {
    label: 'Learning Forum',
    file: 'newImg4.jpeg',
    desc: 'Focused community sessions turning ideas into actionable entrepreneurial plans.',
  },
  {
    label: 'Recognition Drive',
    file: 'newImg5.jpeg',
    desc: 'On-ground programs celebrating impact and participation through certification.',
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
    price: 10000,
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

  const hoverBorderClass = {
    'text-blue-600': 'hover:border-blue-200 hover:shadow-blue-50/20',
    'text-emerald-600': 'hover:border-emerald-200 hover:shadow-emerald-50/20',
    'text-purple-600': 'hover:border-purple-200 hover:shadow-purple-50/20',
    'text-orange-600': 'hover:border-orange-200 hover:shadow-orange-50/20',
  }[form.accent] || 'hover:border-slate-300'

  return (
    <motion.div
      variants={staggerItem}
      layout
      className={`overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${hoverBorderClass}`}
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl ${form.bg} ${form.accent} shadow-sm shadow-slate-100`}>
              {form.icon}
            </div>
            <div>
              <div className="text-sm sm:text-base font-extrabold text-slate-800">{form.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{form.desc}</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className={`ml-2 sm:ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open
                ? 'border-slate-300 bg-slate-100 rotate-45 text-slate-600'
                : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600'
              }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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


const FaqAccordionCard = ({ faq, theme }) => {
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative overflow-hidden transition-all duration-300 border-b border-slate-100 last:border-b-0 bg-transparent rounded-none shadow-none sm:border sm:border-slate-200/90 sm:bg-white sm:rounded-3xl sm:shadow-[0_18px_34px_-26px_rgba(15,23,42,0.6)] ${theme.hover}`}
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.bar} hidden sm:block`} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full py-4 px-0 sm:p-5 text-left focus:outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${theme.chip} mb-3 hidden sm:inline-flex`}>
              {faq.category}
            </div>
            <h3 className="text-sm font-semibold text-slate-800 sm:font-bold sm:text-slate-900 leading-snug">{faq.question}</h3>
          </div>
          {/* Desktop Toggle Icon */}
          <span className={`mt-1 hidden sm:inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-transform duration-300 ${theme.icon} ${open ? 'rotate-45' : ''}`}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {/* Mobile Toggle Icon */}
          <span className={`mt-0.5 inline-flex sm:hidden h-5 w-5 shrink-0 items-center justify-center text-slate-400 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`}>
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pb-4 px-0 sm:px-5 sm:pb-5 space-y-2">
          {faq.answer.map((line, i) => (
            <p key={i} className="text-[13px] sm:text-sm leading-relaxed text-slate-600">
              <FAQTextLine text={line} bulletClass={theme.bullet} />
            </p>
          ))}
          {Array.isArray(faq.points) && faq.points.length > 0 && (
            <ul className="mt-2 space-y-1.5 text-[13px] sm:text-sm text-slate-600">
              {faq.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${theme.bullet}`} />
                  <span><FAQTextLine text={point} bulletClass={theme.bullet} /></span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.article>
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
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(courseTabs[0])
  const [lightbox, setLightbox] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [plans, setPlans] = useState(defaultPlans)
  const [plansError, setPlansError] = useState('')
  const [expandedPlans, setExpandedPlans] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [formExpanded, setFormExpanded] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const togglePlan = (key) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }
  const [heroSlide, setHeroSlide] = useState(0)

  const tabsRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = useCallback(() => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      // If layout hasn't rendered widths yet, assume we need right arrow if we have tabs
      if (scrollWidth === 0) {
        setShowLeftArrow(false)
        setShowRightArrow(true)
        return
      }
      setShowLeftArrow(scrollLeft > 5)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }, [])

  useEffect(() => {
    const el = tabsRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      checkScroll()
      // Run checking after short timeout to let browser layout settle
      const t = setTimeout(checkScroll, 200)
      window.addEventListener('resize', checkScroll)
      return () => {
        el.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
        clearTimeout(t)
      }
    }
  }, [checkScroll])

  const trustSlides = useMemo(() => [
    {
      src: '/stories/Copy of WhatsApp Image 2023-12-16 at 12.59.52.jpeg',
      caption: 'Partnerships That Shape the Future',
      title: 'Partnerships That Shape the Future',
      desc: 'We have built strategic alliances with institutions, corporates, and investors across India and globally to fuel startup growth.',
      cta: { label: 'Partner With Us', to: '/join' },
      tag: 'Partnerships',
    },
    {
      src: '/stories/WhatsApp Image 2026-03-22 at 9.35.11 PM.jpeg',
      caption: 'Advancing Education Through Leadership with CM Meghalaya',
      title: 'Advancing Education Through Leadership with CM Meghalaya',
      desc: "Recognized by state leadership — EDC India's work in entrepreneurship development has reached the corridors of government.",
      cta: { label: 'About EDC India', to: '/about-us' },
      tag: 'Recognition',
    },
    {
      src: '/stories/newImg1.jpeg',
      caption: 'Where Collaboration Meets Opportunity',
      title: 'Where Collaboration Meets Opportunity',
      desc: 'We bring together the right people, resources, and platforms to turn ideas into impact — across India and beyond.',
      cta: { label: 'Join the Ecosystem', to: '/join' },
      tag: 'Collaboration',
    },
    {
      src: '/stories/newImg2.jpeg',
      caption: 'Creating Pathways for Global Learning',
      title: 'Creating Pathways for Global Learning',
      desc: 'We create structured pathways for students, founders and professionals to learn, network, and scale in a global environment.',
      cta: { label: 'Get Started', to: '/join' },
      tag: 'Growth',
    },
    {
      src: '/stories/ChatGPT Image Jan 29, 2026, 04_18_46 PM.png',
      caption: 'Opening Doors to International Education and Exposure',
      title: 'Opening Doors to International Education and Exposure',
      desc: 'EDC India connects students and founders to international education, global campuses, and cross-border learning opportunities.',
      cta: { label: 'Explore Programs', to: '/join' },
      tag: 'Education',
    },
    {
      src: '/stories/Expanding opportunities through UP government partnerships.webp',
      caption: 'Expanding opportunities through UP government partnerships.',
      title: 'Expanding opportunities through UP government partnerships.',
      desc: 'Expanding opportunities through UP government partnerships.',
      cta: { label: 'Join the Ecosystem', to: '/join' },
      tag: 'Partnerships',
    },
    {
      src: '/stories/Partnerships that create opportunities and inspire innovation..webp',
      caption: 'Partnerships that create opportunities and inspire innovation.',
      title: 'Partnerships that create opportunities and inspire innovation.',
      desc: 'Partnerships that create opportunities and inspire innovation.',
      cta: { label: 'Join the Ecosystem', to: '/join' },
      tag: 'Innovation',
    },
  ], [])

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((p) => (p + 1) % trustSlides.length), 4000)
    return () => clearInterval(t)
  }, [trustSlides.length])
  const heroHeadlineWords = 'Entrepreneurship is not just about starting a company — it’s about building a mindset.'.split(' ')
  const homeNavItems = [
    { label: 'Home', type: 'anchor', target: 'home' },
    { label: 'About', type: 'route', to: '/about-us' },
    { label: 'Fellowship', type: 'route', to: '/fellowship' },
    { label: 'Membership', type: 'route', to: '/startup-membership' },
    { label: 'Validation', type: 'route', to: '/membership-validation' },
    { label: 'Ranking', type: 'route', to: '/ranking' },
  ]
  const faqPreviewItems = useMemo(() => {
    const allFaqs = getAllFaqItems()
    const randomized = [...allFaqs].sort(() => Math.random() - 0.5)
    return randomized.slice(0, Math.min(allFaqs.length, 4))
  }, [])
  const faqCardThemes = [
    {
      bar: 'from-blue-500 via-cyan-500 to-indigo-500',
      chip: 'border-blue-100 bg-blue-50 text-blue-700',
      icon: 'border-blue-100 bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
      bullet: 'bg-blue-500',
      hover: 'hover:border-blue-200 hover:shadow-[0_26px_44px_-28px_rgba(37,99,235,0.45)]',
    },
    {
      bar: 'from-emerald-500 via-teal-500 to-cyan-500',
      chip: 'border-emerald-100 bg-emerald-50 text-emerald-700',
      icon: 'border-emerald-100 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
      bullet: 'bg-emerald-500',
      hover: 'hover:border-emerald-200 hover:shadow-[0_26px_44px_-28px_rgba(16,185,129,0.42)]',
    },
    {
      bar: 'from-violet-500 via-indigo-500 to-blue-500',
      chip: 'border-violet-100 bg-violet-50 text-violet-700',
      icon: 'border-violet-100 bg-violet-50 text-violet-700 group-hover:bg-violet-600 group-hover:text-white',
      bullet: 'bg-violet-500',
      hover: 'hover:border-violet-200 hover:shadow-[0_26px_44px_-28px_rgba(124,58,237,0.42)]',
    },
    {
      bar: 'from-amber-500 via-orange-500 to-rose-500',
      chip: 'border-amber-100 bg-amber-50 text-amber-700',
      icon: 'border-amber-100 bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white',
      bullet: 'bg-amber-500',
      hover: 'hover:border-amber-200 hover:shadow-[0_26px_44px_-28px_rgba(245,158,11,0.38)]',
    },
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

  const isHomeNavActive = (item) => {
    if (item.type === 'anchor') return item.target === 'home' && location.pathname === '/'
    if (item.type === 'route') {
      return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
    }
    return false
  }

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.png" alt="EDC India" className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white object-contain" />
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </div>

          <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex lg:gap-8 lg:text-sm">
            {homeNavItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`nav-link transition ${isHomeNavActive(item) ? 'nav-link-active' : 'hover:text-slate-900'}`}
                  onClick={handleRouteNavTop}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`#${item.target}`}
                  className={`nav-link transition ${isHomeNavActive(item) ? 'nav-link-active' : 'hover:text-slate-900'}`}
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
              className="inline-flex h-9 shrink-0 items-center rounded-full border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:hidden"
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
              <div className="mx-auto max-w-7xl px-3 pb-3 pt-1.5 sm:px-6 sm:pb-4 sm:pt-2">
                <div className="overflow-hidden rounded-b-[1.5rem] border border-slate-200/80 border-t-0 bg-white p-2.5 sm:p-3 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.58)] backdrop-blur-xl">
                  <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
                    {homeNavItems.map((item) => (
                      <motion.div key={item.label} variants={homeMobileItemVariants}>
                        {item.type === 'route' ? (
                          <Link
                            to={item.to}
                            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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
                            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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

      {/* ═══════════════ ANNOUNCEMENT STRIP ═══════════════ */}
      <div className="relative z-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-1.5 sm:py-2.5">
        <Link
          to="/events/dubai-2026"
          onClick={handleRouteNavTop}
          className="group mx-auto flex max-w-7xl items-center justify-center gap-1.5 px-3 text-center sm:px-4 hover:brightness-105 active:scale-[0.99] transition duration-200"
        >
          <Flame className="h-3.5 w-3.5 text-amber-300 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-bold tracking-wide">
            {/* Desktop text */}
            <span className="hidden md:inline">
              Applications Open — Dubai 2026 · ₹50,000 All-Inclusive · Limited Seats
            </span>
            {/* Tablet text */}
            <span className="hidden sm:inline md:hidden">
              Dubai 2026 · ₹50,000 All-Inclusive · Apply Now
            </span>
            {/* Mobile text */}
            <span className="inline sm:hidden">
              Dubai 2026: ₹50k All-Inclusive · Apply Now
            </span>
          </span>
          <span className="text-[10px] sm:text-xs font-extrabold ml-0.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="blob-float absolute -right-40 -top-40 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="blob-float-reverse absolute -bottom-32 -left-32 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-3 pt-6 pb-0 sm:px-6 sm:pt-14 lg:pt-16 xl:pt-20">

          {/* ── TWO COLUMN SPLIT ── */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-start">

            {/* ══ LEFT COLUMN — text + dynamic gallery info ══ */}
            <div className="flex flex-col">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
                <motion.h1
                  className="mt-1 sm:mt-2 text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.2rem] xl:text-[3.8rem]"
                  variants={staggerContainer} initial="hidden" animate="visible"
                >
                  {heroHeadlineWords.map((word, index) => (
                    <motion.span key={`${word}-${index}`} variants={staggerItem} data-text={word}
                      className={`inline-block mr-[0.35em] sm:mr-3 ${index >= heroHeadlineWords.length - 4 ? 'hero-premium-accent' : 'text-white'}`}>
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.div className="mt-4 h-1 w-40 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"
                  initial={{ opacity: 0, scaleX: 0.5 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                  Courses, Funding, Global Exposure &amp; Startup Growth Ecosystem
                </p>
                <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4">
                  <Link to="/join" onClick={handleRouteNavTop} className="cta-pulse group rounded-full bg-white px-3 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-blue-700 shadow-2xl transition hover:bg-blue-50 text-center lg:px-8 lg:py-4 lg:text-base w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
                    Join Now <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
                  </Link>
                  <a href="#programs" className="rounded-full border border-white/30 bg-white/10 px-3 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 text-center lg:px-8 lg:py-4 lg:text-base w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
                    Explore Programs
                  </a>
                </div>
              </motion.div>
            </div>

            {/* ══ RIGHT COLUMN — big photo + dynamic text below ══ */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Big photo */}
              <div className="relative rounded-2xl overflow-hidden group h-[220px] sm:h-[340px] lg:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroSlide}
                    src={trustSlides[heroSlide].src}
                    alt={trustSlides[heroSlide].caption}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Tag */}
                <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${trustSlides[heroSlide].highlight ? 'bg-amber-500 text-black' : 'bg-black/40 border border-white/20 text-white'}`}>
                  {trustSlides[heroSlide].highlight && <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />}
                  {trustSlides[heroSlide].tag}
                </div>

                {/* Prev / Next */}
                <button onClick={() => setHeroSlide(p => (p - 1 + trustSlides.length) % trustSlides.length)}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-white/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Previous">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button onClick={() => setHeroSlide(p => (p + 1) % trustSlides.length)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-white/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Next">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {trustSlides.map((_, i) => (
                    <button key={i} onClick={() => setHeroSlide(i)}
                      className={`rounded-full transition-all duration-300 ${i === heroSlide ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
                      aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
              </div>

              {/* Dynamic text below photo */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 space-y-2 sm:mt-4 sm:space-y-3"
                >
                  <h3 className="text-lg font-black text-white leading-snug sm:text-xl lg:text-2xl">
                    {trustSlides[heroSlide].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    {trustSlides[heroSlide].desc}
                  </p>
                  {trustSlides[heroSlide].highlight && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['✈️ Delhi → Dubai', '📅 September 2026', '₹50,000 All-Inclusive', '4 Days · 3 Nights'].map(f => (
                        <span key={f} className="rounded-full bg-amber-500/15 border border-amber-400/25 px-2.5 py-1 text-[10px] font-semibold text-amber-200">{f}</span>
                      ))}
                    </div>
                  )}
                  <Link
                    to={trustSlides[heroSlide].cta.to}
                    onClick={handleRouteNavTop}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 sm:py-2.5 text-sm font-bold transition hover:scale-[1.03] ${trustSlides[heroSlide].highlight ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg shadow-amber-500/25' : 'bg-white/15 border border-white/20 text-white hover:bg-white/25'}`}
                  >
                    {trustSlides[heroSlide].cta.label}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          {/* ── FULL-WIDTH STAT TILES ── */}
          <motion.div
            className="mt-6 sm:mt-10 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4 pb-8 sm:pb-14"
            variants={staggerContainer} initial="hidden" animate="visible"
          >
            {[
              { num: 500, label: 'Startups', icon: <Rocket className="h-5 w-5 text-white/70" />, suffix: '+' },
              { num: 50, label: 'Funding Raised', icon: <IndianRupee className="h-5 w-5 text-white/70" />, prefix: '₹', suffix: 'Cr+' },
              { num: 100, label: 'Partners', icon: <Handshake className="h-5 w-5 text-white/70" />, suffix: '+' },
              { num: 25, label: 'Countries', icon: <Globe className="h-5 w-5 text-white/70" />, suffix: '+' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="card-hover-glow rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-0 text-left sm:text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1">
                <div className="flex justify-center text-white/70 shrink-0 sm:mb-1">{stat.icon}</div>
                <div>
                  <Counter value={stat.num} label={stat.label} prefix={stat.prefix || ''} suffix={stat.suffix} className="text-base sm:text-2xl font-bold text-white block" labelClassName="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-medium text-white/60 block" />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"><svg viewBox="0 0 1440 80" className="w-full fill-white"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" /></svg></div>
      </section>



      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <motion.div variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Who We Are</div>
              <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Empowering Startups Across India</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Entrepreneurial Development Council (EDC India) is a mission-driven organization working to build and strengthen the entrepreneurial ecosystem across India and globally. Since 2019, we have been actively working to spread entrepreneurial awareness, enable innovation, and help individuals understand that entrepreneurship is not limited to starting a startup — it is a way of thinking, solving, and creating impact.
              </p>
              <div className="mt-5 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2">
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
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
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

      {/* ═══════════════ UPCOMING EVENT ═══════════════ */}
      <section id="upcoming-event" className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(to bottom, #020b18 0%, #041428 40%, #020b18 100%)' }}>

        {/* Dubai Skyline Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80&auto=format&fit=crop"
            alt="Dubai Skyline"
            className="h-full w-full object-cover object-center"
            style={{ opacity: 0.2 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(2,11,24,0.6) 0%, rgba(2,11,24,0.15) 35%, rgba(2,11,24,0.65) 70%, rgba(2,11,24,1) 100%)' }} />
        </div>

        {/* Gold shimmer top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-10" style={{ background: 'linear-gradient(90deg, transparent 0%, #c9a84c 30%, #f5d78e 50%, #c9a84c 70%, transparent 100%)' }} />

        {/* Ambient glow orbs */}
        <div className="absolute left-1/4 top-1/2 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full blur-[140px] z-0" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)' }} />
        <div className="absolute right-1/4 top-1/2 h-[150px] w-[150px] sm:h-[300px] sm:w-[300px] rounded-full blur-[120px] z-0" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 mx-auto max-w-[1400px] px-3 sm:px-6 py-6 sm:py-10 lg:py-12">

          {/* Top label + headline — compact horizontal layout */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ border: '1px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.07)', color: '#f5d78e' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#c9a84c' }}></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#c9a84c' }}></span>
                </span>
                Upcoming International Exposure Visit
              </div>
              <h2 className="text-2xl font-black sm:text-3xl lg:text-5xl leading-none tracking-tight">
                <span className="text-white">Dubai </span>
                <span style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f5d78e 45%, #c9a84c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Edition 2026</span>
              </h2>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'rgba(245,215,142,0.6)' }}>
                Global Startup Exposure Visit
              </p>
              <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
            </div>
          </motion.div>

          {/* Main content grid - 2 column layout on desktop */}
          <motion.div className="grid gap-4 lg:grid-cols-12 lg:gap-5 lg:items-stretch" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            {/* Left — Content + Highlights */}
            <motion.div variants={fadeIn} transition={{ duration: 0.7 }} className="col-span-full lg:col-span-7 space-y-4">

              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span className="font-semibold text-white">Dream. Explore. Build.</span> A 4-day international program for young founders, student innovators, and aspiring entrepreneurs — immersed in Dubai's world-class startup ecosystem with direct access to global investors and mentors.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '4', unit: 'Days', label: 'Immersive Program' },
                  { value: '2', unit: 'Cities', label: 'Delhi <-> Dubai' },
                  { value: '∞', unit: 'Network', label: 'Global Connections' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)' }}>
                    <div className="text-lg font-black" style={{ color: '#f5d78e' }}>{stat.value}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>{stat.unit}</div>
                    <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#c9a84c' }}><Calendar className="h-3 w-3" /> When</div>
                  <div className="text-xs font-bold text-white">September 2026</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>2026</div>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#c9a84c' }}><Plane className="h-3 w-3" /> Route</div>
                  <div className="text-xs font-bold text-white">Delhi - Dubai</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>↔ Dubai, UAE</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/events/dubai-2026"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 sm:py-2 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto justify-center"
                  style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)', color: '#0a0a0a', boxShadow: '0 6px 24px rgba(201,168,76,0.3)' }}
                >
                  <Globe className="h-3.5 w-3.5" />
                  Explore the Event
                </Link>
                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  By <span style={{ color: 'rgba(255,255,255,0.6)' }}>EDC India</span> × IIT Ropar × TBIF × ITQAN UAE
                </p>
              </div>

              {/* Highlights card - moved here */}
              <motion.div variants={slideFromRight} transition={{ duration: 0.7, delay: 0.15 }} className="relative">

                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl blur-2xl" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(14,165,233,0.08))' }} />

                  <div className="relative rounded-2xl p-4 sm:p-5" style={{ background: 'linear-gradient(145deg, rgba(10,20,40,0.96) 0%, rgba(5,12,28,0.98) 100%)', border: '1px solid rgba(201,168,76,0.22)', boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.12)' }}>

                    {/* Card header */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="h-6 w-0.5 rounded-full" style={{ background: 'linear-gradient(to bottom, #f5d78e, #c9a84c)' }} />
                      <h3 className="text-xs font-bold text-white tracking-wide uppercase" style={{ letterSpacing: '0.08em' }}>Program Highlights</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { icon: <Rocket className="h-4 w-4" />, title: 'International Startup Exposure', desc: "Deep dive into Dubai's world-class innovation ecosystem" },
                        { icon: <Handshake className="h-4 w-4" />, title: 'Mentorship & Guidance', desc: 'Learn directly from global industry leaders and investors' },
                        { icon: <TrendingUp className="h-4 w-4" />, title: 'Funding Opportunities', desc: 'Exclusive investor interactions and pitch sessions' },
                        { icon: <Globe className="h-4 w-4" />, title: 'Global Market Access', desc: 'Strategies for scaling your venture beyond borders' },
                      ].map((highlight, idx) => (
                        <div key={idx} className="flex gap-2.5 group">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.18)', color: '#c9a84c' }}>
                            {highlight.icon}
                          </div>
                          <div className="pt-0.5">
                            <div className="text-[11px] font-bold text-white">{highlight.title}</div>
                            <div className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{highlight.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Who should attend */}
                    <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
                      <div className="text-[9px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#c9a84c' }}>Who Should Attend</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Young Founders', 'Student Innovators', 'Aspiring Entrepreneurs', 'Startup Founders'].map(tag => (
                          <span key={tag} className="rounded-md px-2 py-0.5 text-[9px] font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.65)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decorative footer */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.25), transparent)' }} />
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(201,168,76,0.45)' }}>
                        <MapPin className="h-3 w-3" />Dubai, UAE
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25))' }} />
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right — Dubai Poster */}
            <motion.div
              variants={slideFromRight}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="col-span-full lg:col-span-5 flex relative"
            >
              <Link to="/events/dubai-2026" className="block relative lg:absolute lg:inset-0 group cursor-pointer w-full aspect-[4/3] sm:aspect-[3/4] lg:aspect-auto max-h-[280px] sm:max-h-none">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 rounded-xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #0ea5e9 100%)' }} />

                {/* Image container — full height to match left column */}
                <div className="relative rounded-xl overflow-hidden h-full w-full"
                  style={{ border: '2px solid rgba(201,168,76,0.5)', boxShadow: '0 20px 60px rgba(201,168,76,0.3)' }}>
                  <img
                    src="/dubai/dubai_50000_hoz.jpeg"
                    alt="Dubai Edition 2026 — ₹50,000 All Inclusive"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 rounded-full px-4 py-2 backdrop-blur-md shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f5d78e 100%)', border: '1px solid rgba(245,215,142,0.6)' }}>
                    <span className="text-[10px] font-black text-slate-900 tracking-wider flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-900 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-900"></span>
                      </span>
                      FEATURED EVENT
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-lg font-bold mb-2">Click to Explore</div>
                      <div className="text-cyan-300 text-sm">View Full Event Details →</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* Gold shimmer bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-10" style={{ background: 'linear-gradient(90deg, transparent 0%, #c9a84c 30%, #f5d78e 50%, #c9a84c 70%, transparent 100%)' }} />
      </section>

      {/* ═══════════════ PROGRAMS ═══════════════ */}
      <section id="programs" className="bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
            <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm mb-4">What We Do</div>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Everything Your Startup Needs</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">End-to-end ecosystem support to take your idea from concept to global scale.</p>
          </motion.div>
          <motion.div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {offerings.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="animated-border group rounded-2xl border border-white/10 bg-white/10 p-3.5 sm:p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15 flex flex-col justify-between"
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div>
                  <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/20 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0 [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-6 sm:[&_svg]:w-6">{item.icon}</div>
                  <div className="mt-3 text-xs sm:text-sm font-bold text-white leading-snug">{item.title}</div>
                  <div className="mt-1.5 text-[10px] sm:text-xs leading-relaxed text-white/50 line-clamp-3 sm:line-clamp-none">{item.desc}</div>
                </div>
                <button onClick={() => navigate(item.route)} className="mt-3 inline-block text-[10px] sm:text-xs font-semibold text-cyan-300 text-left">Explore →</button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FUNDING ═══════════════ */}
      <section id="funding" className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Startup Funding Support</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Your Path to Funding</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">A structured approach to make your startup investor-ready.</p>
          </motion.div>
          <div className="relative mt-8 sm:mt-12">
            {/* connector line through icon centers */}
            <div className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0" />
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-0 lg:gap-4">
              {fundingSteps.map((step, index) => (
                <div key={step.step} className="relative flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0 group pb-6 lg:pb-0">
                  {index !== fundingSteps.length - 1 && (
                    <div className="lg:hidden absolute left-5 top-5 -bottom-6 w-0.5 bg-slate-200 group-hover:bg-blue-400 transition-colors duration-300 z-0" />
                  )}
                  {/* Horizontal branch line from vertical connector to the card */}
                  <div className="lg:hidden absolute left-5 top-5 w-9 h-0.5 bg-slate-200 group-hover:bg-blue-400 transition-colors duration-300 z-0" />

                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform [&_svg]:h-5 [&_svg]:w-5">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 lg:mt-4 w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Step {index + 1}</div>
                    <div className="mt-2 text-sm font-bold text-slate-800">{step.step}</div>
                    <div className="mt-1 text-xs text-slate-500">{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PLANS ═══════════════ */}
      <section id="plans" className="bg-gradient-to-br from-slate-50 to-indigo-50/30 py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-3 sm:px-6 xl:max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">Membership Plans</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Choose Your Plan</h2>
            <p className="mt-3 text-sm text-slate-500">Two pathways to grow your startup with EDC India</p>
          </motion.div>
          <motion.div className="mt-8 sm:mt-10 hidden sm:grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
                <motion.div key={plan.slug || `${plan.name}-${index}`} variants={staggerItem} className={`relative rounded-3xl bg-white p-5 sm:p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${theme.border}`} whileHover={{ scale: 1.02 }}>
                  {plan.badge && (
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold ${theme.badgeTheme}`}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-2xl font-bold sm:text-3xl ${theme.priceTheme}`}>₹{Number(plan.price || 0).toLocaleString('en-IN')}</span>
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

          {/* Mobile Collapsible View */}
          <div className="mt-8 flex flex-col gap-4 sm:hidden">
            {plans.map((plan, index) => {
              const key = plan.slug || `${plan.name}-${index}`;
              const isExpanded = !!expandedPlans[key];
              const planThemes = [
                { border: 'border border-slate-200', badgeTheme: 'bg-blue-50 text-blue-600', priceTheme: 'text-primary', checkColor: 'text-green-500', btnTheme: 'bg-primary hover:bg-blue-700 shadow-blue-200/50' },
                { border: 'border border-purple-200', badgeTheme: 'bg-purple-50 text-purple-600', priceTheme: 'text-purple-600', checkColor: 'text-purple-500', btnTheme: 'bg-purple-600 hover:bg-purple-700 shadow-purple-200/50' },
                { border: 'border border-indigo-200', badgeTheme: 'bg-indigo-50 text-indigo-600', priceTheme: 'text-indigo-600', checkColor: 'text-indigo-500', btnTheme: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200/50' },
              ];
              const theme = planThemes[index % planThemes.length];

              return (
                <div key={key} className={`rounded-2xl bg-white p-4 shadow-md transition-all ${theme.border}`}>
                  {/* Collapsible Header */}
                  <div
                    onClick={() => togglePlan(key)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex flex-col">
                      {plan.badge && (
                        <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-1.5 ${theme.badgeTheme}`}>
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="text-sm font-extrabold text-slate-800">{plan.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className={`text-base font-extrabold ${theme.priceTheme}`}>₹{Number(plan.price || 0).toLocaleString('en-IN')}</span>
                        <span className="text-[9px] font-semibold text-slate-500">{plan.billingText || 'one-time'}</span>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-slate-100 mt-3.5">
                          <p className="text-xs leading-relaxed text-slate-500 mb-4 font-medium">{plan.description}</p>
                          <ul className="space-y-2.5 text-xs text-slate-600 mb-5 bg-white">
                            {(plan.features || []).map((f, i) => (
                              <li key={i} className="flex items-start gap-2 font-semibold">
                                <span className={`mt-0.5 ${theme.checkColor}`}>✓</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => navigate((plan.ctaRoute || '/join').trim().startsWith('/') ? (plan.ctaRoute || '/join').trim() : `/${(plan.ctaRoute || 'join').trim()}`)}
                            className={`w-full rounded-xl py-3 text-xs font-semibold text-white shadow-md transition ${theme.btnTheme}`}
                          >
                            {(plan.ctaText || 'Join Now')} — ₹{Number(plan.price || 0).toLocaleString('en-IN')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ COURSES ═══════════════ */}
      <section id="courses" className="bg-white py-12 sm:py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 w-full max-w-full">
          <motion.div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.1fr_1fr] w-full max-w-full min-w-0" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <motion.div variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full max-w-full min-w-0">
              <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Courses</div>
              <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Entrepreneurship Learning Tracks</h2>
              <p className="mt-4 text-sm text-slate-600">Modular tracks built to guide founders from ideation to global expansion.</p>
              <div className="relative mt-6 w-full max-w-full overflow-hidden">
                {showLeftArrow && (
                  <div className="sm:hidden absolute left-0 top-0 bottom-2 w-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10 flex items-center justify-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-slate-100 backdrop-blur-sm">
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )}
                {showRightArrow && (
                  <div className="sm:hidden absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 flex items-center justify-end">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-slate-100 backdrop-blur-sm">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )}
                <div
                  ref={tabsRef}
                  className="flex flex-row overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                >
                  {courseTabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab)}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-[11px] font-semibold transition ${activeTab.name === tab.name ? 'bg-primary text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border-2 border-transparent bg-white p-4 shadow-sm sm:p-8 w-full max-w-full min-w-0" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #06b6d4) border-box' }}>
              <div className="text-base sm:text-lg font-bold text-slate-800">{activeTab.name}</div>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600">{activeTab.description}</p>
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {activeTab.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
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
      <section id="partners" className="bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
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
          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {[
              { num: 120, label: 'Partner Hubs', icon: <Building2 className="h-5 w-5" /> },
              { num: 27, label: 'States Covered', icon: <MapPin className="h-5 w-5" /> },
              { num: 45, label: 'Student Reach', suffix: 'K+', icon: <Users className="h-5 w-5" /> },
              { num: 300, label: 'Innovation Labs', icon: <Zap className="h-5 w-5" /> },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 p-3 sm:p-5 flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-0 text-left sm:text-center backdrop-blur-sm">
                <div className="flex justify-center text-white/60 shrink-0 sm:mb-2">{stat.icon}</div>
                <div>
                  <Counter value={stat.num} label={stat.label} suffix={stat.suffix || '+'} className="text-base sm:text-xl font-bold text-white block" labelClassName="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-medium text-white/60 block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INSTITUTIONAL PRESENCE ═══════════════ */}
      <section className="overflow-hidden bg-white py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Our Presence</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Our Institutional Presence</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">Empowering entrepreneurship across leading institutions nationwide.</p>
          </motion.div>
        </div>
        <div className="relative mt-8 sm:mt-12">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-white to-transparent" />

          {/* Desktop/Tablet Marquee (Single Row) */}
          <div className="hidden sm:block marquee-track">
            <div className="marquee-inner">
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="flex shrink-0 items-center gap-8">
                  {['1-2.webp', '1.webp', '10.webp', '11.webp', '12.webp', '13.webp', '14.webp', '15.webp', '16.webp', '17.webp', '18.webp', '19.webp', '2.webp', '20.webp', '21.webp', '22-3.webp', '22.webp', '23.webp', '24.webp', '25.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8-3.webp', '8.webp'].map((file) => (
                    <div key={`${setIdx}-${file}`} className="flex h-16 w-28 sm:h-20 sm:w-36 md:h-24 md:w-44 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 sm:p-3 shadow-sm">
                      <img src={`/insti/${file}`} alt="Institution" className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Marquee (Two Rows, LTR + RTL, Slow Speed) */}
          <div className="block sm:hidden space-y-4">
            {/* Row 1: Left to Right (LTR) */}
            <div className="marquee-track overflow-hidden">
              <div className="flex w-max animate-[marquee-ltr_45s_linear_infinite]">
                {[0, 1].map((setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center gap-4 px-2">
                    {['1-2.webp', '1.webp', '10.webp', '11.webp', '12.webp', '13.webp', '14.webp', '15.webp', '16.webp', '17.webp', '18.webp', '19.webp', '2.webp', '20.webp'].map((file) => (
                      <div key={`${setIdx}-${file}`} className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
                        <img src={`/insti/${file}`} alt="Institution" className="max-h-full max-w-full object-contain" loading="lazy" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Right to Left (RTL) */}
            <div className="marquee-track overflow-hidden">
              <div className="flex w-max animate-[marquee-rtl_48s_linear_infinite]">
                {[0, 1].map((setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center gap-4 px-2">
                    {['21.webp', '22-3.webp', '22.webp', '23.webp', '24.webp', '25.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8-3.webp', '8.webp'].map((file) => (
                      <div key={`${setIdx}-${file}`} className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
                        <img src={`/insti/${file}`} alt="Institution" className="max-h-full max-w-full object-contain" loading="lazy" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STARTUPS SHOWCASE ═══════════════ */}
      <section className="bg-slate-50 py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-4">Startup Portfolio</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Startups We Have Started</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">A glimpse of ventures initiated and supported through the EDC India ecosystem.</p>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['s1.jpeg', 's2.jpeg', 's3.jpeg', 's4.jpeg'].map((file) => (
              <motion.div key={file} variants={staggerItem} className="flex h-16 w-28 sm:h-20 sm:w-36 md:h-24 md:w-44 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 sm:p-3 shadow-sm">
                <img src={`/startups/${file}`} alt="Startup" className="max-h-full max-w-full object-contain" loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ RANK YOUR COLLEGE ═══════════════ */}
      <section id="ranking" className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/40 py-12 sm:py-20 lg:py-28">
        <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-100/60 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              Apply for Recognition
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">Rank Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">College</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">Get recognized by India's most transparent innovation & incubation ranking.</p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 items-center">
            {/* Left — stats/benefits */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-5">
              {[
                { icon: University, title: '70+ Universities', desc: 'Already ranked and recognized by EDC India' },
                { icon: BarChart3, title: 'Transparent Evaluation', desc: 'On-ground, data-driven ranking methodology' },
                { icon: Trophy, title: 'National Recognition', desc: 'Awards, certificates, and public recognition' },
                { icon: Globe, title: 'Global Visibility', desc: "Featured in EDC India's national reports and media" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col p-3.5 sm:p-5 rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md hover:border-blue-100 sm:flex-row sm:items-start sm:gap-4"
                  >
                    <div className="flex items-center gap-2 sm:contents">
                      <div className="flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="font-bold text-slate-800 text-xs sm:text-base leading-snug sm:hidden text-left">{item.title}</div>
                    </div>
                    <div className="mt-2.5 sm:mt-0 text-left">
                      <div className="font-bold text-slate-800 text-xs sm:text-base leading-snug hidden sm:block mb-1">{item.title}</div>
                      <div className="text-[10px] sm:text-sm text-slate-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 blur-xl opacity-60" />
              <div className={`relative rounded-3xl border bg-white p-4 sm:p-8 shadow-xl transition-all duration-300 ${formExpanded ? 'border-blue-200 shadow-2xl shadow-blue-100/30' : 'border-slate-100'}`}>
                <div
                  onClick={() => {
                    if (isMobile) {
                      setFormExpanded(!formExpanded)
                    }
                  }}
                  className={`flex items-center justify-between cursor-pointer sm:cursor-default select-none group/hdr transition-all duration-300 ${formExpanded ? 'mb-6' : 'mb-0 sm:mb-6'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg transition-transform duration-300 group-hover/hdr:scale-105">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-left transition-colors duration-300 group-hover/hdr:text-primary">Quick Application</div>
                      <div className="text-xs text-slate-500 text-left flex flex-wrap items-center gap-1 sm:gap-1.5">
                        <span>Takes less than 2 minutes</span>
                        <span className="sm:hidden text-primary font-semibold inline-flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full text-[10px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          Click to fill
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50/50 text-blue-600 border border-blue-100/50 sm:hidden transition-all duration-300 group-hover/hdr:scale-110">
                    {formExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {(!isMobile || formExpanded) && (
                    <motion.div
                      initial={isMobile ? { height: 0, opacity: 0 } : false}
                      animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                      exit={isMobile ? { height: 0, opacity: 0 } : false}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = {
                          collegeName: e.target.collegeName.value,
                          contactPerson: e.target.contactPerson.value,
                          email: e.target.email.value,
                          phone: e.target.phone.value,
                          message: e.target.message.value,
                        };

                        const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
                        const apiFromEnv = (API_BASE || '').trim().replace(/\/$/, '');
                        const baseCandidates = Array.from(new Set([
                          apiFromEnv,
                          '',
                          ...(apiFromEnv ? [] : ['http://localhost:5000']),
                          ...(isLocalhost ? ['http://127.0.0.1:5000'] : []),
                        ]));

                        let lastError = 'Failed to submit. Please try again.';

                        for (const base of baseCandidates) {
                          try {
                            const response = await fetch(`${base}/api/admin/college-ranking-application`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(formData),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (response.ok) {
                              alert(data.message || 'Application submitted successfully!');
                              e.target.reset();
                              return;
                            }

                            lastError = data.message || `Failed to submit (status ${response.status}).`;
                          } catch (err) {
                            const message = String(err?.message || '').trim();
                            if (message) lastError = message;
                          }
                        }

                        alert(lastError);
                      }}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
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
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                          <button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:opacity-90 active:scale-95">
                            Apply for Ranking →
                          </button>
                          <Link to="/ranking" className="flex-1 rounded-xl border-2 border-slate-200 py-3.5 text-center text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                            Full Application
                          </Link>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CollegeRatingSection />

      {/* ═══════════════ IMPACT ═══════════════ */}
      <section id="impact" className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Our Impact</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Numbers That Speak</h2>
          </motion.div>
          <motion.div className="mt-8 sm:mt-12 hidden sm:grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {impactStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} whileHover={{ scale: 1.05, y: -4 }} className="card-hover-glow rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 text-center shadow-sm transition hover:shadow-xl hover:border-blue-100">
                <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">{stat.icon}</div>
                <Counter value={stat.value} label={stat.label} className="mt-3 text-3xl font-bold text-blue-600" labelClassName="mt-1 text-xs font-medium text-slate-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Swiper View */}
          <div className="mt-8 block sm:hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              spaceBetween={16}
              className="py-2"
            >
              {impactStats.map((stat) => (
                <SwiperSlide key={stat.label}>
                  <div className="mx-auto max-w-[280px] flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-md text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                      {stat.icon}
                    </div>
                    <div>
                      <Counter
                        value={stat.value}
                        label={stat.label}
                        className="text-xl font-bold text-blue-600"
                        labelClassName="mt-0.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest leading-normal"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#0f2d6b] to-[#1a3a8f] py-12 sm:py-20 lg:py-28">
        {/* bg grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm mb-4 sm:mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" /> Startup Showcase
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl">Stories That <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Inspire</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50 text-sm">A glimpse into the journeys of founders, demo days, and global events.</p>
          </motion.div>

          <div className="relative mt-2 sm:mt-4 space-y-3 sm:space-y-4 overflow-hidden">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[#0b1e4d] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[#0b1e4d] to-transparent" />

            {/* Row 1 — left to right */}
            <div className="flex gap-2 sm:gap-4 marquee-ltr">
              {[...galleryItems, ...galleryItems].map((item, i) => (
                <button
                  key={`ltr-${i}`}
                  onClick={() => setLightbox(item.label)}
                  className="group relative shrink-0 w-52 h-36 sm:w-64 sm:h-44 lg:w-72 lg:h-48 overflow-hidden rounded-2xl focus:outline-none"
                >
                  <img src={`/stories/${item.file}`} alt={item.label} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/25 group-hover:to-indigo-600/25 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-bold text-white leading-tight">{item.label}</div>
                    <div className="mt-1 text-[11px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">{item.desc}</div>
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-white/10 border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">EDC</div>
                </button>
              ))}
            </div>

            {/* Row 2 — right to left */}
            <div className="flex gap-2 sm:gap-4 marquee-rtl">
              {[...galleryItems.slice().reverse(), ...galleryItems.slice().reverse()].map((item, i) => (
                <button
                  key={`rtl-${i}`}
                  onClick={() => setLightbox(item.label)}
                  className="group relative shrink-0 w-52 h-36 sm:w-64 sm:h-44 lg:w-72 lg:h-48 overflow-hidden rounded-2xl focus:outline-none"
                >
                  <img src={`/stories/${item.file}`} alt={item.label} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-cyan-600/0 group-hover:from-indigo-600/25 group-hover:to-cyan-600/25 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-bold text-white leading-tight">{item.label}</div>
                    <div className="mt-1 text-[11px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">{item.desc}</div>
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-white/10 border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">EDC</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Testimonials</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">Trusted by Founders & Investors</h2>
          </motion.div>
          <motion.div className="mt-8 sm:mt-12 hidden sm:grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {testimonials.map((item) => (
              <motion.div key={item.name} variants={staggerItem} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-8 shadow-lg transition hover:shadow-2xl">
                <div className="text-2xl sm:text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">&ldquo;</div>
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

          {/* Mobile Swiper View */}
          <div className="mt-8 block sm:hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              spaceBetween={16}
              className="py-2"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.name}>
                  <div className="mx-auto max-w-[280px] rounded-3xl border border-slate-100 bg-white p-5 shadow-lg text-left">
                    <div className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none">&ldquo;</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-4">{item.text}</p>
                    <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{item.initials}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{item.name}</div>
                        <div className="text-[10px] text-slate-500 leading-none mt-0.5">{item.role}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#fff7f0] py-12 sm:py-20 lg:py-28 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-orange-100/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-3 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">Get Started</div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-5xl">Applications & Partnerships</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">Pick your path and let's build together.</p>
          </motion.div>

          <motion.div className="mt-10 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 items-start" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { title: 'Startup Application', formType: 'startup_application', cta: 'Apply Now', icon: <Rocket className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', accent: 'text-blue-600', ring: 'focus:ring-blue-500/20 focus:border-blue-500', btn: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700', desc: 'Join the EDC India startup ecosystem.', successMessage: 'Thank you for applying to Startup Application. Our team will process your request shortly and get back to you.' },
              { title: 'Investor Interest', formType: 'investor_interest', cta: 'Join as Investor', icon: <Briefcase className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', accent: 'text-emerald-600', ring: 'focus:ring-emerald-500/20 focus:border-emerald-500', btn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700', desc: 'Connect with high-potential founders.', successMessage: 'Thank you for your investor interest. We will process your query shortly and connect with you.' },
              { title: 'College Partnership', formType: 'college_partnership', cta: 'Partner With Us', icon: <University className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: 'from-purple-500 to-pink-600', bg: 'bg-purple-50', accent: 'text-purple-600', ring: 'focus:ring-purple-500/20 focus:border-purple-500', btn: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700', desc: 'Build an on-campus startup ecosystem.', successMessage: 'Thank you for your college partnership request. We will process your query shortly.' },
              { title: 'Newsletter', formType: 'newsletter', cta: 'Subscribe', icon: <Mail className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: 'from-orange-500 to-rose-500', bg: 'bg-orange-50', accent: 'text-orange-600', ring: 'focus:ring-orange-500/20 focus:border-orange-500', btn: 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600', desc: 'Stay updated with funding & events.', successMessage: 'Thank you for subscribing. We will process your request shortly and share updates with you.' },
            ].map((form) => (
              <ContactCard key={form.title} form={form} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef4ff] via-white to-[#ecfeff] py-12 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0b3d91 1px,transparent 1px),linear-gradient(90deg,#0b3d91 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl border border-white/50 bg-white/30 p-5 shadow-none backdrop-blur-md sm:rounded-[2rem] sm:border-white/70 sm:bg-white/70 sm:p-6 lg:p-10 sm:shadow-[0_28px_56px_-34px_rgba(15,23,42,0.55)] sm:backdrop-blur-xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-blue-700">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[11px] font-bold text-white">Q</span>
                Frequently Asked Questions
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">Quick Answers Before You Apply</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">Four quick answers from our complete FAQ guide for rankings, applications, and evaluation details.</p>
              <div className="mt-3 sm:mt-5 hidden sm:flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Curated Preview</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Ranking + Application FAQs</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Updated for 2026 Event</span>
              </div>
            </motion.div>

            <motion.div className="mt-6 sm:mt-10 grid gap-0 sm:gap-5 sm:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {faqPreviewItems.map((faq, faqIndex) => {
                const theme = faqCardThemes[faqIndex % faqCardThemes.length]
                return (
                  <FaqAccordionCard key={`${faq.category}-${faq.id}`} faq={faq} theme={theme} />
                )
              })}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-6 sm:mt-8 text-center">
              <Link
                to="/faq"
                onClick={handleRouteNavTop}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-semibold text-white shadow-[0_18px_28px_-18px_rgba(11,61,145,0.8)] transition hover:bg-[#0a357f]"
              >
                See All FAQs
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
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
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/college-ranking-application" element={<CollegeRankingApplicationPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/events/dubai-2026" element={<DubaiEventPage />} />
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

