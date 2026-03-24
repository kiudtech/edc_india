import { Router } from 'express'
import College from '../models/College.js'

const router = Router()

// ── Public: College applies for ranking ──
router.post('/apply', async (req, res) => {
  try {
    const {
      collegeName, contactPerson, email, phone,
      startupCount, activities, innovationData,
      workshopsConducted, incubationPrograms, successStories,
    } = req.body
    const college = await College.create({
      collegeName, contactPerson, email, phone,
      startupCount: startupCount || 0,
      activities: activities || '',
      innovationData: innovationData || '',
      workshopsConducted: workshopsConducted || 0,
      incubationPrograms: incubationPrograms || '',
      successStories: successStories || '',
    })
    res.status(201).json({ message: 'Application submitted successfully.', college })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Public: View published rankings ──
router.get('/rankings', async (_req, res) => {
  try {
    const colleges = await College.find({ status: 'ranked' })
      .select('collegeName ranking score')
      .sort({ ranking: 1 })
    res.json(colleges)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
