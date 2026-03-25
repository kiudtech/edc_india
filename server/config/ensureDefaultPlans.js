import Plan from '../models/Plan.js'

const defaultPlans = [
  {
    name: 'Startup Membership',
    slug: 'startup-membership',
    badge: 'Most Popular',
    description: 'Full access to the EDC India startup ecosystem, mentorship, events, grants, and funding opportunities.',
    price: 2500,
    billingText: '/ one-time',
    ctaText: 'Join Now',
    ctaRoute: '/startup-application',
    features: [
      'Unique Founder ID (BUB-XXXX)',
      'Access to Events & Workshops',
      'Grant & Funding Directory',
      'Investor Network Access',
      'Community & Announcements',
      'Course Enrollment',
      'Dedicated Support Tickets',
    ],
    isPopular: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'Idea Validation',
    slug: 'idea-validation',
    badge: 'Expert Review',
    description: 'Get your startup idea validated by experts, receive feedback, certification, and a member account.',
    price: 5000,
    billingText: '/ one-time',
    ctaText: 'Join Now',
    ctaRoute: '/join-validation',
    features: [
      'Expert Idea Review & Feedback',
      'Validation Certificate',
      'Auto Member Account + Founder ID',
      'Access to Full Ecosystem',
      'Priority Admin Review',
      'Startup Stage Assessment',
      'Innovation Report',
    ],
    isPopular: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'Fellowship Program',
    slug: 'fellowship-program',
    badge: 'Career + Startup',
    description: 'A structured fellowship track to build entrepreneurial skills with execution support, mentorship, and growth opportunities.',
    price: 5000,
    billingText: '/ one-time',
    ctaText: 'Join Fellowship',
    ctaRoute: '/fellowship-application',
    features: [
      'Execution-focused learning path',
      'Mentor support and progress guidance',
      'Communication and pitch practice',
      'Career and startup exposure',
      'Network with founders and peers',
      'Funding opportunity readiness',
    ],
    isPopular: false,
    isActive: true,
    sortOrder: 3,
  },
]

export const ensureDefaultPlans = async () => {
  for (const plan of defaultPlans) {
    await Plan.updateOne({ slug: plan.slug }, { $setOnInsert: plan }, { upsert: true })
  }

  console.log('Plan bootstrap: default plans ensured')
}
