import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, Rocket, Target, Handshake, Globe, Download, Star } from 'lucide-react'
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
  
  // Dubai slideshow images
  const dubaiImages = [
    '/dubai/1.png',
    '/dubai/2.png',
    '/dubai/image.png'
  ]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    
    // Auto-change slideshow every 4 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dubaiImages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ═══════════════ HERO WITH SLIDESHOW ═══════════════ */}
      <section className="relative overflow-hidden bg-slate-900 py-32 pt-40 sm:py-40 text-center text-white">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {dubaiImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Dubai ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
            </div>
          ))}
        </div>
        
        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {dubaiImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-cyan-400' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/20 px-5 py-2 text-xs font-bold uppercase tracking-widest text-cyan-200 backdrop-blur-md mb-6 shadow-lg">
              Exclusive International Program
            </div>
            
            <h1 className="text-5xl font-extrabold sm:text-6xl lg:text-7xl drop-shadow-2xl">
              Dubai Edition <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">2026</span>
            </h1>
            
            <p className="mt-6 text-xl font-bold text-white drop-shadow-lg">
              Global Startup Exposure Visit
            </p>
            
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 font-medium drop-shadow-md">
              Dream. Explore. Build. DUBAI 2026! A transformative 4-day journey designed to plug Indian founders and students into one of the world's fastest-growing innovation ecosystems.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="https://pages.razorpay.com/pl_SpaFr7wPTeUhBw/view" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-2xl shadow-cyan-500/40 transition hover:scale-105 hover:shadow-cyan-500/60">
                Apply Now For Dubai 2026
              </Link>
              <a 
                href="/dubai/July Delhi - Dubai - Delhi (2).pdf" 
                download="Dubai-2026-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/20 px-8 py-3.5 text-sm font-bold text-white shadow-xl backdrop-blur-md transition hover:bg-white/30 hover:scale-105"
              >
                <Download className="h-4 w-4" /> Download Brochure
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ QUICK FACTS ═══════════════ */}
      <section className="relative z-20 -mt-12 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div 
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer} initial="hidden" animate="visible"
        >
          {[
            { icon: <Calendar className="h-6 w-6 text-cyan-500" />, label: 'Schedule', val: 'Late July - Early Aug 2026' },
            { icon: <MapPin className="h-6 w-6 text-cyan-500" />, label: 'Route', val: 'Delhi/Mumbai ↔ Dubai' },
            { icon: <Rocket className="h-6 w-6 text-cyan-500" />, label: 'Duration', val: '4 Days (Action Packed)' },
            { icon: <Users className="h-6 w-6 text-cyan-500" />, label: 'Target', val: 'Founders & Students' },
          ].map((item, i) => (
            <motion.div key={i} variants={staggerItem} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50">
                {item.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
              <div className="mt-1 text-sm font-bold text-slate-800">{item.val}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ ABOUT THE PROGRAM ═══════════════ */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 mb-4">
                About The Program
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Why Dubai 2026?</h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                The <strong>Global Startup Exposure Visit</strong> is curated exclusively for passionate minds eager to scale beyond borders. Dubai is rapidly establishing itself as the global capital of innovation and venture investment. 
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Over 4 intensive days, participants will immerse themselves connecting with top-tier accelerators, interacting directly with angel investors, and visiting state-of-the-art incubation hubs.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Who Can Apply?</h4>
                    <p className="mt-1 text-sm text-slate-500">Young founders, student innovators, aspiring entrepreneurs, and early-stage startup teams ready to test global waters.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Collaborative Ecosystem</h4>
                    <p className="mt-1 text-sm text-slate-500">Formally organized by EDC India in strategic collaboration with IIT Ropar, TBIF, and ITQAN UAE.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-10">
                  <div className="rounded-3xl overflow-hidden shadow-xl h-64">
                    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" alt="Dubai skyline" className="h-full w-full object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl h-48 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center p-6 text-center text-white">
                    <div className="text-2xl font-black">"Dream.<br/>Explore.<br/>Build."</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl h-48 bg-slate-900 flex items-center justify-center">
                     <Globe className="h-20 w-20 text-cyan-400 opacity-80" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl h-64">
                    <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800" alt="Networking" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HIGHLIGHTS & PURPOSE ═══════════════ */}
      <section className="bg-white py-20 sm:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Core Objectives</h2>
            <p className="mt-4 text-sm text-slate-500">What you will achieve during this intensive 4-day exposure.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Global Market Access', icon: <Globe className="text-cyan-500 w-8 h-8" />, desc: 'Understand the legal, financial, and cultural nuances of scaling your venture outside India.' },
              { title: 'Investor Interactions', icon: <Handshake className="text-cyan-500 w-8 h-8" />, desc: 'Pitch and network with Dubai-based angel investors and venture capital firms.' },
              { title: 'International Exposure', icon: <Target className="text-cyan-500 w-8 h-8" />, desc: 'Visit state-of-the-art incubation hubs and tech parks driving digital transformation.' },
              { title: 'Strategic Mentorship', icon: <Users className="text-cyan-500 w-8 h-8" />, desc: 'Get hands-on advice from industry veterans who have successfully built global brands.' },
              { title: 'Startup Inspiration', icon: <Rocket className="text-cyan-500 w-8 h-8" />, desc: 'Surround yourself with like-minded future leaders and witness execution at scale.' },
              { title: 'Funding Opportunities', icon: <Star className="text-cyan-500 w-8 h-8" />, desc: 'Explore cross-border grants and UAE specific startup funding frameworks.' },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200">
                {feature.icon}
                <h4 className="mt-5 text-lg font-bold text-slate-800">{feature.title}</h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-700 py-16 sm:py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to take your startup global?</h2>
          <p className="mt-4 text-sm font-medium text-cyan-100 sm:text-base">
            Applications are opening soon. Connect with us to express early interest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/join" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 transition hover:bg-cyan-50 hover:shadow-lg hover:shadow-white/20">
              Apply via EDC Membership
            </Link>
          </div>
          <div className="mt-6 text-xs text-cyan-200">
            * Limited slots available. Selection will be based on founder profile and venture stage.
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
