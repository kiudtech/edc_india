import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import User from '../models/User.js'
import Ticket from '../models/Ticket.js'
import Payment from '../models/Payment.js'

const router = Router()

// ── Get profile ──
router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
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
