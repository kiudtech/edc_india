import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FellowshipPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold">Build Your Startup & Career in 12 Months</h1>
          <p className="mt-4 text-lg">No experience? No idea? No problem. Learn, build, and grow with India’s most practical entrepreneurial fellowship.</p>
          <p className="mt-2 font-semibold">30% Learning. 70% Real Execution.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/fellowship-application" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full">Apply Now</Link>
            <a href="tel:+919792830382" className="border border-white font-semibold px-8 py-3 rounded-full">Book a Call</a>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900 text-center">This is for you if...</h2>
          <ul className="mt-6 mx-auto max-w-2xl space-y-2 text-slate-600">
            <li>✔️ You are a student (BBA, MBA, or any field) confused about your career</li>
            <li>✔️ You want to build a startup but don’t know where to start</li>
            <li>✔️ You want to learn real skills instead of theory</li>
            <li>✔️ You lack confidence in communication, sales, or business</li>
            <li>✔️ You want practical exposure and real opportunities</li>
            <li className="font-semibold text-primary text-center pt-4">👉 Even if you are starting from zero — this fellowship is for you.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 What is EDC Fellowship?</h2>
          <p className="mt-4 text-slate-600">
            The EDC Entrepreneurial Fellowship is a 1-year execution-driven program designed to help you understand business, build real skills, work on startup ideas, and gain real-world exposure. This is not a course. This is a journey from confusion to clarity, and from learning to execution.
          </p>
        </motion.section>

        <motion.section className="mb-16 bg-slate-50 p-8 rounded-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🎓 How The Program Works</h2>
          <p className="mt-4 text-slate-600">Duration: 12 Months</p>
          <p className="text-slate-600">Fee: 10,000/-</p>
          <p className="font-semibold text-slate-800">Model: 30% Learning + 70% Practical Execution</p>
          <p className="mt-4 text-slate-600">Process: Learn basics in simple, practical way → Work on real problems & ideas → Practice communication & sales → Execute with real exposure.</p>
          <p className="mt-2 font-semibold text-primary">👉 Learn → Practice → Execute → Grow</p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💡 What You Will Learn</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li>How to think like an entrepreneur</li>
            <li>How to validate any idea</li>
            <li>How to communicate and pitch confidently</li>
            <li>How to sell a product or idea</li>
            <li>How startups actually work</li>
            <li>How to approach clients & opportunities</li>
            <li className="font-semibold text-primary pt-2">👉 Everything explained in simple language with real examples.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💰 Funding & Opportunities</h2>
          <p className="mt-4 text-slate-600">After successful completion of the fellowship:</p>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li>💸 Up to ₹10 Lakhs Grant Support</li>
            <li>💼 Up to ₹1 Crore Funding Opportunity (Equity/Debt)</li>
            <li>🌍 International Exposure (Dubai / Singapore) for selected fellows</li>
          </ul>
          <p className="mt-2 font-semibold text-primary">👉 We don’t just teach — we support your growth.</p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🎯 What You Will Become</h2>
          <p className="mt-4 text-slate-600">After this fellowship, you will become a confident communicator, a problem solver, a person who understands business & sales, and someone who can earn through skills, not depend on a degree. This is not just learning — this is transformation.</p>
        </motion.section>

        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 Start Your Journey Today</h2>
          <p className="mt-4 text-slate-600">You don’t need to be perfect. You just need to start. If you are ready to grow, we are ready to guide you.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/fellowship-application" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full">Apply Now</Link>
            <a href="mailto:enquiry@edcindia.in?subject=Fellowship%20Enquiry" className="border border-slate-600 font-semibold px-8 py-3 rounded-full">Talk to Us</a>
          </div>
        </motion.section>
      </main>

      <footer className="bg-slate-800 text-white text-center py-6">
        <p className="font-semibold">“Degrees don’t build careers. Skills and execution do.”</p>
      </footer>
    </div>
  );
};

export default FellowshipPage;