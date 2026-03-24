import { Router } from 'express'
import IdeaValidation from '../models/IdeaValidation.js'
import Payment from '../models/Payment.js'
import User from '../models/User.js'
import Counter from '../models/Counter.js'

const router = Router()

// ── Submit idea validation application ──
router.post('/submit', async (req, res) => {
  try {
    const {
      founderName, founderEmail, founderPhone, password,
      startupName, idea, innovationDescription, industry, stage,
    } = req.body

    const validation = await IdeaValidation.create({
      founderName, founderEmail, founderPhone,
      startupName, idea,
      innovationDescription: innovationDescription || '',
      industry, stage,
    })

    res.status(201).json({
      message: 'Submission received. Proceed to payment.',
      validationId: validation._id,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Pay for idea validation ──
router.post('/pay', async (req, res) => {
  try {
    const { validationId } = req.body
    const validation = await IdeaValidation.findById(validationId)
    if (!validation) return res.status(404).json({ message: 'Submission not found.' })

    const transactionId = `TXN-VAL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Create user account for the applicant
    let user = await User.findOne({ email: validation.founderEmail.toLowerCase() })
    if (!user) {
      let counter = await Counter.findOne({ name: 'founderId' })
      if (!counter) counter = await Counter.create({ name: 'founderId', value: 1000 })
      counter.value += 1
      await counter.save()
      const founderId = `BUB-${counter.value}`

      user = await User.create({
        name: validation.founderName,
        email: validation.founderEmail,
        phone: validation.founderPhone,
        password: validation.founderPhone, // temporary password = phone
        startupName: validation.startupName,
        startupStage: validation.stage,
        industry: validation.industry,
        ideaSummary: validation.idea.substring(0, 200),
        founderId,
        termsAccepted: true,
        membershipStatus: 'active',
        membershipType: 'validation',
      })
    }

    validation.userId = user._id
    validation.paymentStatus = 'success'
    validation.transactionId = transactionId
    await validation.save()

    await Payment.create({
      userId: user._id,
      amount: 5000,
      type: 'validation',
      status: 'success',
      transactionId,
    })

    res.json({
      message: 'Payment successful! Your idea validation application has been submitted.',
      transactionId,
      founderId: user.founderId,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
