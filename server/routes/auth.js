import { Router } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/User.js'
import Counter from '../models/Counter.js'

const router = Router()
const client = new OAuth2Client()

const getGoogleAudiences = () => {
  const configured = process.env.GOOGLE_CLIENT_IDS || process.env.GOOGLE_CLIENT_ID || ''
  return configured
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
}

const verifyGoogleToken = async (idToken) => {
  const audiences = getGoogleAudiences()

  if (!audiences.length) {
    throw new Error('Google OAuth is not configured on the server.')
  }

  let lastError
  for (const audience of audiences) {
    try {
      const ticket = await client.verifyIdToken({ idToken, audience })
      return ticket.getPayload()
    } catch (err) {
      lastError = err
    }
  }

  throw lastError || new Error('Failed to verify Google token.')
}

// ── Join / Register ──
router.post('/join', async (req, res) => {
  try {
    const {
      name, email, phone,
      startupName, startupStage, industry,
      ideaSummary, termsAccepted
    } = req.body

    const password = crypto.randomBytes(16).toString('hex');

    if (!termsAccepted) {
      return res.status(400).json({ message: 'You must accept the Terms & Conditions.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      if (existing.role !== 'admin' && existing.membershipStatus === 'pending') {
        existing.name = name || existing.name
        existing.phone = phone || existing.phone
        existing.startupName = startupName || existing.startupName
        existing.startupStage = startupStage || existing.startupStage
        existing.industry = industry || existing.industry
        existing.ideaSummary = ideaSummary || existing.ideaSummary
        existing.termsAccepted = true
        await existing.save()

        return res.status(200).json({
          message: 'This email is already registered with pending membership. Proceed to payment.',
          userId: existing._id,
          founderId: existing.founderId,
          existingPendingUser: true,
        })
      }

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
    const identifier = String(req.body.identifier || '').trim()
    const password = String(req.body.password || '')

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required.' })
    }

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { founderId: identifier },
      ],
    })

    if (!user) return res.status(400).json({ message: 'Invalid credentials.' })

    if (user.role !== 'admin' && user.membershipStatus !== 'active') {
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

// Google Login
router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body
    
    if (!token) {
      return res.status(400).json({ message: 'Google Token is required.' })
    }

    const payload = await verifyGoogleToken(token)
    const { email } = payload

    if (!email) {
      return res.status(400).json({ message: 'Email not provided by Google.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) return res.status(400).json({ message: 'No account found with this email. Please sign up first.' })

    if (user.role !== 'admin' && user.membershipStatus !== 'active') {
      return res.status(403).json({
        message: 'Membership not active. Please complete payment first.',
      })
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token: jwtToken,
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
    console.error('Google Auth Error:', err)
    res.status(500).json({ message: 'Invalid or expired Google Token.' })
  }
})

// Google Profile (for signup/prefill flows)
router.post('/google-profile', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ message: 'Google Token is required.' })
    }

    const payload = await verifyGoogleToken(token)
    const { email, name, picture, email_verified: emailVerified } = payload

    if (!email) {
      return res.status(400).json({ message: 'Email not provided by Google.' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() }).select('_id email role membershipStatus founderId')

    res.json({
      profile: {
        email,
        name: name || '',
        picture: picture || '',
        emailVerified: Boolean(emailVerified),
      },
      existingUser,
    })
  } catch (err) {
    console.error('Google Profile Error:', err)
    res.status(500).json({ message: 'Invalid or expired Google Token.' })
  }
})

export default router
