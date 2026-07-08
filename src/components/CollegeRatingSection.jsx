import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Star } from 'lucide-react'
import { API_BASE } from '../config'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

const AUTOCOMPLETE_FALLBACK_COLLEGES = [
  'Indian Institute of Technology Delhi','Indian Institute of Technology Bombay',
  'Indian Institute of Technology Madras','Indian Institute of Technology Kanpur',
  'Indian Institute of Technology Kharagpur','Indian Institute of Science Bangalore',
  'National Institute of Technology Trichy','National Institute of Technology Warangal',
  'National Institute of Technology Surathkal','Delhi Technological University',
  'Netaji Subhas University of Technology','Jadavpur University',
  'Vellore Institute of Technology','SRM Institute of Science and Technology',
  'Lovely Professional University','Amity University','Manipal Institute of Technology',
  'Birla Institute of Technology and Science Pilani','College of Engineering Pune',
  'Pune Institute of Computer Technology',
]
const COLLEGE_PAGE_SIZE = 20
const normalizeCollegeValue = (v = '') => String(v || '').trim().replace(/\s+/g, ' ')
const mergeUniqueCollegeNames = (names = []) => Array.from(new Set(names.map(normalizeCollegeValue).filter(Boolean)))
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COLLEGE_RATING_CRITERIA = [
  { key: 'innovationEnvironment', label: 'Innovation Environment' },
  { key: 'placementOpportunities', label: 'Placement Opportunities' },
  { key: 'practicalLearning', label: 'Practical Learning' },
  { key: 'startupSupport', label: 'Startup Support' },
  { key: 'facultyQuality', label: 'Faculty Quality' },
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'industryExposure', label: 'Industry Exposure' },
  { key: 'skillDevelopment', label: 'Skill Development' },
  { key: 'campusCulture', label: 'Campus Culture' },
  { key: 'overallExperience', label: 'Overall Experience' },
]
const createInitialCriteriaRatings = () => COLLEGE_RATING_CRITERIA.reduce((a, i) => { a[i.key] = 0; return a }, {})

const DARK_THEMES = {
  blue: {
    section: 'bg-gradient-to-br from-[#0b1e4d] via-[#1a3a8f] to-[#0f2d6b]',
    blob1: 'bg-blue-400/15', blob2: 'bg-indigo-400/15',
    badge: 'text-cyan-300', badgeDot: 'bg-cyan-400', headingGrad: 'from-cyan-300 to-blue-300',
    dropdownBg: 'bg-[#0f2d6b]', accentText: 'text-cyan-300', accentHint: 'text-cyan-400',
    scoreBar: 'border-cyan-400/30 bg-cyan-400/10', scoreText: 'text-cyan-300',
    starFill: 'fill-blue-400 text-blue-400', starEmpty: 'text-white/20',
    leaderBadge: 'bg-cyan-400/20 border-cyan-400/30 text-cyan-300', leaderStar: 'fill-cyan-400 text-cyan-400',
    submitBtn: 'from-blue-500 to-indigo-500 shadow-blue-900/30',
    formBg: 'border-white/10 bg-white/5', formHeader: 'border-white/10 bg-white/5',
    inputBg: 'border-white/20 bg-white/10 focus-within:border-cyan-400/60',
    inputText: 'text-white placeholder:text-white/30',
    labelText: 'text-white/50', titleText: 'text-white', subText: 'text-white/50',
    criteriaCard: 'border-white/10 bg-white/5 hover:bg-white/10',
    criteriaLabel: 'text-white/90', criteriaScore: 'text-white/30',
    feedbackBg: 'border-white/20 bg-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-white/15',
    feedbackCount: 'text-white/30',
    leaderRank: 'text-white/40', leaderName: 'text-white', leaderCount: 'text-white/40',
    leaderLoading: 'text-white/40', leaderEmpty: 'border-white/10 bg-white/5 text-white/40',
    leaderCard: 'border-white/10 bg-white/5 hover:bg-white/10',
    leaderHeader: 'border-white/10 bg-white/5', leaderTitle: 'text-white', leaderSub: 'text-white/40',
    leaderLabel: 'text-white/50', leaderAside: 'border-white/10 bg-white/5',
    headingText: 'text-white', descText: 'text-white/60',
    badgeBorder: 'border-white/20 bg-white/10',
    iconBg: 'bg-white/10',
    dropdownItem: 'text-white/80 hover:bg-white/10',
    dropdownBorder: 'border-white/10',
    loadMoreText: 'text-cyan-300 hover:bg-white/10',
    scoreOverallText: 'text-white',
  },
  teal: {
    section: 'bg-gradient-to-br from-[#071a1a] via-[#0b3030] to-[#0d4a4a]',
    blob1: 'bg-teal-400/15', blob2: 'bg-cyan-400/15',
    badge: 'text-teal-300', badgeDot: 'bg-teal-400', headingGrad: 'from-teal-300 to-cyan-300',
    dropdownBg: 'bg-[#0b3030]', accentText: 'text-teal-300', accentHint: 'text-teal-400',
    scoreBar: 'border-teal-400/30 bg-teal-400/10', scoreText: 'text-teal-300',
    starFill: 'fill-teal-400 text-teal-400', starEmpty: 'text-white/20',
    leaderBadge: 'bg-teal-400/20 border-teal-400/30 text-teal-300', leaderStar: 'fill-teal-400 text-teal-400',
    submitBtn: 'from-teal-500 to-cyan-600 shadow-teal-900/30',
    formBg: 'border-white/10 bg-white/5', formHeader: 'border-white/10 bg-white/5',
    inputBg: 'border-white/20 bg-white/10 focus-within:border-teal-400/60',
    inputText: 'text-white placeholder:text-white/30',
    labelText: 'text-white/50', titleText: 'text-white', subText: 'text-white/50',
    criteriaCard: 'border-white/10 bg-white/5 hover:bg-white/10',
    criteriaLabel: 'text-white/90', criteriaScore: 'text-white/30',
    feedbackBg: 'border-white/20 bg-white/10 text-white placeholder:text-white/30 focus:border-teal-400/60 focus:bg-white/15',
    feedbackCount: 'text-white/30',
    leaderRank: 'text-white/40', leaderName: 'text-white', leaderCount: 'text-white/40',
    leaderLoading: 'text-white/40', leaderEmpty: 'border-white/10 bg-white/5 text-white/40',
    leaderCard: 'border-white/10 bg-white/5 hover:bg-white/10',
    leaderHeader: 'border-white/10 bg-white/5', leaderTitle: 'text-white', leaderSub: 'text-white/40',
    leaderLabel: 'text-white/50', leaderAside: 'border-white/10 bg-white/5',
    headingText: 'text-white', descText: 'text-white/60',
    badgeBorder: 'border-white/20 bg-white/10',
    iconBg: 'bg-white/10',
    dropdownItem: 'text-white/80 hover:bg-white/10',
    dropdownBorder: 'border-white/10',
    loadMoreText: 'text-teal-300 hover:bg-white/10',
    scoreOverallText: 'text-white',
  },
}

// Light theme used when noBg=true (renders on a light page background)
const LIGHT_THEME = {
  badge: 'text-teal-700', badgeDot: 'bg-teal-500', headingGrad: 'from-teal-600 to-cyan-600',
  dropdownBg: 'bg-white', accentText: 'text-teal-600', accentHint: 'text-teal-500',
  scoreBar: 'border-teal-200 bg-teal-50', scoreText: 'text-teal-700',
  starFill: 'fill-teal-500 text-teal-500', starEmpty: 'text-slate-300',
  leaderBadge: 'bg-teal-50 border-teal-200 text-teal-700', leaderStar: 'fill-teal-500 text-teal-500',
  submitBtn: 'from-teal-600 to-cyan-600 shadow-teal-200/60',
  formBg: 'border-slate-200 bg-white shadow-xl', formHeader: 'border-slate-100 bg-slate-50',
  inputBg: 'border-slate-200 bg-slate-50 focus-within:border-teal-400',
  inputText: 'text-slate-800 placeholder:text-slate-400',
  labelText: 'text-slate-500', titleText: 'text-slate-900', subText: 'text-slate-500',
  criteriaCard: 'border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-200',
  criteriaLabel: 'text-slate-700', criteriaScore: 'text-slate-400',
  feedbackBg: 'border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white',
  feedbackCount: 'text-slate-400',
  leaderRank: 'text-slate-400', leaderName: 'text-slate-800', leaderCount: 'text-slate-400',
  leaderLoading: 'text-slate-500', leaderEmpty: 'border-slate-200 bg-slate-50 text-slate-500',
  leaderCard: 'border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-100',
  leaderHeader: 'border-slate-100 bg-slate-50', leaderTitle: 'text-slate-900', leaderSub: 'text-slate-500',
  leaderLabel: 'text-slate-500', leaderAside: 'border-slate-200 bg-white',
  headingText: 'text-slate-900', descText: 'text-slate-500',
  badgeBorder: 'border-teal-200 bg-teal-50',
  iconBg: 'bg-teal-100',
  dropdownItem: 'text-slate-700 hover:bg-teal-50',
  dropdownBorder: 'border-slate-200',
  loadMoreText: 'text-teal-600 hover:bg-teal-50',
  scoreOverallText: 'text-slate-800',
}

export default function CollegeRatingSection({ theme = 'blue', noBg = false }) {
  const t = noBg ? LIGHT_THEME : (DARK_THEMES[theme] || DARK_THEMES.blue)
  const dt = DARK_THEMES[theme] || DARK_THEMES.blue
  const textInputClass = noBg
    ? 'mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white'
    : `mt-2 h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/30 ${theme === 'teal' ? 'focus:border-teal-400/60' : 'focus:border-cyan-400/60'} focus:bg-white/15`
  const privacyNoticeClass = noBg
    ? 'border-teal-200 bg-teal-50 text-teal-700'
    : 'border-white/10 bg-white/5 text-white/70'

  const dropdownRef = useRef(null)
  const searchDebounceRef = useRef(null)
  const fetchTokenRef = useRef(0)

  const [collegeInput, setCollegeInput] = useState('')
  const [selectedCollege, setSelectedCollege] = useState('')
  const [collegeOptions, setCollegeOptions] = useState([])
  const [collegePage, setCollegePage] = useState(1)
  const [collegeHasMore, setCollegeHasMore] = useState(false)
  const [collegeLoading, setCollegeLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [criteriaRatings, setCriteriaRatings] = useState(() => createInitialCriteriaRatings())
  const [hoveredCriteriaRatings, setHoveredCriteriaRatings] = useState(() => createInitialCriteriaRatings())
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })
  const [showLiveRankingSnapshot, setShowLiveRankingSnapshot] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(false)

  const fetchCollegeOptions = useCallback(async (queryText, page = 1, append = false) => {
    const nq = normalizeCollegeValue(queryText)
    const token = ++fetchTokenRef.current
    setCollegeLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(COLLEGE_PAGE_SIZE) })
      if (nq) params.set('q', nq)
      const res = await fetch(`${API_BASE}/api/college/list?${params}`, { cache: 'no-store' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !Array.isArray(data.items)) throw new Error()
      if (token !== fetchTokenRef.current) return
      const items = mergeUniqueCollegeNames(data.items)
      setCollegeOptions((p) => (append ? mergeUniqueCollegeNames([...p, ...items]) : items))
      setCollegeHasMore(Boolean(data.hasMore)); setCollegePage(page)
    } catch {
      if (token !== fetchTokenRef.current) return
      const q = nq.toLowerCase()
      const matches = AUTOCOMPLETE_FALLBACK_COLLEGES.filter((n) => !q || n.toLowerCase().includes(q))
      const start = (page - 1) * COLLEGE_PAGE_SIZE
      const slice = matches.slice(start, start + COLLEGE_PAGE_SIZE)
      setCollegeOptions((p) => (append ? mergeUniqueCollegeNames([...p, ...slice]) : slice))
      setCollegeHasMore(start + COLLEGE_PAGE_SIZE < matches.length); setCollegePage(page)
    } finally { if (token === fetchTokenRef.current) setCollegeLoading(false) }
  }, [])

  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/college/ratings/ranking?limit=6`, { cache: 'no-store' })
      const data = await res.json().catch(() => [])
      if (!res.ok || !Array.isArray(data)) throw new Error()
      setLeaderboard(data)
    } catch { setLeaderboard([]) } finally { setLeaderboardLoading(false) }
  }, [])

  const fetchLiveRankingVisibility = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/college/ratings/settings`, { cache: 'no-store' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error()
      setShowLiveRankingSnapshot(Boolean(data?.showLiveRankingSnapshot))
    } catch { setShowLiveRankingSnapshot(false) }
  }, [])

  useEffect(() => { fetchLiveRankingVisibility() }, [fetchLiveRankingVisibility])
  useEffect(() => { if (showLiveRankingSnapshot) fetchLeaderboard() }, [showLiveRankingSnapshot, fetchLeaderboard])
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
    searchDebounceRef.current = setTimeout(() => fetchCollegeOptions(collegeInput, 1, false), 250)
    return () => { if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current) }
  }, [collegeInput, fetchCollegeOptions])
  useEffect(() => {
    const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false) }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleSelectCollege = (name) => {
    const v = normalizeCollegeValue(name)
    setSelectedCollege(v); setCollegeInput(v); setDropdownOpen(false)
    setSubmitStatus((p) => (p.type === 'error' ? { type: '', message: '' } : p))
  }
  const handleCollegeInputChange = (value) => {
    setCollegeInput(value)
    if (selectedCollege && normalizeCollegeValue(value) !== normalizeCollegeValue(selectedCollege)) setSelectedCollege('')
  }
  const loadMoreColleges = () => { if (!collegeHasMore || collegeLoading) return; fetchCollegeOptions(collegeInput, collegePage + 1, true) }

  const areAllCriteriaRated = COLLEGE_RATING_CRITERIA.every(({ key }) => Number(criteriaRatings[key]) >= 1)
  const overallRating = useMemo(() => {
    if (!areAllCriteriaRated) return 0
    const total = COLLEGE_RATING_CRITERIA.reduce((s, { key }) => s + Number(criteriaRatings[key] || 0), 0)
    return Number((total / COLLEGE_RATING_CRITERIA.length).toFixed(2))
  }, [areAllCriteriaRated, criteriaRatings])

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitStatus({ type: '', message: '' })
    const normalizedStudentName = String(studentName || '').trim()
    const normalizedStudentEmail = String(studentEmail || '').trim().toLowerCase()
    if (!normalizedStudentName) return setSubmitStatus({ type: 'error', message: 'Please enter your name before submitting.' })
    if (!EMAIL_REGEX.test(normalizedStudentEmail)) return setSubmitStatus({ type: 'error', message: 'Please enter a valid email address before submitting.' })
    if (!selectedCollege) return setSubmitStatus({ type: 'error', message: 'Please select a college from the dropdown list.' })
    if (!areAllCriteriaRated) return setSubmitStatus({ type: 'error', message: 'Please rate all 10 parameters before submitting.' })
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/college/ratings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: normalizedStudentName,
          studentEmail: normalizedStudentEmail,
          collegeName: selectedCollege,
          rating: overallRating,
          criteriaRatings,
          feedback: feedback.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Unable to submit rating right now.')
      setSubmitStatus({ type: 'success', message: data.message || 'Your anonymous rating was submitted successfully.' })
      setStudentName(''); setStudentEmail('')
      setSelectedCollege(''); setCollegeInput('')
      setCriteriaRatings(createInitialCriteriaRatings()); setHoveredCriteriaRatings(createInitialCriteriaRatings())
      setFeedback(''); if (showLiveRankingSnapshot) fetchLeaderboard()
    } catch (err) { setSubmitStatus({ type: 'error', message: err.message || 'Unable to submit rating right now.' })
    } finally { setSubmitting(false) }
  }

  return (
    <section id="college-ratings" className={`relative overflow-hidden ${noBg ? 'bg-gradient-to-br from-slate-50 to-teal-50/30' : dt.section} py-12 sm:py-20 lg:py-28`}>
      {!noBg && <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />}
      {!noBg && <div className={`pointer-events-none absolute -left-20 top-12 h-[400px] w-[400px] rounded-full ${dt.blob1} blur-[100px]`} />}
      {!noBg && <div className={`pointer-events-none absolute -right-16 bottom-0 h-[350px] w-[350px] rounded-full ${dt.blob2} blur-[100px]`} />}
      {noBg && <div className="pointer-events-none absolute -left-20 top-12 h-[400px] w-[400px] rounded-full bg-teal-100/60 blur-[100px]" />}
      {noBg && <div className="pointer-events-none absolute -right-16 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-100/60 blur-[100px]" />}

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8 sm:mb-14">
          <div className={`inline-flex items-center gap-2 rounded-full border ${t.badgeBorder} px-5 py-2 text-xs font-semibold uppercase tracking-widest ${t.badge} mb-6`}>
            <span className={`h-1.5 w-1.5 rounded-full ${t.badgeDot} animate-pulse`} /> Community Ratings
          </div>
          <h2 className={`text-2xl font-extrabold ${t.headingText} sm:text-3xl lg:text-5xl`}>
            Rate Your College <span className={`bg-gradient-to-r ${t.headingGrad} bg-clip-text text-transparent`}>Experience</span>
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed ${t.descText} sm:text-base`}>
            Share your anonymous rating in seconds. Select your college, rate all 10 parameters, and help improve transparency across India.
          </p>
        </motion.div>

        <div className={showLiveRankingSnapshot ? 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start' : ''}>
          <motion.form onSubmit={handleSubmit} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className={`${showLiveRankingSnapshot ? '' : 'mx-auto max-w-5xl '}overflow-hidden rounded-3xl border ${t.formBg}`}>
            <div className={`border-b ${t.formHeader} px-4 py-4 sm:px-6 sm:py-5 lg:px-8`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.iconBg} text-xl`}>⭐</div>
                <div>
                  <div className={`font-extrabold ${t.titleText}`}>Anonymous College Rating</div>
                  <div className={`text-xs ${t.subText}`}>Your identity is never stored or shared</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
              <div className={`rounded-2xl border px-4 py-3 text-xs font-medium ${privacyNoticeClass}`}>
                Your name and email are collected only for verification and will be kept anonymous in public ratings.
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`student-name-${theme}`} className={`text-xs font-bold uppercase tracking-wider ${t.labelText}`}>Name</label>
                  <input
                    id={`student-name-${theme}`}
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={120}
                    className={textInputClass}
                  />
                </div>
                <div>
                  <label htmlFor={`student-email-${theme}`} className={`text-xs font-bold uppercase tracking-wider ${t.labelText}`}>Email</label>
                  <input
                    id={`student-email-${theme}`}
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="Enter your email"
                    maxLength={254}
                    className={textInputClass}
                  />
                </div>
              </div>

              <div ref={dropdownRef} className="relative">
                <label htmlFor={`college-search-${theme}`} className={`text-xs font-bold uppercase tracking-wider ${t.labelText}`}>Select College</label>
                <div className={`mt-2 flex items-center rounded-2xl border ${t.inputBg} px-4 transition`}>
                  <Search className={`h-4 w-4 shrink-0 ${noBg ? 'text-slate-400' : 'text-white/40'}`} />
                  <input id={`college-search-${theme}`} type="text" value={collegeInput}
                    onChange={(e) => handleCollegeInputChange(e.target.value)} onFocus={() => setDropdownOpen(true)}
                    placeholder="Start typing college name"
                    className={`h-12 w-full bg-transparent px-3 text-sm outline-none ${t.inputText}`} autoComplete="off" />
                  {selectedCollege && <span className="shrink-0 rounded-full bg-green-100 border border-green-200 px-2 py-0.5 text-[10px] font-bold text-green-700">✓ Selected</span>}
                </div>
                {dropdownOpen && (
                  <div className={`absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border ${t.dropdownBorder} ${t.dropdownBg} shadow-2xl`}>
                    <div className="max-h-56 overflow-y-auto py-1">
                      {collegeOptions.map((name) => (
                        <button key={name} type="button" onClick={() => handleSelectCollege(name)}
                          className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${t.dropdownItem} ${selectedCollege === name ? t.accentText : ''}`}>
                          <span className="line-clamp-1">{name}</span>
                          {selectedCollege === name && <span className={`text-xs font-bold ${t.accentText}`}>✓</span>}
                        </button>
                      ))}
                      {!collegeLoading && collegeOptions.length === 0 && <p className={`px-4 py-3 text-sm ${noBg ? 'text-slate-400' : 'text-white/40'}`}>No colleges found.</p>}
                      {collegeLoading && <p className={`px-4 py-3 text-sm ${noBg ? 'text-slate-400' : 'text-white/40'}`}>Searching...</p>}
                    </div>
                    {collegeHasMore && !collegeLoading && (
                      <button type="button" onClick={loadMoreColleges} className={`w-full border-t ${t.dropdownBorder} px-4 py-2 text-sm font-semibold ${t.loadMoreText} transition`}>
                        Load more colleges
                      </button>
                    )}
                  </div>
                )}
                {!selectedCollege && collegeInput.trim() && <p className={`mt-2 text-xs ${t.accentHint}`}>Choose a college from the dropdown to continue.</p>}
              </div>

              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${t.labelText}`}>Rate These 10 Parameters</label>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {COLLEGE_RATING_CRITERIA.map((criterion) => {
                    const sel = Number(criteriaRatings[criterion.key] || 0)
                    const hov = Number(hoveredCriteriaRatings[criterion.key] || 0)
                    const active = hov || sel
                    return (
                      <div key={criterion.key} className={`rounded-2xl border ${t.criteriaCard} px-4 py-3 transition`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-sm font-semibold ${t.criteriaLabel}`}>{criterion.label}</span>
                          <span className={`text-xs font-bold ${active ? t.scoreText : t.criteriaScore}`}>{active ? `${active}/5` : '—'}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1" onMouseLeave={() => setHoveredCriteriaRatings((p) => ({ ...p, [criterion.key]: 0 }))}>
                          {[1, 2, 3, 4, 5].map((sv) => (
                            <button key={`${criterion.key}-${sv}`} type="button"
                              onMouseEnter={() => setHoveredCriteriaRatings((p) => ({ ...p, [criterion.key]: sv }))}
                              onClick={() => setCriteriaRatings((p) => ({ ...p, [criterion.key]: sv }))}
                              className="rounded p-0.5 transition hover:scale-110" aria-label={`Rate ${criterion.label} ${sv} stars`}>
                              <Star className={`h-5 w-5 ${active >= sv ? t.starFill : t.starEmpty}`} strokeWidth={1.5} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className={`mt-4 flex flex-col sm:flex-row items-center justify-between rounded-2xl border ${t.scoreBar} px-4 py-3 sm:px-5 gap-2`}>
                  <div className="flex items-center gap-2">
                    <Star className={`h-5 w-5 ${t.starFill}`} />
                    <span className={`text-sm font-bold ${t.scoreOverallText}`}>Overall Score</span>
                  </div>
                  <span className={`text-sm sm:text-lg font-extrabold ${t.scoreText}`}>{overallRating ? `${overallRating} / 5` : 'Rate all 10 to calculate'}</span>
                </div>
              </div>

              <div>
                <label htmlFor={`college-feedback-${theme}`} className={`text-xs font-bold uppercase tracking-wider ${t.labelText}`}>Optional Feedback</label>
                <textarea id={`college-feedback-${theme}`} value={feedback} onChange={(e) => setFeedback(e.target.value)}
                  rows={3} maxLength={1500} placeholder="Share your experience, strengths, or areas for improvement..."
                  className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${t.feedbackBg}`} />
                <div className={`mt-1 text-right text-[11px] font-medium ${t.feedbackCount}`}>{feedback.length}/1500</div>
              </div>

              {submitStatus.message && (
                <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${submitStatus.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}

              <button type="submit" disabled={submitting}
                className={`w-full rounded-2xl bg-gradient-to-r ${t.submitBtn} py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50`}>
                {submitting ? 'Submitting...' : 'Submit Anonymous Rating'}
              </button>
            </div>
          </motion.form>

          {showLiveRankingSnapshot && (
            <motion.aside variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`overflow-hidden rounded-3xl border ${t.leaderAside} shadow-xl`}>
              <div className={`border-b ${t.leaderHeader} px-6 py-5`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.iconBg} text-xl`}>🏆</div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${t.leaderLabel}`}>Live Ranking Snapshot</div>
                    <h3 className={`mt-0.5 text-xl font-extrabold ${t.leaderTitle}`}>Top Rated Colleges</h3>
                  </div>
                </div>
                <p className={`mt-2 text-xs ${t.leaderSub}`}>Sorted by average ratings from anonymous submissions.</p>
              </div>
              <div className="p-6">
                {leaderboardLoading && <p className={`text-sm ${t.leaderLoading}`}>Loading ranking data...</p>}
                {!leaderboardLoading && leaderboard.length === 0 && (
                  <p className={`rounded-2xl border px-4 py-3 text-sm ${t.leaderEmpty}`}>No ratings yet. Be the first to rate your college.</p>
                )}
                {!leaderboardLoading && leaderboard.length > 0 && (
                  <div className="space-y-3">
                    {leaderboard.map((item) => (
                      <div key={item.collegeName} className={`rounded-2xl border ${t.leaderCard} px-4 py-3 transition`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className={`text-[10px] font-bold uppercase tracking-widest ${t.leaderRank}`}>Rank #{item.rank}</div>
                            <div className={`mt-0.5 text-sm font-bold ${t.leaderName}`}>{item.collegeName}</div>
                            <div className={`mt-0.5 text-[11px] ${t.leaderCount}`}>{item.totalRatings} ratings</div>
                          </div>
                          <div className={`inline-flex items-center gap-1 rounded-full border ${t.leaderBadge} px-3 py-1.5 text-sm font-extrabold shrink-0`}>
                            <Star className={`h-3.5 w-3.5 ${t.leaderStar}`} />
                            {Number(item.averageRating || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  )
}
