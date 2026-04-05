import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../config'

/* ─── Sidebar sections ─── */
const sections = [
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'memberships', label: 'Memberships', icon: '🧩' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'tickets', label: 'Tickets', icon: '🎟️' },
  { id: 'queries', label: 'Form Queries', icon: '📥' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'grants', label: 'Grants & Funding', icon: '💰' },
  { id: 'plans', label: 'Plans', icon: '🧾' },
  { id: 'colleges', label: 'College Ranking', icon: '🏫' },
  { id: 'college-ratings', label: 'College Ratings', icon: '⭐' },
  { id: 'college-ranking', label: 'Ranking Applications', icon: '🎓' },
  { id: 'courses', label: 'Courses', icon: '📚' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
]

const MENU_ALERT_KEYS = ['memberships', 'tickets', 'college-ranking', 'queries']
const DEFAULT_SEEN_MENU_ALERTS = {
  memberships: 0,
  tickets: 0,
  'college-ranking': 0,
  queries: 0,
}

function normalizeSeenMenuAlerts(raw = {}) {
  return MENU_ALERT_KEYS.reduce((acc, key) => {
    const value = Number(raw?.[key] || 0)
    acc[key] = Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
    return acc
  }, {})
}

/* ─── Helper: fetch with auth ─── */
function useApi() {
  const { token } = useAuth()
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const get = useCallback(async (url) => {
    const r = await fetch(`${API_BASE}${url}`, { headers })
    if (!r.ok) throw new Error((await r.json()).message)
    return r.json()
  }, [token])
  const post = useCallback(async (url, body) => {
    const r = await fetch(`${API_BASE}${url}`, { method: 'POST', headers, body: JSON.stringify(body) })
    if (!r.ok) throw new Error((await r.json()).message)
    return r.json()
  }, [token])
  const put = useCallback(async (url, body) => {
    const r = await fetch(`${API_BASE}${url}`, { method: 'PUT', headers, body: JSON.stringify(body) })
    if (!r.ok) throw new Error((await r.json()).message)
    return r.json()
  }, [token])
  const del = useCallback(async (url) => {
    const r = await fetch(`${API_BASE}${url}`, { method: 'DELETE', headers })
    if (!r.ok) throw new Error((await r.json()).message)
    return r.json()
  }, [token])
  return { get, post, put, del }
}

/* ─── Format helpers ─── */
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
const fmtDateTime = (d) => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'
const fmtCurrency = (n) => `₹${Number(n).toLocaleString('en-IN')}`

/* ─── Reusable badge ─── */
function Badge({ text, color }) {
  const colors = {
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-slate-100 text-slate-600',
    purple: 'bg-purple-100 text-purple-700',
  }
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color] || colors.gray}`}>{text}</span>
}

function statusBadge(s) {
  const map = {
    active: ['Active', 'green'], pending: ['Pending', 'yellow'], inactive: ['Inactive', 'red'],
    success: ['Success', 'green'], failed: ['Failed', 'red'],
    open: ['Open', 'yellow'], 'in-progress': ['In Progress', 'blue'], resolved: ['Resolved', 'green'],
    approved: ['Approved', 'green'], rejected: ['Rejected', 'red'], 'under-review': ['Under Review', 'blue'],
    applied: ['Applied', 'yellow'], ranked: ['Ranked', 'green'],
    Pending: ['Pending', 'yellow'], Reviewed: ['Reviewed', 'blue'], Rejected: ['Rejected', 'red'], Ranked: ['Ranked', 'green'],
    new: ['New', 'yellow'], contacted: ['Contacted', 'blue'], shortlisted: ['Shortlisted', 'green'],
    Upcoming: ['Upcoming', 'blue'], 'Registration Open': ['Reg. Open', 'green'], Ongoing: ['Ongoing', 'purple'], Completed: ['Completed', 'gray'], Cancelled: ['Cancelled', 'red'],
    Active: ['Active', 'green'], Closed: ['Closed', 'red'],
  }
  const [label, color] = map[s] || [s, 'gray']
  return <Badge text={label} color={color} />
}

/* ─── Modal wrapper ─── */
function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-x-visible overflow-y-auto rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl sm:p-6" onClick={e => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ─── CSV Export helper ─── */
function exportCSV(filename, headers, rows) {
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [headers.map(escape).join(','), ...rows.map(r => r.map(escape).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
}

/* ===============================================================
   MAIN ADMIN DASHBOARD
   =============================================================== */
export default function AdminDashboardPage() {
  const { get } = useApi()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [active, setActive] = useState('analytics')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [alertsHydrated, setAlertsHydrated] = useState(false)
  const [alertsFetched, setAlertsFetched] = useState(false)
  const [menuAlerts, setMenuAlerts] = useState({
    memberships: 0,
    tickets: 0,
    'college-ranking': 0,
    queries: 0,
  })
  const [seenMenuAlerts, setSeenMenuAlerts] = useState(DEFAULT_SEEN_MENU_ALERTS)
  const alertStorageKey = 'edc-admin-seen-alerts:v1'

  const markSectionAlertsSeen = useCallback((sectionId) => {
    setSeenMenuAlerts((prev) => ({
      ...prev,
      [sectionId]: Number(menuAlerts[sectionId] || 0),
    }))
  }, [menuAlerts])

  const getUnreadAlertCount = useCallback((sectionId) => {
    const total = Number(menuAlerts[sectionId] || 0)
    const seen = Number(seenMenuAlerts[sectionId] || 0)
    return Math.max(0, total - seen)
  }, [menuAlerts, seenMenuAlerts])

  const activeSection = sections.find((s) => s.id === active)
  const activeUnreadAlerts = getUnreadAlertCount(active)
  const canMarkActiveAlertsRead = MENU_ALERT_KEYS.includes(active)

  const refreshMenuAlerts = useCallback(async () => {
    try {
      const [analytics, queryItems, rankingItems] = await Promise.all([
        get('/api/admin/analytics').catch(() => null),
        get('/api/admin/contact-requests?status=new').catch(() => []),
        get('/api/admin/college-ranking-applications').catch(() => []),
      ])

      const pendingRankingCount = Array.isArray(rankingItems)
        ? rankingItems.filter((item) => String(item?.status || '').toLowerCase() === 'pending').length
        : 0

      setMenuAlerts({
        memberships: Number(analytics?.pendingMembers || 0),
        tickets: Number(analytics?.openTickets || 0),
        'college-ranking': pendingRankingCount,
        queries: Array.isArray(queryItems) ? queryItems.length : 0,
      })
      setAlertsFetched(true)
    } catch {
      // Keep previous alert counts if polling fails.
    }
  }, [get])

  useEffect(() => {
    refreshMenuAlerts()
    const timer = setInterval(refreshMenuAlerts, 30000)
    return () => clearInterval(timer)
  }, [refreshMenuAlerts])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = window.localStorage.getItem(alertStorageKey)
      if (!saved) {
        setSeenMenuAlerts(DEFAULT_SEEN_MENU_ALERTS)
        setAlertsHydrated(true)
        return
      }
      const parsed = JSON.parse(saved)
      setSeenMenuAlerts(normalizeSeenMenuAlerts(parsed))
      setAlertsHydrated(true)
    } catch {
      setSeenMenuAlerts(DEFAULT_SEEN_MENU_ALERTS)
      setAlertsHydrated(true)
    }
  }, [alertStorageKey])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(alertStorageKey, JSON.stringify(seenMenuAlerts))
    } catch {
      // Ignore storage write errors.
    }
  }, [alertStorageKey, seenMenuAlerts])

  useEffect(() => {
    if (!alertsHydrated || !alertsFetched) return

    setSeenMenuAlerts((prev) => {
      let changed = false
      const next = { ...prev }

      Object.keys(menuAlerts).forEach((key) => {
        const total = Number(menuAlerts[key] || 0)
        const seen = Number(next[key] || 0)
        if (seen > total) {
          next[key] = total
          changed = true
        }
      })

      return changed ? next : prev
    })
  }, [menuAlerts, alertsHydrated, alertsFetched])

  const handleLogout = () => { logout(); navigate('/login') }

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <img src="/logo.png" alt="EDC India" className="h-10 w-10 rounded-full bg-white object-contain shadow" />
        <div>
          <div className="text-sm font-bold text-slate-800">EDC India</div>
          <div className="text-[10px] font-medium text-slate-400">Admin Panel</div>
        </div>
      </div>

      {/* Admin info card */}
      <div className="mx-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-3.5 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold backdrop-blur">
            🛡️
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{user?.name}</div>
            <div className="text-[10px] text-white/60">Administrator</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex-1 overflow-y-auto px-3">
        <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Management</div>
        <div className="space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s.id)
                setSidebarOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition duration-200 ${
                active === s.id
                  ? 'bg-primary/10 font-bold text-primary shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="text-base">{s.icon}</span>
              <span>{s.label}</span>
              <span className="ml-auto flex items-center gap-2">
                {getUnreadAlertCount(s.id) > 0 && (
                  <span className="inline-flex min-w-[1.2rem] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {getUnreadAlertCount(s.id) > 99 ? '99+' : getUnreadAlertCount(s.id)}
                  </span>
                )}
                {active === s.id && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="border-t border-slate-100 p-4 space-y-2">
        <Link to="/" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Back to Website
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* ═══ Desktop Sidebar ═══ */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white lg:flex sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* ═══ Mobile Sidebar Overlay ═══ */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-end px-4 pt-4">
              <button onClick={() => setSidebarOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="hidden lg:block">
                <h1 className="text-lg font-bold text-slate-800">
                  {sections.find(s => s.id === active)?.icon} {sections.find(s => s.id === active)?.label}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {canMarkActiveAlertsRead && (
                <button
                  type="button"
                  onClick={() => markSectionAlertsSeen(active)}
                  disabled={activeUnreadAlerts === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {activeUnreadAlerts > 0 ? `Mark Read (${activeUnreadAlerts})` : 'Alerts Cleared'}
                </button>
              )}
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{user?.name}</div>
                  <div className="text-[10px] text-slate-400">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Section content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {canMarkActiveAlertsRead && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <p className="text-xs font-medium text-slate-600 sm:text-sm">
                Unread updates in <span className="font-semibold text-slate-800">{activeSection?.label || 'this section'}</span>: {activeUnreadAlerts}
              </p>
              <button
                type="button"
                onClick={() => markSectionAlertsSeen(active)}
                disabled={activeUnreadAlerts === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {activeUnreadAlerts > 0 ? `Clear Alerts (${activeUnreadAlerts})` : 'No New Alerts'}
              </button>
            </div>
          )}

          {active === 'analytics' && <AnalyticsSection />}
          {active === 'users' && <UsersSection />}
          {active === 'payments' && <PaymentsSection />}
          {active === 'tickets' && <TicketsSection />}
          {active === 'queries' && <QueriesSection />}
          {active === 'events' && <EventsSection />}
          {active === 'grants' && <GrantsSection />}
          {active === 'plans' && <PlansSection />}
          {active === 'memberships' && <MembershipsSection />}
          {active === 'colleges' && <CollegesSection />}
          {active === 'college-ratings' && <CollegeRatingsSection />}
          {active === 'college-ranking' && <CollegeRankingSection />}
          {active === 'courses' && <CoursesSection />}
          {active === 'notifications' && <NotificationsSection />}
        </main>
      </div>
    </div>
  )
}

/* ===============================================================
   1. ANALYTICS DASHBOARD
   =============================================================== */
function AnalyticsSection() {
  const api = useApi()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.get('/api/admin/analytics').then(setData).finally(() => setLoading(false)) }, [])

  if (loading) return <Spinner />
  if (!data) return <p className="text-slate-500">Failed to load analytics</p>

  const cards = [
    { label: 'Total Members', value: data.totalMembers, icon: '👥', gradient: 'from-blue-500 to-indigo-600' },
    { label: 'Active Members', value: data.activeMembers, icon: '✅', gradient: 'from-emerald-500 to-teal-600' },
    { label: 'Pending Members', value: data.pendingMembers, icon: '⏳', gradient: 'from-amber-500 to-orange-600' },
    { label: 'Total Revenue', value: fmtCurrency(data.totalRevenue), icon: '💰', gradient: 'from-emerald-500 to-green-600' },
    { label: 'Total Payments', value: data.totalPayments, icon: '💳', gradient: 'from-sky-500 to-blue-600' },
    { label: 'Idea Validations', value: data.totalValidations, icon: '🏆', gradient: 'from-purple-500 to-pink-600' },
    { label: 'Approved Validations', value: data.approvedValidations, icon: '✅', gradient: 'from-teal-500 to-emerald-600' },
    { label: 'Colleges Applied', value: data.totalColleges, icon: '🏫', gradient: 'from-indigo-500 to-blue-600' },
    { label: 'Total Tickets', value: data.totalTickets, icon: '🎟️', gradient: 'from-slate-500 to-slate-700' },
    { label: 'Open Tickets', value: data.openTickets, icon: '🔴', gradient: 'from-red-500 to-rose-600' },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map(c => (
          <div key={c.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} p-4 text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl`}>
            <div className="absolute -right-2 -top-2 text-4xl opacity-[0.15]">{c.icon}</div>
            <div className="relative">
              <p className="text-2xl font-bold">{c.value}</p>
              <p className="mt-1 text-[11px] font-semibold text-white/70">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {data.recentPayments?.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-sm">💳</span>
            Recent Payments
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr><th className="px-4 py-3">User</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Date</th></tr>
              </thead>
              <tbody>
                {data.recentPayments.map(p => (
                  <tr key={p._id} className="border-t border-slate-50 transition hover:bg-blue-50/30">
                    <td className="px-4 py-3 font-medium">{p.userId?.name || '—'}<br /><span className="text-[10px] text-slate-400">{p.userId?.founderId}</span></td>
                    <td className="px-4 py-3 font-bold text-slate-800">{fmtCurrency(p.amount)}</td>
                    <td className="px-4 py-3 capitalize">{p.type}</td>
                    <td className="px-4 py-3 text-slate-500">{fmtDate(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

/* ===============================================================
   2. USER MANAGEMENT
   =============================================================== */
function UsersSection() {
  const api = useApi()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterStage, setFilterStage] = useState('')
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)

  const fetchUsers = useCallback(() => {
    setLoading(true)
    const q = new URLSearchParams()
    if (search) q.set('search', search)
    if (filterStatus) q.set('membershipStatus', filterStatus)
    if (filterIndustry) q.set('industry', filterIndustry)
    if (filterStage) q.set('stage', filterStage)
    api.get(`/api/admin/users?${q}`).then(setUsers).finally(() => setLoading(false))
  }, [search, filterStatus, filterIndustry, filterStage])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const toggleStatus = async (u) => {
    const next = u.membershipStatus === 'active' ? 'inactive' : 'active'
    await api.put(`/api/admin/users/${u._id}/status`, { membershipStatus: next })
    fetchUsers()
  }

  const viewDetail = async (u) => {
    setSelected(u)
    const d = await api.get(`/api/admin/users/${u._id}`)
    setDetail(d)
  }

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Founder ID', 'Startup', 'Industry', 'Stage', 'Status', 'Type', 'Joined']
    const rows = users.map(u => [u.name, u.email, u.phone, u.founderId, u.startupName, u.industry, u.startupStage, u.membershipStatus, u.membershipType, fmtDate(u.createdAt)])
    exportCSV('members.csv', headers, rows)
  }

  const industries = ['Technology','Healthcare/HealthTech','Education/EdTech','Finance/FinTech','Agriculture/AgriTech','E-Commerce','Manufacturing','Clean Energy/CleanTech','Food & Beverage','Real Estate/PropTech','Media & Entertainment','Logistics/Supply Chain','Other']
  const stages = ['Idea Stage','MVP/Prototype','Early Traction','Growth','Scaling']

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input placeholder="Search name, email, ID, phone..." value={search} onChange={e => setSearch(e.target.value)} className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
        <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Industry</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Stage</option>
          {stages.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={handleExport} className="ml-auto rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Export CSV</button>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th><th className="px-4 py-3">Founder ID</th><th className="px-4 py-3">Email / Phone</th>
                <th className="px-4 py-3">Industry</th><th className="px-4 py-3">Stage</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Joined</th><th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.founderId}</td>
                  <td className="px-4 py-3"><div>{u.email}</div><div className="text-xs text-slate-400">{u.phone}</div></td>
                  <td className="px-4 py-3 text-xs">{u.industry}</td>
                  <td className="px-4 py-3 text-xs">{u.startupStage}</td>
                  <td className="px-4 py-3">{statusBadge(u.membershipStatus)}</td>
                  <td className="px-4 py-3 capitalize text-xs">{u.membershipType}</td>
                  <td className="px-4 py-3 text-xs">{fmtDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => viewDetail(u)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">View</button>
                      <button onClick={() => toggleStatus(u)} className={`rounded px-2 py-1 text-xs font-medium ${u.membershipStatus === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                        {u.membershipStatus === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-400">No members found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* User detail modal */}
      <Modal open={!!selected} onClose={() => { setSelected(null); setDetail(null) }} title={`Member: ${selected?.name}`}>
        {!detail ? <Spinner /> : (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <Info label="Founder ID" value={detail.user.founderId} />
              <Info label="Email" value={detail.user.email} />
              <Info label="Phone" value={detail.user.phone} />
              <Info label="Startup" value={detail.user.startupName || '—'} />
              <Info label="Industry" value={detail.user.industry} />
              <Info label="Stage" value={detail.user.startupStage} />
              <Info label="Status" value={detail.user.membershipStatus} />
              <Info label="Type" value={detail.user.membershipType} />
              <Info label="Joined" value={fmtDateTime(detail.user.createdAt)} />
            </div>
            {detail.user.ideaSummary && (
              <div><span className="text-xs font-semibold text-slate-500">Idea Summary</span><p className="mt-1 text-slate-700">{detail.user.ideaSummary}</p></div>
            )}
            {detail.payments.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Payment History</span>
                <div className="mt-1 space-y-1">
                  {detail.payments.map(p => <div key={p._id} className="flex items-center justify-between rounded bg-slate-50 px-3 py-2 text-xs">
                    <span>{p.transactionId}</span><span className="capitalize">{p.type}</span><span>{fmtCurrency(p.amount)}</span>{statusBadge(p.status)}<span>{fmtDate(p.createdAt)}</span>
                  </div>)}
                </div>
              </div>
            )}
            {detail.tickets.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Tickets</span>
                <div className="mt-1 space-y-1">
                  {detail.tickets.map(t => <div key={t._id} className="flex items-center justify-between rounded bg-slate-50 px-3 py-2 text-xs">
                    <span className="flex-1">{t.subject}</span>{statusBadge(t.status)}<span className="ml-2">{fmtDate(t.createdAt)}</span>
                  </div>)}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   3. PAYMENT MANAGEMENT
   =============================================================== */
function PaymentsSection() {
  const api = useApi()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const fetchPayments = useCallback(() => {
    setLoading(true)
    const q = new URLSearchParams()
    if (filterType) q.set('type', filterType)
    if (filterStatus) q.set('status', filterStatus)
    api.get(`/api/admin/payments?${q}`).then(setPayments).finally(() => setLoading(false))
  }, [filterType, filterStatus])

  useEffect(() => { fetchPayments() }, [fetchPayments])

  const markPaid = async (id) => {
    await api.put(`/api/admin/payments/${id}/mark-paid`, {})
    fetchPayments()
  }

  const handleExport = () => {
    const headers = ['Transaction ID', 'User', 'Email', 'Founder ID', 'Amount', 'Type', 'Status', 'Date']
    const rows = payments.map(p => [p.transactionId, p.userId?.name, p.userId?.email, p.userId?.founderId, p.amount, p.type, p.status, fmtDate(p.createdAt)])
    exportCSV('payments.csv', headers, rows)
  }

  const totals = {
    membership: payments.filter(p => p.type === 'membership' && p.status === 'success').reduce((s, p) => s + p.amount, 0),
    validation: payments.filter(p => p.type === 'validation' && p.status === 'success').reduce((s, p) => s + p.amount, 0),
    course: payments.filter(p => p.type === 'course' && p.status === 'success').reduce((s, p) => s + p.amount, 0),
  }

  return (
    <div>
      {/* Revenue overview cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-slate-500">Total Revenue</p><p className="text-xl font-bold text-slate-800">{fmtCurrency(totals.membership + totals.validation + totals.course)}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-slate-500">Membership (₹2500)</p><p className="text-xl font-bold text-blue-600">{fmtCurrency(totals.membership)}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-slate-500">Validation (₹5000)</p><p className="text-xl font-bold text-purple-600">{fmtCurrency(totals.validation)}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-slate-500">Courses</p><p className="text-xl font-bold text-emerald-600">{fmtCurrency(totals.course)}</p></div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Types</option>
          <option value="membership">Membership</option>
          <option value="validation">Validation</option>
          <option value="course">Course</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button onClick={handleExport} className="ml-auto rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Export CSV</button>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Transaction ID</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs">{p.transactionId || '—'}</td>
                  <td className="px-4 py-3"><div>{p.userId?.name || '—'}</div><div className="text-xs text-slate-400">{p.userId?.email} · {p.userId?.founderId}</div><div className="text-xs text-slate-400">{p.userId?.phone}</div></td>
                  <td className="px-4 py-3 font-medium">{fmtCurrency(p.amount)}</td>
                  <td className="px-4 py-3 capitalize">{p.type}</td>
                  <td className="px-4 py-3">{statusBadge(p.status)}</td>
                  <td className="px-4 py-3 text-xs">{fmtDateTime(p.createdAt)}</td>
                  <td className="px-4 py-3">
                    {p.status !== 'success' && <button onClick={() => markPaid(p._id)} className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-100">Mark Paid</button>}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No payments found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ===============================================================
   4. TICKET MANAGEMENT
   =============================================================== */
function TicketsSection() {
  const api = useApi()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({ status: '', adminNotes: '' })

  const fetchTickets = useCallback(() => {
    setLoading(true)
    const q = filterStatus ? `?status=${filterStatus}` : ''
    api.get(`/api/admin/tickets${q}`).then(setTickets).finally(() => setLoading(false))
  }, [filterStatus])

  useEffect(() => { fetchTickets() }, [fetchTickets])

  const openEdit = (t) => { setEditing(t); setEditForm({ status: t.status, adminNotes: t.adminNotes || '' }) }
  const saveTicket = async () => {
    await api.put(`/api/admin/tickets/${editing._id}`, editForm)
    setEditing(null)
    fetchTickets()
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <span className="text-xs text-slate-400">{tickets.length} ticket(s)</span>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Subject</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3"><div className="font-medium">{t.subject}</div><div className="mt-0.5 text-xs text-slate-400 line-clamp-2">{t.description}</div></td>
                  <td className="px-4 py-3"><div>{t.userId?.name || '—'}</div><div className="text-xs text-slate-400">{t.userId?.email} · {t.userId?.founderId}</div><div className="text-xs text-slate-400">{t.userId?.phone}</div></td>
                  <td className="px-4 py-3">{statusBadge(t.status)}</td>
                  <td className="px-4 py-3 text-xs">{fmtDateTime(t.createdAt)}</td>
                  <td className="px-4 py-3"><button onClick={() => openEdit(t)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button></td>
                </tr>
              ))}
              {tickets.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No tickets found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Ticket: ${editing?.subject}`}>
        {editing && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm">
              <p className="font-medium text-slate-700">From: {editing.userId?.name} ({editing.userId?.email})</p>
              <p className="mt-1 text-xs text-slate-400">Founder ID: {editing.userId?.founderId} · Phone: {editing.userId?.phone}</p>
              <p className="mt-2 text-slate-600">{editing.description}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Admin Notes</label>
              <textarea value={editForm.adminNotes} onChange={e => setEditForm(f => ({ ...f, adminNotes: e.target.value }))} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="Add notes or reply..." />
            </div>
            <button onClick={saveTicket} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   5. EVENTS MANAGEMENT
   =============================================================== */
function EventsSection() {
  const api = useApi()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const emptyEvent = { title: '', description: '', date: '', location: '', eventType: 'Workshop', status: 'Upcoming', image: '', registrationLimit: 0 }
  const [form, setForm] = useState(emptyEvent)

  const fetch_ = () => { setLoading(true); api.get('/api/admin/events').then(setEvents).finally(() => setLoading(false)) }
  useEffect(() => { fetch_() }, [])

  const openNew = () => { setEditing(null); setForm(emptyEvent); setShowForm(true) }
  const openEdit = (ev) => { setEditing(ev); setForm({ ...ev, date: ev.date?.substring(0, 10) || '' }); setShowForm(true) }
  const save = async () => {
    if (editing) await api.put(`/api/admin/events/${editing._id}`, form)
    else await api.post('/api/admin/events', form)
    setShowForm(false); fetch_()
  }
  const remove = async (id) => { await api.del(`/api/admin/events/${id}`); fetch_() }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">{events.length} event(s)</span>
        <button onClick={openNew} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Create Event</button>
      </div>

      {loading ? <Spinner /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(ev => (
            <div key={ev._id} className="rounded-xl border bg-white p-4">
              {ev.image && <img src={ev.image} alt={ev.title} className="mb-3 h-36 w-full rounded-lg object-cover" />}
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold text-slate-800">{ev.title}</h4>
                {statusBadge(ev.status)}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{ev.description}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                <span>📅 {fmtDate(ev.date)}</span>
                <span>📍 {ev.location}</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">Type: {ev.eventType}{ev.registrationLimit > 0 ? ` · Limit: ${ev.registrationLimit}` : ''}</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => openEdit(ev)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Edit</button>
                <button onClick={() => remove(ev._id)} className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100">Delete</button>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="col-span-full text-center text-slate-400 py-8">No events yet</p>}
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Event' : 'Create Event'}>
        <div className="space-y-3">
          <FormField label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <FormField label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} textarea />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <FormField label="Location" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500">Event Type</label>
              <select value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                {['Workshop','Startup Meet','Pitch Event','Hackathon','Webinar','Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                {['Upcoming','Registration Open','Ongoing','Completed','Cancelled'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <FormField label="Image URL" value={form.image} onChange={v => setForm(f => ({ ...f, image: v }))} />
          <FormField label="Registration Limit (0 = unlimited)" type="number" value={form.registrationLimit} onChange={v => setForm(f => ({ ...f, registrationLimit: Number(v) }))} />
          <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{editing ? 'Update Event' : 'Create Event'}</button>
        </div>
      </Modal>
    </div>
  )
}

/* ===============================================================
   6. GRANTS & FUNDING MANAGEMENT
   =============================================================== */
function GrantsSection() {
  const api = useApi()
  const [grants, setGrants] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const emptyGrant = { title: '', organization: '', amount: '', eligibility: '', deadline: '', applicationLink: '', description: '', type: 'Grant', status: 'Active' }
  const [form, setForm] = useState(emptyGrant)

  const fetch_ = () => { setLoading(true); api.get('/api/admin/grants').then(setGrants).finally(() => setLoading(false)) }
  useEffect(() => { fetch_() }, [])

  const openNew = () => { setEditing(null); setForm(emptyGrant); setShowForm(true) }
  const openEdit = (g) => { setEditing(g); setForm({ ...g, deadline: g.deadline?.substring(0, 10) || '' }); setShowForm(true) }
  const save = async () => {
    if (editing) await api.put(`/api/admin/grants/${editing._id}`, form)
    else await api.post('/api/admin/grants', form)
    setShowForm(false); fetch_()
  }
  const remove = async (id) => { await api.del(`/api/admin/grants/${id}`); fetch_() }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">{grants.length} item(s)</span>
        <button onClick={openNew} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Add Grant / Funding</button>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Organization</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Eligibility</th><th className="px-4 py-3">Deadline</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {grants.map(g => (
                <tr key={g._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{g.title}</td>
                  <td className="px-4 py-3 text-xs">{g.organization}</td>
                  <td className="px-4 py-3">{g.amount}</td>
                  <td className="px-4 py-3"><Badge text={g.type} color={g.type === 'Grant' ? 'green' : g.type === 'Funding' ? 'blue' : 'purple'} /></td>
                  <td className="px-4 py-3 text-xs">{g.eligibility}</td>
                  <td className="px-4 py-3 text-xs">{fmtDate(g.deadline)}</td>
                  <td className="px-4 py-3">{statusBadge(g.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(g)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Edit</button>
                      <button onClick={() => remove(g._id)} className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {grants.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400">No grants / funding added</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Grant / Funding' : 'Add Grant / Funding'}>
        <div className="space-y-3">
          <FormField label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <FormField label="Organization" value={form.organization} onChange={v => setForm(f => ({ ...f, organization: v }))} />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Amount" value={form.amount} onChange={v => setForm(f => ({ ...f, amount: v }))} placeholder="e.g. ₹20 Lakh" />
            <FormField label="Eligibility" value={form.eligibility} onChange={v => setForm(f => ({ ...f, eligibility: v }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Deadline" type="date" value={form.deadline} onChange={v => setForm(f => ({ ...f, deadline: v }))} />
            <div>
              <label className="text-xs font-semibold text-slate-500">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option>Grant</option><option>Funding</option><option>Investor</option>
              </select>
            </div>
          </div>
          <FormField label="Application Link" value={form.applicationLink} onChange={v => setForm(f => ({ ...f, applicationLink: v }))} />
          <FormField label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} textarea />
          <div>
            <label className="text-xs font-semibold text-slate-500">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
              <option>Active</option><option>Closed</option><option>Upcoming</option>
            </select>
          </div>
          <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{editing ? 'Update' : 'Create'}</button>
        </div>
      </Modal>
    </div>
  )
}

/* ===============================================================
   7. PLANS MANAGEMENT
   =============================================================== */
function PlansSection() {
  const api = useApi()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const emptyPlan = {
    name: '',
    slug: '',
    badge: '',
    description: '',
    price: 0,
    billingText: '/ one-time',
    ctaText: '',
    ctaRoute: '',
    featuresText: '',
    sortOrder: 1,
    isPopular: false,
    isActive: true,
  }
  const [form, setForm] = useState(emptyPlan)

  const fetch_ = () => {
    setLoading(true)
    setError('')
    api.get('/api/admin/plans').then(setPlans).catch((err) => setError(err.message || 'Failed to load plans')).finally(() => setLoading(false))
  }
  useEffect(() => { fetch_() }, [])

  const openNew = () => {
    setError('')
    setEditing(null)
    setForm({ ...emptyPlan, sortOrder: plans.length + 1 })
    setShowForm(true)
  }

  const openEdit = (p) => {
    setError('')
    setEditing(p)
    setForm({
      name: p.name || '',
      slug: p.slug || '',
      badge: p.badge || '',
      description: p.description || '',
      price: p.price || 0,
      billingText: p.billingText || '/ one-time',
      ctaText: p.ctaText || '',
      ctaRoute: p.ctaRoute || '',
      featuresText: (p.features || []).join('\n'),
      sortOrder: p.sortOrder || 1,
      isPopular: Boolean(p.isPopular),
      isActive: Boolean(p.isActive),
    })
    setShowForm(true)
  }

  const slugify = (value) =>
    String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const closeForm = () => {
    setShowForm(false)
    setSaving(false)
    setError('')
  }

  const save = async () => {
    setError('')

    const derivedSlug = slugify(form.slug || form.name)
    if (!form.name.trim()) {
      setError('Plan name is required.')
      return
    }
    if (!derivedSlug) {
      setError('Slug is required. Use letters, numbers and hyphens.')
      return
    }
    if (!form.ctaText.trim()) {
      setError('CTA text is required.')
      return
    }
    if (!form.ctaRoute.trim()) {
      setError('CTA route is required.')
      return
    }
    if (Number(form.price) < 0) {
      setError('Price cannot be negative.')
      return
    }

    setSaving(true)

    const features = form.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean)

    const payload = {
      name: form.name,
      slug: form.slug,
      badge: form.badge,
      description: form.description,
      price: Number(form.price),
      billingText: form.billingText,
      ctaText: form.ctaText,
      ctaRoute: form.ctaRoute,
      features,
      sortOrder: Number(form.sortOrder),
      isPopular: form.isPopular,
      isActive: form.isActive,
    }

    try {
      if (editing) await api.put(`/api/admin/plans/${editing._id}`, payload)
      else await api.post('/api/admin/plans', payload)

      closeForm()
      fetch_()
    } catch (err) {
      setError(err.message || 'Failed to save plan')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    setError('')
    try {
      await api.del(`/api/admin/plans/${id}`)
      fetch_()
    } catch (err) {
      setError(err.message || 'Failed to delete plan')
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">{plans.length} plan(s)</span>
        <button onClick={openNew} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Add Plan</button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Popular</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.slug}</div>
                    {p.badge && <div className="mt-1 text-[10px] font-semibold text-blue-600">{p.badge}</div>}
                  </td>
                  <td className="px-4 py-3 font-semibold">{fmtCurrency(p.price)} <span className="text-xs font-normal text-slate-400">{p.billingText}</span></td>
                  <td className="px-4 py-3 font-mono text-xs">{p.ctaRoute}</td>
                  <td className="px-4 py-3">{p.sortOrder}</td>
                  <td className="px-4 py-3">{p.isPopular ? <Badge text="Yes" color="green" /> : <Badge text="No" color="gray" />}</td>
                  <td className="px-4 py-3">{p.isActive ? <Badge text="Active" color="green" /> : <Badge text="Inactive" color="red" />}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Edit</button>
                      <button onClick={() => remove(p._id)} className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No plans configured</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showForm} onClose={closeForm} title={editing ? 'Edit Plan' : 'Add Plan'}>
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500">Fields marked with <span className="text-red-500">*</span> are required.</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <FormField
              label="Name *"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              info="Enter a clear plan name shown to users, for example: Startup Membership or Idea Validation."
            />
            <FormField
              label="Slug *"
              value={form.slug}
              onChange={(v) => setForm((f) => ({ ...f, slug: slugify(v) }))}
              placeholder="startup-membership"
              info="Unique technical identifier used by APIs and links. Use lowercase words with hyphens only, for example: startup-membership."
            />
          </div>
          <FormField
            label="Badge"
            value={form.badge}
            onChange={(v) => setForm((f) => ({ ...f, badge: v }))}
            placeholder="Most Popular"
            info="Optional short highlight text displayed on the card. Keep it concise, usually 1-3 words."
          />
          <FormField
            label="Description"
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            textarea
            info="Write a short summary of what this plan includes and who it is for. Aim for 1-2 crisp sentences."
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <FormField
              label="Price *"
              type="number"
              value={form.price}
              onChange={(v) => setForm((f) => ({ ...f, price: v }))}
              info="Enter only the numeric amount in INR, without commas or currency symbol. Example: 2500"
            />
            <FormField
              label="Billing Text"
              value={form.billingText}
              onChange={(v) => setForm((f) => ({ ...f, billingText: v }))}
              placeholder="/ one-time"
              info="Text shown next to price to indicate billing period, such as / one-time, / month, or / year."
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <FormField
              label="CTA Text *"
              value={form.ctaText}
              onChange={(v) => setForm((f) => ({ ...f, ctaText: v }))}
              placeholder="Join Now"
              info="Button text users will click. Use action words such as Join Now, Apply Now, or Start Validation."
            />
            <FormField
              label="CTA Route *"
              value={form.ctaRoute}
              onChange={(v) => setForm((f) => ({ ...f, ctaRoute: v }))}
              placeholder="/startup-application"
              info="Internal page route opened by the button. Must start with / and should map to an existing frontend path."
            />
          </div>
          <FormField
            label="Sort Order"
            type="number"
            value={form.sortOrder}
            onChange={(v) => setForm((f) => ({ ...f, sortOrder: v }))}
            info="Controls display priority. Lower number appears first on the website (for example 1 before 2)."
          />
          <FormField
            label="Features (one per line)"
            value={form.featuresText}
            onChange={(v) => setForm((f) => ({ ...f, featuresText: v }))}
            textarea
            info="Enter one benefit per line. Each non-empty line becomes a bullet point on the plan card."
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input type="checkbox" checked={form.isPopular} onChange={(e) => setForm((f) => ({ ...f, isPopular: e.target.checked }))} className="rounded" />
              <span className="inline-flex items-center gap-1.5">
                Mark as popular
                <FieldHint text="Enable this to visually highlight the plan as recommended in pricing sections." />
              </span>
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="rounded" />
              <span className="inline-flex items-center gap-1.5">
                Active on website
                <FieldHint text="Only active plans are visible on user-facing pages and available to be selected." />
              </span>
            </label>
          </div>
          <button onClick={save} disabled={saving} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
            {saving ? 'Saving...' : (editing ? 'Update Plan' : 'Create Plan')}
          </button>
        </div>
      </Modal>
    </div>
  )
}

/* ===============================================================
   8. MEMBERSHIP MANAGEMENT (PLAN-WISE)
   =============================================================== */
function MembershipsSection() {
  const api = useApi()
  const [plans, setPlans] = useState([])
  const [users, setUsers] = useState([])
  const [validations, setValidations] = useState([])
  const [fellowshipApps, setFellowshipApps] = useState([])
  const [selectedPlanSlug, setSelectedPlanSlug] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedUser, setSelectedUser] = useState(null)

  const [selectedValidation, setSelectedValidation] = useState(null)
  const [validationEditForm, setValidationEditForm] = useState({ status: '', adminNotes: '', certificateIssued: false, rejectionReason: '' })

  const [selectedFellowship, setSelectedFellowship] = useState(null)
  const [fellowshipEditStatus, setFellowshipEditStatus] = useState('new')

  const fallbackPlans = [
    { _id: 'plan-startup-membership', name: 'Startup Membership', slug: 'startup-membership', ctaRoute: '/startup-application', isActive: true },
    { _id: 'plan-idea-validation', name: 'Idea Validation', slug: 'idea-validation', ctaRoute: '/join-validation', isActive: true },
    { _id: 'plan-fellowship-program', name: 'Fellowship Program', slug: 'fellowship-program', ctaRoute: '/fellowship-application', isActive: true },
  ]

  const classifyPlan = (plan) => {
    const slug = String(plan?.slug || '').toLowerCase()
    const route = String(plan?.ctaRoute || '').toLowerCase()

    if (slug.includes('validation') || route.includes('join-validation')) return 'validation'
    if (slug.includes('fellowship') || route.includes('fellowship')) return 'fellowship'
    return 'startup'
  }

  const fetch_ = async () => {
    setLoading(true)
    setError('')

    try {
      const [planItems, userItems, validationItems, fellowshipItems] = await Promise.all([
        api.get('/api/admin/plans'),
        api.get('/api/admin/users'),
        api.get('/api/admin/validations'),
        api.get('/api/admin/fellowship-applications'),
      ])

      const activePlans = (planItems || [])
        .filter((p) => p.isActive !== false)
        .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999))

      const nextPlans = activePlans.length ? activePlans : fallbackPlans

      setPlans(nextPlans)
      setUsers(userItems || [])
      setValidations(validationItems || [])
      setFellowshipApps(fellowshipItems || [])

      setSelectedPlanSlug((prev) => {
        if (prev && nextPlans.some((p) => p.slug === prev)) return prev
        return nextPlans[0]?.slug || ''
      })
    } catch (err) {
      setError(err.message || 'Failed to load membership data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch_() }, [])

  const planOptions = plans.length ? plans : fallbackPlans
  const selectedPlan = planOptions.find((p) => p.slug === selectedPlanSlug) || planOptions[0] || null
  const selectedKind = classifyPlan(selectedPlan)

  const startupMembers = users.filter((u) => u.membershipType === 'startup')
  const validationMembers = validations
  const fellowshipMembers = fellowshipApps

  const countForPlan = (plan) => {
    const kind = classifyPlan(plan)
    if (kind === 'validation') return validationMembers.length
    if (kind === 'fellowship') return fellowshipMembers.length
    return startupMembers.length
  }

  const openValidation = (item) => {
    setSelectedValidation(item)
    setValidationEditForm({
      status: item.status,
      adminNotes: item.adminNotes || '',
      certificateIssued: item.certificateIssued || false,
      rejectionReason: item.rejectionReason || '',
    })
  }

  const saveValidation = async () => {
    await api.put(`/api/admin/validations/${selectedValidation._id}`, validationEditForm)
    setSelectedValidation(null)
    fetch_()
  }

  const openFellowship = (item) => {
    setSelectedFellowship(item)
    setFellowshipEditStatus(item.status || 'new')
  }

  const saveFellowship = async () => {
    await api.put(`/api/admin/fellowship-applications/${selectedFellowship._id}`, { status: fellowshipEditStatus })
    setSelectedFellowship(null)
    fetch_()
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm text-blue-700">
        Membership management is now organized plan-wise. Select a plan to view and manage related members/applications.
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {planOptions.map((plan) => {
          const kind = classifyPlan(plan)
          const isActive = plan.slug === selectedPlan?.slug
          const tone = kind === 'validation' ? 'from-purple-500 to-pink-600' : kind === 'fellowship' ? 'from-cyan-500 to-blue-600' : 'from-blue-600 to-indigo-600'

          return (
            <button
              key={plan._id || plan.slug}
              onClick={() => setSelectedPlanSlug(plan.slug)}
              className={`relative overflow-hidden rounded-2xl border p-4 text-left transition ${isActive ? 'border-transparent shadow-lg' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}
            >
              {isActive && <div className={`absolute inset-0 bg-gradient-to-br ${tone} opacity-95`} />}
              <div className="relative z-10">
                <div className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                  {kind === 'startup' ? 'Startup Membership' : kind === 'validation' ? 'Idea Validation' : 'Fellowship Program'}
                </div>
                <div className={`mt-1 text-base font-bold ${isActive ? 'text-white' : 'text-slate-800'}`}>{plan.name}</div>
                <div className={`mt-3 text-2xl font-extrabold ${isActive ? 'text-white' : 'text-slate-900'}`}>{countForPlan(plan)}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>member/application record(s)</div>
              </div>
            </button>
          )
        })}
      </div>

      {selectedPlan && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
            <h3 className="text-sm font-bold text-slate-800">{selectedPlan.name} Details</h3>
            <span className="text-xs text-slate-400">{countForPlan(selectedPlan)} record(s)</span>
          </div>

          {selectedKind === 'startup' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Founder ID</th>
                    <th className="px-4 py-3">Startup</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {startupMembers.map((u) => (
                    <tr key={u._id} className="border-t hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                        <div className="text-xs text-slate-400">{u.phone || '—'}</div>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium">{u.founderId || '—'}</td>
                      <td className="px-4 py-3 text-xs">{u.startupName || '—'} <span className="text-slate-400">· {u.startupStage || '—'}</span></td>
                      <td className="px-4 py-3">{statusBadge(u.membershipStatus)}</td>
                      <td className="px-4 py-3 text-xs">{fmtDate(u.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedUser(u)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">View</button>
                      </td>
                    </tr>
                  ))}
                  {startupMembers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No startup membership records</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {selectedKind === 'validation' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Founder</th>
                    <th className="px-4 py-3">Startup</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {validationMembers.map((v) => (
                    <tr key={v._id} className="border-t hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{v.founderName}</div>
                        <div className="text-xs text-slate-400">{v.founderEmail}</div>
                        <div className="text-xs text-slate-400">{v.founderPhone}</div>
                      </td>
                      <td className="px-4 py-3 text-xs">{v.startupName}</td>
                      <td className="px-4 py-3">{statusBadge(v.paymentStatus)}</td>
                      <td className="px-4 py-3">{statusBadge(v.status)}</td>
                      <td className="px-4 py-3 text-xs">{fmtDate(v.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => openValidation(v)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button>
                      </td>
                    </tr>
                  ))}
                  {validationMembers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No idea validation records</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {selectedKind === 'fellowship' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Applicant</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Education / City</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Applied</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fellowshipMembers.map((app) => (
                    <tr key={app._id} className="border-t hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{app.fullName}</td>
                      <td className="px-4 py-3 text-xs"><div>{app.email}</div><div className="text-slate-400">{app.phone}</div></td>
                      <td className="px-4 py-3 text-xs">{app.education || '—'} · {app.city || '—'}</td>
                      <td className="px-4 py-3">{statusBadge(app.status)}</td>
                      <td className="px-4 py-3 text-xs">{fmtDate(app.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => openFellowship(app)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button>
                      </td>
                    </tr>
                  ))}
                  {fellowshipMembers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No fellowship records</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)} title={`Member: ${selectedUser?.name || ''}`}>
        {selectedUser && (
          <div className="grid grid-cols-2 gap-3">
            <Info label="Name" value={selectedUser.name} />
            <Info label="Founder ID" value={selectedUser.founderId} />
            <Info label="Email" value={selectedUser.email} />
            <Info label="Phone" value={selectedUser.phone} />
            <Info label="Startup" value={selectedUser.startupName} />
            <Info label="Stage" value={selectedUser.startupStage} />
            <Info label="Industry" value={selectedUser.industry} />
            <Info label="Membership" value={selectedUser.membershipStatus} />
          </div>
        )}
      </Modal>

      <Modal open={!!selectedValidation} onClose={() => setSelectedValidation(null)} title={`Validation: ${selectedValidation?.startupName || ''}`}>
        {selectedValidation && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm space-y-1">
              <p><strong>Founder:</strong> {selectedValidation.founderName} · {selectedValidation.founderEmail} · {selectedValidation.founderPhone}</p>
              <p><strong>Startup:</strong> {selectedValidation.startupName}</p>
              <p><strong>Industry:</strong> {selectedValidation.industry} · <strong>Stage:</strong> {selectedValidation.stage}</p>
              <p><strong>Idea:</strong> {selectedValidation.idea}</p>
              {selectedValidation.innovationDescription && <p><strong>Innovation:</strong> {selectedValidation.innovationDescription}</p>}
              <p><strong>Payment:</strong> {statusBadge(selectedValidation.paymentStatus)} {selectedValidation.transactionId && `· ${selectedValidation.transactionId}`}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={validationEditForm.status} onChange={e => setValidationEditForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Admin Notes</label>
              <textarea value={validationEditForm.adminNotes} onChange={e => setValidationEditForm(f => ({ ...f, adminNotes: e.target.value }))} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            {validationEditForm.status === 'rejected' && (
              <div>
                <label className="text-xs font-semibold text-slate-500">Rejection Reason</label>
                <textarea value={validationEditForm.rejectionReason} onChange={e => setValidationEditForm(f => ({ ...f, rejectionReason: e.target.value }))} rows={2} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
            )}
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={validationEditForm.certificateIssued} onChange={e => setValidationEditForm(f => ({ ...f, certificateIssued: e.target.checked }))} className="rounded" />
              <span className="text-sm">Issue Validation Certificate</span>
            </label>
            <button onClick={saveValidation} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>

      <Modal open={!!selectedFellowship} onClose={() => setSelectedFellowship(null)} title={`Fellowship Application: ${selectedFellowship?.fullName || ''}`}>
        {selectedFellowship && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm space-y-1">
              <p><strong>Contact:</strong> {selectedFellowship.email} · {selectedFellowship.phone}</p>
              <p><strong>Education:</strong> {selectedFellowship.education || '—'}</p>
              <p><strong>City:</strong> {selectedFellowship.city || '—'}</p>
              <p><strong>Startup Idea:</strong> {selectedFellowship.startupIdea || '—'}</p>
              <p><strong>Message:</strong> {selectedFellowship.message || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={fellowshipEditStatus} onChange={e => setFellowshipEditStatus(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button onClick={saveFellowship} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   9. IDEA VALIDATION MANAGEMENT
   =============================================================== */
function ValidationsSection() {
  const api = useApi()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [editForm, setEditForm] = useState({ status: '', adminNotes: '', certificateIssued: false, rejectionReason: '' })

  const fetch_ = useCallback(() => {
    setLoading(true)
    const q = filterStatus ? `?status=${filterStatus}` : ''
    api.get(`/api/admin/validations${q}`).then(setItems).finally(() => setLoading(false))
  }, [filterStatus])
  useEffect(() => { fetch_() }, [fetch_])

  const openEdit = (v) => {
    setSelected(v)
    setEditForm({ status: v.status, adminNotes: v.adminNotes || '', certificateIssued: v.certificateIssued || false, rejectionReason: v.rejectionReason || '' })
  }
  const save = async () => {
    await api.put(`/api/admin/validations/${selected._id}`, editForm)
    setSelected(null); fetch_()
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="under-review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <span className="text-xs text-slate-400">{items.length} submission(s)</span>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Founder</th><th className="px-4 py-3">Startup</th><th className="px-4 py-3">Industry</th><th className="px-4 py-3">Stage</th><th className="px-4 py-3">Payment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Certificate</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {items.map(v => (
                <tr key={v._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3"><div className="font-medium">{v.founderName}</div><div className="text-xs text-slate-400">{v.founderEmail}</div><div className="text-xs text-slate-400">{v.founderPhone}</div></td>
                  <td className="px-4 py-3">{v.startupName}</td>
                  <td className="px-4 py-3 text-xs">{v.industry}</td>
                  <td className="px-4 py-3 text-xs">{v.stage}</td>
                  <td className="px-4 py-3">{statusBadge(v.paymentStatus)}</td>
                  <td className="px-4 py-3">{statusBadge(v.status)}</td>
                  <td className="px-4 py-3">{v.certificateIssued ? <Badge text="Issued" color="green" /> : <Badge text="Not Issued" color="gray" />}</td>
                  <td className="px-4 py-3 text-xs">{fmtDate(v.createdAt)}</td>
                  <td className="px-4 py-3"><button onClick={() => openEdit(v)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-400">No submissions</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Validation: ${selected?.startupName}`}>
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm space-y-1">
              <p><strong>Founder:</strong> {selected.founderName} · {selected.founderEmail} · {selected.founderPhone}</p>
              <p><strong>Startup:</strong> {selected.startupName}</p>
              <p><strong>Industry:</strong> {selected.industry} · <strong>Stage:</strong> {selected.stage}</p>
              <p><strong>Idea:</strong> {selected.idea}</p>
              {selected.innovationDescription && <p><strong>Innovation:</strong> {selected.innovationDescription}</p>}
              <p><strong>Payment:</strong> {statusBadge(selected.paymentStatus)} {selected.transactionId && `· ${selected.transactionId}`}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Admin Notes</label>
              <textarea value={editForm.adminNotes} onChange={e => setEditForm(f => ({ ...f, adminNotes: e.target.value }))} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            {editForm.status === 'rejected' && (
              <div>
                <label className="text-xs font-semibold text-slate-500">Rejection Reason</label>
                <textarea value={editForm.rejectionReason} onChange={e => setEditForm(f => ({ ...f, rejectionReason: e.target.value }))} rows={2} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
            )}
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={editForm.certificateIssued} onChange={e => setEditForm(f => ({ ...f, certificateIssued: e.target.checked }))} className="rounded" />
              <span className="text-sm">Issue Validation Certificate</span>
            </label>
            <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   8. COLLEGE RANKING MANAGEMENT
   =============================================================== */
function CollegesSection() {
  const api = useApi()
  const [colleges, setColleges] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [editForm, setEditForm] = useState({ ranking: 0, score: 0, status: '', adminNotes: '' })

  const fetch_ = useCallback(() => {
    setLoading(true)
    const q = filterStatus ? `?status=${filterStatus}` : ''
    api.get(`/api/admin/colleges${q}`).then(setColleges).finally(() => setLoading(false))
  }, [filterStatus])
  useEffect(() => { fetch_() }, [fetch_])

  const openEdit = (c) => {
    setSelected(c)
    setEditForm({ ranking: c.ranking || 0, score: c.score || 0, status: c.status, adminNotes: c.adminNotes || '' })
  }
  const save = async () => {
    await api.put(`/api/admin/colleges/${selected._id}`, editForm)
    setSelected(null); fetch_()
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="applied">Applied</option>
          <option value="under-review">Under Review</option>
          <option value="ranked">Ranked</option>
          <option value="rejected">Rejected</option>
        </select>
        <span className="text-xs text-slate-400">{colleges.length} application(s)</span>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr><th className="px-4 py-3">College</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Startups</th><th className="px-4 py-3">Workshops</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Rank</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">Applied</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {colleges.map(c => (
                <tr key={c._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{c.collegeName}</td>
                  <td className="px-4 py-3"><div>{c.contactPerson}</div><div className="text-xs text-slate-400">{c.email} · {c.phone}</div></td>
                  <td className="px-4 py-3 text-center">{c.startupCount}</td>
                  <td className="px-4 py-3 text-center">{c.workshopsConducted}</td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3 text-center font-bold">{c.ranking || '—'}</td>
                  <td className="px-4 py-3 text-center">{c.score || '—'}</td>
                  <td className="px-4 py-3 text-xs">{fmtDate(c.createdAt)}</td>
                  <td className="px-4 py-3"><button onClick={() => openEdit(c)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button></td>
                </tr>
              ))}
              {colleges.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-400">No applications</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`College: ${selected?.collegeName}`}>
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm space-y-1">
              <p><strong>Contact:</strong> {selected.contactPerson} · {selected.email} · {selected.phone}</p>
              <p><strong>Startups:</strong> {selected.startupCount} · <strong>Workshops:</strong> {selected.workshopsConducted}</p>
              {selected.activities && <p><strong>Activities:</strong> {selected.activities}</p>}
              {selected.innovationData && <p><strong>Innovation Data:</strong> {selected.innovationData}</p>}
              {selected.incubationPrograms && <p><strong>Incubation Programs:</strong> {selected.incubationPrograms}</p>}
              {selected.successStories && <p><strong>Success Stories:</strong> {selected.successStories}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Ranking" type="number" value={editForm.ranking} onChange={v => setEditForm(f => ({ ...f, ranking: Number(v) }))} />
              <FormField label="Score" type="number" value={editForm.score} onChange={v => setEditForm(f => ({ ...f, score: Number(v) }))} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="applied">Applied</option>
                <option value="under-review">Under Review</option>
                <option value="ranked">Ranked</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Admin Notes</label>
              <textarea value={editForm.adminNotes} onChange={e => setEditForm(f => ({ ...f, adminNotes: e.target.value }))} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   9. COLLEGE RANKING APPLICATIONS (NEW)
   =============================================================== */
function CollegeRankingSection() {
  const api = useApi()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [editForm, setEditForm] = useState({ rank: 0, status: 'Pending' })

  const fetch_ = useCallback(() => {
    setLoading(true)
    api.get('/api/admin/college-ranking-applications')
      .then((items) => {
        const filtered = filterStatus ? items.filter((i) => i.status === filterStatus) : items
        setApplications(filtered)
      })
      .finally(() => setLoading(false))
  }, [filterStatus])

  useEffect(() => { fetch_() }, [fetch_])

  const openEdit = (app) => {
    setSelected(app)
    setEditForm({ rank: app.rank || 0, status: app.status || 'Pending' })
  }

  const save = async () => {
    await api.put(`/api/admin/college-ranking-applications/${selected._id}`, editForm)
    setSelected(null)
    fetch_()
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Ranked">Ranked</option>
          <option value="Rejected">Rejected</option>
        </select>
        <span className="text-xs text-slate-400">{applications.length} application(s)</span>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{app.collegeName}</td>
                  <td className="px-4 py-3">
                    <div>{app.contactPerson}</div>
                    <div className="text-xs text-slate-400">{app.email} · {app.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 max-w-xs truncate">{app.message || '—'}</td>
                  <td className="px-4 py-3">{statusBadge(app.status)}</td>
                  <td className="px-4 py-3 text-center font-bold">{app.rank || '—'}</td>
                  <td className="px-4 py-3 text-xs">{fmtDate(app.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(app)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No ranking applications</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Ranking Application: ${selected?.collegeName}`}>
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm space-y-1">
              <p><strong>Contact:</strong> {selected.contactPerson} · {selected.email} · {selected.phone}</p>
              <p><strong>Message:</strong> {selected.message || '—'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Rank" type="number" value={editForm.rank} onChange={v => setEditForm(f => ({ ...f, rank: Number(v) }))} />
              <div>
                <label className="text-xs font-semibold text-slate-500">Status</label>
                <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Ranked">Ranked</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   10. COLLEGE RATINGS
   =============================================================== */
function CollegeRatingsSection() {
  const { get, del, put } = useApi()
  const [ratings, setRatings] = useState([])
  const [rankings, setRankings] = useState([])
  const [stats, setStats] = useState({ totalColleges: 0, totalRatings: 0, averageRating: 0, filteredItems: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showLiveRankingSnapshot, setShowLiveRankingSnapshot] = useState(false)
  const [settingsSaving, setSettingsSaving] = useState(false)
  const [collegeFilter, setCollegeFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [deletingId, setDeletingId] = useState('')

  const fetch_ = useCallback(async () => {
    setLoading(true)
    setError('')

    const listParams = new URLSearchParams({ limit: '50', page: String(page) })
    const summaryParams = new URLSearchParams()

    if (collegeFilter.trim()) {
      listParams.set('college', collegeFilter.trim())
      summaryParams.set('college', collegeFilter.trim())
    }
    if (ratingFilter) {
      listParams.set('rating', ratingFilter)
    }

    const listQuery = listParams.toString()
    const summaryQuery = summaryParams.toString()

    try {
      const [listData, summaryData, settingData] = await Promise.all([
        get(`/api/admin/college-ratings${listQuery ? `?${listQuery}` : ''}`),
        get(`/api/admin/college-ratings/summary${summaryQuery ? `?${summaryQuery}` : ''}`),
        get('/api/admin/college-ratings/settings'),
      ])

      const items = Array.isArray(listData?.items) ? listData.items : []
      const rankingRows = Array.isArray(summaryData?.rankings) ? summaryData.rankings : []

      setRatings(items)
      setRankings(rankingRows)
      setShowLiveRankingSnapshot(Boolean(settingData?.showLiveRankingSnapshot))
      setHasMore(Boolean(listData?.hasMore))
      setStats({
        totalColleges: Number(summaryData?.totalColleges || 0),
        totalRatings: Number(summaryData?.totalRatings || 0),
        averageRating: Number(summaryData?.averageRating || 0),
        filteredItems: Number(listData?.total || items.length || 0),
      })
    } catch (err) {
      setRatings([])
      setRankings([])
      setHasMore(false)
      setStats({ totalColleges: 0, totalRatings: 0, averageRating: 0, filteredItems: 0 })
      setError(err.message || 'Unable to load college ratings right now.')
    } finally {
      setLoading(false)
    }
  }, [get, collegeFilter, ratingFilter, page])

  useEffect(() => { fetch_() }, [fetch_])

  useEffect(() => {
    setPage(1)
  }, [collegeFilter, ratingFilter])

  const remove = async (ratingId) => {
    const shouldDelete = window.confirm('Delete this rating entry? This action cannot be undone.')
    if (!shouldDelete) return

    setDeletingId(ratingId)
    try {
      await del(`/api/admin/college-ratings/${ratingId}`)
      await fetch_()
    } catch (err) {
      alert(err.message || 'Unable to delete rating right now.')
    } finally {
      setDeletingId('')
    }
  }

  const toggleLiveRankingSnapshotVisibility = async () => {
    const nextValue = !showLiveRankingSnapshot
    const previousValue = showLiveRankingSnapshot

    setShowLiveRankingSnapshot(nextValue)
    setSettingsSaving(true)

    try {
      const updated = await put('/api/admin/college-ratings/settings', {
        showLiveRankingSnapshot: nextValue,
      })
      setShowLiveRankingSnapshot(Boolean(updated?.showLiveRankingSnapshot))
    } catch (err) {
      setShowLiveRankingSnapshot(previousValue)
      alert(err.message || 'Unable to update snapshot visibility right now.')
    } finally {
      setSettingsSaving(false)
    }
  }

  const ratingColor = (value) => {
    if (value >= 4) return 'green'
    if (value >= 3) return 'blue'
    if (value >= 2) return 'yellow'
    return 'red'
  }

  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_180px_auto]">
        <input
          value={collegeFilter}
          onChange={(e) => setCollegeFilter(e.target.value)}
          placeholder="Filter by college name"
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <button
          onClick={fetch_}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      <div className="mb-5 rounded-xl border bg-white px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Live Ranking Snapshot Visibility</h3>
            <p className="mt-0.5 text-xs text-slate-500">Show or hide the Live Ranking Snapshot card on the public homepage.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              {settingsSaving ? 'Saving...' : showLiveRankingSnapshot ? 'Visible to Users' : 'Hidden from Users'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={showLiveRankingSnapshot}
              aria-label="Toggle live ranking snapshot visibility"
              onClick={toggleLiveRankingSnapshotVisibility}
              disabled={settingsSaving}
              className={`relative inline-flex h-7 w-12 items-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-70 ${showLiveRankingSnapshot ? 'border-emerald-400 bg-emerald-500/80' : 'border-slate-300 bg-slate-300'}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${showLiveRankingSnapshot ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Ratings</p>
          <p className="mt-1 text-xl font-bold text-slate-800">{stats.totalRatings}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Rated Colleges</p>
          <p className="mt-1 text-xl font-bold text-slate-800">{stats.totalColleges}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Average Rating</p>
          <p className="mt-1 text-xl font-bold text-slate-800">{Number(stats.averageRating || 0).toFixed(2)}/5</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Filtered Entries</p>
          <p className="mt-1 text-xl font-bold text-slate-800">{stats.filteredItems}</p>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-xl border bg-white">
        <div className="border-b px-4 py-3">
          <h3 className="text-sm font-bold text-slate-800">College Ranking (By Average Rating)</h3>
          <p className="mt-0.5 text-xs text-slate-500">Automatically sorted highest to lowest.</p>
        </div>

        {loading ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">College</th>
                  <th className="px-4 py-3">Average</th>
                  <th className="px-4 py-3">Ratings</th>
                  <th className="px-4 py-3">Last Rated</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((item) => (
                  <tr key={item.collegeName} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-700">#{item.rank}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.collegeName}</td>
                    <td className="px-4 py-3">
                      <Badge text={`${Number(item.averageRating || 0).toFixed(2)} / 5`} color={ratingColor(Number(item.averageRating || 0))} />
                    </td>
                    <td className="px-4 py-3">{item.totalRatings}</td>
                    <td className="px-4 py-3 text-xs">{fmtDateTime(item.lastRatedAt)}</td>
                  </tr>
                ))}
                {rankings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">No rating summaries available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-white">
        <div className="border-b px-4 py-3">
          <h3 className="text-sm font-bold text-slate-800">Anonymous Rating Submissions</h3>
          <p className="mt-0.5 text-xs text-slate-500">You can delete inappropriate reviews from this list.</p>
        </div>

        {loading ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">College</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Feedback</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{item.collegeName}</td>
                    <td className="px-4 py-3">
                      <Badge text={`${item.rating}/5`} color={ratingColor(Number(item.rating || 0))} />
                    </td>
                    <td className="max-w-sm px-4 py-3 text-xs text-slate-600">{item.feedback || 'No feedback'}</td>
                    <td className="px-4 py-3 text-xs">{fmtDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => remove(item._id)}
                        disabled={deletingId === item._id}
                        className="rounded bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === item._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {ratings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">No ratings found for selected filters.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t bg-slate-50 px-4 py-2.5">
              <p className="text-xs font-medium text-slate-500">
                Showing page {page} · {stats.filteredItems} total entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1 || loading}
                  className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!hasMore || loading}
                  className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ===============================================================
   10. FELLOWSHIP APPLICATIONS
   =============================================================== */
function FellowshipApplicationsSection() {
  const api = useApi()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [editStatus, setEditStatus] = useState('new')

  const fetch_ = useCallback(() => {
    setLoading(true)
    const q = filterStatus ? `?status=${filterStatus}` : ''
    api.get(`/api/admin/fellowship-applications${q}`).then(setApplications).finally(() => setLoading(false))
  }, [filterStatus])

  useEffect(() => { fetch_() }, [fetch_])

  const openEdit = (app) => {
    setSelected(app)
    setEditStatus(app.status || 'new')
  }

  const save = async () => {
    await api.put(`/api/admin/fellowship-applications/${selected._id}`, { status: editStatus })
    setSelected(null)
    fetch_()
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
        <span className="text-xs text-slate-400">{applications.length} application(s)</span>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Education / City</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{app.fullName}</td>
                  <td className="px-4 py-3 text-xs"><div>{app.email}</div><div className="text-slate-400">{app.phone}</div></td>
                  <td className="px-4 py-3 text-xs">{app.education || '—'} · {app.city || '—'}</td>
                  <td className="px-4 py-3">{statusBadge(app.status)}</td>
                  <td className="px-4 py-3 text-xs">{fmtDate(app.createdAt)}</td>
                  <td className="px-4 py-3"><button onClick={() => openEdit(app)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Manage</button></td>
                </tr>
              ))}
              {applications.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No fellowship applications</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Fellowship Application: ${selected?.fullName}`}>
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm space-y-1">
              <p><strong>Contact:</strong> {selected.email} · {selected.phone}</p>
              <p><strong>Education:</strong> {selected.education || '—'}</p>
              <p><strong>City:</strong> {selected.city || '—'}</p>
              <p><strong>Startup Idea:</strong> {selected.startupIdea || '—'}</p>
              <p><strong>Message:</strong> {selected.message || '—'}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ===============================================================
   11. COURSE MANAGEMENT
   =============================================================== */
function CoursesSection() {
  const api = useApi()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const emptyCourse = { name: '', description: '', duration: '', price: 0, instructor: '', type: 'paid', contentLink: '' }
  const [form, setForm] = useState(emptyCourse)
  /* Assign course modal */
  const [assigning, setAssigning] = useState(null)
  const [assignEmail, setAssignEmail] = useState('')

  const fetch_ = () => { setLoading(true); api.get('/api/admin/courses').then(setCourses).finally(() => setLoading(false)) }
  useEffect(() => { fetch_() }, [])

  const openNew = () => { setEditing(null); setForm(emptyCourse); setShowForm(true) }
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, description: c.description, duration: c.duration, price: c.price, instructor: c.instructor, type: c.type, contentLink: c.contentLink }); setShowForm(true) }
  const save = async () => {
    if (editing) await api.put(`/api/admin/courses/${editing._id}`, form)
    else await api.post('/api/admin/courses', form)
    setShowForm(false); fetch_()
  }
  const remove = async (id) => { await api.del(`/api/admin/courses/${id}`); fetch_() }

  const assignUser = async () => {
    // search user by email to get ID
    const users = await api.get(`/api/admin/users?search=${encodeURIComponent(assignEmail)}`)
    if (users.length === 0) { alert('User not found'); return }
    await api.put(`/api/admin/courses/${assigning._id}/assign`, { userId: users[0]._id })
    setAssigning(null); setAssignEmail(''); fetch_()
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">{courses.length} course(s)</span>
        <button onClick={openNew} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Add Course</button>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Instructor</th><th className="px-4 py-3">Assigned</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.duration}</td>
                  <td className="px-4 py-3">{c.type === 'free' ? 'Free' : fmtCurrency(c.price)}</td>
                  <td className="px-4 py-3"><Badge text={c.type} color={c.type === 'free' ? 'green' : 'blue'} /></td>
                  <td className="px-4 py-3 text-xs">{c.instructor || '—'}</td>
                  <td className="px-4 py-3 text-center">{c.assignedUsers?.length || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Edit</button>
                      <button onClick={() => setAssigning(c)} className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600 hover:bg-purple-100">Assign</button>
                      <button onClick={() => remove(c._id)} className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No courses</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Course' : 'Add Course'}>
        <div className="space-y-3">
          <FormField label="Course Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <FormField label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} textarea />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Duration" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} placeholder="e.g. 6 weeks" />
            <FormField label="Price" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: Number(v) }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Instructor" value={form.instructor} onChange={v => setForm(f => ({ ...f, instructor: v }))} />
            <div>
              <label className="text-xs font-semibold text-slate-500">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="paid">Paid</option><option value="free">Free</option>
              </select>
            </div>
          </div>
          <FormField label="Content / Link" value={form.contentLink} onChange={v => setForm(f => ({ ...f, contentLink: v }))} />
          <button onClick={save} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{editing ? 'Update' : 'Create'}</button>
        </div>
      </Modal>

      {/* Assign course modal */}
      <Modal open={!!assigning} onClose={() => { setAssigning(null); setAssignEmail('') }} title={`Assign: ${assigning?.name}`}>
        <div className="space-y-3">
          <p className="text-sm text-slate-500">Enter the user email to assign this course.</p>
          <FormField label="User Email" value={assignEmail} onChange={setAssignEmail} placeholder="user@example.com" />
          <button onClick={assignUser} className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">Assign Course</button>
        </div>
      </Modal>
    </div>
  )
}

/* ===============================================================
  12. CONTACT / PARTNERSHIP QUERIES
   =============================================================== */
function QueriesSection() {
  const api = useApi()
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [formType, setFormType] = useState('')
  const [status, setStatus] = useState('')

  const formLabels = {
    startup_application: 'Startup Application',
    investor_interest: 'Investor Interest',
    college_partnership: 'College Partnership',
    newsletter: 'Newsletter',
  }

  const formColors = {
    startup_application: 'blue',
    investor_interest: 'green',
    college_partnership: 'purple',
    newsletter: 'yellow',
  }

  const fetchQueries = useCallback(() => {
    setLoading(true)
    const q = new URLSearchParams()
    if (formType) q.set('formType', formType)
    if (status) q.set('status', status)
    api.get(`/api/admin/contact-requests?${q.toString()}`).then(setQueries).finally(() => setLoading(false))
  }, [formType, status])

  useEffect(() => { fetchQueries() }, [fetchQueries])

  const updateStatus = async (item, nextStatus) => {
    await api.put(`/api/admin/contact-requests/${item._id}`, { status: nextStatus })
    fetchQueries()
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={formType} onChange={(e) => setFormType(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Forms</option>
          <option value="startup_application">Startup Application</option>
          <option value="investor_interest">Investor Interest</option>
          <option value="college_partnership">College Partnership</option>
          <option value="newsletter">Newsletter</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="resolved">Resolved</option>
        </select>
        <span className="ml-auto text-xs text-slate-400">{queries.length} submission(s)</span>
      </div>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">From Form</th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q._id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{q.fullName}</td>
                  <td className="px-4 py-3">
                    <div>{q.email}</div>
                    <div className="text-xs text-slate-400">{q.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge text={formLabels[q.formType] || q.formTitle || q.formType} color={formColors[q.formType] || 'gray'} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{q.organization || '—'}</td>
                  <td className="max-w-[260px] px-4 py-3 text-xs text-slate-600">{q.message || '—'}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{fmtDateTime(q.createdAt)}</td>
                  <td className="px-4 py-3">{statusBadge(q.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {q.status !== 'contacted' && (
                        <button onClick={() => updateStatus(q, 'contacted')} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">
                          Mark Contacted
                        </button>
                      )}
                      {q.status !== 'resolved' && (
                        <button onClick={() => updateStatus(q, 'resolved')} className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-100">
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {queries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">No form submissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ===============================================================
  13. NOTIFICATION MANAGEMENT
   =============================================================== */
function NotificationsSection() {
  const api = useApi()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const emptyNotif = { title: '', message: '', type: 'announcement', targetAudience: 'all', targetUserIds: [] }
  const [form, setForm] = useState(emptyNotif)

  /* ─ User search for targeted notifications ─ */
  const [userQuery, setUserQuery] = useState('')
  const [userResults, setUserResults] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([]) // { _id, name, email, founderId }
  const [searching, setSearching] = useState(false)

  const fetch_ = () => { setLoading(true); api.get('/api/admin/notifications').then(setNotifications).finally(() => setLoading(false)) }
  useEffect(() => { fetch_() }, [])

  const searchUsers = async (q) => {
    setUserQuery(q)
    if (q.length < 2) { setUserResults([]); return }
    setSearching(true)
    try {
      const users = await api.get(`/api/admin/users?search=${encodeURIComponent(q)}`)
      setUserResults(users.filter(u => !selectedUsers.some(s => s._id === u._id)))
    } catch { setUserResults([]) }
    setSearching(false)
  }

  const addUser = (u) => {
    setSelectedUsers(prev => [...prev, { _id: u._id, name: u.name, email: u.email, founderId: u.founderId }])
    setUserResults(prev => prev.filter(r => r._id !== u._id))
    setUserQuery('')
  }
  const removeUser = (id) => setSelectedUsers(prev => prev.filter(u => u._id !== id))

  const send = async () => {
    const payload = { ...form }
    if (form.targetAudience === 'selected') {
      if (selectedUsers.length === 0) { alert('Please select at least one user'); return }
      payload.targetUserIds = selectedUsers.map(u => u._id)
    } else {
      payload.targetUserIds = []
    }
    await api.post('/api/admin/notifications', payload)
    setShowForm(false); setForm(emptyNotif); setSelectedUsers([]); setUserQuery(''); setUserResults([]); fetch_()
  }
  const remove = async (id) => { await api.del(`/api/admin/notifications/${id}`); fetch_() }

  const typeColors = { announcement: 'blue', 'event-alert': 'purple', 'funding-update': 'green', general: 'gray' }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">{notifications.length} notification(s)</span>
        <button onClick={() => setShowForm(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Send Notification</button>
      </div>

      {loading ? <Spinner /> : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n._id} className="flex items-start justify-between rounded-xl border bg-white p-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-slate-800">{n.title}</h4>
                  <Badge text={n.type} color={typeColors[n.type] || 'gray'} />
                  <Badge text={n.targetAudience === 'all' ? 'All Members' : `${n.targetUserIds?.length || 0} Selected`} color="gray" />
                </div>
                <p className="mt-1 text-sm text-slate-500">{n.message}</p>
                {n.targetAudience === 'selected' && n.targetUserIds?.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {n.targetUserIds.map(u => (
                      <span key={u._id} className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                        {u.name || u.email} {u.founderId ? `(${u.founderId})` : ''}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-slate-400">Sent {fmtDateTime(n.createdAt)} by {n.createdBy?.name || 'Admin'}</p>
              </div>
              <button onClick={() => remove(n._id)} className="ml-3 shrink-0 rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100">Delete</button>
            </div>
          ))}
          {notifications.length === 0 && <p className="text-center text-slate-400 py-8">No notifications sent yet</p>}
        </div>
      )}

      <Modal open={showForm} onClose={() => { setShowForm(false); setSelectedUsers([]); setUserQuery(''); setUserResults([]) }} title="Send Notification">
        <div className="space-y-3">
          <FormField label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <FormField label="Message" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} textarea />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="announcement">Announcement</option>
                <option value="event-alert">Event Alert</option>
                <option value="funding-update">Funding Update</option>
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Target</label>
              <select value={form.targetAudience} onChange={e => setForm(f => ({ ...f, targetAudience: e.target.value }))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option value="all">All Members</option>
                <option value="selected">Selected Members</option>
              </select>
            </div>
          </div>

          {/* ─ User search & select (only when 'selected') ─ */}
          {form.targetAudience === 'selected' && (
            <div>
              <label className="text-xs font-semibold text-slate-500">Search Users</label>
              <div className="relative mt-1">
                <input
                  value={userQuery}
                  onChange={e => searchUsers(e.target.value)}
                  placeholder="Search by name, email, phone or founder ID..."
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {searching && <span className="absolute right-3 top-2.5 text-xs text-slate-400">Searching...</span>}
                {userResults.length > 0 && (
                  <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                    {userResults.map(u => (
                      <button
                        key={u._id}
                        onClick={() => addUser(u)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-blue-50"
                      >
                        <span className="font-medium text-slate-800">{u.name}</span>
                        <span className="text-xs text-slate-500">{u.email}</span>
                        {u.founderId && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">{u.founderId}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Selected users chips */}
              {selectedUsers.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedUsers.map(u => (
                    <span key={u._id} className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                      {u.name} {u.founderId ? `(${u.founderId})` : ''}
                      <button onClick={() => removeUser(u._id)} className="ml-0.5 text-blue-500 hover:text-red-500">&times;</button>
                    </span>
                  ))}
                </div>
              )}
              {selectedUsers.length === 0 && (
                <p className="mt-1 text-xs text-amber-600">Type at least 2 characters to search. Select at least one user.</p>
              )}
            </div>
          )}

          <button onClick={send} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Send Notification</button>
        </div>
      </Modal>
    </div>
  )
}

/* ===============================================================
   SHARED SMALL COMPONENTS
   =============================================================== */
function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-2.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <p className="mt-0.5 text-sm font-medium text-slate-700 capitalize">{value || '—'}</p>
    </div>
  )
}

function FieldHint({ text }) {
  const [open, setOpen] = useState(false)
  const [tipPos, setTipPos] = useState({ top: 0, left: 12, width: 260 })

  const placeTooltip = (el) => {
    if (!el || typeof window === 'undefined') return

    const rect = el.getBoundingClientRect()
    const viewportPadding = 12
    const width = Math.min(320, Math.max(220, window.innerWidth - viewportPadding * 2))

    let left = rect.left + rect.width / 2 - width / 2
    left = Math.max(viewportPadding, Math.min(left, window.innerWidth - width - viewportPadding))

    let top = rect.bottom + 10
    const estimatedHeight = 84
    if (top + estimatedHeight > window.innerHeight - viewportPadding) {
      top = Math.max(viewportPadding, rect.top - estimatedHeight - 10)
    }

    setTipPos({ top, left, width })
  }

  const showTip = (e) => {
    placeTooltip(e.currentTarget)
    setOpen(true)
  }

  const hideTip = () => setOpen(false)

  const toggleTip = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (open) {
      setOpen(false)
      return
    }
    placeTooltip(e.currentTarget)
    setOpen(true)
  }

  return (
    <>
      <button
      type="button"
      tabIndex={0}
      aria-label={text}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
      onClick={toggleTip}
      className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-slate-300 bg-white text-[10px] font-bold text-slate-500 outline-none transition hover:border-blue-400 hover:text-blue-600 focus:border-blue-500 focus:text-blue-600"
    >
      i
    </button>
    {open && (
      <div
        className="pointer-events-none fixed z-[120] rounded-lg bg-slate-900 px-2.5 py-2 text-[11px] font-medium leading-relaxed text-white shadow-xl"
        style={{ top: `${tipPos.top}px`, left: `${tipPos.left}px`, width: `${tipPos.width}px` }}
      >
        {text}
      </div>
    )}
    </>
  )
}

function FormField({ label, value, onChange, type = 'text', textarea, placeholder, info }) {
  const cls = 'mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20'
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-bold text-slate-500">{label}</label>
        {info && <FieldHint text={info} />}
      </div>
      {info && <p className="mt-1 text-[11px] leading-relaxed text-slate-500 md:hidden">{info}</p>}
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls} placeholder={placeholder} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      }
    </div>
  )
}
