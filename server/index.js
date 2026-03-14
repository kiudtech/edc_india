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
import { ensureAdminUser } from './config/ensureAdmin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/college', collegeRoutes)
app.use('/api/validation', validationRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()
  await ensureAdminUser()

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startServer().catch((err) => {
  console.error('Server startup failed:', err.message)
  process.exit(1)
})
