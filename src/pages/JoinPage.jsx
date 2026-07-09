import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check, ShieldCheck, Sparkles, WalletCards, ChevronDown, ChevronUp } from 'lucide-react'
import { API_BASE } from '../config'
import SiteFooter from '../components/SiteFooter'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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

const trustPoints = [
  {
    title: 'Secure Payments',
    text: 'Razorpay encrypted checkout with trusted payment methods.',
    icon: ShieldCheck,
  },
  {
    title: 'Verified Benefits',
    text: 'Transparent plan inclusions with clear one-time pricing.',
    icon: BadgeCheck,
  },
  {
    title: 'Instant Access',
    text: 'Quick onboarding into the EDC founder ecosystem.',
    icon: WalletCards,
  },
]

const assurancePoints = [
  {
    title: 'Clear One-Time Pricing',
    text: 'No hidden fees. Every plan displays complete pricing transparently.',
  },
  {
    title: 'Professional Support',
    text: 'Application and onboarding guidance from the EDC team.',
  },
  {
    title: 'Trusted Ecosystem Access',
    text: 'Join a credible network of founders, mentors, and institutions.',
  },
]

export default function JoinPage() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState(defaultPlans)
  const [plansError, setPlansError] = useState('')
  const [expandedPlans, setExpandedPlans] = useState({})

  const togglePlan = (key) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

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

  const cardClassByIndex = (index, isPopular) => {
    if (isPopular || index === 0) {
      return 'group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-to-b from-white via-white to-blue-50/40 p-6 shadow-[0_20px_55px_-22px_rgba(11,61,145,0.42)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(11,61,145,0.5)] sm:p-8'
    }

    return 'group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.38)] transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_30px_70px_-30px_rgba(11,61,145,0.35)] sm:p-8'
  }

  const formatPrice = (price) => Number(price || 0).toLocaleString('en-IN')

  const handleNavigateToPlan = (plan) => {
    const route = (plan.ctaRoute || '/join').trim()
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`
    const planPrice = Number(plan.price || 0)
    const planSlug = encodeURIComponent(plan.slug || '')
    const qs = planSlug ? `planSlug=${planSlug}` : ''
    const separator = normalizedRoute.includes('?') ? '&' : '?'
    const targetRoute = qs ? `${normalizedRoute}${separator}${qs}` : normalizedRoute

    navigate(targetRoute, {
      state: {
        selectedPlan: {
          slug: plan.slug || '',
          name: plan.name || '',
          price: planPrice,
        },
      },
    })
  }

  return (
    <>
      <div className="min-h-screen bg-accent text-ink selection:bg-primary/20 selection:text-primary">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b] pb-20 pt-16 text-white sm:pb-24 sm:pt-20">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
          <div className="blob-float absolute -left-28 top-8 h-[380px] w-[380px] rounded-full bg-cyan-300/15 blur-[90px]" />
          <div className="blob-float-reverse absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-blue-300/15 blur-[90px]" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Membership Plans 2026
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Choose The Right Program For Your Startup Growth
              </h1>
              <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white/70 sm:text-base">
                Compare plans, understand benefits, and join the EDC India ecosystem with a clear one-time fee. Every plan is designed to move founders from idea to execution.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['3000+', 'Members'],
                  ['500+', 'Startups Supported'],
                  ['100+', 'Ecosystem Partners'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <div className="text-xl font-extrabold text-white sm:text-2xl">{value}</div>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-white/55">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside variants={fadeUp} className="rounded-[1.8rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-7">
              <h2 className="text-lg font-bold tracking-tight">Why Founders Join EDC</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Built for serious founders who want mentorship, visibility, and structured growth support.
              </p>

              <div className="mt-6 space-y-3">
                {trustPoints.map((point) => {
                  const Icon = point.icon
                  return (
                    <div key={point.title} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                          <Icon className="h-4 w-4 text-cyan-200" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{point.title}</div>
                          <div className="mt-0.5 text-xs leading-relaxed text-white/65">{point.text}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.aside>
          </motion.div>
        </header>

        <main className="relative -mt-10 pb-16 sm:-mt-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {plansError && (
              <div className="mx-auto mb-6 max-w-6xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                {plansError}
              </div>
            )}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mx-auto hidden sm:grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {plans.map((plan, index) => (
                <motion.article key={plan.slug || `${plan.name}-${index}`} variants={fadeUp} className={cardClassByIndex(index, plan.isPopular)}>
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition duration-300 group-hover:bg-primary/20" />

                  {plan.badge && (
                    <div className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest ${plan.isPopular || index === 0 ? 'border-primary/30 bg-primary/10 text-primary' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
                      {plan.badge}
                    </div>
                  )}

                  <h3 className={`mt-2 text-2xl font-extrabold tracking-tight ${plan.isPopular || index === 0 ? 'text-primary' : 'text-ink'}`}>
                    {plan.name}
                  </h3>

                  <p className="mt-3 min-h-[70px] text-sm font-medium leading-relaxed text-slate-500">
                    {plan.description}
                  </p>

                  <div className="mt-7 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-4">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">₹{formatPrice(plan.price)}</span>
                      <span className="pb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">{plan.billingText || '/ one-time'}</span>
                    </div>
                  </div>

                  <ul className="mb-8 mt-6 flex-1 space-y-3.5 text-sm font-semibold text-slate-600">
                    {(plan.features || []).map((item, i) => (
                      <li key={`${plan.slug || plan.name}-feature-${i}`} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleNavigateToPlan(plan)}
                    className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white transition duration-300 active:scale-[0.99] ${(plan.isPopular || index === 0) ? 'bg-gradient-to-r from-primary to-secondary shadow-[0_16px_32px_-18px_rgba(11,61,145,0.72)] hover:brightness-105' : 'bg-ink shadow-[0_16px_32px_-18px_rgba(15,23,42,0.55)] hover:bg-slate-800'}`}
                  >
                    <span>{plan.ctaText || 'Join Now'}</span>
                    <span className="opacity-85">₹{formatPrice(plan.price)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.article>
              ))}
            </motion.div>

          {/* Mobile Collapsible View */}
          <div className="mt-8 flex flex-col gap-4 sm:hidden">
            {plans.map((plan, index) => {
              const key = plan.slug || `${plan.name}-${index}`;
              const isExpanded = !!expandedPlans[key];
              const isPopularOrFirst = plan.isPopular || index === 0;
              const borderTheme = isPopularOrFirst ? 'border border-primary/30' : 'border border-slate-200';
              const badgeTheme = isPopularOrFirst ? 'border-primary/30 bg-primary/10 text-primary' : 'border-slate-200 bg-slate-100 text-slate-600';
              const btnTheme = isPopularOrFirst ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' : 'bg-ink text-white hover:bg-slate-800 shadow-md';

              return (
                <div key={key} className={`rounded-2xl bg-white p-4 shadow-md transition-all ${borderTheme}`}>
                  {/* Collapsible Header */}
                  <div
                    onClick={() => togglePlan(key)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex flex-col">
                      {plan.badge && (
                        <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-1.5 ${badgeTheme}`}>
                          {plan.badge}
                        </span>
                      )}
                      <h3 className={`text-sm font-extrabold ${isPopularOrFirst ? 'text-primary' : 'text-ink'}`}>{plan.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-base font-extrabold text-ink">₹{formatPrice(plan.price)}</span>
                        <span className="text-[9px] font-semibold text-slate-500">{plan.billingText || '/ one-time'}</span>
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
                              <li key={i} className="flex items-start gap-2.5 font-semibold">
                                <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <Check className="h-3 w-3" strokeWidth={2.5} />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => handleNavigateToPlan(plan)}
                            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition duration-300 active:scale-[0.99] ${btnTheme}`}
                          >
                            <span>{plan.ctaText || 'Join Now'}</span>
                            <span className="opacity-85">₹{formatPrice(plan.price)}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-3"
            >
              {assurancePoints.map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_14px_35px_-30px_rgba(15,23,42,0.55)]">
                  <div className="text-sm font-bold text-slate-800">{item.title}</div>
                  <div className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.text}</div>
                </motion.div>
              ))}
            </motion.section>
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
