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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/20 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-cyan-200 backdrop-blur-md mb-6 shadow-lg">
              Exclusive International Program
            </div>
            
            <h1 className="text-5xl font-extrabold sm:text-6xl lg:text-7xl drop-shadow-2xl">
              Dubai Edition <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">2026</span>
            </h1>
            
            <p className="mt-6 text-xl font-bold text-white drop-shadow-lg">
              Global Startup Exposure Visit
            </p>
            
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 font-medium drop-shadow-md">
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
                <Download className="h-3.5 w-3.5" /> Download Brochure
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
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
              <div className="mt-1 text-sm font-bold text-slate-800">{item.val}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ EVENT DETAILS WITH BROCHURE IMAGES - ALTERNATING LAYOUT ═══════════════ */}
      
      {/* Section 1: Image Left, Content Right */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-200/50">
                <img src="/dubai/event/1.png" alt="Dubai Event Details" className="w-full h-auto max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 px-3 py-1.5">
                <Rocket className="h-3.5 w-3.5 text-cyan-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">International Exposure</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Immerse in Dubai's <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Innovation Ecosystem</span>
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-600">
                Experience a transformative 4-day journey that connects you with Dubai's thriving startup landscape. Network with global investors, explore cutting-edge incubation hubs, and gain insights from industry leaders who have successfully scaled their ventures internationally.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200">
                  <div className="text-2xl font-black text-cyan-600">3+</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Nights & 4 Days</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200">
                  <div className="text-2xl font-black text-cyan-600">∞</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Global Connections</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Content Left, Image Right */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
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
              className="space-y-4 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 px-3 py-1.5">
                <Handshake className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Networking & Mentorship</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Connect with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Global Leaders</span>
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-600">
                Gain exclusive access to Dubai-based angel investors, venture capitalists, and successful entrepreneurs. Participate in interactive sessions, pitch your ideas, and receive personalized mentorship from industry veterans.
              </p>

              <div className="space-y-3">
                {[
                  { icon: <Target className="h-5 w-5" />, text: 'Direct investor interactions & pitch sessions' },
                  { icon: <Users className="h-5 w-5" />, text: 'Mentorship from global industry leaders' },
                  { icon: <Globe className="h-5 w-5" />, text: 'Visit to state-of-the-art incubation hubs' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative group lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200/50">
                <img src="/dubai/event/2.png" alt="Networking Opportunities" className="w-full h-auto max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Image Left, Content Right */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-200/50">
                <img src="/dubai/event/3.png" alt="Program Schedule" className="w-full h-auto max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-teal-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">Event Schedule</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Carefully Curated <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">4-Day Itinerary</span>
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-600">
                Every moment is designed to maximize your learning and networking opportunities. From morning workshops to evening networking sessions, experience a packed schedule that balances structured learning with organic relationship building.
              </p>

              <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200">
                <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">What's Included</h4>
                <ul className="space-y-2">
                  {[
                    'Round-trip flights (Delhi/Mumbai ↔ Dubai)',
                    '3-star hotel accommodation',
                    'All meals & refreshments',
                    'Local transportation & guided tours',
                    'Event materials & certificates'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Content Left, Image Right */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
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
              className="space-y-4 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 px-3 py-1.5">
                <Star className="h-3.5 w-3.5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700">Investment & Funding</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Unlock <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Funding Opportunities</span>
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-600">
                Get direct access to angel investors and venture capital firms actively looking for innovative startups. Learn about cross-border funding frameworks, UAE-specific grants, and strategies to attract international investment for your venture.
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                <h4 className="text-lg font-black text-slate-900 mb-4">Investment Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-black text-orange-600">₹30,000</div>
                    <div className="text-xs font-semibold text-slate-600">Program Fee</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-orange-600">Limited</div>
                    <div className="text-xs font-semibold text-slate-600">Seats Available</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-200/50">
                <img src="/dubai/event/4.png" alt="Funding Opportunities" className="w-full h-auto max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Image Left, Content Right */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-200/50">
                <img src="/dubai/event/5.png" alt="Who Can Join" className="w-full h-auto max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 px-3 py-1.5">
                <Users className="h-3.5 w-3.5 text-purple-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700">Who Should Attend</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Perfect for <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aspiring Entrepreneurs</span>
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-600">
                This program is designed for passionate individuals ready to take their startup journey to the next level. Whether you're a student with an innovative idea or a founder looking to scale globally, this is your opportunity to learn, network, and grow.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Young Founders',
                  'Student Innovators',
                  'Aspiring Entrepreneurs',
                  'Startup Founders',
                  'Tech Enthusiasts',
                  'Business Students'
                ].map((tag, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 shadow-md border border-purple-200 text-center">
                    <span className="text-sm font-bold text-purple-700">{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Content Left, Image Right */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
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
              className="space-y-4 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-green-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">Registration Details</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Secure Your <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Spot Today</span>
              </h2>
              
              <p className="text-sm leading-relaxed text-slate-600">
                Limited seats available! Register now to be part of this exclusive international exposure program. Early bird registrations get priority access to networking sessions and special workshops.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Last Date to Apply</span>
                  <span className="text-lg font-black text-green-600">26 May 2026</span>
                </div>
                <div className="h-px bg-green-200" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Program Fee</span>
                  <span className="text-lg font-black text-green-600">₹30,000</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link 
                  to="https://pages.razorpay.com/pl_SpaFr7wPTeUhBw/view"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Rocket className="h-3.5 w-3.5" />
                  Apply Now
                </Link>
                <a 
                  href="/dubai/July Delhi - Dubai - Delhi (2).pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white px-6 py-3 text-sm font-bold text-green-600 hover:bg-green-50 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Brochure
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="relative group lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-green-200/50">
                <img src="/dubai/event/6.png" alt="Registration Information" className="w-full h-auto max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}



