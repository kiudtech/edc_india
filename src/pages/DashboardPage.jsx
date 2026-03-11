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

export default function DashboardPage() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [tickets, setTickets] = useState([])
  const [ticketForm, setTicketForm] = useState({ subject: '', description: '' })
  const [ticketMsg, setTicketMsg] = useState('')
  const [courseMsg, setCourseMsg] = useState('')

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

  const cardClass = 'rounded-2xl border border-secondary/40 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-glow'
  const emptyState = (text) => <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">{text}</div>

  /* ─── Tab Content Renderers ─── */
  const renderOverview = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { label: 'Membership', value: 'Active', color: 'text-green-600 bg-green-50' },
        { label: 'Founder ID', value: user?.founderId || 'N/A', color: 'text-primary bg-blue-50' },
        { label: 'Industry', value: user?.industry || '—', color: 'text-orange-600 bg-orange-50' },
        { label: 'Stage', value: user?.startupStage || '—', color: 'text-purple-600 bg-purple-50' },
      ].map((s) => (
        <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
          <div className="text-xs font-semibold opacity-70">{s.label}</div>
          <div className="mt-1 text-lg font-semibold">{s.value}</div>
        </div>
      ))}
      <div className="col-span-full mt-2">
        <h3 className="text-sm font-semibold text-slate-700">Quick Access</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tabs.filter((t) => t.id !== 'overview').map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={cardClass + ' text-center'}>
              <div className="text-2xl">{t.icon}</div>
              <div className="mt-2 text-xs font-semibold text-slate-700">{t.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    events.length === 0 ? emptyState('No events available yet. Check back soon!') : (
      <div className="grid gap-5 sm:grid-cols-2">
        {events.map((ev) => (
          <div key={ev._id} className={cardClass}>
            {ev.image && <img src={ev.image} alt={ev.title} className="h-36 w-full rounded-xl object-cover" loading="lazy" />}
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-slate-800">{ev.title}</div>
                <div className="mt-1 text-xs text-slate-500">{fmtDate(ev.date)} · {ev.location}</div>
                {ev.description && <div className="mt-1 text-xs text-slate-400 line-clamp-2">{ev.description}</div>}
              </div>
              <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700">{ev.status}</span>
            </div>
            {ev.eventType && <div className="mt-2 text-[10px] text-slate-400">Type: {ev.eventType}{ev.registrationLimit > 0 ? ` · Limit: ${ev.registrationLimit}` : ''}</div>}
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
            <div className="text-sm font-semibold text-slate-800">{g.title}</div>
            {g.organization && <div className="mt-1 text-xs text-slate-500">{g.organization}</div>}
            <div className="mt-2 text-xl font-semibold text-primary">{g.amount}</div>
            {g.description && <div className="mt-2 text-xs text-slate-400 line-clamp-2">{g.description}</div>}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Deadline: {fmtDate(g.deadline)}</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">{g.eligibility}</span>
            </div>
            {g.applicationLink && (
              <a href={g.applicationLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">Apply →</a>
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
            <div className="text-sm font-semibold text-slate-800">{f.title}</div>
            {f.organization && <div className="mt-1 text-xs text-slate-500">{f.organization}</div>}
            <div className="mt-2 text-lg font-semibold text-primary">{f.amount}</div>
            {f.description && <div className="mt-2 text-xs text-slate-400 line-clamp-2">{f.description}</div>}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Deadline: {fmtDate(f.deadline)}</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">{f.status}</span>
            </div>
            {f.applicationLink && (
              <a href={f.applicationLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">Apply →</a>
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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {inv.title?.charAt(0) || 'I'}
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-800">{inv.title}</div>
            {inv.organization && <div className="mt-1 text-xs text-secondary font-semibold">{inv.organization}</div>}
            {inv.description && <div className="mt-2 text-xs text-slate-500">{inv.description}</div>}
            {inv.eligibility && <div className="mt-1 text-xs text-slate-400">Focus: {inv.eligibility}</div>}
            {inv.amount && <div className="mt-1 text-xs text-slate-400">Investment: {inv.amount}</div>}
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
            'event-alert': 'bg-orange-100 text-orange-700',
            'funding-update': 'bg-green-100 text-green-700',
            general: 'bg-slate-100 text-slate-600',
          }
          return (
            <div key={n._id} className={cardClass + ' flex items-center gap-4'}>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${typeColors[n.type] || typeColors.general}`}>
                {n.type === 'event-alert' ? 'Event' : n.type === 'funding-update' ? 'Funding' : n.type === 'announcement' ? 'Announcement' : 'Update'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-800">{n.title}</div>
                {n.message && <div className="mt-0.5 text-xs text-slate-500 line-clamp-1">{n.message}</div>}
                <div className="text-xs text-slate-400">{timeAgo(n.createdAt)}</div>
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
        <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{courseMsg}</div>
      )}
      <p className="mb-4 text-sm text-slate-500">Express interest and our admin will contact you for enrollment.</p>
      {courses.length === 0 ? emptyState('No courses available yet. Check back soon!') : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <div key={c._id} className={cardClass}>
              <div className="text-sm font-semibold text-slate-800">{c.name}</div>
              <div className="mt-1 text-xs text-slate-500">Duration: {c.duration}{c.instructor ? ` · By: ${c.instructor}` : ''}</div>
              {c.description && <div className="mt-1 text-xs text-slate-400 line-clamp-2">{c.description}</div>}
              <div className="mt-2 text-lg font-semibold text-primary">{c.type === 'free' ? 'Free' : fmtCurrency(c.price)}</div>
              {c.type === 'paid' ? (
                <button
                  onClick={() => handleCourseInterest(c.name)}
                  className="mt-3 w-full rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  I&apos;m Interested
                </button>
              ) : (
                c.contentLink ? (
                  <a href={c.contentLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block w-full rounded-full bg-green-600 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-green-700">
                    Access Course
                  </a>
                ) : (
                  <div className="mt-3 text-xs text-green-600 font-semibold">Free — Available to all members</div>
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
        <h3 className="mb-4 text-sm font-semibold text-slate-800">Raise a Support Ticket</h3>
        <form onSubmit={handleRaiseTicket} className="rounded-2xl border border-secondary/40 bg-white p-5 shadow-sm">
          {ticketMsg && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{ticketMsg}</div>
          )}
          <div className="grid gap-4">
            <input
              value={ticketForm.subject}
              onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
              required placeholder="Subject"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              value={ticketForm.description}
              onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
              required placeholder="Describe your issue..." rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button type="submit" className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold text-slate-800">Your Tickets</h3>
        {tickets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            No tickets yet.
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t._id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-800">{t.subject}</div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    t.status === 'open' ? 'bg-yellow-100 text-yellow-700'
                      : t.status === 'in-progress' ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
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

  return (
    <div className="min-h-screen bg-accent">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 text-sm font-semibold text-white">E</div>
            <div className="hidden text-sm font-semibold text-slate-800 sm:block">EDC India</div>
          </Link>
          <div className="flex items-center gap-4">
            {/* ─ Bell icon for notifications ─ */}
            <div className="relative">
              <button
                onClick={() => setShowNotifPanel(p => !p)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                aria-label="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </button>
              {showNotifPanel && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifPanel(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-96">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                      <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                      <button onClick={() => setShowNotifPanel(false)} className="text-xs text-slate-400 hover:text-slate-700">&times;</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-slate-400">No notifications yet</div>
                      ) : (
                        notifications.map(n => {
                          const tc = {
                            announcement: 'bg-blue-100 text-blue-700',
                            'event-alert': 'bg-orange-100 text-orange-700',
                            'funding-update': 'bg-green-100 text-green-700',
                            general: 'bg-slate-100 text-slate-600',
                          }
                          return (
                            <div key={n._id} className="border-b border-slate-50 px-4 py-3 transition hover:bg-slate-50 last:border-b-0">
                              <div className="flex items-start gap-2">
                                <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${tc[n.type] || tc.general}`}>
                                  {n.type === 'event-alert' ? 'Event' : n.type === 'funding-update' ? 'Funding' : n.type === 'announcement' ? 'News' : 'Info'}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-semibold text-slate-800">{n.title}</div>
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
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-800">{user?.name}</div>
              <div className="text-[10px] text-slate-500">{user?.founderId}</div>
            </div>
            <button onClick={handleLogout} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Welcome */}
        <div className="rounded-3xl bg-gradient-to-r from-primary to-blue-700 p-6 text-white shadow-lg sm:p-8">
          <div className="text-xs uppercase tracking-widest text-white/60">Member Dashboard</div>
          <h1 className="mt-2 text-xl font-semibold sm:text-2xl">
            Welcome, {user?.name}! <span className="text-white/70">|</span> <span className="text-secondary">{user?.founderId}</span>
          </h1>
          <p className="mt-1 text-sm text-white/70">
            {user?.startupName ? `${user.startupName} · ` : ''}{user?.industry} · {user?.startupStage}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeTab === t.id
                  ? 'bg-primary text-white shadow'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-primary/40'
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            {tabs.find((t) => t.id === activeTab)?.icon} {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          {contentMap[activeTab]?.()}
        </div>
      </div>
    </div>
  )
}
