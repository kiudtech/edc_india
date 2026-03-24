import React from 'react';
import { motion } from 'framer-motion';

const MembershipValidationPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 py-20 text-white text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold">Don’t Build Blindly. Validate Your Idea First.</h1>
          <p className="mt-4 text-lg">Get clarity, direction, and access to India’s startup ecosystem — all in one place.</p>
          <p className="mt-2 font-semibold">Validate → Build → Grow</p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full">Validate My Idea</button>
            <button className="border border-white font-semibold px-8 py-3 rounded-full">Get Started</button>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.section className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">Why Most People Fail Before They Even Start</h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Most people jump into ideas without clarity. They follow trends, copy others, or start building without understanding the market. And then: No customers, No revenue, No growth. Not because the idea was bad… but because it was never validated.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💡 What You Get in Idea Validation</h2>
          <p className="mt-4 text-slate-600">A complete Idea Validation Report including:</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>Idea stage clarity</li>
            <li>Market analysis</li>
            <li>Problem-solution fit</li>
            <li>Business model direction</li>
            <li>Strengths & risks</li>
            <li>Funding readiness</li>
            <li>Clear next action plan</li>
          </ul>
          <p className="mt-2 font-semibold text-primary">👉 You don’t just get feedback — you get a roadmap.</p>
        </motion.section>

        <motion.section className="mb-16 bg-slate-50 p-8 rounded-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900 text-center">And That’s Not All…</h2>
          <h3 className="mt-4 text-2xl font-bold text-slate-800 text-center">1-Year EDC Membership — Included Free</h3>
          <p className="mt-4 text-slate-600 text-center">Along with idea validation, you get full access to EDC ecosystem for 1 year.</p>
          <div className="mt-6">
            <h4 className="text-xl font-bold text-slate-900">🔥 Membership Benefits</h4>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>📅 Monthly workshops & meetups</li>
              <li>🎤 Investor pitch opportunities</li>
              <li>🤝 Networking with founders & mentors</li>
              <li>💬 Doubt-solving sessions</li>
              <li>🎪 Access to startup events & stalls</li>
              <li>📢 Updates on funding & grants</li>
              <li>📊 Support in pitch, finance & strategy</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💰 Simple & Powerful Pricing</h2>
          <p className="mt-4 text-slate-600">Idea Validation: ₹5,000</p>
          <p className="text-slate-600">EDC Membership (1 Year): <span className="line-through">₹2,500</span></p>
          <p className="mt-2 text-2xl font-bold text-primary">Today You Pay Only ₹5,000</p>
          <p className="font-semibold text-slate-800">And get 1-Year Membership FREE</p>
        </motion.section>

        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 Validate Your Idea. Unlock the Ecosystem.</h2>
          <p className="mt-4 text-slate-600">Don’t waste months guessing. Get clarity, direction, and access — all in one step. Your startup journey starts here.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full">Apply for Idea Validation</button>
            <button className="border border-slate-600 font-semibold px-8 py-3 rounded-full">Join Now</button>
          </div>
        </motion.section>
      </main>

      <footer className="bg-slate-800 text-white text-center py-6">
        <p className="font-semibold">“Right idea + right direction = real growth.”</p>
      </footer>
    </div>
  );
};

export default MembershipValidationPage;