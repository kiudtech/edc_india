import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StartupMembershipPage = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold">Join India's Growing Startup Ecosystem</h1>
          <p className="mt-4 text-lg">Get your Founder ID, access mentors, events, grants, and funding — all in one membership.</p>
          <p className="mt-2 font-semibold">Connect → Build → Scale</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/startup-application" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full">Join Now</Link>
            <a href="tel:+919792830382" className="border border-white font-semibold px-8 py-3 rounded-full">Book a Call</a>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

        <motion.section className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">This is for you if...</h2>
          <ul className="mt-6 mx-auto max-w-2xl space-y-2 text-slate-600 text-left">
            <li>✔️ You have a startup idea and want to take it forward</li>
            <li>✔️ You are an early-stage founder looking for mentorship and network</li>
            <li>✔️ You want access to investors, grants, and funding opportunities</li>
            <li>✔️ You want to be part of a community of like-minded founders</li>
            <li>✔️ You want structured support to grow your startup</li>
            <li className="font-semibold text-primary text-center pt-4">👉 Whether you're at idea stage or early traction — this membership is for you.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 What is EDC Startup Membership?</h2>
          <p className="mt-4 text-slate-600">
            The EDC Startup Membership gives you full access to India's entrepreneurial ecosystem. From a unique Founder ID to investor connections, events, grants, and dedicated support — everything a founder needs to move from idea to execution is right here.
          </p>
        </motion.section>

        <motion.section className="mb-16 bg-slate-50 p-8 rounded-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🔥 Membership Benefits</h2>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>🪪 Unique Founder ID (BUB-XXXX) — your identity in the ecosystem</li>
            <li>📅 Access to Events & Workshops — monthly meetups, summits, and sessions</li>
            <li>💰 Grant & Funding Directory — curated list of government and private grants</li>
            <li>🤝 Investor Network Access — connect with angels, VCs, and strategic investors</li>
            <li>📢 Community & Announcements — stay updated with opportunities</li>
            <li>📚 Course Enrollment — access to entrepreneurship learning tracks</li>
            <li>🎫 Dedicated Support Tickets — direct help from the EDC team</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💰 Funding & Growth Support</h2>
          <p className="mt-4 text-slate-600">As a member, you get access to:</p>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li>💸 Grant support guidance up to ₹10 Lakhs</li>
            <li>💼 Investor introductions and pitch opportunities</li>
            <li>🌍 Global exposure programs and international events</li>
            <li>📊 Pitch deck and finance strategy support</li>
          </ul>
          <p className="mt-2 font-semibold text-primary">👉 We don't just give you access — we help you grow.</p>
        </motion.section>

        <motion.section className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💰 Simple Pricing</h2>
          <p className="mt-4 text-slate-600">One-time membership fee</p>
          <p className="mt-2 text-4xl font-bold text-primary">₹2,500</p>
          <p className="mt-1 text-slate-500">Lifetime access to the EDC India ecosystem</p>
        </motion.section>

        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 Start Your Founder Journey Today</h2>
          <p className="mt-4 text-slate-600">Join hundreds of founders who are already building with EDC India. Your startup journey starts with one step.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/startup-application" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full">Join Now — ₹2,500</Link>
            <a href="mailto:enquiry@edcindia.in?subject=Membership%20Enquiry" className="border border-slate-600 font-semibold px-8 py-3 rounded-full">Talk to Us</a>
          </div>
        </motion.section>
      </main>

      <footer className="bg-slate-800 text-white text-center py-6">
        <p className="font-semibold">"The right network and the right support can change everything."</p>
      </footer>
    </div>
  );
};

export default StartupMembershipPage;
