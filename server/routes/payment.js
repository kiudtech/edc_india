import { Router } from 'express'
import User from '../models/User.js'
import Payment from '../models/Payment.js'

const router = Router()

// ── Simulate payment (fake gateway) ──
router.post('/process', async (req, res) => {
  try {
    const { userId, amount, type } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found.' })

    // Generate fake transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const payment = await Payment.create({
      userId,
      amount,
      type: type || 'membership',
      status: 'success',
      transactionId,
    })

    // Activate membership on successful payment
    user.membershipStatus = 'active'
    await user.save()

    res.json({
      message: 'Payment successful! Your membership is now active.',
      payment: {
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
      },
      founderId: user.founderId,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
