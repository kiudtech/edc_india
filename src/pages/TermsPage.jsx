import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const Section = ({ number, title, children }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="mb-10"
  >
    <h2 className="flex items-center gap-3 text-lg font-bold text-slate-900 mb-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{number}</span>
      {title}
    </h2>
    <div className="pl-11 text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
  </motion.section>
);

export default function TermsPage() {
  ;

  return (
    <div className="bg-white min-h-screen text-slate-800">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#0b1e4d] to-[#1a3a8f] py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-4xl font-extrabold">Terms & Conditions</h1>
          <p className="mt-4 text-white/60">Entrepreneurial Development Council India (EDC India)</p>
          <p className="mt-2 text-white/40 text-sm">Last updated: March 2026</p>
        </motion.div>
      </div>

      {/* Quick nav */}
      <div className="border-b border-slate-100 bg-slate-50 py-4">
        <div className="mx-auto max-w-4xl px-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
          {['Introduction','Eligibility','Membership','Payments & Fees','Refund Policy','Idea Validation','Fellowship','Intellectual Property','Privacy','Conduct','Liability','Governing Law','Contact'].map((s) => (
            <span key={s} className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition">{s}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">

        <Section number="1" title="Introduction">
          <p>These Terms & Conditions ("Terms") govern your access to and use of all services, programs, memberships, and platforms offered by Entrepreneurial Development Council India ("EDC India", "we", "us", or "our").</p>
          <p>By registering, purchasing a membership, applying for any program, or using any EDC India service, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
          <p>EDC India reserves the right to update these Terms at any time. Continued use of our services after changes constitutes acceptance of the revised Terms.</p>
        </Section>

        <Section number="2" title="Eligibility">
          <p>Our services are available to individuals who are:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>18 years of age or older, or have parental/guardian consent</li>
            <li>Legally capable of entering into binding contracts under applicable law</li>
            <li>Not barred from receiving services under any applicable law</li>
          </ul>
          <p>EDC India reserves the right to refuse service to anyone at its sole discretion.</p>
        </Section>

        <Section number="3" title="Membership Terms">
          <p><strong>Startup Membership (₹2,500):</strong> Grants lifetime access to the EDC India ecosystem including Founder ID, events, workshops, grant directory, investor network, course enrollment, and support tickets.</p>
          <p><strong>Idea Validation (₹5,000):</strong> Includes a complete expert validation report, validation certificate, and 1-year EDC membership at no additional cost.</p>
          <p><strong>Fellowship Program (₹10,000):</strong> A 12-month execution-driven program. Access is valid for the duration of the fellowship period only.</p>
          <p>Membership benefits are non-transferable and are tied to the registered individual's account. Sharing of credentials is strictly prohibited and may result in account termination without refund.</p>
          <p>EDC India reserves the right to modify, add, or remove membership benefits with reasonable notice to members.</p>
        </Section>

        <Section number="4" title="Payments & Fees">
          <p>All fees are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</p>
          <p>Payments are processed securely through our payment gateway partners. EDC India does not store your payment card details.</p>
          <p>All fees are due at the time of registration. Access to services is granted only upon successful payment confirmation.</p>
          <p>In case of payment failure, please contact us at <a href="mailto:enquiry@edcindia.in" className="text-blue-600 hover:underline">enquiry@edcindia.in</a> within 48 hours with your transaction reference.</p>
        </Section>

        <Section number="5" title="Refund Policy">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-3">
            <p className="font-semibold text-amber-800">Important: Please read this section carefully before making any payment.</p>
          </div>
          <p><strong>General Policy:</strong> All fees paid to EDC India are non-refundable once the service has been activated or access has been granted.</p>
          <p><strong>Startup Membership:</strong> No refund once the Founder ID has been issued and ecosystem access has been granted.</p>
          <p><strong>Idea Validation:</strong> No refund once the validation process has been initiated (i.e., after payment is confirmed and the application is submitted for review).</p>
          <p><strong>Fellowship Program:</strong> No refund once the fellowship has commenced. If a fellow withdraws before the program start date (minimum 7 days prior), a partial refund of 50% may be considered at EDC India's sole discretion.</p>
          <p><strong>Exceptions:</strong> Refunds may be considered in the following cases only:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Duplicate payment due to a technical error (full refund within 30 working days)</li>
            <li>Service not delivered due to EDC India's failure (full or partial refund at our discretion)</li>
            <li>Payment made by mistake before any service activation (request must be raised within 24 hours)</li>
          </ul>
          <p><strong>Refund Process:</strong> To request a refund, email <a href="mailto:enquiry@edcindia.in" className="text-blue-600 hover:underline">enquiry@edcindia.in</a> with your registered email, transaction ID, and reason. Approved refunds will be processed within 30 working days to the original payment method.</p>
          <p>EDC India is not responsible for any bank charges or currency conversion fees incurred during refund processing.</p>
        </Section>

        <Section number="6" title="Idea Validation Terms">
          <p>The Idea Validation service provides an expert review and feedback report based on the information submitted by the applicant. The report is advisory in nature and does not guarantee business success, funding, or market viability.</p>
          <p>EDC India does not claim ownership of any idea submitted for validation. However, by submitting, you grant EDC India a non-exclusive right to use anonymized data for research and reporting purposes.</p>
          <p>Validation reports are typically delivered within 7–14 working days of payment confirmation. Timelines may vary based on volume.</p>
          <p>The validation certificate issued is for recognition purposes only and does not constitute a legal or financial endorsement.</p>
        </Section>

        <Section number="7" title="Fellowship Program Terms">
          <p>The Fellowship Program is a 12-month structured program. Participation requires active engagement, completion of assigned tasks, and adherence to program guidelines.</p>
          <p>EDC India reserves the right to remove a fellow from the program without refund in cases of misconduct, non-participation, or violation of these Terms.</p>
          <p>Funding opportunities, international exposure, and grant support mentioned are subject to eligibility, performance, and availability. They are not guaranteed outcomes of the fellowship.</p>
          <p>Certificates of completion are issued only upon satisfactory completion of the program as determined by EDC India.</p>
        </Section>

        <Section number="8" title="Intellectual Property">
          <p>All content, materials, branding, logos, course content, and resources provided by EDC India are the exclusive intellectual property of EDC India and are protected under applicable copyright and trademark laws.</p>
          <p>Members may use provided materials solely for personal, non-commercial purposes. Reproduction, redistribution, or resale of any EDC India content without prior written consent is strictly prohibited.</p>
          <p>Any content created by members during programs remains the property of the respective member, unless otherwise agreed in writing.</p>
        </Section>

        <Section number="9" title="Privacy Policy">
          <p>EDC India collects personal information (name, email, phone, startup details) solely for the purpose of providing services, communicating updates, and improving our offerings.</p>
          <p>We do not sell, rent, or share your personal data with third parties for marketing purposes without your explicit consent.</p>
          <p>Your data may be shared with trusted service providers (payment gateways, email platforms) strictly for operational purposes under confidentiality agreements.</p>
          <p>You have the right to request access to, correction of, or deletion of your personal data by contacting us at <a href="mailto:enquiry@edcindia.in" className="text-blue-600 hover:underline">enquiry@edcindia.in</a>.</p>
          <p>EDC India uses industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
        </Section>

        <Section number="10" title="Code of Conduct">
          <p>All members and participants are expected to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Treat fellow members, mentors, and EDC India staff with respect</li>
            <li>Not engage in harassment, discrimination, or abusive behaviour</li>
            <li>Not misrepresent their identity, startup, or qualifications</li>
            <li>Not use EDC India platforms for spam, fraud, or illegal activities</li>
            <li>Maintain confidentiality of proprietary information shared within the community</li>
          </ul>
          <p>Violation of the code of conduct may result in immediate termination of membership without refund.</p>
        </Section>

        <Section number="11" title="Limitation of Liability">
          <p>EDC India provides all services on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of our services.</p>
          <p>EDC India shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services, including but not limited to loss of profits, data, or business opportunities.</p>
          <p>Our total liability to any member shall not exceed the amount paid by that member for the specific service giving rise to the claim.</p>
        </Section>

        <Section number="12" title="Innovation & Incubation Ranking (IIIR)">
          <p>Institutions applying for the India Innovation & Incubation Ranking (IIIR) agree that all data submitted is accurate and verifiable.</p>
          <p>Rankings are based on EDC India's proprietary evaluation framework and are subject to change. EDC India's decision on rankings is final.</p>
          <p>Awards, certificates, and recognition are merit-based. EDC India reserves the right to withdraw recognition in case of discrepancies or non-compliance.</p>
          <p>By applying, institutions grant EDC India the right to publish their name and ranking publicly.</p>
        </Section>

        <Section number="13" title="Governing Law & Dispute Resolution">
          <p>These Terms shall be governed by and construed in accordance with the laws of India.</p>
          <p>Any disputes arising out of or in connection with these Terms shall first be attempted to be resolved through mutual discussion within 30 days.</p>
          <p>If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of Delhi/NCR, India.</p>
        </Section>

        <Section number="14" title="Contact Us">
          <p>For any questions, concerns, or requests related to these Terms, please contact us:</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
            <p><strong>EDC India — Entrepreneurial Development Council</strong></p>
            <p>Office No. 1026, Floor No. 10, Gaur City Mall, Noida Extension, Gautam Buddha Nagar – 201306, Uttar Pradesh</p>
            <p>Email: <a href="mailto:enquiry@edcindia.in" className="text-blue-600 hover:underline">enquiry@edcindia.in</a></p>
            <p>Phone: <a href="tel:+919792830382" className="text-blue-600 hover:underline">+91 9792830382</a></p>
          </div>
        </Section>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">
          <p className="text-sm text-slate-600">By using any EDC India service, you confirm that you have read, understood, and agreed to these Terms & Conditions and our Refund Policy.</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
