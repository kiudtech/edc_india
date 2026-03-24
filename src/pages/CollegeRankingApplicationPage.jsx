import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CollegeRankingApplicationPage = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('');

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setStatus('Please agree to the terms and conditions.');
      return;
    }
    setStatus('Submitting...');
    try {
      await axios.post('/api/admin/college-ranking-application', formData);
      setStatus('Application submitted successfully!');
      setFormData({ collegeName: '', contactPerson: '', email: '', phone: '', message: '' });
      setAgreed(false);
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="bg-slate-50 py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl font-bold text-slate-900">Rank Your College</h1>
          <p className="mt-4 text-lg text-slate-600">Apply for the India Innovation & Incubation Ranking.</p>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div className="bg-white p-8 rounded-lg shadow-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="collegeName" className="block text-sm font-medium text-slate-700">College/University Name</label>
                <input type="text" name="collegeName" id="collegeName" value={formData.collegeName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700">Contact Person</label>
                <input type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
              <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </div>
            <div className="mt-6">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="agreed" name="agreed" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreed" className="font-medium text-gray-700">I agree to the <a href="/terms" target="_blank" className="text-indigo-600 hover:text-indigo-500">Terms & Conditions</a></label>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply Now
              </button>
            </div>
            {status && <p className="mt-4 text-center text-sm text-slate-600">{status}</p>}
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default CollegeRankingApplicationPage;