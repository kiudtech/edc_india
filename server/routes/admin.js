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

const router = Router()

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
