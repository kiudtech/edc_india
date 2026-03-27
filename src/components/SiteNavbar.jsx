import { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Fellowship', to: '/fellowship' },
  { label: 'Membership', to: '/startup-membership' },
  { label: 'Validation', to: '/membership-validation' },
  { label: 'Ranking', to: '/ranking' },
]

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full bg-white object-contain" />
          <div className="text-sm font-semibold text-slate-800">EDC India</div>
        </Link>

        <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex lg:gap-8 lg:text-sm">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className="nav-link transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-xs font-semibold text-slate-600 transition hover:text-slate-900 sm:inline-flex lg:text-sm">
            Login
          </Link>
          <Link to="/join" className="hidden rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow sm:inline-flex lg:px-6 lg:py-2.5 lg:text-sm">
            Join Now
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login" className="rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
            <Link to="/join" onClick={() => setMobileOpen(false)} className="mt-2 block w-full rounded-full bg-secondary px-5 py-2.5 text-center text-xs font-semibold text-white shadow-glow">
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
