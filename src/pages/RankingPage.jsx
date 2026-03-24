import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RankingPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-gradient-to-r from-teal-500 to-cyan-600 py-20 text-white text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold">India’s Most Transparent Innovation & Incubation Ranking</h1>
          <p className="mt-4 text-lg">Recognizing institutions, startups, and student innovators who are building real impact.</p>
          <p className="mt-2 font-semibold">Measured by execution. Recognized by impact.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/college-ranking-application" className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full">Apply for Ranking</Link>
            <a href="mailto:enquiry@edcindia.in?subject=IIIR%20Brochure%20Request" className="border border-white font-semibold px-8 py-3 rounded-full">Download Brochure</a>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.section className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">Beyond Traditional Rankings</h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Most institutional rankings focus on academics, infrastructure, and legacy. But the world has changed. Today, the real question is: Is your institution creating innovators, startups, and job creators? The India Innovation & Incubation Ranking (IIIR) is designed to measure exactly that — real innovation, real execution, and real outcomes.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💡 Our Approach: Verified. Transparent. Data-Driven.</h2>
          <p className="mt-4 text-slate-600">
            Our evaluation model combines data analysis, physical campus visits, interaction with founders & students, and performance-based scoring. We don’t just review reports — we validate on ground.
          </p>
        </motion.section>

        <motion.section className="mb-16 bg-slate-50 p-8 rounded-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">📊 Evaluation Criteria</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li>🚀 Startup Growth</li>
            <li>🏢 Incubation Quality</li>
            <li>💰 Funding Support</li>
            <li>👨‍💼 Job Creation</li>
            <li>💡 Innovation & Patents</li>
            <li>🔄 Idea-to-Business Conversion</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🏆 Ranking Structure</h2>
          <p className="mt-4 text-slate-600">Each year, IIIR identifies:</p>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li>🥇 Top 30 Incubation Centers</li>
            <li>🚀 Top 30 Startup Ecosystems (Institutions)</li>
            <li>💡 Top 100 Student Innovation Projects</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🎯 Why Participate?</h2>
          <p className="mt-4 text-slate-600">
            Build national credibility & brand value, attract better students, startups, and partnerships, benchmark against top institutions, strengthen your innovation & incubation ecosystem, and showcase real impact to government & stakeholders. This is not just ranking — this is positioning.
          </p>
        </motion.section>

        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 Get Recognized for Real Impact</h2>
          <p className="mt-4 text-slate-600">If your institution is creating innovation, building startups, and driving real change — it deserves national recognition.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/college-ranking-application" className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-full">Apply for Ranking</Link>
            <a href="mailto:enquiry@edcindia.in?subject=Connect%20with%20EDC%20for%20Ranking" className="border border-slate-600 font-semibold px-8 py-3 rounded-full">Connect with EDC</a>
          </div>
        </motion.section>
      </main>

      <footer className="bg-slate-800 text-white text-center py-6">
        <p className="font-semibold">“Innovation is not what you claim. It’s what you build.”</p>
      </footer>
    </div>
  );
};

export default RankingPage;