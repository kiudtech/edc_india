import { Router } from 'express'
import College from '../models/College.js'
import CollegeRankingApplication from '../models/CollegeRankingApplication.js'
import CollegeRating from '../models/CollegeRating.js'
import CollegeRatingSetting from '../models/CollegeRatingSetting.js'

const router = Router()

const FALLBACK_COLLEGE_LIST = [
  'Indian Institute of Technology Delhi',
  'Indian Institute of Technology Bombay',
  'Indian Institute of Technology Madras',
  'Indian Institute of Technology Kanpur',
  'Indian Institute of Technology Kharagpur',
  'Indian Institute of Science Bangalore',
  'National Institute of Technology Trichy',
  'National Institute of Technology Warangal',
  'National Institute of Technology Surathkal',
  'Delhi Technological University',
  'Netaji Subhas University of Technology',
  'Jadavpur University',
  'Vellore Institute of Technology',
  'SRM Institute of Science and Technology',
  'Lovely Professional University',
  'Amity University',
  'Manipal Institute of Technology',
  'Birla Institute of Technology and Science Pilani',
  'Pune Institute of Computer Technology',
  'College of Engineering Pune',
]

const normalizeCollegeName = (value = '') => String(value || '').trim().replace(/\s+/g, ' ')
const escapeRegex = (value = '') => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const formatAverage = (value = 0) => Number(Number(value || 0).toFixed(2))

// Public: Return homepage visibility setting for live ranking snapshot.
router.get('/ratings/settings', async (_req, res) => {
  try {
    const settings = await CollegeRatingSetting.findOne({ singletonKey: 'global' })
    res.json({ showLiveRankingSnapshot: Boolean(settings?.showLiveRankingSnapshot) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Public: Searchable college list for autocomplete inputs.
router.get('/list', async (req, res) => {
  try {
    const search = normalizeCollegeName(req.query.q || '')
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(50, Math.max(5, Number(req.query.limit) || 20))
    const regex = search ? { $regex: escapeRegex(search), $options: 'i' } : null

    const [fromColleges, fromRankingApplications, fromRatings] = await Promise.all([
      College.distinct('collegeName', regex ? { collegeName: regex } : {}),
      CollegeRankingApplication.distinct('collegeName', regex ? { collegeName: regex } : {}),
      CollegeRating.distinct('collegeName', regex ? { collegeName: regex } : {}),
    ])

    const fallbackMatches = FALLBACK_COLLEGE_LIST.filter((name) => {
      if (!search) return true
      return name.toLowerCase().includes(search.toLowerCase())
    })

    const allNames = Array.from(
      new Set(
        [...fromColleges, ...fromRankingApplications, ...fromRatings, ...fallbackMatches]
          .map(normalizeCollegeName)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b))

    const startIndex = (page - 1) * limit
    const items = allNames.slice(startIndex, startIndex + limit)

    res.json({
      items,
      page,
      limit,
      total: allNames.length,
      hasMore: startIndex + limit < allNames.length,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

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

// ── Public: Anonymous college ratings ──
router.post('/ratings', async (req, res) => {
  try {
    const normalizedCollegeName = normalizeCollegeName(req.body?.collegeName)
    const numericRating = Number(req.body?.rating)
    const feedback = String(req.body?.feedback || '').trim()

    if (!normalizedCollegeName) {
      return res.status(400).json({ message: 'Please select a college before submitting your rating.' })
    }

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be an integer between 1 and 5.' })
    }

    if (feedback.length > 1500) {
      return res.status(400).json({ message: 'Feedback cannot exceed 1500 characters.' })
    }

    const savedRating = await CollegeRating.create({
      collegeName: normalizedCollegeName,
      rating: numericRating,
      feedback,
    })

    const [summary] = await CollegeRating.aggregate([
      { $match: { collegeName: normalizedCollegeName } },
      {
        $group: {
          _id: '$collegeName',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ])

    res.status(201).json({
      message: 'Thanks for rating. Your anonymous feedback has been recorded.',
      rating: {
        id: savedRating._id,
        collegeName: savedRating.collegeName,
        rating: savedRating.rating,
        feedback: savedRating.feedback,
        createdAt: savedRating.createdAt,
      },
      collegeSummary: summary
        ? {
            collegeName: summary._id,
            averageRating: formatAverage(summary.averageRating),
            totalRatings: summary.totalRatings,
          }
        : null,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Public: Community college ranking by average rating ──
router.get('/ratings/ranking', async (req, res) => {
  try {
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10))
    const search = normalizeCollegeName(req.query.q || '')
    const match = search
      ? { collegeName: { $regex: escapeRegex(search), $options: 'i' } }
      : null

    const ranking = await CollegeRating.aggregate([
      ...(match ? [{ $match: match }] : []),
      {
        $group: {
          _id: '$collegeName',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
          lastRatedAt: { $max: '$createdAt' },
        },
      },
      { $sort: { averageRating: -1, totalRatings: -1, _id: 1 } },
      { $limit: limit },
    ])

    res.json(
      ranking.map((item, index) => ({
        rank: index + 1,
        collegeName: item._id,
        averageRating: formatAverage(item.averageRating),
        totalRatings: item.totalRatings,
        lastRatedAt: item.lastRatedAt,
      }))
    )
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
