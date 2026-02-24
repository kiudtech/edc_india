import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const heroIcons = ['🚀', '💡', '🌍', '📈', '🤝', '🧠']
const offerings = [
  'Entrepreneurship Courses',
  'Startup Mentorship Programs',
  'International Startup Exposure',
  'Investor & Funding Access',
  'Grant Support',
  'College Incubation Tie-Ups',
]
const timeline = [
  { year: '2018', title: 'Idea to Impact', text: 'Building India’s next generation of founders.' },
  { year: '2020', title: 'National Partnerships', text: 'Collaboration with leading institutions.' },
  { year: '2022', title: 'Global Launch', text: 'International exposure and cross-border mentorship.' },
  { year: '2024', title: 'Scale & Growth', text: 'Funding readiness and global market access.' },
]
const courseTabs = [
  {
    name: 'Startup Launch Program',
    description:
      'Validate ideas, build MVPs, and launch market-ready startups with expert guidance.',
    topics: ['Problem validation', 'MVP planning', 'Go-to-market'],
  },
  {
    name: 'Business Scaling',
    description: 'Scale sustainably with growth frameworks, operations, and leadership support.',
    topics: ['Growth systems', 'Unit economics', 'Team building'],
  },
  {
    name: 'Pitch Training',
    description: 'Craft compelling narratives and practice with investor-grade pitch simulations.',
    topics: ['Storytelling', 'Pitch decks', 'Demo rehearsals'],
  },
  {
    name: 'Funding Readiness',
    description: 'Get investor-ready with financial models, traction plans, and legal preparedness.',
    topics: ['Fundraising strategy', 'Metrics', 'Legal setup'],
  },
  {
    name: 'Global Market Entry',
    description: 'Prepare for international markets with regulatory, cultural, and partner insights.',
    topics: ['Market research', 'Compliance', 'Global partnerships'],
  },
]
const logos = ['IITs', 'NITs', 'IIMs', 'Global Uni', 'Innovation Hub', 'Tech Park', 'Startup Inc']
const fundingSteps = [
  { step: 'Investor Network', text: 'Curated access to angel and VC communities.' },
  { step: 'Grant Assistance', text: 'Support to secure government and private grants.' },
  { step: 'Seed Funding', text: 'Early-stage capital readiness and connects.' },
  { step: 'Pitch Deck Support', text: 'Investor-ready materials and coaching.' },
  { step: 'Startup Evaluation System', text: 'Data-driven assessment for funding fit.' },
]
const globalExposure = [
  'International Startup Visits',
  'Global Demo Days',
  'Startup Exchange Programs',
  'Cross-border Mentorship',
]
const galleryItems = [
  'Demo Day Spotlight',
  'Global Expo',
  'Founder Journey',
  'Pitch Arena',
  'Campus Incubation',
  'Mentorship Labs',
  'Investor Connect',
  'Market Immersion',
  'Prototype Showcase',
]
const aiImages = [
  'https://image.pollinations.ai/prompt/ai%20generated%20startup%20team%20collaboration%20modern%20office%20premium%20lighting',
  'https://image.pollinations.ai/prompt/ai%20generated%20global%20demo%20day%20stage%20founder%20pitch%20cinematic',
  'https://image.pollinations.ai/prompt/ai%20generated%20innovation%20lab%20prototyping%20workshop%20clean%20aesthetic',
  'https://image.pollinations.ai/prompt/ai%20generated%20investor%20meeting%20boardroom%20startup%20funding%20premium',
  'https://image.pollinations.ai/prompt/ai%20generated%20college%20incubation%20hub%20students%20building%20startup',
  'https://image.pollinations.ai/prompt/ai%20generated%20global%20startup%20expo%20booth%20modern%20design',
]
const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, AgriPulse',
    text: 'The mentorship and funding roadmap accelerated our product from pilot to scale.',
  },
  {
    name: 'Dr. Kavya Nair',
    role: 'Director, Institute Partner',
    text: 'Build Up Bharat’s programs have transformed entrepreneurial readiness on campus.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Angel Investor',
    text: 'A high-quality pipeline of founders who are investor ready and globally aware.',
  },
]
const impactStats = [
  { label: 'Startups Supported', value: 420 },
  { label: 'Funding Raised', value: 180 },
  { label: 'College Partnerships', value: 90 },
  { label: 'Global Programs', value: 38 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
const MotionDiv = motion.div

const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 1400
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.floor(eased * value)
      setCount(start)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])
  return (
    <div className="rounded-3xl border border-secondary/40 bg-white/80 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="text-3xl font-semibold text-primary">{count}+</div>
      <div className="mt-2 text-sm font-medium text-slate-600">{label}</div>
    </div>
  )
}

const Lightbox = ({ item, onClose }) => {
  if (!item) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Startup Showcase</div>
        <div className="mt-3 text-2xl font-semibold text-slate-900">{item}</div>
        <div className="mt-4 h-64 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent" />
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const Home = () => {
  const [activeTab, setActiveTab] = useState(courseTabs[0])
  const [lightbox, setLightbox] = useState(null)
  const iconRefs = useRef([])

  useEffect(() => {
    iconRefs.current.forEach((el, index) => {
      if (!el) return
      gsap.to(el, {
        y: -18,
        duration: 3.5 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      })
    })
  }, [])

  const mapNodes = useMemo(
    () => [
      { top: '20%', left: '18%' },
      { top: '32%', left: '54%' },
      { top: '55%', left: '26%' },
      { top: '48%', left: '72%' },
      { top: '70%', left: '45%' },
    ],
    []
  )

  return (
    <MotionDiv
      className="min-h-screen bg-accent text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      <nav className="sticky top-0 z-40 border-b border-secondary/40 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">BuildUpBharat</div>
          <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Programs', href: '#offerings' },
              { label: 'Funding', href: '#funding' },
              { label: 'Global', href: '#global' },
              { label: 'Showcase', href: '#gallery' },
              { label: 'Contact', href: '#forms' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-secondary">
                {link.label}
              </a>
            ))}
          </div>
          <button className="rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-white shadow-glow">
            Join Now
          </button>
        </div>
      </nav>
      <section id="home" className="relative min-h-screen overflow-hidden bg-white text-slate-900">
        {heroIcons.map((icon, index) => (
          <div
            key={icon}
            ref={(el) => {
              iconRefs.current[index] = el
            }}
            className="absolute text-3xl text-slate-300"
            style={{
              top: `${16 + index * 11}%`,
              left: `${8 + (index % 3) * 30}%`,
            }}
          >
            {icon}
          </div>
        ))}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
              BuildUpBharat
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Empowering India&apos;s Next Generation of Entrepreneurs
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              Courses, Funding, Global Exposure &amp; Startup Growth Ecosystem
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow">
                Join Now
              </button>
              <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700">
                Explore Programs
              </button>
            </div>
          </motion.div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {['Startup Success', 'Global Network', 'Investor Ready'].map((label) => (
              <div key={label} className="rounded-2xl border border-secondary/40 bg-white/90 p-5 shadow-sm">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Focus</div>
                <div className="mt-3 text-lg font-semibold text-slate-800">{label}</div>
                <div className="mt-2 text-sm text-slate-600">
                  Premium mentorship and ecosystem partnerships aligned with Startup India.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          className="grid gap-10 lg:grid-cols-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">About Build Up Bharat</div>
            <h2 className="section-title mt-4 text-3xl font-semibold text-primary sm:text-4xl">
              Mission-driven storytelling for a stronger Startup India
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Build Up Bharat nurtures entrepreneurial talent through structured programs, global exposure,
              and a trusted funding ecosystem. We enable founders to launch, scale, and compete globally.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Vision for Startup India', 'Global Entrepreneurship Focus', 'Trusted Corporate Network', 'Premium Talent Pipeline'].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-secondary/40 bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div className="text-sm font-semibold text-slate-800">{item}</div>
                    <div className="mt-2 text-xs text-slate-500">
                      Building a high-impact entrepreneurship and innovation ecosystem.
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-secondary/40 bg-white p-8 shadow-xl">
            <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Growth Timeline</div>
            <div className="mt-6 space-y-6">
              {timeline.map((item, index) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    {index !== timeline.length - 1 && <div className="h-full w-px bg-slate-200" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">{item.year}</div>
                    <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="offerings" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Our Core Offerings</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Premium ecosystem support</h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <motion.div
                key={item}
                className="group rounded-3xl border border-secondary/40 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-glow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm font-semibold text-slate-800">{item}</div>
                <div className="mt-3 text-xs text-slate-500">
                  Bespoke programs curated to accelerate startup performance.
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/10 via-secondary/30 to-primary/10 opacity-0 transition group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.1fr_1fr]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Courses</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Entrepreneurship learning tracks</h2>
            <p className="mt-4 text-sm text-slate-600">
              Modular tracks built to guide founders from ideation to global expansion.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {courseTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    activeTab.name === tab.name
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-secondary/40 bg-white p-8 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-glow">
            <div className="text-lg font-semibold text-slate-800">{activeTab.name}</div>
            <p className="mt-3 text-sm text-slate-600">{activeTab.description}</p>
            <div className="mt-6 space-y-3">
              {activeTab.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="colleges" className="bg-accent py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">College Tie-Ups</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">University collaboration showcase</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-secondary/40 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="text-sm font-semibold text-slate-800">Partner Logos Carousel</div>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 1600 }}
                  loop
                  className="mt-6 py-2"
                  slidesPerView={2}
                  spaceBetween={24}
                  breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 28 },
                  }}
                >
                  {logos.map((logo) => (
                    <SwiperSlide key={logo}>
                      <div className="group flex h-20 items-center justify-center rounded-2xl border border-secondary/40 bg-white text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-secondary/70 hover:shadow-glow">
                        {logo}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {['120+ partner hubs', '27 states', '45k student reach', '300+ labs'].map((stat) => (
                    <div
                      key={stat}
                      className="rounded-2xl border border-secondary/40 bg-accent p-4 text-xs font-semibold text-slate-600 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                    >
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-secondary/40 bg-primary p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="text-sm font-semibold text-white/80">Interactive World Map</div>
                <div className="mt-6 h-64 rounded-2xl bg-white/10">
                  {mapNodes.map((node, index) => (
                    <span
                      key={index}
                      className="absolute h-3 w-3 rounded-full bg-secondary shadow-[0_0_16px_rgba(255,107,0,0.8)]"
                      style={{ top: node.top, left: node.left }}
                    />
                  ))}
                </div>
                <div className="mt-6 text-xs text-white/70">
                  Cross-campus incubation hubs with global partner access.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="funding" className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Funding Support</div>
          <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Step-by-step funding flow</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            {fundingSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl border border-secondary/40 bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-xs font-semibold text-secondary">Step {index + 1}</div>
                <div className="mt-2 text-sm font-semibold text-slate-800">{step.step}</div>
                <div className="mt-2 text-xs text-slate-500">{step.text}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="global" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Global Exposure</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">World map with glowing nodes</h2>
          </motion.div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative rounded-3xl border border-secondary/40 bg-primary p-8 text-white transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="h-72 rounded-2xl bg-white/10">
                {mapNodes.map((node, index) => (
                  <span
                    key={index}
                    className="absolute h-3 w-3 rounded-full bg-secondary shadow-[0_0_16px_rgba(255,107,0,0.8)]"
                    style={{ top: node.top, left: node.left }}
                  />
                ))}
              </div>
              <div className="mt-6 text-xs text-white/70">
                Strategic access to global startup ecosystems across key innovation hubs.
              </div>
            </div>
            <div className="rounded-3xl border border-secondary/40 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="text-sm font-semibold text-slate-800">Programs</div>
              <div className="mt-6 space-y-4">
                {globalExposure.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-secondary/40 bg-accent p-4 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Showcase Gallery</div>
          <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Masonry + lightbox</h2>
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, index) => (
              <button
                key={item}
                onClick={() => setLightbox(item)}
                className="mb-6 w-full break-inside-avoid rounded-3xl border border-secondary/40 bg-white p-6 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-sm font-semibold text-slate-800">{item}</div>
                <img
                  src={aiImages[index % aiImages.length]}
                  alt={`${item} AI visual`}
                  className="mt-4 h-32 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="mt-3 text-xs text-slate-500">Success stories and founder journeys.</div>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="impact" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Impact</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Counter animation</h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <Counter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Testimonials</div>
          <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Trusted by founders and investors</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-secondary/40 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
                <p className="mt-4 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="forms" className="bg-accent py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Startup Forms</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary sm:text-4xl">Applications &amp; partnerships</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {[
                { title: 'Startup Application Form', cta: 'Apply Now' },
                { title: 'Investor Interest Form', cta: 'Join as Investor' },
                { title: 'College Partnership Form', cta: 'Partner With Us' },
                { title: 'Newsletter Subscription', cta: 'Subscribe' },
              ].map((form) => (
                <form
                  key={form.title}
                  className="rounded-3xl border border-secondary/40 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="text-sm font-semibold text-slate-800">{form.title}</div>
                  <div className="mt-4 grid gap-3">
                    <input
                      className="w-full rounded-2xl border border-secondary/40 px-4 py-3 text-sm"
                      placeholder="Full Name"
                    />
                    <input
                      className="w-full rounded-2xl border border-secondary/40 px-4 py-3 text-sm"
                      placeholder="Email Address"
                    />
                    <input
                      className="w-full rounded-2xl border border-secondary/40 px-4 py-3 text-sm"
                      placeholder="Organization / Startup"
                    />
                  </div>
                  <button className="mt-4 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
                    {form.cta}
                  </button>
                </form>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="cta" className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/70">Call To Action</div>
              <h2 className="mt-3 text-3xl font-semibold">Build Your Startup With The Right Ecosystem</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow">
                Apply Now
              </button>
              <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white">
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#071f4d] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold">Build Up Bharat</div>
            <p className="mt-3 text-xs text-white/70">
              Empowering founders through curated programs, funding, and global exposure.
            </p>
          </div>
          {[
            { title: 'Quick Links', items: ['Home', 'About', 'Programs', 'Impact'] },
            { title: 'Programs', items: ['Courses', 'Funding', 'Global Exposure', 'Showcase'] },
            { title: 'Partner With Us', items: ['Investors', 'Colleges', 'Mentors', 'Corporate'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold">{col.title}</div>
              <div className="mt-3 space-y-2 text-xs text-white/70">
                {col.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 space-y-2 text-xs text-white/70">
              <div>hello@buildupbharat.org</div>
              <div>+91 90000 00000</div>
              <div>New Delhi · Bengaluru · Global</div>
            </div>
            <div className="mt-4 flex gap-3 text-xs text-white/70">
              {['LinkedIn', 'YouTube', 'Instagram'].map((item) => (
                <div key={item} className="rounded-full border border-white/20 px-3 py-1">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </MotionDiv>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
