import { Router } from 'express'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import User from '../models/User.js'
import Payment from '../models/Payment.js'
import Plan from '../models/Plan.js'

const router = Router()
const SUPPORTED_PAYMENT_TYPES = new Set(['membership', 'fellowship'])

const PAYMENT_PLAN_MAP = {
  membership: {
    slug: 'startup-membership',
    name: 'Startup Membership',
    ctaRoute: '/startup-application',
    defaultPrice: 2500,
  },
  fellowship: {
    slug: 'fellowship-program',
    name: 'Fellowship Program',
    ctaRoute: '/fellowship-application',
    defaultPrice: 5000,
  },
}

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

const normalizePaymentType = (type) => {
  const normalizedType = String(type || 'membership').trim().toLowerCase()
  return SUPPORTED_PAYMENT_TYPES.has(normalizedType) ? normalizedType : null
}

const resolvePlanForPayment = async (paymentType) => {
  const planConfig = PAYMENT_PLAN_MAP[paymentType]

  if (!planConfig) {
    return null
  }

  let plan = await Plan.findOne({ slug: planConfig.slug, isActive: true })

  if (!plan) {
    plan = await Plan.findOne({ ctaRoute: planConfig.ctaRoute, isActive: true }).sort({ sortOrder: 1, createdAt: 1 })
  }

  if (plan) {
    const normalizedPrice = Number(plan.price)
    return {
      planSlug: plan.slug,
      planName: plan.name || planConfig.name,
      planPrice: Number.isFinite(normalizedPrice) && normalizedPrice > 0 ? normalizedPrice : planConfig.defaultPrice,
    }
  }

  return {
    planSlug: planConfig.slug,
    planName: planConfig.name,
    planPrice: planConfig.defaultPrice,
  }
}

router.post('/create-order', async (req, res) => {
  try {
    const razorpay = getRazorpayClient()

    if (!razorpay) {
      return res.status(500).json({ message: 'Razorpay is not configured on the server.' })
    }

    const { userId, type } = req.body

    if (!userId) {
      return res.status(400).json({ message: 'Valid userId is required.' })
    }

    const paymentType = normalizePaymentType(type)

    if (!paymentType) {
      return res.status(400).json({ message: 'Unsupported payment type.' })
    }

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found.' })

    const resolvedPlan = await resolvePlanForPayment(paymentType)

    if (!resolvedPlan || !resolvedPlan.planPrice || resolvedPlan.planPrice <= 0) {
      return res.status(500).json({ message: 'Plan pricing is not configured correctly.' })
    }

    const order = await razorpay.orders.create({
      amount: Math.round(resolvedPlan.planPrice * 100),
      currency: 'INR',
      receipt: `edc_${Date.now()}`,
      notes: {
        userId: String(userId),
        planType: paymentType,
        planSlug: resolvedPlan.planSlug,
        planName: resolvedPlan.planName,
      },
    })

    await Payment.create({
      userId,
      amount: resolvedPlan.planPrice,
      type: paymentType,
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
      paymentType,
      plan: {
        slug: resolvedPlan.planSlug,
        name: resolvedPlan.planName,
        price: resolvedPlan.planPrice,
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

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found.' })

    const payment = await Payment.findOne({ userId, razorpayOrderId: razorpay_order_id })

    if (!payment) {
      return res.status(404).json({ message: 'Payment order not found for this user.' })
    }

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
    if (['membership', 'validation', 'fellowship'].includes(payment.type)) {
      user.membershipStatus = 'active'
      await user.save()
    }

    res.json({
      message: 'Payment successful! Your membership is now active.',
      payment: {
        transactionId: payment.transactionId,
        amount: payment.amount,
        type: payment.type,
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
