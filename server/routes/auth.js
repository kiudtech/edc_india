import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Counter from '../models/Counter.js'

const router = Router()

// ── Join / Register ──
router.post('/join', async (req, res) => {
  try {
    const {
      name, email, phone, password,
      startupName, startupStage, industry,
      ideaSummary, termsAccepted,
    } = req.body

    if (!termsAccepted) {
      return res.status(400).json({ message: 'You must accept the Terms & Conditions.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(400).json({ message: 'This email is already registered.' })
    }

    // Generate next Founder ID
    let counter = await Counter.findOne({ name: 'founderId' })
    if (!counter) counter = await Counter.create({ name: 'founderId', value: 1000 })
    counter.value += 1
    await counter.save()
    const founderId = `BUB-${counter.value}`

    const user = await User.create({
      name, email, phone, password,
      startupName: startupName || '',
      startupStage, industry,
      ideaSummary: ideaSummary || '',
      founderId,
      termsAccepted,
      membershipStatus: 'pending',
      membershipType: 'startup',
    })

    res.status(201).json({
      message: 'Registration successful. Proceed to payment.',
      userId: user._id,
      founderId: user.founderId,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Login ──
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body

    const user = await User.findOne({
      $or: [
        { email: identifier?.toLowerCase() },
        { founderId: identifier },
      ],
    })

    if (!user) return res.status(400).json({ message: 'Invalid credentials.' })

    if (user.membershipStatus !== 'active') {
      return res.status(403).json({
        message: 'Membership not active. Please complete payment first.',
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        founderId: user.founderId,
        membershipStatus: user.membershipStatus,
        membershipType: user.membershipType,
        startupName: user.startupName,
        industry: user.industry,
        startupStage: user.startupStage,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
