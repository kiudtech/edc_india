
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MapPin, Calendar, Users, Rocket, Target, Handshake, Globe, Download,
  Zap, TrendingUp, Plane, Hotel, Bus, UtensilsCrossed, Award, ShieldCheck,
  Sunrise, Building2, Sparkles, GraduationCap, Briefcase, Anchor, CheckCircle2,
  Flame, Clock, IndianRupee, ArrowRight, Camera,
} from 'lucide-react'
import SiteFooter from '../components/SiteFooter'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function DubaiEventPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // ───────────────────────────────────────────────────────────────────
  // IMAGE MAP — filenames kept exactly as in the original code structure.
  // Replace the files in /public/dubai/ — every alt text below tells you
  // exactly what photo belongs in that slot, so swapping is easy later.
  // ───────────────────────────────────────────────────────────────────

  // Hero background slideshow (3 images, auto-rotating every 4s)
  const dubaiImages = [
    { src: '/dubai/1.png', alt: 'Dubai skyline at golden hour with Burj Khalifa and Museum of the Future' },
    { src: '/dubai/2.png', alt: 'Dubai Marina waterfront skyscrapers lit up at night' },
    { src: '/dubai/image.png', alt: 'Group of Indian students and founders networking at a Dubai rooftop event' },
  ]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dubaiImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Day-wise itinerary — image + descriptive alt text per day
  const itinerary = [
    {
      day: 'DAY 1',
      title: 'Arrival, Orientation & Networking',
      icon: <Plane className="h-5 w-5" />,
      points: [
        'Departure from India (morning flight)',
        'Arrival at Dubai International Airport & hotel check-in',
        'Welcome & program orientation session',
        'Networking with Indian entrepreneurs in UAE',
        'Dhow Cruise dinner experience',
        'Dubai Creek night view & networking',
      ],
      meals: 'Lunch · Dinner',
      image: '/dubai/event/1.png',
      alt: 'Traditional wooden Dhow cruise boat lit up at night on Dubai Creek with dinner buffet on deck',
      tint: 'from-cyan-500 to-blue-600',
    },
    {
      day: 'DAY 2',
      title: 'Expo Day — Middle East Energy / Forex Expo',
      icon: <Building2 className="h-5 w-5" />,
      points: [
        'Full-day visit to your chosen international exhibition',
        'Industry interaction & B2B networking',
        'Startup & business opportunity exploration',
        'Meetings with global exhibitors',
        'Technology & innovation showcase',
      ],
      meals: 'Breakfast · Dinner (Lunch at expo venue)',
      image: '/dubai/event/2.png',
      alt: 'Busy exhibition hall floor at Middle East Energy or Forex Expo Dubai with booths and attendees networking',
      tint: 'from-blue-500 to-indigo-600',
    },
    {
      day: 'DAY 3',
      title: 'Startup Ecosystem & Dubai Experience',
      icon: <Sunrise className="h-5 w-5" />,
      points: [
        'DIFC innovation hub visit',
        'UAE business setup session',
        'Startup ecosystem interaction',
        'Investor networking & startup pitch session',
        'Evening: Desert Safari, cultural activities & BBQ dinner',
      ],
      meals: 'Breakfast · Lunch · Dinner',
      image: '/dubai/event/3.png',
      alt: 'Desert safari SUV driving over golden sand dunes at sunset near Dubai',
      tint: 'from-amber-500 to-orange-600',
    },
    {
      day: 'DAY 4',
      title: 'Dubai Landmarks & Departure',
      icon: <Award className="h-5 w-5" />,
      points: [
        'Dubai Mall visit & Burj Khalifa experience',
        'Group photography',
        'Certificate distribution ceremony',
        'Closing remarks',
        'Airport transfer & return flight to India',
      ],
      meals: 'Breakfast · Lunch',
      image: '/dubai/event/4.png',
      alt: 'Burj Khalifa tower view from Dubai Mall fountain plaza in daylight',
      tint: 'from-emerald-500 to-teal-600',
    },
  ]

  const inclusions = [
    { icon: <Plane className="h-5 w-5" />, text: 'Return Airfare (Ex-India)' },
    { icon: <ShieldCheck className="h-5 w-5" />, text: 'UAE Tourist Visa' },
    { icon: <Hotel className="h-5 w-5" />, text: '3 Nights · 4★ Hotel Stay' },
    { icon: <Bus className="h-5 w-5" />, text: 'Local Transfers (AC Bus)' },
    { icon: <UtensilsCrossed className="h-5 w-5" />, text: 'Daily Breakfast, Lunch & Dinner*' },
    { icon: <Anchor className="h-5 w-5" />, text: 'Dhow Cruise Dinner' },
    { icon: <Sunrise className="h-5 w-5" />, text: 'Desert Safari & BBQ Dinner' },
    { icon: <Building2 className="h-5 w-5" />, text: 'Expo Entry & Coordination' },
    { icon: <Handshake className="h-5 w-5" />, text: 'Investor Networking & Pitch Session' },
    { icon: <Award className="h-5 w-5" />, text: 'Participation Certificate' },
  ]

  const whoCanJoin = [
    { icon: <GraduationCap className="h-5 w-5" />, text: 'Students' },
    { icon: <Rocket className="h-5 w-5" />, text: 'Startup Founders' },
    { icon: <Briefcase className="h-5 w-5" />, text: 'Entrepreneurs' },
    { icon: <Users className="h-5 w-5" />, text: 'Faculty Members' },
    { icon: <Sparkles className="h-5 w-5" />, text: 'Innovators' },
    { icon: <Target className="h-5 w-5" />, text: 'Business Professionals' },
  ]

  return (
    <div className="bg-slate-50 text-slate-800">

      {/* ═══════════════ TOP ANNOUNCEMENT STRIP ═══════════════ */}
      {/* Plain block-level element — NOT sticky/fixed. It sits in normal page
          flow above everything, so even if your navbar below it is sticky/fixed,
          this strip simply scrolls away first and never fights for the same spot. */}
      <div className="relative z-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2 text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold">
            <Flame className="h-3.5 w-3.5" />
            Applications Open — Dubai 2026 · ₹70,000 All-Inclusive · Limited Seats
          </span>
          <Link
            to="https://pages.razorpay.com/pl_SpaFr7wPTeUhBw/view"
            className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm transition hover:bg-white/30"
          >
            Apply Now <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ═══════════════ HERO — CINEMATIC FIRST IMPRESSION ═══════════════ */}
      {/* NOTE: no sticky/fixed elements in here — this section flows normally
          beneath your site's existing navbar, so nothing overlaps it. */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-24 sm:pt-36 sm:pb-32 text-center text-white">

        {/* Background slideshow */}
        <div className="absolute inset-0">
          {dubaiImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          {/* single static gradient overlay — no per-frame animation, cheap to paint */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* (Promo messaging now lives in the strip above the navbar — no duplicate badge needed here) */}

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md mb-7"
            >
              <Sparkles className="h-3 w-3 text-amber-300" />
              EDC India × Itqan Elite Consultancy, UAE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[2.75rem] leading-[1.05] font-black sm:text-7xl lg:text-8xl tracking-tight"
            >
              Take Your Startup
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  Global
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none">
                  <path d="M2 11C60 4 240 4 298 11" stroke="url(#heroUnderline)" strokeWidth="5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="heroUnderline" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#fbbf24" />
                      <stop offset="1" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 text-xl sm:text-2xl font-bold text-white"
            >
              Dubai, UAE &nbsp;<span className="text-amber-300">·</span>&nbsp; September 2026
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/80 font-medium"
            >
              Explore. Connect. Innovate. Expand Globally. A transformative 4-day, 3-night journey connecting Indian founders, students and professionals to one of the world's fastest-growing innovation ecosystems — with your choice of two world-class exhibition tracks.
            </motion.p>

            {/* Trust strip — replaces the standalone price box; price now lives in Quick Facts below */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-white/70"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" /> All-Inclusive Package
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" /> Limited Seats
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" /> Two Exhibition Tracks
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-9 flex flex-wrap justify-center gap-4"
            >
              <Link
                to="https://pages.razorpay.com/pl_SpaFr7wPTeUhBw/view"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-9 py-4 text-sm font-bold text-slate-900 shadow-2xl shadow-orange-500/30 transition-transform hover:scale-105"
              >
                Apply Now For Dubai 2026
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/dubai/EDC Dubai 1.pdf"
                download="EDC Dubai 1.pdf"
              >
                <Download className="h-3.5 w-3.5" /> Download Brochure
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="relative z-10 mt-12 flex justify-center gap-2">
          {dubaiImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'w-8 bg-amber-400'
                  : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════ QUICK FACTS ═══════════════ */}
      <section className="relative z-20 -mt-12 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer} initial="hidden" animate="visible"
        >
          {[
            { icon: <Calendar className="h-6 w-6 text-amber-500" />, label: 'Schedule', val: 'September 2026' },
            { icon: <MapPin className="h-6 w-6 text-amber-500" />, label: 'Location', val: 'Dubai, UAE' },
            { icon: <Clock className="h-6 w-6 text-amber-500" />, label: 'Duration', val: '4 Days · 3 Nights' },
            { icon: <IndianRupee className="h-6 w-6 text-amber-500" />, label: 'Program Fee', val: '₹70,000' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-shadow hover:shadow-2xl hover:shadow-amber-200/40"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                {item.icon}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
              <div className="mt-1 text-sm font-bold text-slate-800">{item.val}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ WHY DUBAI ═══════════════ */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            className="grid gap-10 lg:grid-cols-2 lg:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 px-3 py-1.5">
                <Globe className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Why Dubai</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                The Global Gateway for <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Startups &amp; Business</span>
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Dubai is one of the world's fastest-growing business and innovation hubs, connecting entrepreneurs, investors, startups, and global companies from over 190 countries.
              </p>

              <ul className="space-y-2.5 pt-2">
                {[
                  'Strategic global business hub',
                  'Home to thousands of startups & innovation centers',
                  'Access to international investors & funding opportunities',
                  'Business-friendly policies & free zones',
                  'Rapid growth in AI, FinTech, clean energy & emerging tech',
                  'Gateway to Middle East, Africa & European markets',
                ].map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-200/50">
                <img
                  src="/dubai/event/intro.png"
                  alt="Dubai 2026 program intro banner"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3">
                {[
                  { val: '3', label: 'Countries' },
                  { val: '32+', label: 'Cities' },
                  { val: '10,000+', label: 'Members' },
                  { val: '2019', label: 'Since' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-xl p-3 shadow-md border border-slate-200 text-center"
                  >
                    <div className="text-lg font-black text-amber-600">{stat.val}</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ DUBAI AI FESTIVAL ═══════════════ */}
      <section id="dubai-ai-festival" className="relative bg-slate-50 py-8 sm:py-10 overflow-hidden">
        {/* Ambient background blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-8">

          {/* Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 mb-3 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Premium Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Dubai AI Festival —{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EDC India</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              "Discover Dubai. Connect with Leaders. Build Your Future."
            </p>
          </motion.div>

          {/* Main Grid — mobile: stacked, desktop: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_360px] xl:grid-cols-[1fr_1fr_400px] gap-6 xl:gap-8 items-start">

            {/* ── COLUMN 1: Overview & Activities ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1"
            >

              {/* 1. Event Quick Facts */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" /> Event Overview
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Dates', value: '25 Oct – 28 Oct' },
                    { label: 'Duration', value: '3 Nights / 4 Days' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{item.value}</p>
                    </div>
                  ))}
                  <div className="col-span-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Theme</p>
                    <p className="text-xs font-bold text-slate-800 leading-tight">Learn • Network • Explore</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 italic mt-3">* Dates reflect full travel schedule (India to India)</p>
              </div>

              {/* 3. Key Activities */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-blue-500" /> Key Activities
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Cruise Dinner', desc: 'With Indian founders' },
                    { title: 'Expo Visit', desc: 'Full-day networking' },
                    { title: 'DIFC Visit', desc: 'Financial District tour' },
                    { title: 'Live Pitch', desc: 'Desert Safari & Investor meetings' },
                    { title: 'Pitching Round', desc: 'Pitch & network' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-black text-indigo-600">{idx + 1}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">{item.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── COLUMN 2: Included & Eligibility ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 order-3 lg:order-2"
            >

              {/* 2. What's Included */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-blue-500" /> What's Included
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <Hotel className="h-3.5 w-3.5" />, text: '4-Star Hotel Stay' },
                    { icon: <UtensilsCrossed className="h-3.5 w-3.5" />, text: 'Breakfast + Dinner' },
                    { icon: <Plane className="h-3.5 w-3.5" />, text: 'Flight + Visa' },
                    { icon: <Bus className="h-3.5 w-3.5" />, text: 'Tours & Transport' },
                    { icon: <Award className="h-3.5 w-3.5" />, text: 'Pitching Round' },
                    { icon: <Building2 className="h-3.5 w-3.5" />, text: 'EDC & ITQAN ELITE' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-blue-50/50 rounded-lg p-2 border border-blue-100/50">
                      <div className="flex items-center justify-center h-6 w-6 rounded-md bg-white text-blue-600 shadow-sm border border-blue-100 shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 leading-tight">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Can Join — Premium Dark Card */}
              <div className="relative rounded-2xl overflow-hidden flex flex-col h-full" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e1b4b 100%)' }}>
                <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
                <div className="relative z-10 p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 border border-white/10 shrink-0">
                      <Users className="h-4 w-4 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-blue-400/80">Eligibility</p>
                      <h3 className="text-sm font-black text-white leading-none">Who Can Join?</h3>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 mb-6">
                    {[
                      { label: 'Students', sub: '18+ years' },
                      { label: 'Startup Founders', sub: '& Entrepreneurs' },
                      { label: 'Young Professionals', sub: '& Innovators' },
                      { label: 'Anyone', sub: 'exploring global opportunities' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] font-black text-blue-300 shrink-0">
                          {idx + 1}
                        </span>
                        <div className="leading-tight">
                          <span className="text-xs font-bold text-white">{item.label} </span>
                          <span className="text-[11px] text-blue-300/80">{item.sub}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2.5">
                    <Link
                      to="https://rzp.io/rzp/rHRw8a8Y"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-black text-slate-900 shadow-lg transition-all hover:bg-blue-50 hover:scale-[1.02]"
                    >
                      Apply Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="https://dubaiaifestival.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] font-bold text-white transition-all hover:bg-white/10"
                    >
                      Explore more about event <ArrowRight className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* ── COLUMN 3: POSTER ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:col-span-2 lg:col-span-1 lg:order-3 flex justify-center lg:sticky lg:top-24 mb-6 lg:mb-0"
            >
              <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-full">
                {/* Glow */}
                <div className="absolute -inset-3 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-400/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <img
                  src="/dubai/dubai-ai-fest.png"
                  alt="Dubai AI Festival Poster"
                  className="relative w-full object-contain rounded-2xl shadow-2xl shadow-slate-900/15 border border-white/60 transition-transform duration-500 group-hover:scale-[1.015]"
                  onError={(e) => { e.currentTarget.src = '/dubai/dubai-ai-fest.png' }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-8 px-6">
                  <p className="text-white/80 text-xs font-semibold mb-3 tracking-wide text-center">Ready to join the festival?</p>
                  <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
                    <Link
                      to="https://rzp.io/rzp/rHRw8a8Y"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-slate-900 shadow-xl transition-all hover:bg-blue-50 hover:scale-[1.03]"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="https://dubaiaifestival.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-white/80 hover:text-white underline underline-offset-2 transition-colors"
                    >
                      Explore more about event
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════ CHOOSE YOUR TRACK — SIGNATURE SECTION ═══════════════ */}
      <section className="relative bg-slate-900 py-16 sm:py-20 overflow-hidden">
        {/* Ambient animated glow blobs */}
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-2xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-rose-500/15 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 mb-4">
              <Target className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Two Powerful Exposure Options</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Choose Your Global <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Learning Track</span>
            </h2>
            <p className="mt-3 text-sm text-white/70 max-w-xl mx-auto">
              Pick the track that matches your interest and growth goals — one transformative experience either way.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* TRACK 1 — MIDDLE EAST ENERGY */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/70 to-slate-900 p-7 shadow-2xl transition-shadow hover:shadow-emerald-500/20 hover:border-emerald-400/60"
            >
              <div className="absolute -top-3 left-7 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-500/50">
                Priority 1
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">Middle East Energy</h3>
                  <p className="text-xs font-semibold text-emerald-300">DUBAI 2026</p>
                </div>
              </div>
              <p className="text-xs font-medium text-white/60 mb-5">World's leading energy &amp; sustainability exhibition</p>

              <div className="relative rounded-xl overflow-hidden mb-5 border border-emerald-400/20 group">
                <img
                  src="/dubai/event/middleeast.png"
                  alt="Middle East Energy Expo Dubai exhibition hall with solar panels, wind turbine model and EV charging station displays"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">Who Should Join</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Engineering Students', 'Renewable Energy Startups', 'EV & CleanTech Startups', 'Electrical Entrepreneurs', 'Faculty Members'].map((tag, i) => (
                  <span key={i} className="rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">Key Highlights</p>
              <ul className="space-y-2">
                {[
                  'Explore the latest in energy, power, solar, storage & sustainability',
                  'Meet global manufacturers & technology leaders in the energy sector',
                  'B2B meetings, product demos & business networking',
                  'Visit innovation hubs, clean energy companies & smart city projects',
                  'UAE business setup session for energy startups & entrepreneurs',
                  'Startup pitch & networking with investors',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* TRACK 2 — FOREX EXPO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl border border-rose-400/30 bg-gradient-to-br from-rose-950/70 to-slate-900 p-7 shadow-2xl transition-shadow hover:shadow-rose-500/20 hover:border-rose-400/60"
            >
              <div className="absolute -top-3 left-7 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-rose-500/50">
                Priority 2
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">Forex Expo</h3>
                  <p className="text-xs font-semibold text-rose-300">DUBAI 2026</p>
                </div>
              </div>
              <p className="text-xs font-medium text-white/60 mb-5">Middle East's largest fintech, trading &amp; investment event</p>

              <div className="relative rounded-xl overflow-hidden mb-5 border border-rose-400/20 group">
                <img
                  src="/dubai/event/forex.png"
                  alt="Forex Expo Dubai trading floor with live stock market charts on screens and a speaker presenting on stage"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-300 mb-2">Who Should Join</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Finance & Commerce Students', 'MBA Students', 'Fintech Startups', 'Traders & Investors', 'Business Professionals'].map((tag, i) => (
                  <span key={i} className="rounded-full bg-rose-500/10 border border-rose-400/30 px-3 py-1 text-[11px] font-semibold text-rose-200">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-300 mb-2">Key Highlights</p>
              <ul className="space-y-2">
                {[
                  'Discover global brokers, trading platforms, fintech & investment solutions',
                  'Live sessions on trading, markets, investments & wealth management',
                  'Network with brokers, fintech companies, funds & financial experts',
                  'Visits to DIFC, fintech hubs & financial innovation centers',
                  'Insights on global markets, blockchain, payments & digital finance',
                  'Investor interaction & startup pitch opportunity',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-rose-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Common inclusions strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
          >
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-4">Common Inclusions for Both Tracks</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {[
                { icon: <Plane className="h-4 w-4" />, text: 'Airfare & Visa' },
                { icon: <Hotel className="h-4 w-4" />, text: '4★ Hotel' },
                { icon: <Bus className="h-4 w-4" />, text: 'Local Transfers' },
                { icon: <Handshake className="h-4 w-4" />, text: 'Networking Dinners' },
                { icon: <Building2 className="h-4 w-4" />, text: 'Innovation Hub Visits' },
                { icon: <GraduationCap className="h-4 w-4" />, text: 'Expert Sessions' },
                { icon: <Award className="h-4 w-4" />, text: 'Certificate' },
                { icon: <ShieldCheck className="h-4 w-4" />, text: 'On-Ground Support' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-white/80 leading-tight">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ DAY-WISE ITINERARY ═══════════════ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 px-3 py-1.5 mb-4">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Day-Wise Program Itinerary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              4 Days. 3 Nights. <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">International Exposure.</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {itinerary.map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="group relative grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 lg:grid-cols-[280px_1fr] transition-shadow hover:shadow-2xl"
              >
                <div className="relative h-48 lg:h-auto overflow-hidden">
                  <img
                    src={day.image}
                    alt={day.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r ${day.tint} opacity-60 mix-blend-multiply`} />
                  <div className="absolute top-4 left-4 rounded-lg bg-white/95 px-3 py-1.5 shadow-md">
                    <span className="text-xs font-black tracking-widest text-slate-800">{day.day}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${day.tint} text-white`}>
                      {day.icon}
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{day.title}</h3>
                  </div>

                  <ul className="grid gap-1.5 sm:grid-cols-2 mb-3">
                    {day.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="h-1.5 w-1.5 mt-1.5 rounded-full bg-amber-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <UtensilsCrossed className="h-3.5 w-3.5 text-amber-500" />
                    Meals: {day.meals}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INCLUSIONS + WHO CAN JOIN ═══════════════ */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 px-3 py-1.5 mb-4">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">Program Inclusions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-6">
                All-Inclusive <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">3 Nights / 4 Days</span> Package
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {inclusions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-3 bg-white rounded-xl p-3.5 shadow-md border border-slate-200"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Who can join + Fee */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 px-3 py-1.5 mb-4">
                  <Users className="h-3.5 w-3.5 text-purple-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700">Who Can Join</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {whoCanJoin.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-md border border-purple-100 text-center"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* PRICE + APPLY CARD */}
              <div className="relative rounded-2xl bg-slate-900 p-6 text-white shadow-2xl overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-500/20 blur-xl" />
                <div className="relative flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">Limited Seats Available</p>
                    <h3 className="text-xl font-black">Book Your Spot Now</h3>
                  </div>
                  <Sparkles className="h-6 w-6 text-amber-300 shrink-0" />
                </div>

                <div className="relative flex items-end gap-2 mb-3 pb-3 border-b border-white/10">
                  <IndianRupee className="h-6 w-6 text-amber-300 mb-1" />
                  <span className="text-4xl font-black leading-none">70,000</span>
                  <span className="text-xs font-semibold text-white/60 mb-1">/ person, all-inclusive</span>
                </div>

                <p className="relative text-xs text-white/60">
                  Students may get opportunities to interact with startup founders, recruiters, and business leaders during networking sessions. Participation does not guarantee employment but provides valuable industry exposure and connections.
                </p>
                <Link
                  to="https://pages.razorpay.com/pl_SpaFr7wPTeUhBw/view"
                  className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <Rocket className="h-3.5 w-3.5" />
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOR STUDENTS / FOR FOUNDERS ═══════════════ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              One Journey. <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Multiple Opportunities.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-7 transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900">For Students</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Meet startup founders from India & UAE',
                  'Learn global business trends',
                  'Explore internship & career opportunities',
                  'Build an international network',
                  'Receive an international participation certificate',
                  'Get exposure to the startup ecosystem',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-7 transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-black text-slate-900">For Startup Founders</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Connect with investors & mentors',
                  'Explore UAE market entry',
                  'Get business setup guidance',
                  'Build international networking',
                  'Discover partnership opportunities',
                  'Gain global expansion insights',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-500/15 blur-2xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Apply Now &amp; <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Take Your Ideas Global</span>
            </h2>
            <p className="mt-4 text-sm text-white/70 max-w-xl mx-auto">
              Limited seats for September 2026. Secure your place on Dubai's most comprehensive startup &amp; innovation exposure program for just ₹70,000, all-inclusive.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="https://pages.razorpay.com/pl_SpaFr7wPTeUhBw/view"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-2xl shadow-amber-500/40 transition hover:scale-105 hover:shadow-amber-500/60"
              >
                <Rocket className="h-3.5 w-3.5" />
                Apply Now For Dubai 2026
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/dubai/EDC Dubai 1.pdf"
                download="EDC Dubai 1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white shadow-xl backdrop-blur-md transition hover:bg-white/20 hover:scale-105"
              >
                <Download className="h-3.5 w-3.5" /> Download Brochure
              </a>
            </div>

            <p className="mt-8 text-xs text-white/50">
              www.edcindia.org &nbsp;|&nbsp; enquiry@edcindia.in &nbsp;|&nbsp; +91 98014 92526
            </p>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}