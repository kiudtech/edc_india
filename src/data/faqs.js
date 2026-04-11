export const faqCategories = [
  {
    title: 'General Questions',
    faqs: [
      {
        id: 1,
        question: 'What is the EDC National Innovation & Startup Ranking?',
        answer: [
          'The EDC National Ranking is a merit-based platform designed to recognize top-performing universities, incubation centers, startups, and student innovators across India.',
        ],
      },
      {
        id: 2,
        question: 'Is this ranking genuine or paid?',
        answer: [
          'No. This is a 100% merit-based ranking system.',
          '👉 EDC does NOT sell awards or rankings.',
          'All results are based on data, evaluation, and expert review.',
        ],
      },
      {
        id: 3,
        question: 'Who can apply for this ranking?',
        answer: ['The following can apply:'],
        points: [
          'Universities & Colleges',
          'Incubation Centers',
          'Startups',
          'Student Innovators',
        ],
      },
      {
        id: 4,
        question: 'When and where will the final results be announced?',
        answer: [
          '📍 International Trade Expo Centre, Sector 62, Noida, Uttar Pradesh',
          '📅 19th September 2026',
          'The event will be attended by government guests, investors, and innovation leaders.',
        ],
      },
    ],
  },
  {
    title: 'Application Process',
    faqs: [
      {
        id: 5,
        question: 'How can we apply?',
        answer: [
          'You can apply by filling out the official application form and submitting the required details and documents.',
        ],
      },
      {
        id: 6,
        question: 'What documents are required?',
        answer: ['Depending on the category, you may need:'],
        points: [
          'Startup / Institution details',
          'Proof of work (reports, decks, links)',
          'Traction or performance data',
          'Supporting documents (if applicable)',
        ],
      },
      {
        id: 7,
        question: 'Is there any application fee?',
        answer: ['No. There is no application fee as per the current official policy.'],
      },
      {
        id: 8,
        question: 'Can startups and colleges both apply?',
        answer: ['Yes. The ranking has separate categories for:'],
        points: [
          'Incubation Centers',
          'Startups',
          'Student Projects',
        ],
      },
      {
        id: 9,
        question: 'Can a student apply individually?',
        answer: [
          'Yes. Students can apply under the Top 100 Student Innovation Projects category.',
        ],
      },
    ],
  },
  {
    title: 'Evaluation & Ranking',
    faqs: [
      {
        id: 10,
        question: 'How is the ranking decided?',
        answer: ['Ranking is based on:'],
        points: [
          'Data submitted in application',
          'Evaluation by expert panel',
          'Performance metrics',
        ],
      },
      {
        id: 11,
        question: 'What is the scoring system?',
        answer: [
          'Each parameter is scored on a scale of 1 to 10, and final rankings are calculated using a weighted average system.',
        ],
      },
      {
        id: 12,
        question: 'Who are the evaluators/judges?',
        answer: ['Applications are reviewed by:'],
        points: [
          'Industry experts',
          'Startup mentors',
          'Ecosystem leaders',
        ],
      },
      {
        id: 13,
        question: 'Can ranking be influenced or sponsored?',
        answer: [
          '❌ No. Rankings cannot be influenced, sponsored, or purchased.',
          '👉 Any such claim should be reported immediately at:',
          '📩 ceooffice@edcindia.in',
        ],
      },
    ],
  },
  {
    title: 'Student Rating System',
    faqs: [
      {
        id: 14,
        question: 'What is the student-driven college rating system?',
        answer: [
          'Students can anonymously rate their own college based on multiple parameters like innovation, placement, and environment.',
        ],
      },
      {
        id: 15,
        question: 'Will student ratings affect the final ranking?',
        answer: [
          'Yes. Student feedback is considered as an important factor in evaluating real institutional performance.',
        ],
      },
      {
        id: 16,
        question: 'How do you ensure fairness between large and small colleges?',
        answer: [
          'We use a weighted average normalization system to ensure fairness.',
          '👉 Colleges with different student sizes are evaluated proportionally.',
        ],
      },
      {
        id: 17,
        question: 'Is student data anonymous?',
        answer: ['Yes. All student ratings are completely anonymous and secure.'],
      },
    ],
  },
  {
    title: 'Benefits & Recognition',
    faqs: [
      {
        id: 18,
        question: 'What do winners receive?',
        answer: ['Winners will receive:'],
        points: [
          'National Ranking Certificate',
          'Trophy / Memento',
          'Recognition at Grand Event',
          'Media coverage (50+ platforms)',
          'Investor connect opportunities',
        ],
      },
      {
        id: 19,
        question: 'Will participants get media exposure?',
        answer: ['Yes. Selected participants will be featured in:'],
        points: [
          'News articles',
          'Press releases',
          'Digital media platforms',
        ],
      },
      {
        id: 20,
        question: 'Will there be investor connections?',
        answer: [
          'Yes. Top-performing startups and institutions may get opportunities to connect with investors.',
        ],
      },
    ],
  },
  {
    title: 'Miscellaneous',
    faqs: [
      {
        id: 21,
        question: 'What happens after selection?',
        answer: [
          'Selected participants will be invited to the Grand Award Ceremony for final recognition.',
        ],
      },
      {
        id: 22,
        question: 'Can we update our application after submission?',
        answer: ['Limited updates are allowed before the application deadline.'],
      },
      {
        id: 23,
        question: 'What is the last date to apply?',
        answer: ['31st August 2026.'],
      },
      {
        id: 24,
        question: 'How can we contact the EDC team?',
        answer: [
          '📩 Email: ceooffice@edcindia.in',
          '🌐 Website: edcindia.org',
        ],
      },
      {
        id: 25,
        question: 'Why should we apply?',
        answer: [
          'Because this is not just a ranking —',
          '👉 It is a national platform for recognition, visibility, and growth',
        ],
      },
      {
        id: 26,
        question: 'Is this ranking worth it for our institution?',
        answer: [
          'If you are serious about innovation, visibility, and national recognition — this platform is built for you.',
        ],
      },
    ],
  },
]

export const getAllFaqItems = () =>
  faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ ...faq, category: category.title }))
  )
