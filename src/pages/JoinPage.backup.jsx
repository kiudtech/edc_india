import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function JoinPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold">Choose Your Plan</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 sm:text-base px-4">
            Select the membership that best fits your entrepreneurial journey.
          </p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 -mt-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Plan 1: Startup Membership */}
          <div className="relative flex flex-col rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-slate-900">Startup Membership</h3>
            <p className="mt-2 text-sm text-slate-500 min-h-[40px]">
              Perfect for early-stage founders building their ventures.
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900">₹2,500</span>
            </div>
            <ul className="mb-8 flex-1 space-y-4 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Community Access
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Mentorship Sessions
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Startup Resources
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Networking Events
              </li>
            </ul>
            <button
              onClick={() => navigate('/startup-application')}
              className="mt-auto w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Join Now
            </button>
          </div>

          {/* Plan 2: Idea Validation Phase */}
          <div className="relative flex flex-col rounded-[2rem] border-2 border-blue-600 bg-white p-8 shadow-xl transition-transform hover:-translate-y-1">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-slate-900">Idea Validation</h3>
            <p className="mt-2 text-sm text-slate-500 min-h-[40px]">
              Structured program to validate and refine your startup idea.
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900">₹1,500</span>
            </div>
            <ul className="mb-8 flex-1 space-y-4 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> 4-Week Program
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Expert Feedback
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Market Research Plan
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Certificate of Completion
              </li>
            </ul>
            <button
              onClick={() => navigate('/join-validation')}
              className="mt-auto w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Join Now
            </button>
          </div>

          {/* Plan 3: Fellowship */}
          <div className="relative flex flex-col rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-slate-900">EDC Fellowship</h3>
            <p className="mt-2 text-sm text-slate-500 min-h-[40px]">
              Comprehensive accelerator program for promising startups.
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900">₹5,000</span>
            </div>
            <ul className="mb-8 flex-1 space-y-4 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> 12-Week Acceleration
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Funding Opportunities
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Dedicated Co-founder Matching
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> Premium Support Access
              </li>
            </ul>
            <button
              onClick={() => navigate('/fellowship-application')}
              className="mt-auto w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Join Now
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
