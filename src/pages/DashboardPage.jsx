import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'

const tabs = [
  { id: 'overview', label: 'Overview', icon: '🏠' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'grants', label: 'Grants', icon: '💰' },
  { id: 'funding', label: 'Funding', icon: '📊' },
  { id: 'investors', label: 'Investors', icon: '🤝' },
  { id: 'community', label: 'Community', icon: '👥' },
  { id: 'courses', label: 'Courses', icon: '📚' },
  { id: 'support', label: 'Support', icon: '🎟️' },
]

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
const fmtCurrency = (n) => `₹${Number(n).toLocaleString('en-IN')}`
const timeAgo = (d) => {
  if (!d) return ''
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return fmtDate(d)
}

/* ─── SVG Icons ─── */
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const MenuIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const LogoutIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

const HomeIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

export default function DashboardPage() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [tickets, setTickets] = useState([])
  const [ticketForm, setTicketForm] = useState({ subject: '', description: '' })
  const [ticketMsg, setTicketMsg] = useState('')
  const [courseMsg, setCourseMsg] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ─── Dynamic data from DB ─── */
  const [events, setEvents] = useState([])
  const [grants, setGrants] = useState([])
  const [funding, setFunding] = useState([])
  const [investors, setInvestors] = useState([])
  const [notifications, setNotifications] = useState([])
  const [courses, setCourses] = useState([])
  const [showNotifPanel, setShowNotifPanel] = useState(false)

  const headers = { Authorization: `Bearer ${token}` }

  const fetchAll = useCallback(async () => {
    const f = (url) => fetch(`${API_BASE}${url}`, { headers }).then(r => r.ok ? r.json() : []).catch(() => [])
    const [ev, gr, fu, inv, notif, co, tk] = await Promise.all([
      f('/api/user/events'),
      f('/api/user/grants'),
      f('/api/user/funding'),
      f('/api/user/investors'),
      f('/api/user/notifications'),
      f('/api/user/courses'),
      f('/api/user/tickets'),
    ])
    setEvents(ev)
    setGrants(gr)
    setFunding(fu)
    setInvestors(inv)
    setNotifications(notif)
    setCourses(co)
    setTickets(tk)
  }, [token])

  useEffect(() => { fetchAll() }, [fetchAll])

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/tickets`, { headers })
      if (res.ok) setTickets(await res.json())
    } catch { /* ignore */ }
  }

  const handleRaiseTicket = async (e) => {
    e.preventDefault()
    setTicketMsg('')
    try {
      const res = await fetch(`${API_BASE}/api/user/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(ticketForm),
      })
      if (!res.ok) throw new Error()
      setTicketMsg('Ticket raised successfully! Admin will contact you.')
      setTicketForm({ subject: '', description: '' })
      fetchTickets()
    } catch {
      setTicketMsg('Failed to raise ticket. Try again.')
    }
  }

  const handleCourseInterest = async (courseName) => {
    setCourseMsg('')
    try {
      const res = await fetch(`${API_BASE}/api/user/course-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ courseName }),
      })
      const data = await res.json()
      setCourseMsg(data.message || 'Interest recorded!')
    } catch {
      setCourseMsg('Failed. Try again.')
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const cardClass = 'group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100/40'
  const emptyState = (text) => (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
      <div className="text-3xl opacity-40">📭</div>
      <div className="mt-3 text-sm font-medium text-slate-400">{text}</div>
    </div>
  )

  /* ─── Tab Content Renderers ─── */
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Membership', value: 'Active', icon: '✅', gradient: 'from-emerald-500 to-teal-600' },
          { label: 'Founder ID', value: user?.founderId || 'N/A', icon: '🆔', gradient: 'from-blue-500 to-indigo-600' },
          { label: 'Industry', value: user?.industry || '—', icon: '🏭', gradient: 'from-orange-500 to-red-500' },
          { label: 'Stage', value: user?.startupStage || '—', icon: '🚀', gradient: 'from-purple-500 to-pink-600' },
        ].map((s) => (
          <div key={s.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-5 text-white shadow-lg`}>
            <div className="absolute -right-3 -top-3 text-5xl opacity-[0.15]">{s.icon}</div>
            <div className="relative">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{s.label}</div>
              <div className="mt-2 text-lg font-bold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="text-sm font-bold text-slate-700">Quick Access</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tabs.filter((t) => t.id !== 'overview').map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setSidebarOpen(false) }}
              className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl transition-transform duration-300 group-hover:scale-110">{t.icon}</div>
              <div className="mt-2 text-xs font-semibold text-slate-700">{t.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {notifications.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-700">Recent Activity</h3>
          <div className="mt-3 space-y-2">
            {notifications.slice(0, 3).map((n) => {
              const tc = {
                announcement: 'bg-blue-100 text-blue-700',
                'event-alert': 'bg-amber-100 text-amber-700',
                'funding-update': 'bg-emerald-100 text-emerald-700',
                general: 'bg-slate-100 text-slate-600',
              }
              return (
                <div key={n._id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition hover:border-blue-100 hover:bg-blue-50/30">
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${tc[n.type] || tc.general}`}>
                    {n.type === 'event-alert' ? 'Event' : n.type === 'funding-update' ? 'Funding' : n.type === 'announcement' ? 'News' : 'Info'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-semibold text-slate-700">{n.title}</div>
                    <div className="text-[10px] text-slate-400">{timeAgo(n.createdAt)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )

  const renderEvents = () => (
    events.length === 0 ? emptyState('No events available yet. Check back soon!') : (
      <div className="grid gap-5 sm:grid-cols-2">
        {events.map((ev) => (
          <div key={ev._id} className={cardClass}>
            {ev.image && <img src={ev.image} alt={ev.title} className="h-40 w-full rounded-xl object-cover" loading="lazy" />}
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-bold text-slate-800">{ev.title}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>📅 {fmtDate(ev.date)}</span>
                  <span className="text-slate-300">·</span>
                  <span>📍 {ev.location}</span>
                </div>
                {ev.description && <div className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">{ev.description}</div>}
              </div>
              <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{ev.status}</span>
            </div>
            {ev.eventType && <div className="mt-3 text-[10px] text-slate-400">Type: {ev.eventType}{ev.registrationLimit > 0 ? ` · Limit: ${ev.registrationLimit}` : ''}</div>}
          </div>
        ))}
      </div>
    )
  )

  const renderGrants = () => (
    grants.length === 0 ? emptyState('No grants available yet. Check back soon!') : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grants.map((g) => (
          <div key={g._id} className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg">💰</div>
              <div>
                <div className="text-sm font-bold text-slate-800">{g.title}</div>
                {g.organization && <div className="text-xs text-slate-500">{g.organization}</div>}
              </div>
            </div>
            <div className="mt-3 text-xl font-bold text-primary">{g.amount}</div>
            {g.description && <div className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">{g.description}</div>}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Deadline: {fmtDate(g.deadline)}</span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">{g.eligibility}</span>
            </div>
            {g.applicationLink && (
              <a href={g.applicationLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                Apply <span>→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    )
  )

  const renderFunding = () => (
    funding.length === 0 ? emptyState('No funding opportunities yet. Check back soon!') : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {funding.map((f) => (
          <div key={f._id} className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg">📊</div>
              <div>
                <div className="text-sm font-bold text-slate-800">{f.title}</div>
                {f.organization && <div className="text-xs text-slate-500">{f.organization}</div>}
              </div>
            </div>
            <div className="mt-3 text-lg font-bold text-primary">{f.amount}</div>
            {f.description && <div className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">{f.description}</div>}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Deadline: {fmtDate(f.deadline)}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{f.status}</span>
            </div>
            {f.applicationLink && (
              <a href={f.applicationLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                Apply <span>→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    )
  )

  const renderInvestors = () => (
    investors.length === 0 ? emptyState('No investor updates yet. Check back soon!') : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {investors.map((inv) => (
          <div key={inv._id} className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-md">
                {inv.title?.charAt(0) || 'I'}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{inv.title}</div>
                {inv.organization && <div className="text-xs font-semibold text-blue-600">{inv.organization}</div>}
              </div>
            </div>
            {inv.description && <div className="mt-3 text-xs leading-relaxed text-slate-500">{inv.description}</div>}
            <div className="mt-3 space-y-1">
              {inv.eligibility && <div className="text-xs text-slate-400">🎯 Focus: {inv.eligibility}</div>}
              {inv.amount && <div className="text-xs text-slate-400">💰 Investment: {inv.amount}</div>}
            </div>
          </div>
        ))}
      </div>
    )
  )

  const renderCommunity = () => (
    notifications.length === 0 ? emptyState('No community updates yet. Check back soon!') : (
      <div className="space-y-3">
        {notifications.map((n) => {
          const typeColors = {
            announcement: 'bg-blue-100 text-blue-700',
            'event-alert': 'bg-amber-100 text-amber-700',
            'funding-update': 'bg-emerald-100 text-emerald-700',
            general: 'bg-slate-100 text-slate-600',
          }
          return (
            <div key={n._id} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 transition hover:border-blue-100 hover:bg-blue-50/20 hover:shadow-sm">
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${typeColors[n.type] || typeColors.general}`}>
                {n.type === 'event-alert' ? 'Event' : n.type === 'funding-update' ? 'Funding' : n.type === 'announcement' ? 'Announcement' : 'Update'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-slate-800">{n.title}</div>
                {n.message && <div className="mt-0.5 text-xs text-slate-500 line-clamp-1">{n.message}</div>}
                <div className="mt-1 text-[10px] text-slate-400">{timeAgo(n.createdAt)}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  )

  const renderCourses = () => (
    <div>
      {courseMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <span>✅</span> {courseMsg}
        </div>
      )}
      <p className="mb-5 text-sm text-slate-500">Express interest and our admin will contact you for enrollment.</p>
      {courses.length === 0 ? emptyState('No courses available yet. Check back soon!') : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <div key={c._id} className={cardClass}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">📚</div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{c.name}</div>
                  <div className="text-xs text-slate-500">⏱ {c.duration}{c.instructor ? ` · 👤 ${c.instructor}` : ''}</div>
                </div>
              </div>
              {c.description && <div className="mt-3 text-xs leading-relaxed text-slate-400 line-clamp-2">{c.description}</div>}
              <div className="mt-3 text-lg font-bold text-primary">{c.type === 'free' ? 'Free' : fmtCurrency(c.price)}</div>
              {c.type === 'paid' ? (
                <button
                  onClick={() => handleCourseInterest(c.name)}
                  className="mt-3 w-full rounded-xl border-2 border-primary/20 bg-blue-50 px-4 py-2.5 text-xs font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  I&apos;m Interested
                </button>
              ) : (
                c.contentLink ? (
                  <a href={c.contentLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700">
                    Access Course →
                  </a>
                ) : (
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">✅ Free — Available to all members</div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderSupport = () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-sm">🎫</span>
          Raise a Support Ticket
        </h3>
        <form onSubmit={handleRaiseTicket} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          {ticketMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
              <span>✅</span> {ticketMsg}
            </div>
          )}
          <div className="grid gap-4">
            <input
              value={ticketForm.subject}
              onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
              required placeholder="Subject"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              value={ticketForm.description}
              onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
              required placeholder="Describe your issue..." rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
            <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-200/50 transition hover:bg-blue-700 hover:shadow-lg">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-sm">📋</span>
          Your Tickets
        </h3>
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
            <div className="text-2xl opacity-40">🎫</div>
            <div className="mt-2 text-sm font-medium text-slate-400">No tickets yet.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t._id} className="rounded-xl border border-slate-100 bg-white p-4 transition hover:border-blue-100 hover:shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-bold text-slate-800">{t.subject}</div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    t.status === 'open' ? 'bg-amber-100 text-amber-700'
                      : t.status === 'in-progress' ? 'bg-blue-100 text-blue-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>{t.status}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">{t.description}</div>
                <div className="mt-2 text-[10px] text-slate-400">
                  {new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const contentMap = {
    overview: renderOverview,
    events: renderEvents,
    grants: renderGrants,
    funding: renderFunding,
    investors: renderInvestors,
    community: renderCommunity,
    courses: renderCourses,
    support: renderSupport,
  }

  /* ─── Sidebar Content (reused for both desktop and mobile) ─── */
  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <img src="/logo.png" alt="EDC India" className="h-10 w-10 rounded-full bg-white object-contain shadow" />
        <div>
          <div className="text-sm font-bold text-slate-800">EDC India</div>
          <div className="text-[10px] font-medium text-slate-400">Member Portal</div>
        </div>
      </div>

      {/* User info card */}
      <div className="mx-4 rounded-xl bg-gradient-to-br from-primary to-blue-700 p-3.5 text-white shadow-lg shadow-blue-900/20">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold backdrop-blur">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{user?.name}</div>
            <div className="text-[10px] text-white/70">{user?.founderId}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex-1 overflow-y-auto px-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">Navigation</div>
        <div className="space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setSidebarOpen(false) }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition duration-200 ${
                activeTab === t.id
                  ? 'bg-primary/10 font-bold text-primary shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.label}</span>
              {activeTab === t.id && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="border-t border-slate-100 p-4 space-y-2">
        <Link to="/" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          <HomeIcon /> Back to Website
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600">
          <LogoutIcon /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* ═══ Desktop Sidebar ═══ */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* ═══ Mobile Sidebar Overlay ═══ */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-end px-4 pt-4">
              <button onClick={() => setSidebarOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                <CloseIcon />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* ═══ Main Content ═══ */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* ── Top Navbar ── */}
        <nav className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <MenuIcon />
              </button>
              <div className="lg:hidden flex items-center gap-2">
                <img src="/logo.png" alt="EDC India" className="h-8 w-8 rounded-full bg-white object-contain" />
                <span className="text-sm font-bold text-slate-800">EDC India</span>
              </div>
              <div className="hidden lg:block">
                <h1 className="text-lg font-bold text-slate-800">
                  {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
                </h1>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Notification bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifPanel(p => !p)}
                  className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                  aria-label="Notifications"
                >
                  <BellIcon />
                  {notifications.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </button>
                {showNotifPanel && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifPanel(false)} />
                    <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-100 bg-white shadow-2xl sm:w-96">
                      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                        <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                        <button onClick={() => setShowNotifPanel(false)} className="text-slate-400 hover:text-slate-700">
                          <CloseIcon />
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center text-xs text-slate-400">No notifications yet</div>
                        ) : (
                          notifications.map(n => {
                            const tc = {
                              announcement: 'bg-blue-100 text-blue-700',
                              'event-alert': 'bg-amber-100 text-amber-700',
                              'funding-update': 'bg-emerald-100 text-emerald-700',
                              general: 'bg-slate-100 text-slate-600',
                            }
                            return (
                              <div key={n._id} className="border-b border-slate-50 px-4 py-3 transition hover:bg-blue-50/30 last:border-b-0">
                                <div className="flex items-start gap-2">
                                  <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${tc[n.type] || tc.general}`}>
                                    {n.type === 'event-alert' ? 'Event' : n.type === 'funding-update' ? 'Funding' : n.type === 'announcement' ? 'News' : 'Info'}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-bold text-slate-800">{n.title}</div>
                                    <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-2">{n.message}</div>
                                    <div className="mt-1 text-[10px] text-slate-400">{timeAgo(n.createdAt)}</div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User info */}
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-700 text-xs font-bold text-white shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{user?.name}</div>
                  <div className="text-[10px] text-slate-400">{user?.founderId}</div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Page Content ── */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-blue-700 p-6 text-white shadow-xl shadow-blue-900/15 sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Member Dashboard
              </div>
              <h1 className="mt-3 text-xl font-bold sm:text-2xl">
                Welcome back, {user?.name}!
              </h1>
              <p className="mt-1 text-sm text-white/70">
                {user?.startupName ? `${user.startupName} · ` : ''}{user?.industry || ''}{user?.startupStage ? ` · ${user.startupStage}` : ''}
              </p>
            </div>
          </div>

          {/* Section Title (mobile-friendly) */}
          <div className="mt-6 lg:hidden">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <span>{tabs.find(t => t.id === activeTab)?.icon}</span>
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>

          {/* Tab Content */}
          <div className="mt-5">
            {contentMap[activeTab]?.()}
          </div>
        </main>
      </div>
    </div>
  )
}
