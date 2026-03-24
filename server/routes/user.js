import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import User from '../models/User.js'
import Ticket from '../models/Ticket.js'
import Payment from '../models/Payment.js'
import Event from '../models/Event.js'
import Grant from '../models/Grant.js'
import Course from '../models/Course.js'
import Notification from '../models/Notification.js'

const router = Router()

// ── Get profile ──
router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
})

// ── Get visible events for members ──
router.get('/events', protect, async (_req, res) => {
  try {
    const events = await Event.find({ isVisible: true }).sort({ date: -1 })
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get visible grants (type=Grant) ──
router.get('/grants', protect, async (_req, res) => {
  try {
    const grants = await Grant.find({ isVisible: true, type: 'Grant' }).sort({ deadline: 1 })
    res.json(grants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get visible funding opportunities (type=Funding) ──
router.get('/funding', protect, async (_req, res) => {
  try {
    const funding = await Grant.find({ isVisible: true, type: 'Funding' }).sort({ createdAt: -1 })
    res.json(funding)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get visible investor updates (type=Investor) ──
router.get('/investors', protect, async (_req, res) => {
  try {
    const investors = await Grant.find({ isVisible: true, type: 'Investor' }).sort({ createdAt: -1 })
    res.json(investors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get notifications (community updates) ──
router.get('/notifications', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { targetAudience: 'all' },
        { targetUserIds: req.user._id },
      ],
    }).sort({ createdAt: -1 }).limit(20)
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get visible courses ──
router.get('/courses', protect, async (_req, res) => {
  try {
    const courses = await Course.find({ isVisible: true }).sort({ createdAt: -1 })
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Update password ──
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id)

    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect.' })

    user.password = newPassword
    await user.save()
    res.json({ message: 'Password updated successfully.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Raise support ticket ──
router.post('/tickets', protect, async (req, res) => {
  try {
    const { subject, description } = req.body
    const ticket = await Ticket.create({
      userId: req.user._id,
      subject,
      description,
    })
    res.status(201).json(ticket)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get user tickets ──
router.get('/tickets', protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Express interest in paid course ──
router.post('/course-interest', protect, async (req, res) => {
  try {
    const { courseName } = req.body
    const ticket = await Ticket.create({
      userId: req.user._id,
      subject: `Course Interest: ${courseName}`,
      description: `User expressed interest in paid course: ${courseName}. Admin to contact and schedule physical interaction.`,
    })
    res.status(201).json({
      message: 'Interest recorded! Our admin will contact you soon.',
      ticket,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get payment history ──
router.get('/payments', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(payments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
