import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'

export default function NotFoundPage() {
  return (
    <>
      <main className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/60 px-4 py-20 sm:px-6 sm:py-28">
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white/90 p-8 text-center shadow-xl backdrop-blur sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Error 404</p>
          <div className="mt-4 text-6xl font-black leading-none text-slate-200 sm:text-7xl">404</div>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">This page does not exist</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 sm:text-base">
            The link may be incorrect, outdated, or the page has been moved.
            Use one of the actions below to continue.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:bg-blue-700">
              Go to Home
            </Link>
            <Link to="/join" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Explore Membership Plans
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
