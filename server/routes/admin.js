import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import User from '../models/User.js'
import Payment from '../models/Payment.js'
import Ticket from '../models/Ticket.js'

const router = Router()

// ── Get all members ──
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get all payments ──
router.get('/payments', protect, adminOnly, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email founderId')
      .sort({ createdAt: -1 })
    res.json(payments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Get all tickets ──
router.get('/tickets', protect, adminOnly, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('userId', 'name email founderId')
      .sort({ createdAt: -1 })
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Update ticket ──
router.put('/tickets/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes } = req.body
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    ).populate('userId', 'name email founderId')
    res.json(ticket)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Activate / deactivate user ──
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

export default router
