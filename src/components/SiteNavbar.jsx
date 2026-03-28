import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Fellowship', to: '/fellowship' },
  { label: 'Membership', to: '/startup-membership' },
  { label: 'Validation', to: '/membership-validation' },
  { label: 'Ranking', to: '/ranking' },
]

const mobileMenuVariants = {
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

const mobileItemVariants = {
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

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!mobileOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  const isItemActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(`${to}/`)
  }

  const handleRouteNav = () => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const scrollingElement = document.scrollingElement || document.documentElement || document.body
    if (scrollingElement) {
      scrollingElement.scrollTop = 0
      scrollingElement.scrollLeft = 0
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-center gap-3" onClick={handleRouteNav}>
          <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full bg-white object-contain" />
          <div className="text-sm font-semibold text-slate-800">EDC India</div>
        </Link>

        <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex lg:gap-8 lg:text-sm">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className="nav-link transition hover:text-slate-900" onClick={handleRouteNav}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:hidden"
            onClick={handleRouteNav}
          >
            Login
          </Link>
          <Link to="/login" className="hidden text-xs font-semibold text-slate-600 transition hover:text-slate-900 sm:inline-flex lg:text-sm" onClick={handleRouteNav}>
            Login
          </Link>
          <Link to="/join" className="hidden rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow sm:inline-flex lg:px-6 lg:py-2.5 lg:text-sm" onClick={handleRouteNav}>
            Join Now
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
          >
            <motion.svg
              className="h-5 w-5 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ rotate: mobileOpen ? 90 : 0, scale: mobileOpen ? 1.05 : 1 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </motion.svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-menu"
            className="origin-top overflow-hidden border-t border-slate-100 bg-white/95 md:hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6">
              <div className="overflow-hidden rounded-b-[1.5rem] border border-slate-200/80 border-t-0 bg-white p-3 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.58)] backdrop-blur-xl">
                <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
                  {navItems.map((item) => {
                    const active = isItemActive(item.to)
                    return (
                      <motion.div key={item.label} variants={mobileItemVariants}>
                        <Link
                          to={item.to}
                          className={`group flex items-center justify-between rounded-2xl border px-3 py-2.5 transition ${active
                            ? 'border-primary/30 bg-primary/[0.09] text-primary shadow-[0_10px_20px_-16px_rgba(11,61,145,0.8)]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                          onClick={handleRouteNav}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active
                                ? 'bg-primary text-white'
                                : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                              }`}
                            >
                              {item.label.charAt(0)}
                            </span>
                            <span>{item.label}</span>
                          </span>
                          <svg className={`h-4 w-4 transition ${active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </motion.div>
                    )
                  })}

                  <motion.div variants={mobileItemVariants} className="mt-0.5 grid grid-cols-2 gap-1">
                    <Link
                      to="/login"
                      onClick={handleRouteNav}
                      className={`inline-flex items-center justify-center rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${isItemActive('/login')
                        ? 'border-primary/35 bg-primary/[0.12] text-primary shadow-[0_10px_20px_-16px_rgba(11,61,145,0.8)]'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/join"
                      onClick={handleRouteNav}
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
  )
}
