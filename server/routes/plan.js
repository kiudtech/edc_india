import { Router } from 'express'
import Plan from '../models/Plan.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 })
    res.json(plans)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
