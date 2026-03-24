const fs = require('fs');

const code = import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function JoinPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-accent min-h-screen text-ink pb-24 font-sans selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-24 text-center sm:py-32">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-accent to-accent"></div>
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"></div>
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest shadow-sm">
            Spark Your Journey
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pathway</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed font-medium">
            Whether you are just validating an idea or ready to accelerate a funded startup, we have a membership tier designed specifically for your growth.
          </p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid gap-8 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-6xl mx-auto"
        >
          {/* Plan 1: Startup Membership */}
          <motion.div variants={fadeUp} className="relative flex flex-col rounded-[2.5rem] border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30">
            <h3 className="text-2xl font-bold text-ink">Startup Membership</h3>
            <p className="mt-3 text-sm text-slate-500 min-h-[48px] leading-relaxed font-medium">
              Perfect for early-stage founders building their ventures and connecting with peers.
            </p>
            <div className="my-8 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-ink">₹2,500</span>
              <span className="text-sm font-semibold text-slate-500">/ lifetime</span>
            </div>
            <ul className="mb-10 flex-1 space-y-5 text-sm font-semibold text-slate-600">
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Community Access
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Mentorship Sessions
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Startup Resources
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Networking Events
              </li>
            </ul>
            <button
              onClick={() => navigate('/startup-application')}
              className="mt-auto w-full rounded-2xl bg-ink px-6 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              Apply for Membership
            </button>
          </motion.div>

          {/* Plan 2: Idea Validation Phase (Most Popular) */}
          <motion.div variants={fadeUp} className="relative flex flex-col rounded-[2.5rem] border-2 border-primary bg-white p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-glow lg:-mt-6 lg:mb-6">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-lg">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-primary mt-2">Idea Validation</h3>
            <p className="mt-3 text-sm text-slate-500 min-h-[48px] leading-relaxed font-medium">
              Structured expert-led program to validate and refine your core startup concept.
            </p>
            <div className="my-8 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-ink">₹1,500</span>
              <span className="text-sm font-semibold text-slate-500">/ program</span>
            </div>
            <ul className="mb-10 flex-1 space-y-5 text-sm font-semibold text-slate-600">
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                4-Week Program
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Expert Feedback
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Market Research Plan
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Certificate of Completion
              </li>
            </ul>
            <button
              onClick={() => navigate('/join-validation')}
              className="mt-auto w-full rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:shadow-lg hover:scale-[1.02] active:scale-95 shadow-md"
            >
              Start Validation
            </button>
          </motion.div>

          {/* Plan 3: Fellowship */}
          <motion.div variants={fadeUp} className="relative flex flex-col rounded-[2.5rem] border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30">
            <h3 className="text-2xl font-bold text-ink">EDC Fellowship</h3>
            <p className="mt-3 text-sm text-slate-500 min-h-[48px] leading-relaxed font-medium">
              Comprehensive accelerator program for promising startups and elite founders.
            </p>
            <div className="my-8 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-ink">₹5,000</span>
              <span className="text-sm font-semibold text-slate-500">/ cohort</span>
            </div>
            <ul className="mb-10 flex-1 space-y-5 text-sm font-semibold text-slate-600">
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                12-Week Acceleration
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Funding Opportunities
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Dedicated Co-founder Matching
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</div>
                Premium Support Access
              </li>
            </ul>
            <button
              onClick={() => navigate('/fellowship-application')}
              className="mt-auto w-full rounded-2xl bg-ink px-6 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              Apply for Fellowship
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}\;

fs.writeFileSync('src/pages/JoinPage.jsx', code, 'utf8');
