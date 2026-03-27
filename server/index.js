import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import paymentRoutes from './routes/payment.js'
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import collegeRoutes from './routes/college.js'
import validationRoutes from './routes/validation.js'
import planRoutes from './routes/plan.js'
import { ensureAdminUser } from './config/ensureAdmin.js'
import { ensureDefaultPlans } from './config/ensureDefaultPlans.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const allowedOrigins = new Set(configuredOrigins)

// In local development, allow any localhost/127.0.0.1 port to avoid CORS issues
// when switching Vite ports (5173, 5174, etc.) or using direct backend URLs.
const isLocalOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin || '')

app.use(cors({
  origin: (origin, callback) => {
    const isDev = process.env.NODE_ENV !== 'production'
    if (!origin || allowedOrigins.has('*') || allowedOrigins.has(origin) || (isDev && isLocalOrigin(origin))) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  credentials: true,
}))
app.use(express.json())

app.use((err, _req, res, next) => {
  if (err?.message?.startsWith('CORS blocked:')) {
    return res.status(403).json({ message: err.message })
  }
  return next(err)
})

app.use('/api/auth', authRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/college', collegeRoutes)
app.use('/api/validation', validationRoutes)
app.use('/api/plans', planRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()
  await ensureAdminUser()
  await ensureDefaultPlans()

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startServer().catch((err) => {
  console.error('Server startup failed:', err.message)
  process.exit(1)
})
