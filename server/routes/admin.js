import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import User from '../models/User.js'
import Payment from '../models/Payment.js'
import Ticket from '../models/Ticket.js'
import Event from '../models/Event.js'
import Grant from '../models/Grant.js'
import College from '../models/College.js'
import IdeaValidation from '../models/IdeaValidation.js'
import Notification from '../models/Notification.js'
import Course from '../models/Course.js'
import Plan from '../models/Plan.js'
import CollegeRankingApplication from '../models/CollegeRankingApplication.js'
import FellowshipApplication from '../models/FellowshipApplication.js'
import ContactRequest from '../models/ContactRequest.js'

const router = Router()

const CONTACT_FORM_TITLES = {
  startup_application: 'Startup Application',
  investor_interest: 'Investor Interest',
  college_partnership: 'College Partnership',
  newsletter: 'Newsletter',
}

/* ============================================================
   ANALYTICS
   ============================================================ */
router.get('/analytics', protect, adminOnly, async (_req, res) => {
  try {
    const [
      totalMembers,
      activeMembers,
      pendingMembers,
      totalValidations,
      approvedValidations,
      totalColleges,
      totalPayments,
      totalTickets,
      openTickets,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'user', membershipStatus: 'active' }),
      User.countDocuments({ role: 'user', membershipStatus: 'pending' }),
      IdeaValidation.countDocuments(),
      IdeaValidation.countDocuments({ status: 'approved' }),
      College.countDocuments(),
      Payment.countDocuments({ status: 'success' }),
      Ticket.countDocuments(),
      Ticket.countDocuments({ status: 'open' }),
    ])

    const revenueResult = await Payment.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])
    const totalRevenue = revenueResult[0]?.total || 0

    const recentPayments = await Payment.find({ status: 'success' })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email founderId')

    res.json({
      totalMembers,
      activeMembers,
      pendingMembers,
      totalValidations,
      approvedValidations,
      totalColleges,
      totalPayments,
      totalRevenue,
      totalTickets,
      openTickets,
      recentPayments,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   USER MANAGEMENT
   ============================================================ */
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const filter = { role: 'user' }
    if (req.query.industry) filter.industry = req.query.industry
    if (req.query.stage) filter.startupStage = req.query.stage
    if (req.query.membershipStatus) filter.membershipStatus = req.query.membershipStatus
    if (req.query.membershipType) filter.membershipType = req.query.membershipType
    if (req.query.search) {
      const s = req.query.search
      filter.$or = [
        { name: { $regex: s, $options: 'i' } },
        { email: { $regex: s, $options: 'i' } },
        { founderId: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
      ]
    }
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    const payments = await Payment.find({ userId: user._id }).sort({ createdAt: -1 })
    const tickets = await Ticket.find({ userId: user._id }).sort({ createdAt: -1 })
    res.json({ user, payments, tickets })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/users/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { membershipStatus } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { membershipStatus },
      { new: true }
    ).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   PAYMENT MANAGEMENT
   ============================================================ */
router.get('/payments', protect, adminOnly, async (req, res) => {
  try {
    const filter = {}
    if (req.query.type) filter.type = req.query.type
    if (req.query.status) filter.status = req.query.status
    const payments = await Payment.find(filter)
      .populate('userId', 'name email founderId phone')
      .sort({ createdAt: -1 })
    res.json(payments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/payments/:id/mark-paid', protect, adminOnly, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    payment.status = 'success'
    payment.transactionId = payment.transactionId || `MANUAL-${Date.now()}`
    await payment.save()
    // Activate user membership
    await User.findByIdAndUpdate(payment.userId, { membershipStatus: 'active' })
    const updated = await Payment.findById(payment._id).populate('userId', 'name email founderId')
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   TICKET MANAGEMENT
   ============================================================ */
router.get('/tickets', protect, adminOnly, async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    const tickets = await Ticket.find(filter)
      .populate('userId', 'name email founderId phone')
      .sort({ createdAt: -1 })
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/tickets/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes } = req.body
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    ).populate('userId', 'name email founderId phone')
    res.json(ticket)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   EVENTS CRUD
   ============================================================ */
router.get('/events', protect, adminOnly, async (_req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 })
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/events', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/events/:id', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/events/:id', protect, adminOnly, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.json({ message: 'Event deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   GRANTS & FUNDING CRUD
   ============================================================ */
router.get('/grants', protect, adminOnly, async (_req, res) => {
  try {
    const grants = await Grant.find().sort({ createdAt: -1 })
    res.json(grants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/grants', protect, adminOnly, async (req, res) => {
  try {
    const grant = await Grant.create(req.body)
    res.status(201).json(grant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/grants/:id', protect, adminOnly, async (req, res) => {
  try {
    const grant = await Grant.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(grant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/grants/:id', protect, adminOnly, async (req, res) => {
  try {
    await Grant.findByIdAndDelete(req.params.id)
    res.json({ message: 'Grant deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   PLANS CRUD
   ============================================================ */
router.get('/plans', protect, adminOnly, async (_req, res) => {
  try {
    const plans = await Plan.find().sort({ sortOrder: 1, createdAt: 1 })
    res.json(plans)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/plans', protect, adminOnly, async (req, res) => {
  try {
    const plan = await Plan.create(req.body)
    res.status(201).json(plan)
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(400).json({ message: 'Plan slug already exists. Please use a unique slug.' })
    }
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
  }
})

router.put('/plans/:id', protect, adminOnly, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!plan) return res.status(404).json({ message: 'Plan not found' })
    res.json(plan)
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(400).json({ message: 'Plan slug already exists. Please use a unique slug.' })
    }
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
  }
})

router.delete('/plans/:id', protect, adminOnly, async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id)
    res.json({ message: 'Plan deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   IDEA VALIDATION MANAGEMENT
   ============================================================ */
router.get('/validations', protect, adminOnly, async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    if (req.query.industry) filter.industry = req.query.industry
    const validations = await IdeaValidation.find(filter)
      .populate('userId', 'name email founderId')
      .sort({ createdAt: -1 })
    res.json(validations)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/validations/:id', protect, adminOnly, async (req, res) => {
  try {
    const validation = await IdeaValidation.findById(req.params.id)
      .populate('userId', 'name email founderId phone')
    if (!validation) return res.status(404).json({ message: 'Not found' })
    res.json(validation)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/validations/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes, certificateIssued, rejectionReason } = req.body
    const update = {}
    if (status) update.status = status
    if (adminNotes !== undefined) update.adminNotes = adminNotes
    if (rejectionReason !== undefined) update.rejectionReason = rejectionReason
    if (certificateIssued) {
      update.certificateIssued = true
      update.certificateDate = new Date()
    }
    const validation = await IdeaValidation.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate('userId', 'name email founderId')
    res.json(validation)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   COLLEGE RANKING
   ============================================================ */
router.get('/colleges', protect, adminOnly, async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    const colleges = await College.find(filter).sort({ ranking: 1, createdAt: -1 })
    res.json(colleges)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/colleges/:id', protect, adminOnly, async (req, res) => {
  try {
    const college = await College.findById(req.params.id)
    if (!college) return res.status(404).json({ message: 'Not found' })
    res.json(college)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/colleges/:id', protect, adminOnly, async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(college)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   COLLEGE RANKING APPLICATIONS
   ============================================================ */
router.post('/college-ranking-application', async (req, res) => {
  try {
    const newApplication = new CollegeRankingApplication(req.body);
    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/college-ranking-applications', protect, adminOnly, async (req, res) => {
  try {
    const applications = await CollegeRankingApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/college-ranking-applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const { rank, status } = req.body;
    const application = await CollegeRankingApplication.findByIdAndUpdate(
      req.params.id,
      { rank, status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

/* ============================================================
   FELLOWSHIP APPLICATIONS
   ============================================================ */
router.post('/fellowship-applications', async (req, res) => {
  try {
    const application = await FellowshipApplication.create(req.body)
    res.status(201).json(application)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/fellowship-applications', protect, adminOnly, async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    const applications = await FellowshipApplication.find(filter).sort({ createdAt: -1 })
    res.json(applications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/fellowship-applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body
    const application = await FellowshipApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!application) return res.status(404).json({ message: 'Application not found' })
    res.json(application)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   CONTACT / PARTNERSHIP REQUESTS
   ============================================================ */
router.post('/contact-requests', async (req, res) => {
  try {
    const {
      formType,
      formTitle,
      fullName,
      email,
      phone,
      organization,
      message,
    } = req.body

    if (!formType || !CONTACT_FORM_TITLES[formType]) {
      return res.status(400).json({ message: 'Invalid form type.' })
    }

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Full name, email, and phone are required.' })
    }

    const request = await ContactRequest.create({
      formType,
      formTitle: (formTitle || CONTACT_FORM_TITLES[formType]).trim(),
      fullName,
      email,
      phone,
      organization,
      message,
    })

    res.status(201).json({
      message: `Thanks for your ${CONTACT_FORM_TITLES[formType].toLowerCase()} request. We will process your request shortly.`,
      request,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/contact-requests', protect, adminOnly, async (req, res) => {
  try {
    const filter = {}
    if (req.query.formType) filter.formType = req.query.formType
    if (req.query.status) filter.status = req.query.status

    const requests = await ContactRequest.find(filter).sort({ createdAt: -1 })
    res.json(requests)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/contact-requests/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes } = req.body
    const update = {}
    if (status) update.status = status
    if (adminNotes !== undefined) update.adminNotes = adminNotes

    const request = await ContactRequest.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
    if (!request) return res.status(404).json({ message: 'Request not found' })
    res.json(request)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   COURSE MANAGEMENT
   ============================================================ */
router.get('/courses', protect, adminOnly, async (_req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/courses', protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/courses/:id', protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/courses/:id', protect, adminOnly, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ message: 'Course deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/courses/:id/assign', protect, adminOnly, async (req, res) => {
  try {
    const { userId } = req.body
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { assignedUsers: userId } },
      { new: true }
    )
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* ============================================================
   NOTIFICATION MANAGEMENT
   ============================================================ */
router.get('/notifications', protect, adminOnly, async (_req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('createdBy', 'name')
      .populate('targetUserIds', 'name email founderId')
      .sort({ createdAt: -1 })
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/notifications', protect, adminOnly, async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      createdBy: req.user._id,
    })
    res.status(201).json(notification)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/notifications/:id', protect, adminOnly, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id)
    res.json({ message: 'Notification deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
