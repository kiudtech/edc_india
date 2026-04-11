import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SiteFooter from '../components/SiteFooter'
import { faqCategories } from '../data/faqs'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function FAQPage() {
  const [openItemId, setOpenItemId] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const toggleItem = (itemId) => {
    setOpenItemId((prev) => (prev === itemId ? '' : itemId))
  }

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f2d6b] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center text-white">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-100">
              Help Center
            </div>
            <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/80 sm:text-base">
              Everything you need to know about the EDC National Innovation & Startup Ranking.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
          {faqCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700">
                {category.title}
              </div>

              <div className="space-y-3">
                {category.faqs.map((faq) => {
                  const itemId = `${category.title}-${faq.id}`
                  const isOpen = openItemId === itemId

                  return (
                    <div key={faq.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => toggleItem(itemId)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-bold text-slate-900 sm:text-base">
                          {faq.id}. {faq.question}
                        </span>
                        <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition ${isOpen ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-100 px-4 py-4 sm:px-5">
                          <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                            {faq.answer.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>

                          {faq.points && faq.points.length > 0 && (
                            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                              {faq.points.map((point) => (
                                <li key={point} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
