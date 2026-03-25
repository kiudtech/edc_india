import { Router } from 'express'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import User from '../models/User.js'
import Payment from '../models/Payment.js'

const router = Router()

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim()
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()

  if (!keyId || !keySecret) {
    return null
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

router.post('/create-order', async (req, res) => {
  try {
    const razorpay = getRazorpayClient()

    if (!razorpay) {
      return res.status(500).json({ message: 'Razorpay is not configured on the server.' })
    }

    const { userId, amount, type, planName } = req.body
    const normalizedAmount = Number(amount)

    if (!userId || !normalizedAmount || normalizedAmount <= 0) {
      return res.status(400).json({ message: 'Valid userId and amount are required.' })
    }

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found.' })

    const order = await razorpay.orders.create({
      amount: Math.round(normalizedAmount * 100),
      currency: 'INR',
      receipt: `edc_${Date.now()}`,
      notes: {
        userId: String(userId),
        planType: type || 'membership',
        planName: planName || '',
      },
    })

    await Payment.create({
      userId,
      amount: normalizedAmount,
      type: type || 'membership',
      status: 'pending',
      transactionId: order.id,
      gateway: 'razorpay',
      razorpayOrderId: order.id,
    })

    res.json({
      keyId: process.env.RAZORPAY_KEY_ID?.trim(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      founderId: user.founderId,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const {
      userId,
      amount,
      type,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()

    if (!keySecret) {
      return res.status(500).json({ message: 'Razorpay secret is not configured on the server.' })
    }

    if (!userId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing Razorpay verification fields.' })
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isValidSignature = generatedSignature === razorpay_signature
    const normalizedAmount = Number(amount)

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found.' })

    let payment = await Payment.findOne({ userId, razorpayOrderId: razorpay_order_id })
    if (!payment) {
      payment = await Payment.create({
        userId,
        amount: normalizedAmount || 0,
        type: type || 'membership',
        status: 'pending',
        transactionId: razorpay_order_id,
        gateway: 'razorpay',
        razorpayOrderId: razorpay_order_id,
      })
    }

    payment.amount = normalizedAmount || payment.amount
    payment.type = type || payment.type
    payment.razorpayPaymentId = razorpay_payment_id
    payment.razorpaySignature = razorpay_signature

    if (!isValidSignature) {
      payment.status = 'failed'
      await payment.save()
      return res.status(400).json({ message: 'Payment signature verification failed.' })
    }

    payment.status = 'success'
    payment.transactionId = razorpay_payment_id
    await payment.save()

    // Activate membership only for membership-related payment flows
    if ((type || 'membership') === 'membership' || (type || 'membership') === 'validation') {
      user.membershipStatus = 'active'
      await user.save()
    }

    res.json({
      message: 'Payment successful! Your membership is now active.',
      payment: {
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        orderId: payment.razorpayOrderId,
        paymentId: payment.razorpayPaymentId,
      },
      founderId: user.founderId,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
