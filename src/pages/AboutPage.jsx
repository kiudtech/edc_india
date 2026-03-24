import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-slate-50 py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold text-slate-900">About EDC India</h1>
          <p className="mt-4 text-lg text-slate-600">We don’t just talk about entrepreneurship — we build the ecosystem that makes it possible.</p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 Who We Are</h2>
          <p className="mt-4 text-slate-600">
            Entrepreneurial Development Council (EDC India) is a mission-driven organization dedicated to building and strengthening the entrepreneurial ecosystem across India and globally.
            Founded in 2019, EDC India was created with a simple yet powerful belief:
          </p>
          <p className="mt-2 font-semibold text-primary">
            👉 Entrepreneurship is not limited to starting a company — it is a mindset of solving problems, creating value, and thinking differently.
          </p>
          <p className="mt-4 text-slate-600">
            We work at the intersection of students, startups, universities, investors, and policymakers, enabling collaboration, innovation, and real-world execution.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🔥 Our Story</h2>
          <p className="mt-4 text-slate-600">
            EDC India started as a vision to bridge a critical gap — the gap between education and real-world entrepreneurship. We observed that while thousands of students graduate every year, very few understand how businesses actually work, how ideas are validated, or how startups grow. At the same time, startups struggle with clarity, structure, and access to the right ecosystem. This is where EDC India stepped in.
          </p>
          <p className="mt-4 text-slate-600">
            From conducting small sessions and meeting individuals one-on-one, we have now grown into a multi-layered ecosystem platform working with institutions, founders, and innovators across borders.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🚀 Our Impact</h2>
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">70+</div>
              <div className="mt-2 text-slate-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="mt-2 text-slate-600">Institutes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="mt-2 text-slate-600">Startups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">3,000+</div>
              <div className="mt-2 text-slate-600">Members</div>
            </div>
          </div>
          <p className="mt-6 text-center text-slate-600">Presence in India, UAE, and Singapore. And this is just the beginning.</p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">💡 What We Believe</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li>👉 Entrepreneurship is a mindset, not a designation</li>
            <li>👉 Not everyone needs to start a startup — but everyone should think like an entrepreneur</li>
            <li>👉 Real learning happens through execution, not theory</li>
            <li>👉 Sales, problem-solving, and adaptability are core life skills</li>
            <li className="font-semibold text-primary">👉 Degrees alone don’t create impact — skills and action do.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🎯 Our Mission</h2>
          <p className="mt-4 text-slate-600">
            To build a strong, inclusive, and execution-driven entrepreneurial ecosystem where individuals can learn how to think and act like entrepreneurs, validate and build their ideas, access the right mentorship, funding, and opportunities, and grow from idea to impact.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🔗 What We Do</h2>
          <p className="mt-4 text-slate-600">
            We create platforms, programs, and opportunities that enable Idea Validation & Startup Clarity, Community Building & Membership Access, Entrepreneurial Fellowships, University & Incubation Development, and Innovation & Incubation Rankings. Our focus is not just to educate — but to enable action.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🌐 Our Ecosystem</h2>
          <p className="mt-4 text-slate-600">
            EDC India brings together all key stakeholders of entrepreneurship: Students & Aspiring Entrepreneurs, Startups & Founders, Colleges & Universities, Investors & Mentors, and Government & Policy Makers, creating a connected ecosystem where ideas turn into execution.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🔥 Our Vision</h2>
          <p className="mt-4 text-slate-600">
            To become one of the most impactful entrepreneurial ecosystem builders globally — enabling millions of individuals to think, build, and grow beyond limitations.
          </p>
        </motion.section>

        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900">🤝 Join the Movement</h2>
          <p className="mt-4 text-slate-600">
            EDC India is not just an organization — it is a growing movement. Whether you are a student exploring your path, a founder building your startup, a college shaping future leaders, or an investor supporting innovation, there is a place for you in this ecosystem.
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutPage;