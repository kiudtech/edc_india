import { Router } from 'express'
import IdeaValidation from '../models/IdeaValidation.js'
import Payment from '../models/Payment.js'
import User from '../models/User.js'
import Counter from '../models/Counter.js'
import Plan from '../models/Plan.js'
import crypto from 'crypto'
import Razorpay from 'razorpay'

const router = Router()
const DEFAULT_VALIDATION_AMOUNT = 5000
const DEFAULT_VALIDATION_PLAN_NAME = 'Idea Validation'
const DEFAULT_VALIDATION_PLAN_SLUG = 'idea-validation'

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

const resolveValidationPlan = async ({ slug }) => {
  const normalizedSlug = String(slug || DEFAULT_VALIDATION_PLAN_SLUG)
    .trim()
    .toLowerCase()

  let plan = await Plan.findOne({ slug: normalizedSlug, isActive: true })

  if (!plan && normalizedSlug === DEFAULT_VALIDATION_PLAN_SLUG) {
    plan = await Plan.findOne({ ctaRoute: '/join-validation', isActive: true }).sort({ sortOrder: 1, createdAt: 1 })
  }

  if (plan) {
    return {
      planSlug: plan.slug,
      planName: plan.name || DEFAULT_VALIDATION_PLAN_NAME,
      planPrice: Number(plan.price) > 0 ? Number(plan.price) : DEFAULT_VALIDATION_AMOUNT,
    }
  }

  return {
    planSlug: normalizedSlug || DEFAULT_VALIDATION_PLAN_SLUG,
    planName: DEFAULT_VALIDATION_PLAN_NAME,
    planPrice: DEFAULT_VALIDATION_AMOUNT,
  }
}

// ── Submit idea validation application ──
router.post('/submit', async (req, res) => {
  try {
    const {
      founderName, founderEmail, founderPhone, password,
      startupName, idea, innovationDescription, industry, stage,
      planSlug,
    } = req.body

    const resolvedPlan = await resolveValidationPlan({ slug: planSlug })

    const validation = await IdeaValidation.create({
      founderName, founderEmail, founderPhone,
      startupName, idea,
      innovationDescription: innovationDescription || '',
      industry, stage,
      planSlug: resolvedPlan.planSlug,
      planName: resolvedPlan.planName,
      planPrice: resolvedPlan.planPrice,
    })

    res.status(201).json({
      message: 'Submission received. Proceed to payment.',
      validationId: validation._id,
      plan: {
        slug: resolvedPlan.planSlug,
        name: resolvedPlan.planName,
        price: resolvedPlan.planPrice,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

const ensureValidationUser = async (validation) => {
  let user = await User.findOne({ email: validation.founderEmail.toLowerCase() })

  if (!user) {
    let counter = await Counter.findOne({ name: 'founderId' })
    if (!counter) counter = await Counter.create({ name: 'founderId', value: 1000 })
    counter.value += 1
    await counter.save()

    user = await User.create({
      name: validation.founderName,
      email: validation.founderEmail,
      phone: validation.founderPhone,
      password: crypto.randomBytes(16).toString('hex'),
      startupName: validation.startupName,
      startupStage: validation.stage,
      industry: validation.industry,
      ideaSummary: validation.idea.substring(0, 200),
      founderId: `BUB-${counter.value}`,
      termsAccepted: true,
      membershipStatus: 'active',
      membershipType: 'validation',
    })
  } else {
    user.membershipStatus = 'active'
    user.membershipType = 'validation'
    user.startupName = user.startupName || validation.startupName
    user.startupStage = user.startupStage || validation.stage
    user.industry = user.industry || validation.industry
    user.ideaSummary = user.ideaSummary || validation.idea.substring(0, 200)
    await user.save()
  }

  return user
}

// ── Create Razorpay order for idea validation ──
router.post('/create-order', async (req, res) => {
  try {
    const razorpay = getRazorpayClient()
    if (!razorpay) {
      return res.status(500).json({ message: 'Razorpay is not configured on the server.' })
    }

    const { validationId, planSlug } = req.body
    if (!validationId) {
      return res.status(400).json({ message: 'validationId is required.' })
    }

    const validation = await IdeaValidation.findById(validationId)
    if (!validation) return res.status(404).json({ message: 'Submission not found.' })

    const resolvedPlan = await resolveValidationPlan({
      slug: planSlug || validation.planSlug,
    })

    validation.planSlug = resolvedPlan.planSlug
    validation.planName = resolvedPlan.planName
    validation.planPrice = resolvedPlan.planPrice

    const order = await razorpay.orders.create({
      amount: Math.round(resolvedPlan.planPrice * 100),
      currency: 'INR',
      receipt: `val_${Date.now()}`,
      notes: {
        validationId: String(validation._id),
        planType: 'validation',
        planSlug: resolvedPlan.planSlug,
        planName: resolvedPlan.planName,
      },
    })

    validation.paymentStatus = 'pending'
    validation.transactionId = order.id
    await validation.save()

    res.json({
      keyId: process.env.RAZORPAY_KEY_ID?.trim(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      user: {
        name: validation.founderName,
        email: validation.founderEmail,
        phone: validation.founderPhone,
      },
      plan: {
        slug: resolvedPlan.planSlug,
        name: resolvedPlan.planName,
        price: resolvedPlan.planPrice,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Verify Razorpay payment and activate idea validation membership ──
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      validationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()
    if (!keySecret) {
      return res.status(500).json({ message: 'Razorpay secret is not configured on the server.' })
    }

    if (!validationId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing Razorpay verification fields.' })
    }

    const validation = await IdeaValidation.findById(validationId)
    if (!validation) return res.status(404).json({ message: 'Submission not found.' })

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isValidSignature = generatedSignature === razorpay_signature

    if (!isValidSignature) {
      validation.paymentStatus = 'failed'
      await validation.save()
      return res.status(400).json({ message: 'Payment signature verification failed.' })
    }

    const validationAmount = Number(validation.planPrice) > 0 ? Number(validation.planPrice) : DEFAULT_VALIDATION_AMOUNT

    const user = await ensureValidationUser(validation)

    let payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id })
    if (!payment) {
      payment = await Payment.create({
        userId: user._id,
        amount: validationAmount,
        type: 'validation',
        status: 'pending',
        transactionId: razorpay_order_id,
        gateway: 'razorpay',
        razorpayOrderId: razorpay_order_id,
      })
    }

    payment.userId = user._id
    payment.amount = validationAmount
    payment.type = 'validation'
    payment.status = 'success'
    payment.transactionId = razorpay_payment_id
    payment.razorpayPaymentId = razorpay_payment_id
    payment.razorpaySignature = razorpay_signature
    await payment.save()

    validation.userId = user._id
    validation.paymentStatus = 'success'
    validation.transactionId = razorpay_payment_id
    await validation.save()

    res.json({
      message: 'Payment successful! Your idea validation application has been submitted.',
      transactionId: razorpay_payment_id,
      founderId: user.founderId,
      payment: {
        amount: payment.amount,
        status: payment.status,
        orderId: payment.razorpayOrderId,
        paymentId: payment.razorpayPaymentId,
      },
      plan: {
        slug: validation.planSlug || DEFAULT_VALIDATION_PLAN_SLUG,
        name: validation.planName || DEFAULT_VALIDATION_PLAN_NAME,
        price: validationAmount,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Legacy endpoints intentionally disabled to enforce Razorpay flow
router.post('/pay', (_req, res) => {
  res.status(410).json({ message: 'This endpoint is deprecated. Use /create-order and /verify-payment.' })
})

router.post('/process-payment', (_req, res) => {
  res.status(410).json({ message: 'This endpoint is deprecated. Use /create-order and /verify-payment.' })
})

export default router
