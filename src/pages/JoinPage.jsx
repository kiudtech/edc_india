import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../config'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

export default function JoinPage() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState(defaultPlans)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/plans`)
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setPlans(data)
        }
      } catch {
        // Keep defaults when backend is unavailable.
      }
    }

    fetchPlans()
  }, [])

  const cardClassByIndex = (index, isPopular) => {
    if (isPopular || index === 0) {
      return 'relative flex flex-col rounded-[2.5rem] border-2 border-primary bg-white p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_1px_rgba(255,107,0,0.5),_0_12px_40px_rgba(11,61,145,0.25)] lg:-mt-6 lg:mb-6'
    }

    return 'relative flex flex-col rounded-[2.5rem] border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30'
  }

  return (
    <div className="bg-accent min-h-screen text-ink pb-24 font-sans selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-24 text-center sm:py-32">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-accent to-accent"></div>
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"></div>
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest shadow-sm">
            Spark Your Journey
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pathway</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed font-medium">
            Whether you are just validating an idea or ready to accelerate a funded startup, we have a membership tier designed specifically for your growth.
          </p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid gap-8 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div key={plan.slug || `${plan.name}-${index}`} variants={fadeUp} className={cardClassByIndex(index, plan.isPopular)}>
              {plan.badge && (
                <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest w-fit ${plan.isPopular || index === 0 ? 'absolute -top-5 left-1/2 -translate-x-1/2 w-max border-primary bg-gradient-to-r from-primary to-secondary text-white shadow-lg' : 'border-slate-200 bg-slate-50/50 text-slate-600'}`}>
                  {plan.badge}
                </div>
              )}
              <h3 className={`text-2xl font-bold mt-2 ${plan.isPopular || index === 0 ? 'text-primary' : 'text-ink'}`}>{plan.name}</h3>
              <p className="mt-3 text-sm text-slate-500 min-h-[64px] leading-relaxed font-medium">
                {plan.description}
              </p>
              <div className="my-8 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-ink">₹{Number(plan.price || 0).toLocaleString('en-IN')}</span>
                <span className="text-sm font-semibold text-slate-500">{plan.billingText || '/ one-time'}</span>
              </div>
              <ul className="mb-10 flex-1 space-y-5 text-sm font-semibold text-slate-600">
                {(plan.features || []).map((item, i) => (
                  <li key={`${plan.slug || plan.name}-feature-${i}`} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(plan.ctaRoute || '/join')}
                className={`mt-auto w-full rounded-2xl px-6 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-xl ${(plan.isPopular || index === 0) ? 'bg-primary hover:bg-blue-800 hover:shadow-lg' : 'bg-ink hover:bg-slate-800'}`}
              >
                {(plan.ctaText || 'Join Now')} — ₹{Number(plan.price || 0).toLocaleString('en-IN')}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
