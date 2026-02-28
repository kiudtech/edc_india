import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* ─── Sample placeholder data ─── */
const sampleEvents = [
  { id: 1, title: 'Startup Pitch Night', date: 'Mar 15, 2026', location: 'New Delhi', status: 'Upcoming', image: 'https://image.pollinations.ai/prompt/startup%20pitch%20night%20event%20stage%20modern%20lighting?width=400&height=250' },
  { id: 2, title: 'Innovation Summit 2026', date: 'Apr 5, 2026', location: 'Bengaluru', status: 'Upcoming', image: 'https://image.pollinations.ai/prompt/innovation%20summit%20conference%20hall%20tech%20event?width=400&height=250' },
  { id: 3, title: 'Founder Meetup', date: 'Mar 28, 2026', location: 'Mumbai', status: 'Upcoming', image: 'https://image.pollinations.ai/prompt/founder%20meetup%20networking%20event%20coffee?width=400&height=250' },
  { id: 4, title: 'Hackathon: Build India', date: 'May 10, 2026', location: 'Online', status: 'Registration Open', image: 'https://image.pollinations.ai/prompt/hackathon%20coding%20event%20team%20collaboration?width=400&height=250' },
]
const sampleGrants = [
  { title: 'Startup India Seed Fund', amount: '₹20 Lakh', deadline: 'Mar 31, 2026', eligibility: 'Early Stage' },
  { title: 'MSME Innovation Grant', amount: '₹10 Lakh', deadline: 'Apr 15, 2026', eligibility: 'All Stages' },
  { title: 'State Innovation Fund', amount: '₹5 Lakh', deadline: 'May 1, 2026', eligibility: 'MVP Ready' },
]
const sampleFunding = [
  { title: 'Angel Investor Round', range: '₹25L – ₹1Cr', stage: 'Seed', status: 'Open' },
  { title: 'Pre-Series A', range: '₹1Cr – ₹5Cr', stage: 'Growth', status: 'Open' },
  { title: 'Government Scheme Fund', range: '₹10L – ₹50L', stage: 'Early', status: 'Active' },
]
const sampleInvestors = [
  { name: 'Rajesh Sharma', type: 'Angel Investor', sectors: 'EdTech, HealthTech', portfolio: '15+ startups' },
  { name: 'Priya Ventures', type: 'VC Fund', sectors: 'DeepTech, SaaS', portfolio: '50+ startups' },
  { name: 'Vision Capital', type: 'Micro VC', sectors: 'AgriTech, CleanTech', portfolio: '25+ startups' },
]
const sampleUpdates = [
  { title: 'New Partnership with IIT Delhi', date: '2 hours ago', type: 'Announcement' },
  { title: 'Workshop on AI for Startups', date: '1 day ago', type: 'Event' },
  { title: 'Success Story: AgriPulse raises ₹2Cr', date: '3 days ago', type: 'Success' },
  { title: 'Monthly Founder Newsletter – Feb 2026', date: '1 week ago', type: 'Newsletter' },
]
const paidCourses = [
  { name: 'Advanced Pitch Mastery', duration: '6 weeks', price: '₹4,999', instructor: 'Industry Expert' },
  { name: 'Fundraising Blueprint', duration: '8 weeks', price: '₹7,999', instructor: 'VC Partner' },
  { name: 'Scale-Up Operations', duration: '4 weeks', price: '₹3,999', instructor: 'Startup Mentor' },
  { name: 'International Market Entry', duration: '6 weeks', price: '₹5,999', instructor: 'Global Advisor' },
]

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

export default function DashboardPage() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [tickets, setTickets] = useState([])
  const [ticketForm, setTicketForm] = useState({ subject: '', description: '' })
  const [ticketMsg, setTicketMsg] = useState('')
  const [courseMsg, setCourseMsg] = useState('')

  useEffect(() => {
    fetchTickets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/user/tickets', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setTickets(await res.json())
    } catch { /* ignore */ }
  }

  const handleRaiseTicket = async (e) => {
    e.preventDefault()
    setTicketMsg('')
    try {
      const res = await fetch('/api/user/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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
      const res = await fetch('/api/user/course-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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
    <div className="grid gap-5 sm:grid-cols-2">
      {sampleEvents.map((ev) => (
        <div key={ev.id} className={cardClass}>
          <img src={ev.image} alt={ev.title} className="h-36 w-full rounded-xl object-cover" loading="lazy" />
          <div className="mt-3 flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-semibold text-slate-800">{ev.title}</div>
              <div className="mt-1 text-xs text-slate-500">{ev.date} · {ev.location}</div>
            </div>
            <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700">{ev.status}</span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderGrants = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sampleGrants.map((g) => (
        <div key={g.title} className={cardClass}>
          <div className="text-sm font-semibold text-slate-800">{g.title}</div>
          <div className="mt-2 text-xl font-semibold text-primary">{g.amount}</div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Deadline: {g.deadline}</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">{g.eligibility}</span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderFunding = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sampleFunding.map((f) => (
        <div key={f.title} className={cardClass}>
          <div className="text-sm font-semibold text-slate-800">{f.title}</div>
          <div className="mt-2 text-lg font-semibold text-primary">{f.range}</div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Stage: {f.stage}</span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">{f.status}</span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderInvestors = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sampleInvestors.map((inv) => (
        <div key={inv.name} className={cardClass}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {inv.name.charAt(0)}
          </div>
          <div className="mt-3 text-sm font-semibold text-slate-800">{inv.name}</div>
          <div className="mt-1 text-xs text-secondary font-semibold">{inv.type}</div>
          <div className="mt-2 text-xs text-slate-500">Sectors: {inv.sectors}</div>
          <div className="text-xs text-slate-500">Portfolio: {inv.portfolio}</div>
        </div>
      ))}
    </div>
  )

  const renderCommunity = () => (
    <div className="space-y-3">
      {sampleUpdates.map((u) => (
        <div key={u.title} className={cardClass + ' flex items-center gap-4'}>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            u.type === 'Announcement' ? 'bg-blue-100 text-blue-700'
              : u.type === 'Event' ? 'bg-orange-100 text-orange-700'
              : u.type === 'Success' ? 'bg-green-100 text-green-700'
              : 'bg-slate-100 text-slate-600'
          }`}>{u.type}</span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-slate-800">{u.title}</div>
            <div className="text-xs text-slate-500">{u.date}</div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderCourses = () => (
    <div>
      {courseMsg && (
        <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{courseMsg}</div>
      )}
      <p className="mb-4 text-sm text-slate-500">Express interest and our admin will contact you for enrollment.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {paidCourses.map((c) => (
          <div key={c.name} className={cardClass}>
            <div className="text-sm font-semibold text-slate-800">{c.name}</div>
            <div className="mt-1 text-xs text-slate-500">Duration: {c.duration} · By: {c.instructor}</div>
            <div className="mt-2 text-lg font-semibold text-primary">{c.price}</div>
            <button
              onClick={() => handleCourseInterest(c.name)}
              className="mt-3 w-full rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              I&apos;m Interested
            </button>
          </div>
        ))}
      </div>
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
